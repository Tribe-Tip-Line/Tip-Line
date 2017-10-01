// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add views
var view1 = myApp.addView('#view-1');
// var view2 = myApp.addView('#view-2', {
//     // Because we use fixed-through navbar we can enable dynamic navbar
//     dynamicNavbar: true
// });
// var view3 = myApp.addView('#view-3');
// var view4 = myApp.addView('#view-4');
var phoneView = myApp.addView('#view-5');

// Functions for Call plugin
function callPressed(number) {
    console.log(number);
    var num = number.replace(/- /g, "");
    window.plugins.CallNumber.callNumber(onSuccess, onError, num, false);
}

function onSuccess(result){
    console.log("Success:"+result);
}

function onError(result) {
    console.log("Error:"+result);
}

//Functions for Geolocation plugin
function onSuccessfulGeolocation(position) {
    var element = document.getElementById('geolocation-test');
    var latlng = {lat: parseFloat(position.coords.latitude), lng: parseFloat(position.coords.longitude)};
    element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br />' +
                           'Longitude: ' + position.coords.longitude     + '<br />'
}

// onError Callback receives a PositionError object
function onErrorGeolocation(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

function geolocatePressed() {
    var watchID = navigator.geolocation.watchPosition(onSuccessfulGeolocation, onErrorGeolocation, {maximumAge: 300000, timeout: 30000, enableHighAccuracy : true });
}

function validateUser() {
    var key = document.getElementById('reg-key').value;
    if (key === 'XYZ') {
        window.localStorage.setItem("key", key);
        window.location.replace("registration.html");
    } else {
        //some warning for invalid input popup
    }
}

function registerUser() {
    //need to save to database once that is set up
    window.location.replace("index.html");
}

function startScreen() {
    //will need to change the if to check against keys in database
    if (!(window.localStorage.getItem("key") === 'WXYZ')) {
        window.location.replace("login.html");
    }
}




