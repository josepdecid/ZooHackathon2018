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

        var postsDataAccess = new HuntedHaunters.DataAccess.PostsMock();
        postsDataAccess.loadPosts(function(data) {
            posts = data.sort(function(a, b) {
                return a.date < b.date;
            });
            posts.forEach(function (post) {
                addPostToTable(post);
                addPostToMap(post);
            });

            loadTagsChart();
        });
    }

    function addPostToMap(post) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(post.location[0], post.location[1]),
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
            imageIndicatorsHtml += `
                <li data-target="#carouselExampleIndicators" data-slide-to="${index}"></li>
            `;

            imagesHtml += `
                <div class="carousel-item">
                    <img class="d-block w-100" src="${image}">
                </div>
            `;
        });
        $('#postModal_imagesIndicators').html(imageIndicatorsHtml);
        $('#postModal_images').html(imagesHtml);
        $('#postModal_imagesIndicators > li').first().addClass('active');
        $('#postModal_images > div').first().addClass('active');
        $('#carouselExampleIndicators').carousel();
        $('#postModal').modal();
    };

    function loadTagsChart() {
        var tags = [];
        posts.forEach(function(post) {
            post.tags.forEach(function(tag) {
                var existingTag = tags.filter(function(existingTag) {
                    return existingTag.name === tag
                })[0];

                if (existingTag) {
                    existingTag.count += 1;
                } else {
                    tags.push({
                        name: tag,
                        count: 1
                    })
                }
            });
        });
        tags = tags.sort(function(tag1, tag2) {
            console.log(tag1);
            console.log(tag2);
            if (tag1.count > tag2.count)
                return -1;
            if (tag1.count < tag2.count)
                return 1;
            return 0;
        });
        tags = tags.slice(0, 5);

        var ctx = document.getElementById("tagsChart").getContext('2d');
        var chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: tags.map(function(tag) { return `#${tag.name}`; }),
                datasets: [
                    {
                        label: '# ocurrencias',
                        data: tags.map(function(tag) { return tag.count; }),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    };

    google.maps.event.addDomListener(window, 'load', regular_map);
})();
