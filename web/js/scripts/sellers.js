(function() {
    var sellers = [];

    function addSellerToGraph(seller) {
        // TODO
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
            sellers = data
            sellers.forEach(function (seller) {
                addSellerToTable(seller);
                addSellerToGraph(seller);
            })
        })
    })
})();