(function() {
    var sellers = [];

    function renderGraph() {
        var sigmaInstance = new sigma('graphContainer');

        var postIds = sellers.map(function (seller) { return seller.posts; }).flat();
        postIds.forEach(function(postId) {
            sigmaInstance.graph.addNode({
                id: 'post_' + postId,
                x: Math.random(),
                y: Math.random(),
                size: 1,
                color: '#a00'
            });
        });

        sellers.forEach(function(seller) {
            sigmaInstance.graph.addNode({
                id: 'seller_' + seller.id,
                label: seller.name,
                x: Math.random(),
                y: Math.random(),
                size: 2,
                color: '#f00'
            });

            seller.posts.forEach(function(postId) {
                sigmaInstance.graph.addEdge({
                    id: seller.id + '_' + postId,
                    source: 'seller_' + seller.id,
                    target: 'post_' + postId
                });
            });
        });

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

    window.openModal = function(seller) {
        $('#sellerModal_name').html(seller.name);
        $('#sellerModal_body').html(seller.posts.length); //TODO

        $('#sellerModal').modal();
    }

    $(document).ready(function () {
        var authorsDataAccess = new HuntedHaunters.DataAccess.SellersMock();
        authorsDataAccess.loadSellers(function (data) {
            sellers = data;
            sellers.forEach(function (seller) {
                addSellerToTable(seller);
            })

            renderGraph();

            var userId = URI(window.location).query(true)['userId'];
            if (typeof userId !== 'undefined' && userId !== null) {
                var seller = sellers.filter(function(seller) {
                    return seller.id === parseInt(userId);
                })[0];
                if (seller) {
                    openModal(seller);
                }
            }
        });
    })
})();