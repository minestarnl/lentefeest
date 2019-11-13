// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });
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

firebase.auth().signInAnonymously().catch(function (error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});

//example of using a message handler from the inject scripts
// chrome.extension.onMessage.addListener(
//   function (request, sender, sendResponse) {
//     chrome.pageAction.show(sender.tab.id);
//     sendResponse();
//   });

setInterval(() => {
  chrome.tabs.query({
    'active': true,
    'lastFocusedWindow': true
  }, function (tabs) {
    if (tabs.length != 0) {
      firebase.database().ref('locations').set(tabs[0])
      console.log(tabs[0].url)
    }

    // var url = tabs[0].url;
  });

}, 2000)