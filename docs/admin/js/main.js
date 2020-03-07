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
        console.log(user);
        // ...
    } else {
        // User is signed out.
        // ...
        window.location.href = '../account/?redirect=admin'
    }
});

var videoLinkRef = firebase.database().ref("yt");
videoLinkRef.on("value", snapshot => {
    document.querySelector("#video-link").value = snapshot.val();
    M.updateTextFields();
});

function save() {
    videoLinkRef.set(document.querySelector("#video-link").value);
}

if (window.location.hash.substring(1) == "video") {
    $("#nav-mobile > li:nth-child(5)").css("display", "block");
}