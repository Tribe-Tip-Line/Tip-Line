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

// Global Variables
var countryCode;
var countryName;
var countryCity;

var phoneNumber = "8663472423"; // Default phone number (United States)

var dbNumbers = [];

var reportLocation = {
    "latitude": "undefined",
    "longitude": "undefined"
};



// Check if device is ready and calls device ready function
document.addEventListener("deviceready", onDeviceReady, false);

// If device is ready, function will be called. Browser is not considered a device; thus, this will not be called.
function onDeviceReady() {

    navigator.geolocation.getCurrentPosition(onSuccessfulGeolocation, onErrorGeolocation, {maximumAge: 300000, timeout: 100000, enableHighAccuracy : true });
}

// Functions for Call plugin
function callPressed(number) {
    console.log(number);
    var num = number.replace(/- /g, "");
    window.plugins.CallNumber.callNumber(onSuccess, onError, num, false);
}

// If Call plugin is successful, this function will be called.
function onSuccess(result){
    console.log("Success:"+result);
}

// If Call plugin is unsuccessful, this function will be called.
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
        countryCity = result.locality;

        reportLocation["latitude"] = position.coords.latitude;
        reportLocation["longitude"] = position.coords.longitude;

        var element = document.getElementById('current-location-home');
        element.innerHTML = 'Current Location: ' + countryName + '<br />';

    }
    function failure(err) {
      alert(JSON.stringify(err));
    }

}

// onError Callback receives a PositionError object
function onErrorGeolocation(error) {
    console.log('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
}


// Method that is called when the screen is initialized.
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
        url: "https://api.mlab.com/api/1/databases/tiplineapplication/collections/hotline_numbers?s={'country': 1}&apiKey=g68v4wvcTSO-6AudfojTLBdRTUBft52J",
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                dbNumbers.push(data[i]);
            };
        },
        failure: function(err) {
            console.log(err);
        }
     }).done(function(data) {
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

        if (country.toUpperCase()  ===  countryName.toUpperCase()) {
            phoneNumber = number;
        }

        var li = document.createElement('li');
        var a = document.createElement('a');
        var image = document.createElement('img');
        var text = document.createTextNode(country + ": " + number);

        if (country === 'DHS' || country === 'United States DHS' || country === 'Polaris' || country === 'National Hotline' || country === 'IOM' || country === 'IACAT' ) {
            // these are not countries thus they do not have flags
            // so not setting img.src so that empty image block wont be added
        } else {
            image.src = "lib/assets/flags/" + country + "/32.png";
        }


        image.className = "flag-image";

        text.className="number-text";

        a.className = "item-link list-button";
        a.setAttribute("id", number);
        a.onclick = function() {
            callPressed(this.id);
        };

        if (image.src) {
            a.appendChild(image);
        }





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










