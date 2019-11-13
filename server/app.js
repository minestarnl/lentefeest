var request = require("request");
var firebase = require("firebase");
var parser = require('fast-xml-parser');

firebase.initializeApp({
    apiKey: "AIzaSyAw3s_o7PxKheElgBplWnsKNlT5cSQE6uw",
    authDomain: "lentefeestapp.firebaseapp.com",
    databaseURL: "https://lentefeestapp.firebaseio.com",
    projectId: "lentefeestapp",
    storageBucket: "lentefeestapp.appspot.com",
    messagingSenderId: "73713534571",
    appId: "1:73713534571:web:f058fb09330141ef97932e"
})

var options = {
    method: 'GET',
    url: 'https://lentefeest.ga/stat',
    headers: {
        'cache-control': 'no-cache',
        Connection: 'keep-alive',
        'Content-Length': '23',
        'Accept-Encoding': 'gzip, deflate',
        Host: 'lentefeest.ga',
        Accept: '*/*',
        'Content-Type': 'application/x-www-form-urlencoded',
    },
};

var _options = {
    attributeNamePrefix: "@_",
    attrNodeName: "attr", //default is 'false'
    textNodeName: "#text",
    ignoreAttributes: true,
    ignoreNameSpace: false,
    allowBooleanAttributes: false,
    parseNodeValue: true,
    parseAttributeValue: false,
    trimValues: true,
    cdataTagName: "__cdata", //default is 'false'
    cdataPositionChar: "\\c",
    localeRange: "", //To support non english character in tag/attribute values.
    parseTrueNumberOnly: false,
    arrayMode: false, //"strict"
    attrValueProcessor: (val, attrName) => he.decode(val, {
        isAttributeValue: true
    }), //default is a=>a
    tagValueProcessor: (val, tagName) => he.decode(val), //default is a=>a
    stopNodes: ["parse-me-as-string"]
};

function getstat() {
    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        // console.log(body);

        if (parser.validate(body) === true) { //optional (it'll return an object in case it's not valid)
            var jsonObj = parser.parse(body, options);
            // console.log(jsonObj)
            firebase.database().ref('stats').set(jsonObj)
        }
    });
}

setInterval(() => {
    getstat()
}, 500)