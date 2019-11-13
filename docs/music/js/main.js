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

$(document).ready(function() {
    $('.collapsible').collapsible();
});