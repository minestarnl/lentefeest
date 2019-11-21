const Scroller = new Scroll()
var superuser = false,
    database = firebase.database(),
    loaded = false,
    elems = [],
    scrollRef = database.ref('scroll'),
    excludeRef = database.ref('exclude');


scrollRef.on('value', snapshot => {
    if (snapshot.val()) Scroller.scroll(snapshot.val())
    else Scroller.scroll([0]), M.toast({
        html: "Geen huidige regel gevonden..."
    })
});

database.ref('confetti').on('value', snapshot => {
    snapshot.val() ? confetti.start() : confetti.stop()
});

excludeRef.on('value', function (snapshot) {
    $(".exclude").removeClass("exclude")
    snapshot.val().forEach(exclude => {
        $(`#${exclude}`).addClass("exclude")
    })
});

$(async () => {
    if (localStorage.getItem("theme") == "dark") $("body").attr("theme", "dark")
    if (location.hash == "#embed") $(".navbar-fixed").hide(), $("body").attr("embed", "true")
    if (location.hash == "#mobile" || $(window).width() < 900) $("body").attr("mobile", "true")
    $(".c26").each(function (index) {
        $(this).attr("id", `scene-${index}`)
        if ($(this).text() != "") {
            var text = $(this).text()
            $(this).text(text.substring(0, text.indexOf(text.match(/\d+/))) + text.match(/\d+/)[0])
            $("#scrollspy > ul").append(`<li index="${index}"><a>${$(this).text()}</a></li>`)
        }
    })
    $("#scrollspy > ul > li").each(function () {
        $(this).attr("value", $(this).text())
        $(this).click(() => {
            Scroller.scroll([$(`#scene-${$(this).attr("index")}`).parent().attr("id")], true)
        })
    })
    $(".c24 p").each(function (index) {
        $(this).attr("id", index)
        if (!$(this).is(".title")) $(this).click(Scroller.scrollTo);
    })
    $(".fixed-action-btn").click(() => Scroller.scrollTop())
})

const login = () => {
    firebase.auth().signInWithEmailAndPassword('superuser@lentefeest.ga', prompt("Wat is de geheime code niffo")).catch(() => alert("HA REKT IS FOUT"))
}

function toggleConfetti() {
    database.ref('confetti').set(confetti.isRunning() ? false : true)
}

firebase.auth().onAuthStateChanged((user) => {
    if (user && user.email == 'superuser@lentefeest.ga') $("body").attr("loggedin", "true"), superuser = true
});



const toggleTheme = () => {
    if ($("body").attr("theme") == "dark") $("body").attr("theme", "light"), localStorage.setItem("theme", "light")
    else $("body").attr("theme", "dark"), localStorage.setItem("theme", "dark")
}

function assignSelector() {
    if (location.hash == "#mobile" || $(window).width() < 900) $("body").attr("mobile", "true")
    else $("body").attr("mobile", "false")
    var height = 0
    elems.forEach(elem => height += $(`#${elem}`).height())
    $(".indicator").css("top", ($(`#${elems[0]}`).offset().top - height + $(`#${elems[0]}`).height()))
        .css("left", ($(`#0`).offset().left - 20))
        .css("height", height)
}

$(window).on('resize', assignSelector).keydown(function (e) {
    if ([37, 38].includes(e.which)) {
        e.preventDefault();
        for (var id = parseInt(elems[elems.length - 1]) - 1; id < parseInt(elems[elems.length - 1]) + 100; id--) {
            if ($(`#${id}`).text() != "") {
                $(`#${id}`).click()
                break
            }
        }
    } else if ([32, 39, 40].includes(e.which)) {
        e.preventDefault();
        for (var id = parseInt(elems[0]) + 1; id < parseInt(elems[0]) + 100; id++) {
            if ($(`#${id}`).text() != "") {
                $(`#${id}`).click()
                break
            }
        }
    }
}).scroll(() => {
    if (elems.length == 0) return
    // var y = (($(`#${elems[0]}`).offset().top - Scroller.topMargin) - $(window).scrollTop())
    // if ((y < -30 || y > 30)) $(".fixed-action-btn").show()
    // else $(".fixed-action-btn").hide()
    var elScrolledBy = [],
        currentSceneText = 'scene 1'

    $(".c26").each(function () {
        if ($(this).text() != "") {
            if (window.scrollY + ($(window).height() / 2) > ($(this).offset().top + $(this).height()))
                elScrolledBy.push($(this))
        }
    })

    if (elScrolledBy[elScrolledBy.length - 1]) currentSceneText = $(elScrolledBy[elScrolledBy.length - 1]).first().text()
    $("a.active").removeClass("active")
    $(`li[value="${currentSceneText}"`).find("a").addClass("active")
    $("#currentScene span").text(currentSceneText)
});