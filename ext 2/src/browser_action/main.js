// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAw3s_o7PxKheElgBplWnsKNlT5cSQE6uw",
    authDomain: "lentefeestapp.firebaseapp.com",
    databaseURL: "https://lentefeestapp.firebaseio.com",
    projectId: "lentefeestapp",
    storageBucket: "lentefeestapp.appspot.com",
    messagingSenderId: "73713534571",
    appId: "1:73713534571:web:ab2e625ffc9984b297932e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

document.querySelector('#ytopenbutton').addEventListener('click', () => {
    firebase.database().ref('yt').once('value').then(snapshot => {
        chrome.tabs.create({
            url: snapshot.val()
        })
    })
})