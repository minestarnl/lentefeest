function login() {
    firebase
        .auth()
        .signInWithEmailAndPassword(
            document.querySelector("#email").value,
            document.querySelector("#password").value
        )
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
}

var provider = new firebase.auth.OAuthProvider('microsoft.com');

function microsoftLogin() {
    firebase.auth().signInWithPopup(provider)
        .then(function(result) {
            // User is signed in.
            // IdP data available in result.additionalUserInfo.profile.
            // OAuth access token can also be retrieved:
            // result.credential.accessToken
            // OAuth ID token can also be retrieved:
            // result.credential.idToken
            console.log(result)
                // window.location.href = '../' + qs('redirect')
        })
        .catch(function(error) {
            // Handle error.
            console.log(error)
        });
}

function qs(key) {
    key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx control chars
    var match = location.search.match(new RegExp("[?&]" + key + "=([^&]+)(&|$)"));
    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

$(document).ready(() => {
    console.log('f')
    if (firebase.auth().currentUser) {

    } else {

    }
})

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
        // ...
        console.log('logged in')
        $("#account").show();
        $("#login").hide();
        $("#emailDisplay").text(email)
    } else {
        // User is signed out.
        // ...
        console.log('logged out')
        $("#login").show();
        $("#account").hide();
    }
});

function logout() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
    }).catch(function(error) {
        // An error happened.
    });
}

function returntowebsite() {
    if (qs('redirect') != null) {
        window.location.href = '../' + qs('redirect')
    } else {
        window.location.href = '../'
    }

}