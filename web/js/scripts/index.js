(function() {
    var posts = [];
    var map = null;

    function regular_map() {
        var location = new google.maps.LatLng(40.42, -3.70);

        var mapOptions = {
            center: location,
            zoom: 2
        };

        map = new google.maps.Map(document.getElementById("map-container"),
            mapOptions);
    }

    function addPostToMap(post) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(post.latitude, post.longitude),
            map: map,
            title: post.title
        });

        marker.addListener('click', function() {
            openModal(post);
        })
    }

    function addPostToTable(post) {

        var tagsHtml = '';
        if (post.tags) {
            post.tags.forEach(function (tag) {
                tagsHtml += `<span class="tag badge badge-primary badge-pill pull-right">#${tag}</span>`
            })
        }

        var rowHtml = `
            <tr onclick='openModal(${JSON.stringify(post)})'>
                <th>${post.title}</th>
                <td>
                    ${tagsHtml}
                </td>
            </tr>
        `;
        $("#postTable > tbody:last-child").append(rowHtml);
    }

    window.openModal = function(post) {
        $('#postModal').modal();

        $('#postModal_title').html(post.title);
        $('#postModal_date').html(`${new Date(post.date).getFullYear()}/${new Date(post.date).getMonth()}/${new Date(post.date).getDate()}`);
        $('#postModal_author').html(`<a href='sellers.html?userId=${post.user.id}'>${post.user.name}</a>`);
        $('#postModal_price').html(HuntedHaunters.Utils.numberToPrice(post.price));
        if (post.url)
            $('#postModal_url').html(`<a href='${post.url}'>${post.url}</a>`);
        $('#postModal_body').html(post.description);

        var imageIndicatorsHtml = '';
        var imagesHtml = '';
        post.images.forEach(function(image, index) {
            var indicatorHtml = `
                <li data-target="#carouselExampleIndicators" data-slide-to="${index}"></li>
            `;
            imageIndicatorsHtml += indicatorHtml;

            var html = `
                <div class="carousel-item">
                    <img class="d-block w-100" src="${image}">
                </div>
            `;
            imagesHtml += html;
        });
        $('#postModal_imagesIndicators').html(imageIndicatorsHtml);
        $('#postModal_images').html(imagesHtml);
        $('#postModal_imagesIndicators > li').first().addClass('active');
        $('#postModal_images').first().addClass('active');
        $('#carouselExampleIndicators').carousel();
    }

    google.maps.event.addDomListener(window, 'load', regular_map);

    $(document).ready(function () {
        var postsDataAccess = new HuntedHaunters.DataAccess.PostsMock();
        postsDataAccess.loadPosts(function(data) {
            posts = data.sort(function(a, b) {
                return a.date < b.date;
            });
            posts.forEach(function (post) {
                addPostToTable(post);
                addPostToMap(post);
            })
        });
    })
})();
