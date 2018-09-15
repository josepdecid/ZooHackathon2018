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
    console.log(map);
    console.log(post);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(post.latitude, post.longitude),
        map: map,
        title: post.title
    });

    marker.addListener('click', function() {
        openModal(post.id);
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
<tr>
    <th>${post.title}</th>
    <td>
        ${tagsHtml}
    </td>
</tr>
    `;
    $("#postTable > tbody:last-child").append(rowHtml);
}

function openModal(postId) {
    alert('Marker clicked: ' + postId)
}

function loadPosts() {
    // TEST
    var posts = [
        {
            id: 1,
            title: 'Tazón de cuerno de rinoceronte',
            latitude: 38.70,
            longitude: -3.70,
            tags: ['RINOCERONTE', 'DECORACION']
        },
        {
            id: 2,
            title: 'Tigre amaz&oacute;nico',
            latitude: 40.2,
            longitude: -1.56,
            tags: ['TIGRE']
        }
    ];
    // END TEST

    posts.forEach(function (post) {
        addPostToTable(post);
        addPostToMap(post);
    })
}

google.maps.event.addDomListener(window, 'load', regular_map);

$(document).ready(function () {
    loadPosts();
})