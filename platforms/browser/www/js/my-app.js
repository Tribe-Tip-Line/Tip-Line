// Initialize your app
var myApp = new Framework7({
    modalTitle: "TIP Line"
});

// Export selectors engine
var $$ = Dom7;

// Add views
var view1 = myApp.addView('#view-1');
var view2 = myApp.addView('#view-2');
var view3 = myApp.addView('#view-3');
var view4 = myApp.addView('#view-4');



// List of tip line numbers based on location
// var listNumbers = {
//     "National Hotline" : "18883737888",
//     "US" : "8663472423", // United States
//     "AT" : "2483685383",  // Austria
//     "DE" : "490802006110", // Germany
//     "FR" : "33825009907", // France
//     "TR" : "90157", // Turkey
//     "BE" : "3225116464", // Belgium
//     "BG" : "359080018676", // Bulgaria
//     "CZ" : "420222717171", // Czech Republic
//     "EE" : "3726607320", // Estonia
//     "FI" : "358718763170", // Finland
//     "GR" : "302310525149", // Greece
//     "HU" : "36205520", // Hungary
//     "IE" : "353800250025", // Ireland
//     "IT" : "39800290290", // Italy
//     "LV" : "37180002012", // Lativa
//     "LT" : "423880066366", // Lithuania
//     "LU" : "35249976210", // Luxembourg
//     "MT" : "35622942000", // Malta
//     "NL" : "33134481186", // Netherlands
//     "PL" : "226280120", // Poland
//     "PT" : "800202148", // Portugal
//     "RO" : "0800800678", // Romania
//     "SK" : "903704784", // Slovakia
//     "SI" : "0801722", // Slovenia
//     "ES" : "900191010", // Spain
//     "SE" : "020505050", // Sweden
//     "Swiss" : "0800208020", // Swiss
//     "IOM" : "318000522020", // IOM
//     "JM" : "8768887768328", // Jamaica
//     "CO" : "578000522020", // Colombia
//     "DHS" : "18883737888", // DHS
//     "IACAT" : "631343", // IACAT
//     "TH" : "661300", // Thailand
//     "MY" : "2230380008000", // Malaysia
//     "ID" : "622157951275", // Indonesia
//     "Polaris" : "8883737888", // Polaris
//     "AL" : "355116006" // Albania
//     };


var countryCode;
var countryName;

var phoneNumber = "8663472423"; // Default phone number (United States)

var dbNumbers = [];

var reportLocation = {
    "latitude": "undefined",
    "longitude": "undefined"
};



// Check if device is ready and calls device ready function
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    
    navigator.geolocation.getCurrentPosition(onSuccessfulGeolocation, onErrorGeolocation, {maximumAge: 300000, timeout: 30000, enableHighAccuracy : true });
}

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
    // Function that reverse geocodes and returns the country code
    nativegeocoder.reverseGeocode(success, failure, position.coords.latitude, position.coords.longitude);

    // If reverse geocoding is successful, it iterates throught the list of numbers to check if there is a number corresponding
    // to that country and if there is, it will add it to the data object. Then it generates html to display the list of numbers
    function success(result) {

        
        countryCode = result.countryCode;
        countryName = result.countryName;

        reportLocation["latitude"] = position.coords.latitude;
        reportLocation["longitude"] = position.coords.longitude;

        var element = document.getElementById('current-location-home');
        element.innerHTML = 'Current Location: ' + countryName + '<br />';
        // element.innerHTML = 'Country: ' + country + '<br />';

    }
    function failure(err) {
      alert(JSON.stringify(err));
    }

}

// onError Callback receives a PositionError object
function onErrorGeolocation(error) {
    // alert('code: '    + error.code    + '\n' +
    //       'message: ' + error.message + '\n');
}


function startScreen() {
    // If local storage contains a key, then they have already entered a valid key and can use the app
    // otherwise, take them to the key registration page
    if (window.localStorage.getItem("key") == null) {
        window.location.replace("login.html");
    }
    getNumbers();
    getReports();
    
}


// Method that querys the database for the list of valid keys
function getNumbers() {
    var temp = [];
    $.ajax({
        url: "https://api.mlab.com/api/1/databases/tiplineapplication/collections/hotline_numbers?apiKey=g68v4wvcTSO-6AudfojTLBdRTUBft52J",
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                dbNumbers.push(data[i]);
            };
        },
        failure: function(err) {
            console.log(err);
        }
     }).done(function(data) {
        //console.log(dbNumbers);
        //dbNumbers = temp;
        populateNumList();    
    });
}


// Method that pulls the list of numbers from the database and 
// generates the html to show a list of numbers on the call tab
function populateNumList() {
    var element = document.getElementById('current-location-numbers');
    element.innerHTML = 'Current Location: ' + countryName + '<br />';
    
    for (var key in dbNumbers) {
        var country = dbNumbers[key].country;
        var number = dbNumbers[key].number;
        var code = dbNumbers[key].country_code;

        if (code === countryCode) {
            phoneNumber = number;
        }

        var li = document.createElement('li');
        var a = document.createElement('a');
        var text = document.createTextNode(country + ": " + number);

        text.className="number-text";

        a.className = "item-link list-button";
        a.setAttribute("id", number);
        a.onclick = function() {
            callPressed(this.id);
        };
        a.appendChild(text);
        li.appendChild(a);
        document.getElementById("number-list").appendChild(li);
    }

}

// On-click function that handles when call hotline button is pressed
$$('.call-hotline-home-button').on('click', function () {
    console.log("call home pressed");
    callPressed(phoneNumber);
});


// On-click function that handles when submit a report button is pressed
// Takes user to the submit a report tab view
$$('.submit-report-home-button').on('click', function () {
    console.log("submit report pressed");
    myApp.showTab('#view-3');
});

// On-click function that handles when view numbers button is pressed
// Takes user to the call tab view
$$('.view-numbers-home-button').on('click', function () {
    myApp.showTab('#view-2');
    
});

// On-click function that handles when view reports button is pressed
// Takes user to the report list tab view
$$('.view-reports-home-button').on('click', function () {
    //getReports();
    myApp.showTab('#view-4');
});










