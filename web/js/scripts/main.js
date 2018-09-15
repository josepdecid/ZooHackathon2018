
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

function openModal(post) {
    $('#postModal_title').html(post.title);
    $('#postModal_body').html(post.address); //TODO

    $('#postModal').modal();
}

function loadPosts() {
    $.get( "http://localhost:5000/posts", function( data ) {
        posts = data
        posts.forEach(function (post) {
            addPostToTable(post);
            addPostToMap(post);
        })
    });
}

google.maps.event.addDomListener(window, 'load', regular_map);

$(document).ready(function () {
    loadPosts();
})