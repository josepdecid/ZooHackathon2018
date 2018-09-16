(function() {
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