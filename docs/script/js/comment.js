var commentGroup;
var commentMode = false;
var commentRef = firebase.database().ref('comment/' + commentGroup);
var comments = [];
var test

function editMode(){
    commentMode = !commentMode;
}

$(document).ready(()=>{
    commentGroup = getCookie('commentGroup')
})

function saveCommentPreferences(){
    var val = $("#commentsModal > div.modal-content > div > div > input").val()
    if(val != 'Selecteer group'){
        setCookie('commentGroup',val,30)
        commentGroup = val
        commentRef = firebase.database().ref('comment/' + commentGroup)
    }
}

$('body > div.c24').children().each(function(i) {
    $(this).click(setComment);
})



function setComment(f) {
    console.log(f.currentTarget.offsetTop)
    console.log(f.currentTarget.id)
    test = f
    console.log(f.currentTarget.cloneNode())
    if(commentMode){
        $('#addCommentModal > div.modal-content > h5').html(f.currentTarget.innerText)
        M.Modal.getInstance($('#addCommentModal')).open()
    }
    // 
}

function saveComment(){
    var height = $('#addCommentModal > div.modal-content > h5');
    var text;
    if(comments == null){
        comments = []
    }

    var comment = {
        height: height,
        text: text
    }

    comments.push(comment)
}

function addComment(height, text){
    var html = `<div class="comment" style="top: ${height}px;">
        <p>
            ${text}
        </p>
    </div>`

    $('body > div.c24').before(html)
}

commentRef.on('value', function(snapshot) {
    console.log(snapshot.val())
    comments = snapshot.val()
  });
