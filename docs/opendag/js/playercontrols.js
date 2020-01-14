var player = document.querySelector("#player")

function changeTimes(length) {
    console.log(length)
    document.querySelector('.length-spent').innerText = '0:00'
    document.querySelector('.length-total').innerText = fancyTimeFormat(length)
}

function playPause() {
    player.paused ? player.play() : player.pause()
}

player.addEventListener('pause', (event) => {
    document.querySelector('.playerControls>i:nth-child(1)').innerHTML = 'play_arrow';
})

player.addEventListener('play', (event) => {
    document.querySelector('.playerControls>i:nth-child(1)').innerHTML = 'pause';
})

function fancyTimeFormat(time) {
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}