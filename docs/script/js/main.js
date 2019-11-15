var superuser = false;
var database = firebase.database();

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
    if (prompt("Wat is de geheime code niffo") == "analepoepseks") superuser = true, alert("Je bent nu superuser yay")
    else alert("HA REKT IS FOUT")
}

function scroll(val) {
    // if (superuser) return
    var elems = val
    $(".c24 .selected").removeClass("selected")
    elems.forEach(elem => {
        $(`#${elem}`).addClass("selected")
    })
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