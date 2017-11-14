
// Method to register user to database
function registerUser() {
    //need to save to database once that is set up
    console.log("Attempting to add User to DB");
    user = {}
    user['firstname'] = document.getElementById('first-name').value;
    user['lastname'] = document.getElementById('last-name').value;
    user['email'] = document.getElementById('email').value;
    console.log(user);
    addUser(user);
    console.log("Attempt Completed");
}

// Add user method that uses Jquery/Ajax to make a POST request to mongodb through MLAB Data api
var addUser = function(user) {
    $.ajax( { url: "https://api.mlab.com/api/1/databases/tiplineapplication/collections/users?apiKey=g68v4wvcTSO-6AudfojTLBdRTUBft52J",
    data: JSON.stringify( { "FirstName" : user['firstname'], "LastName": user['lastname'], "Email": user['email'] } ),
    type: "POST",
    contentType: "application/json", 
    success: function(response) {
        console.log(response);
        alert("User Successfully Registered");
        window.location.replace("index.html");
        //alert(JSON.stringify(response));
    },
    error: function(e) {
        //alert('Error: ' + e.message);
    }} );
}



