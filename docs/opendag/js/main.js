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
    console.log(sourceUrl)
    if (sourceUrl == 'Dans/Dans/extra/I Wanna Dance With Somebody from the World Premiere Cast recording of The Bodyguard.mp3') {
        player.currentTime = 195
    }
    /****************/
    console.log(player.duration)
    changeTimes(player.duration)
}

$(document).ready(function () {
    $('.collapsible').collapsible();
    $('.modal').modal();
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