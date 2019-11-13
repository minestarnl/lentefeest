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
document.querySelector("#player").addEventListener('ended', function() {
    var audio = $("#player");
    audio[0].pause();
});

function change(sourceUrl) {
    var audio = $("#player");
    audio[0].pause();
    $("#mp3_src").attr("src", sourceUrl);
    /****************/
    audio[0].load(); //suspends and restores all audio element

    //audio[0].play(); changed based on Sprachprofi's comment below
    audio[0].oncanplaythrough = audio[0].play();
    /****************/
}

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems, {
        // accordion: true
    });
});

if (window.location.hash == '#dev') {
    var old = console.log;
    var logger = document.getElementById('log');
    console.log = function(message) {
        if (typeof message == 'object') {
            logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />';
        } else {
            logger.innerHTML += message + '<br />';
        }
    }
}