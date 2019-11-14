var songs = [{
    year: 2017,
    songs: [
        "Dans/Dans/Dans '17/LF17 01 Fun-eral .mp3"
    ]
}, {
    year: 2018,
    songs: [
        "Dans/Dans/Dans '18/LF18 Dark Woods (Part I).mp3"
    ]
}, ]
var player = document.querySelector("#player")
player.addEventListener('ended', function () {
    player.pause();
});

player.preload = 'auto'

function change(sourceUrl) {
    player.pause();
    $("#mp3_src").attr("src", sourceUrl);
    /****************/
    player.load(); //suspends and restores all audio element

    //player.play(); changed based on Sprachprofi's comment below
    player.oncanplaythrough = player.play();
    /****************/
}

var playListLink = document.querySelectorAll('.song')

playListLink.forEach(link => {
    //Playlist link clicked.
    link.addEventListener("click", function (e) {
        e.preventDefault();
        var selectedTrack = parseInt(player.children[].getAttribute("data-track-row"));
        
    }, false);
})


$(document).ready(function () {
    $('.collapsible').collapsible();
});

if (window.location.hash == '#dev') {
    var old = console.log;
    var logger = document.getElementById('log');
    console.log = function (message) {
        if (typeof message == 'object') {
            logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />';
        } else {
            logger.innerHTML += message + '<br />';
        }
    }
}