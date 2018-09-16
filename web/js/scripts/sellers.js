(function () {
    var sellers = [];

    function onClickNode(event) {
        // MOCK
        var seller = sellers[0];
        openModal(seller);
    };

    function renderGraph() {
        var sigmaInstance = new sigma('graphContainer');

        var graphMock = new HuntedHaunters.DataAccess.GraphMock();
        graphMock.setGraphData(sigmaInstance.graph);

        sigmaInstance.bind('clickNode', onClickNode);

        sigmaInstance.refresh();
    }

    function addSellerToTable(seller) {
        var rowHtml = `
            <tr onclick='openModal(${JSON.stringify(seller)})'>
                <th>${seller.name}</th>
                <td>${seller.posts.length}</td>
            </tr>
        `;
        $("#sellerTable > tbody:last-child").append(rowHtml);
    }

    window.openModal = function (seller) {
        $('#sellerModal_name').html(seller.name);
        $('#sellerModal_body').html(seller.posts.length); //TODO
        $('#sellerModal_location').html(seller.location);

        var postsIDs = '';
        seller.posts.forEach(function (postId) {
            postsIDs += (postId.$oid + ',');
        });
        postsIDs = postsIDs.slice(0, -1);
        addPostsToModalList(postsIDs);

        $('#sellerModal').modal();
    }

    function addPostsToModalList(postsIDs) {
        var postsDataAccess = new HuntedHaunters.DataAccess.SellerPosts(postsIDs);
        postsDataAccess.loadPosts(function (data) {
            data.forEach(function (post) {
                console.log(post.url);
                var rowHtml = `
                <tr onclick="window.open('${post.url}', '_blank')">
                    <th>
                        <div class="image-cropper" style="
                            width: 100px;
                            height:100px;
                            position: relative;
                            overflow: hidden;
                            border-radius: 50%;
                        ">
                            <img src=${post.images[0]} width=110px style="
                             display: inline;
                            margin: auto;
                            height: 100%;
                            width: 100%; " class="rounded">
                        </div>
                    </th>
                    <th>${post.title}</th>
                    <td>
                        <h6>${post.price}€</h6>
                    </td>
    
                </tr>`;
                $("#postAuthorTable > tbody:last-child").append(rowHtml);
            });
        });
    }

    $(document).ready(function () {
        var authorsDataAccess = new HuntedHaunters.DataAccess.Sellers();
        authorsDataAccess.loadSellers(function (data) {
            sellers = JSON.parse(data);
            sellers.sort(function (a, b) {
                return a.posts.length < b.posts.length
            });
            sellers.forEach(function (seller) {
                addSellerToTable(seller);
            });

            renderGraph();

            var userId = URI(window.location).query(true)['userId'];
            if (typeof userId !== 'undefined' && userId !== null) {
                var seller = sellers.filter(function (seller) {
                    return seller.id === parseInt(userId);
                })[0];
                if (seller) {
                    openModal(seller);
                }
            }
        });
    })
})();