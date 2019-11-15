var superuser = false;
var database = firebase.database();
var elems;

var scrollRef = firebase.database().ref('scroll');
scrollRef.on('value', function (snapshot) {
    scroll(snapshot.val());
});

$(function () {
    $(".c24 p").each(function (poep) {
        $(this).attr("id", poep)
        $(this).click(function () {
            if (!superuser) return

            var elems_after = [$(this).attr("id")]
            for (var i = 1; i < 5; i++) {
                if ($(`#${(elems_after[i-1])}`).next().hasClass("c5")) break
                elems_after.push($(`#${(elems_after[i-1])}`).next().attr("id"))
            }
            elems_after = elems_after.splice(1, 1)

            var elems_before = [$(this).attr("id")]
            for (var i = 1; i < 5; i++) {
                if ($(`#${(elems_before[i-1])}`).prev().hasClass("c5")) break
                elems_before.push($(`#${(elems_before[i-1])}`).prev().attr("id"))
            }

            var elems = elems_after.concat(elems_before)
            if (elems.length == 0) return
            firebase.database().ref().update({
                scroll: elems
            })
            // $(".c24 .selected").removeClass("selected")
            // elems.forEach(elem => {
            //     $(`#${elem}`).addClass("selected")
            // })
            // $('html, body').animate({
            //         scrollTop: ($(this).offset().top - 200),
            //     },
            //     200,
            //     'linear'
            // )
        });
    })
})

function login() {
    var password = prompt("Wat is de geheime code niffo")
    firebase.auth().signInWithEmailAndPassword('superuser@lentefeest.ga', password).catch(error => {
        console.log(error)
        alert("HA REKT IS FOUT")
    })
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) alert("Je bent nu superuser yay"), $("body").attr("loggedin", "true")
});

function scroll(val) {
    // if (superuser) return
    elems = val
    assignSelector()
    $(".c24 .selected").removeClass("selected")
    $('html, body').animate({
            scrollTop: ($(`#${elems[0]}`).offset().top - 200),
        },
        200,
        'linear'
    )
}

function toggleTheme() {
    if ($("body").attr("theme") == "dark") $("body").attr("theme", "light")
    else $("body").attr("theme", "dark")
}

function assignSelector() {
    var height = 0
    elems.forEach(elem => {
        height += $(`#${elem}`).height()
        // $(`#${elem}`).addClass("selected")
    })
    $(".poep").css("top", ($(`#${elems[0]}`).offset().top - height + $(`#${elems[0]}`).height()))
    $(".poep").css("left", ($(`#0`).offset().left - 20))
    $(".poep").css("height", height)
}

$(window).on('resize', assignSelector);