
// Method to register user to database
function registerUser() {
    //need to save to database once that is set up
    console.log("Attempting to add User to DB");
    user = {}
    user['firstname'] = document.getElementById('first-name').value;
    user['lastname'] = document.getElementById('last-name').value;
    user['email'] = document.getElementById('email').value;
    user['phonenumber'] = document.getElementById('phone').value.replace(/[^\d]/g, '');;
    user['company'] = document.getElementById('company').value;
    user['location'] = document.getElementById('location').value;
    console.log(user);
    addUser(user);
    console.log("Attempt Completed");
}

// Add user method that uses Jquery/Ajax to make a POST request to mongodb through MLAB Data api
// Also stores the randomly generated user id to local storage
var addUser = function(user) {
    $.ajax( { url: "https://api.mlab.com/api/1/databases/tiplineapplication/collections/users?apiKey=g68v4wvcTSO-6AudfojTLBdRTUBft52J",
    data: JSON.stringify( { "FirstName" : user['firstname'], "LastName": user['lastname'], "Email": user['email'], "Phone_Number" : user['phonenumber'], "Company": user['company'], "Location": user['location'] } ),
    type: "POST",
    contentType: "application/json", 
    success: function(response) {
        var id = response._id.$oid;
        console.log(response);
        window.localStorage.setItem("id", id);
        //var value = window.localStorage.getItem("id");
        alert("User Successfully Registered");
        window.location.replace("index.html");
        //alert(JSON.stringify(response));
    },
    error: function(e) {
        //alert('Error: ' + e.message);
        console.log(e.message);
    }} );
}



