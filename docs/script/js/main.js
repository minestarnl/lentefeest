var superuser = false;
var database = firebase.database();
var loaded = false;
var elems;

var scrollRef = firebase.database().ref('scroll');
scrollRef.on('value', function(snapshot) {
    scroll(snapshot.val());
});

$(function() {
    if (location.hash == "#embed") $(".navbar-fixed").hide(), $("body").attr("embed", "true")
    $(".c24 p").each(function(poep) {
        $(this).attr("id", poep)
        $(this).click(scrollTo);
    })
})

function login() {
    firebase.auth().signInWithEmailAndPassword('superuser@lentefeest.ga', prompt("Wat is de geheime code niffo")).catch(error => alert("HA REKT IS FOUT"))
}

firebase.auth().onAuthStateChanged((user) => {
    if (user && user.email == 'superuser@lentefeest.ga') $("body").attr("loggedin", "true"), superuser = true
});

function scrollTo() {
    if (!superuser || location.hash == "#embed" || $(this).text() == "") return
    var elems_after = [$(this).attr("id")]
    for (var i = 1; i < 100; i++) {
        if ($(`#${(elems_after[i-1])}`).next().hasClass("c5") || $(`#${(elems_after[i-1])}`).next().hasClass("c3")) break
        elems_after.push($(`#${(elems_after[i-1])}`).next().attr("id"))
    }
    elems_after = elems_after.splice(1, 1)
    var elems_before = [$(this).attr("id")]
    for (var i = 1; i < 100; i++) {
        if ($(`#${(elems_before[i-1])}`).prev().hasClass("c5") || $(`#${(elems_before[i-1])}`).prev().hasClass("c3")) break
        elems_before.push($(`#${(elems_before[i-1])}`).prev().attr("id"))
    }
    var elems = elems_after.concat(elems_before)
    if (elems.length == 0) return
    firebase.database().ref('scroll').set(elems)
}

function scroll(val) {
    elems = val
    assignSelector()
    $(".c24 .selected").removeClass("selected")
    $('html, body').animate({
            scrollTop: ($(`#${elems[0]}`).offset().top - (location.hash == "#embed" ? 50 : 200)),
        },
        (location.hash == "#embed" ? 500 : 200),
        'linear'
    )
}

function toggleTheme() {
    if ($("body").attr("theme") == "dark") $("body").attr("theme", "light")
    else $("body").attr("theme", "dark")
}

function assignSelector() {
    var height = 0
    elems.forEach(elem => height += $(`#${elem}`).height())
    $(".poep").css("top", ($(`#${elems[0]}`).offset().top - height + $(`#${elems[0]}`).height()))
    $(".poep").css("left", ($(`#0`).offset().left - 20))
    $(".poep").css("height", height)
        // $(".poep").css("height", height + $(`#${elems[0]}`).offset().top - height + $(`#${elems[0]}`).height())
}

$(window).on('resize', assignSelector);

$(document).keydown(function(e) {
    if ([37, 38].includes(e.which)) {
        for (var id = parseInt(elems[elems.length - 1]) - 1; id < parseInt(elems[elems.length - 1]) + 100; id--) {
            if ($(`#${id}`).text() != "") {
                $(`#${id}`).click()
                break
            }
        }
    } else if ([32, 39, 40].includes(e.which)) {
        for (var id = parseInt(elems[0]) + 1; id < parseInt(elems[0]) + 100; id++) {
            if ($(`#${id}`).text() != "") {
                $(`#${id}`).click()
                break
            }
        }
    }
    e.preventDefault();
});