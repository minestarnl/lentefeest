class Scroll {
    constructor() {
        // this.wrapper = wrapper
        this.scrolled = 0
        this.scrolling = false
        this.topMargin = 0
    }

    async scrollTo() {
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
        elems = await filter_array(elems)
        if (elems.length == 0) return
        firebase.database().ref('scroll').set(elems)
    }

    async scroll(val, scene) {
        if (!loaded) {
            $("#overlay").hide()
            loaded = true
        }
        this.topMargin = scene ? 100 : 200
        elems = val
        assignSelector()
        $(".c24 .selected").removeClass("selected")
        if (this.scrolling) return
        this.scrolling = true
        $('html, body').animate({
                scrollTop: ($(`#${elems[0]}`).offset().top - this.topMargin),
            },
            (location.hash == "#embed" ? 500 : 200),
            'linear',
            () => {
                this.scrolling = false
                this.scrolled = ($(`#${elems[0]}`).offset().top - this.topMargin)
            }
        )
    }

    scrollTop() {
        this.scroll(elems)
    }

}


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