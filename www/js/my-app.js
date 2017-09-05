// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add views
var view1 = myApp.addView('#view-1');
var view2 = myApp.addView('#view-2', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});
var view3 = myApp.addView('#view-3');
var view4 = myApp.addView('#view-4');
var phoneView = myApp.addView('#view-5');


// Functions for Call plugin
function callPressed(number) {
    console.log(number);
    window.plugins.CallNumber.callNumber(onSuccess, onError, number, false);
}

function onSuccess(result){
    console.log("Success:"+result);
}
  
function onError(result) {
    console.log("Error:"+result);
}