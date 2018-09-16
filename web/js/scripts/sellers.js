(function () {
    var sellers = [];

    function onClickNode(event) {
        // MOCK
        var seller = sellers[0];
        openModal(seller);
    };

    function renderGraph() {
        var sigmaInstance = new sigma('graphContainer');

        sellers.forEach(function(seller) {
            sigmaInstance.graph.addNode({
                id: 'n_' + seller._id,
                label: seller.name,
                x: Math.random(),
                y: Math.random(),
                size: 1,
                color: '#f00'
            });
        });

        var edgeCount = 0;
        while(Math.random() > 0.01 && edgeCount < 100) {
            var sellerIndex_1 = Math.floor(Math.random() * sellers.length);
            var seller_1 = sellers[sellerIndex_1];
            var sellerIndex_2 = Math.floor(Math.random() * sellers.length);
            var seller_2 = sellers[sellerIndex_2];
            if (sellerIndex_1 !== sellerIndex_2) {
                try {
                    sigmaInstance.graph.addEdge({
                        id: 'e_' + seller_1._id + '_' + seller_2._id,
                        source: 'n_' + seller_1._id,
                        target: 'n_' + seller_2._id
                    });
                    edgeCount++;
                } catch(ex) {
                    console.log('catched error: ' + ex.message);
                }
            }
        }

        sigmaInstance.cameras[0].goTo({ x: 0, y: 0, angle: 0, ratio: 0.3 });
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
                    <td><h6>${post.date}</h6><td>
    
                </tr>`;
                $("#postAuthorTable > tbody:last-child").append(rowHtml);
            });
        });
    }

    function resetDashboard() {
        $('#sellerTable > tbody').html('');
    }

    function filterSellers(filter) {
        resetDashboard();

        var filteredSellers = []
        if (filter === null) {
            filteredSellers = sellers;
        } else {
            filteredSellers = sellers.filter(function(seller) {
                return seller.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
            });
        }
        
        filteredSellers.forEach(function (seller) {
            addSellerToTable(seller);
        });
    };

    function filterNotEmpty(filter) {
        var result = false;
        for(var i = 0; i < filter.length; i++) {
            if (filter.charAt(i) !== ' ') {
                result = true;
                break;
            }
        }
        return result;
    };

    $(document).ready(function () {
        var authorsDataAccess = new HuntedHaunters.DataAccess.Sellers();
        authorsDataAccess.loadSellers(function (data) {
            sellers = JSON.parse(data);
            sellers.sort(function (a, b) {
                return a.posts.length < b.posts.length ? 1 : -1;
            });
            
            filterSellers(null);

            renderGraph();

            var userId = URI(window.location).query(true)['userId'];
            if (typeof userId !== 'undefined' && userId !== null) {
                var seller = sellers.filter(function (seller) {
                    return seller._id === parseInt(userId);
                })[0];
                if (seller) {
                    openModal(seller);
                }
            }

            $('#searchAuthorForm').on('submit', function (e) {
                var filter = $('#authorInput')[0].value;
                if (typeof filter !== 'undefined' && filter !== null
                        && filterNotEmpty(filter)) {
                    
                    filterSellers(filter);
                } else {
                    filterSeller(null);
                }
                return false;
            });
        });
    })
})();