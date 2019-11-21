/**
 * @class
 * @classdesc This class handles all the scolling to - and algoritms to scroll to - any highlighted piece of script, saved in the database
 */
class Scroll {
    /**
     * @private
     * @description Contains some handy variabled :)
     */
    constructor() {
        this.scrolled = 0
        this.scrolling = false
        this.topMargin = 0
        this.elems = []
    }

    /**
     * @description This function is executed when a user clicks (using arrowkeys/space also counts as click) on a script sentence. It calculates which other sentences belong to the selected one and then pushes an array of line indexxes to the realtime firebase database
     */
    async scrollTo() {
        if (location.hash == "#embed" || $(this).text() == "") return
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
        this.elems = await filter_array(elems_after.concat(elems_before))
        if (this.elems.length == 0) return
        firebase.database().ref('scroll').set(this.elems)
        return
    }

    /**
     * @description This function is executed when the database is updated, and will scroll to 300px above the first index (selected line). It will also call to assingSelector to move the purple bar to the selected portion.
     */
    scroll = async (val, scene) => {
        if ($("#overlay").is(":visible")) $("#overlay").hide()
        this.topMargin = scene ? 100 : 200
        this.elems = val
        this.assignSelector()
        $(".c24 .selected").removeClass("selected")
        if (this.scrolling) return
        this.scrolling = true
        $('html, body').animate({
                scrollTop: ($(`#${this.elems[0]}`).offset().top - this.topMargin),
            },
            (location.hash == "#embed" ? 500 : 200),
            'linear',
            () => {
                this.scrolling = false
                this.scrolled = ($(`#${this.elems[0]}`).offset().top - this.topMargin)
            }
        )
    }

    /**
     * @description This function is executed when the FAB (floating action button) is pressed, and will (client side) scroll the user back to the current position.
     */
    scrollTop = async () => {
        this.scroll(this.elems)
    }

    /**
     * @description This function is executed by the scroll function and moves the purple bar to the current selected lines.
     */
    assignSelector = async () => {
        if (location.hash == "#mobile" || $(window).width() < 900) $("body").attr("mobile", "true")
        else $("body").attr("mobile", "false")
        var height = 0
        this.elems.forEach(elem => height += $(`#${elem}`).height())
        $(".indicator").css("top", ($(`#${this.elems[0]}`).offset().top - height + $(`#${this.elems[0]}`).height()))
            .css("left", ($(`#0`).offset().left - 20))
            .css("height", height)
    }

    /**
     * @description This function is executed when any key is pressed on the page. It then filters for the arrow keys which will irritate thru the lines.
     */
    onKeydown = async (e) => {
        if ([37, 38].includes(e.which)) {
            e.preventDefault();
            for (var id = parseInt(this.elems[this.elems.length - 1]) - 1; id < parseInt(this.elems[this.elems.length - 1]) + 100; id--) {
                if ($(`#${id}`).text() != "") {
                    $(`#${id}`).click()
                    break
                }
            }
        } else if ([32, 39, 40].includes(e.which)) {
            e.preventDefault();
            for (var id = parseInt(this.elems[0]) + 1; id < parseInt(this.elems[0]) + 100; id++) {
                if ($(`#${id}`).text() != "") {
                    $(`#${id}`).click()
                    break
                }
            }
        }
    }

    /**
     * @description This function is executed when the scroll event is fired on the document. It will check which scene is currently visable in the window and set the scrollspy & little thinghy in the up-left corner to the current scene
     */
    onScroll = async () => {
        if (this.elems.length == 0) return
        // var y = (($(`#${elems[0]}`).offset().top - this.topMargin) - $(window).scrollTop())
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
    }
}

/**
 * @private
 * @description This function is currently only executed by the scrollTo function, and will remove any empty, null, undefined or false items from the given array (note: its async so an await on the call is required!)
 */
const filter_array = async (test_array) => {
    var index = -1,
        arr_length = test_array ? test_array.length : 0,
        resIndex = -1,
        result = [];
    while (++index < arr_length) {
        var value = test_array[index]
        if (value) result[++resIndex] = value
    }
    return result;
}