function login() {
    firebase.auth().signInWithEmailAndPassword(document.querySelector("#email").value, document.querySelector("#password").value).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        document.querySelector("#login").style.display = 'none';
        document.querySelector("#main").style.display = 'block'
        console.log(user)
            // ...
    } else {
        // User is signed out.
        // ...
        document.querySelector("#login").style.display = 'block';
        document.querySelector("#main").style.display = 'none'
    }
});

var videoLinkRef = firebase.database().ref('yt')
videoLinkRef.on('value', (snapshot) => {
    document.querySelector("#video-link").value = snapshot.val();
    M.updateTextFields();
})

function save() {
    videoLinkRef.set(document.querySelector("#video-link").value)
}

if (window.location.hash.substring(1) == 'video') {
    console.log(window.location.hash.substring(1))
    $("#nav-mobile > li:nth-child(5)").css('display', 'block')
}