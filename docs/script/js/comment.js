var commentGroup;
var commentMode = false;
var commentRef = firebase.database().ref('comment/' + commentGroup);
var comments = [];
var test;
var lastCommendClicked = {};
var commentBoxOpen = false;

$('#nav-mobile > li:nth-child(3)').hide();
$('.commentModeIndicator').hide();

function editMode() {
    commentMode = !commentMode;
    if (commentMode) {
        $('.commentModeIndicator').show();
    } else {
        $('.commentModeIndicator').hide();
    }
}

$(document).ready(() => {
    commentGroup = getCookie('commentGroup')
    commentRef = firebase.database().ref('comment/' + commentGroup)
    commentRef.on('value', function(snapshot) {
        $('.scriptComment').remove()
        snapshot.forEach(element => {
            addComment(element.val().height, element.val().text)
        });
        comments = snapshot.val()
    });
})

function saveCommentPreferences() {
    var val = $("#commentsModal > div.modal-content > div > div > input").val()
    if (val != 'Selecteer group') {
        setCookie('commentGroup', val, 30)
        commentGroup = val
        commentRef = firebase.database().ref('comment/' + commentGroup)
        commentRef.on('value', function(snapshot) {
            $('.scriptComment').remove()
            snapshot.forEach(element => {
                addComment(element.val().height, element.val().text)
            });
            comments = snapshot.val()
        });
        $('#nav-mobile > li.tooltipped').show();
        $('#nav-mobile > li:nth-child(3)').show();

    } else {
        $('#nav-mobile > li.tooltipped').hide();
    }
}

$('body > div.c24').children().each(function(i) {
    $(this).click(setComment);
})

function setComment(f) {
    lastCommendClicked.height = f.currentTarget.offsetTop
    test = f
    if (commentMode) {
        $('#addCommentModal > div.modal-content > h5').html(f.currentTarget.innerText)
        M.Modal.getInstance($('#addCommentModal')).open()
        commentBoxOpen = true;
        document.querySelector("#commentInput").focus()
    }
    // 
}

function saveComment() {
    commentBoxOpen = false;
    var height = lastCommendClicked.height;
    var text = $('#commentInput').val();
    $('#commentInput').val('')
    if (text) {
        if (!comments) comments = []

        var comment = {
            height: height,
            text: text
        }

        comments.push(comment)
        commentRef.set(comments)
    }

}

function addComment(height, text) {
    var html = `<div class="comment scriptComment" style="top: ${height}px;">
        <p>
            ${text}
        </p>
        <i onclick="removeComment(${height})" class="material-icons right">close</i>
    </div>`

    $('body > div.c24').before(html)
}

function removeComment(height) {
    comments =
        comments.filter((value, index, arr) => {
            return value.height != height
        })
    commentRef.set(comments)
}

if (commentGroup != null) {
    $('#nav-mobile > li.tooltipped').show();
}

commentRef.on('value', function(snapshot) {
    comments = snapshot.val()
});

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        // ...
        if (commentGroup != 'Selecteer group' && commentGroup) {
            $('#nav-mobile > li:nth-child(3)').show();
        }

        $('#commentModalButton').show()

    } else {
        // User is signed out.
        // ...
        $('#commentModalButton').hide()
    }
});