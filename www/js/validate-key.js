// Variable to store all the keys obtained from the database
var keys = [];

// Method to validate the user entered key with the list of valid keys
function validateUser() {
    var key = document.getElementById('reg-key').value;
    var bool = false;
    for (var i = 0; i < keys.length; i++) {
        if (keys[i] == key) {
            window.localStorage.setItem("key", key);
            window.location.replace("registration.html");
            bool = true; 
            break;
        }
    }
    if (!bool) {
        alert("Invalid Registration Key");
    }
}

// Method that querys the database for the list of valid  keys
function checkKey() {
    var temp = [];
    $.ajax({
        url: "https://api.mlab.com/api/1/databases/tiplineapplication/collections/registration_keys?apiKey=g68v4wvcTSO-6AudfojTLBdRTUBft52J",
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                temp.push(data[i].key);
            };         
        },
        failure: function(err) {
            console.log(err);
        }
     }).done(function(data) {
        keys = temp;
        validateUser();
        
    });
}