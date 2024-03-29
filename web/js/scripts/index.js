(function() {
    var posts = [];
    var map = null;
    var markers = [];

    function onDiscard(post_id) {
        console.log('Ay', post_id);

        var deleteDataAccess = new HuntedHaunters.DataAccess.Posts();
        deleteDataAccess.discardPost(post_id);
    }

    function regular_map() {
        var location = new google.maps.LatLng(40.42, -3.70);

        var mapOptions = {
            center: location,
            zoom: 2
        };

        map = new google.maps.Map(document.getElementById("map-container"),
            mapOptions);

        var postsDataAccess = new HuntedHaunters.DataAccess.Posts();
        postsDataAccess.loadPosts(function(data) {
            posts = data;
            filterPosts(null);

            loadTagsChart();

            var tags = [];
            posts.forEach(function(post) {
                post.tags.forEach(function(tag) {
                    var existingTag = tags.filter(function(existingTag) {
                        return existingTag === tag
                    })[0];

                    if (!existingTag) {
                        tags.push(tag);
                    }
                });
            });

            $('#tags').tokenfield({
                autocomplete: {
                    source: tags,
                    delay: 100,
                    minLength: 1
                },
                showAutocompleteOnFocus: true
            });
        });

        $('#searchForm').on('submit', function (e) {
            var tagsValue = $('#tags')[0].value;
            var tagsFiltered = [];
            if (tagsValue) {
                tagsFiltered = tagsValue.split(', ');
            }
            filterPosts(tagsFiltered);
            return false;
        });
    };

    function filterPosts(tagsFiltered) {
        resetDashboard();
        
        var postsFiltered = [];
        if (tagsFiltered && tagsFiltered.length > 0) {
            postsFiltered = posts.filter(function(post) {
                var exists = true;
                tagsFiltered.forEach(function(tag) {
                    var found = post.tags.indexOf(tag) !== -1;
                    if (!found) exists = false;
                });
                return exists;
            });
        } else {
            postsFiltered = posts;
        }
        postsFiltered.sort(function(a, b) {
            return parseFloat(a.price.replace('.','').replace(',','.')) > parseFloat(b.price.replace('.','').replace(',','.')) ? -1 : 1;
        })
        postsFiltered.forEach(function (post) {
            addPostToTable(post);
            addPostToMap(post);
        });
    };

    function resetDashboard() {
        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers = [];

        $('#postTable > tbody').html('');
    };

    function addPostToMap(post) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(post.location[0], post.location[1]),
            map: map,
            title: post.title
        });

        marker.addListener('click', function() {
            openModal(post);
        })

        markers.push(marker);
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
        $("#postTable > tbody:last-child").append(rowHtml);
    }

    window.openModal = function(post) {

        $('#postModal_title').html(post.title);
        //$('#postModal_date').html(`${new Date(post.date).getFullYear()}/${new Date(post.date).getMonth()}/${new Date(post.date).getDate()}`);
        $('#postModal_date').html(`${post.date}`);
        $('#postModal_author').html(`<a href='sellers.html?userId=${post.user.id}'>${post.user.name}</a>`);
        $('#postModal_price').html(post.price);
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
        $('#discard-button').unbind('click')
        $('#discard-button').click(() => onDiscard(post.id));
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
            if (tag1.count > tag2.count)
                return -1;
            if (tag1.count < tag2.count)
                return 1;
            return 0;
        });
        tags = tags.slice(0, 7);

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
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(83, 120, 132, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(83, 120, 132, 1)'
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
