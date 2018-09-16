(function () {
    var sellers = [];

    function onClickNode(event) {
        // MOCK
        var seller = sellers[0];
        console.log(seller);
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

        seller.posts.forEach(function (postId) {
            addPostToModalList(postId);
        });

        $('#sellerModal').modal();
    }

    function addPostToModalList(postId) {
        console.log(postId);
        var postsDataAccess = new HuntedHaunters.DataAccess.SellersMock();
        var rowHtml = `
            <tr onclick='openModal(${JSON.stringify(post)})'>
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
                    ${tagsHtml}
                </td>
                <td>
                    <h6>${post.price}€</h6>
                </td>

            </tr>
        `;
        $("#postAuthorTable > tbody:last-child").append(rowHtml);
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