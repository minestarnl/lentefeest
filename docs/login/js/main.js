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
        })
        .catch(function(error) {
            // Handle error.
            console.log(error)
        });
}