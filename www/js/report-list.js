
var reports_pulled = [];

// Appends report to local storage of reports_list
function save_report(report) {
    reports_list = window.localStorage.getItem("reports");
    temp_report = [];
    temp_report["date-time"] = report["date-time"];
    temp_report["status"] = report["status"];
    temp_report["description"] = report["description"];
    reports_list.push(report);
    window.localStorage.setItem("reports", reports_list);
}

// Pulls reports list from local storage
function get_reports_list() {
    return reports_list = window.localStorage.getItem("reports");
}

// Gets the current user id
function getUserID() {
    return window.localStorage.getItem("userid");
}

// Method that querys the database for the list of Reports
function getReports() {
    var temp = [];
    var userid = window.localStorage.getItem("userid");
    $.ajax({
        url: 'https://api.mlab.com/api/1/databases/tiplineapplication/collections/reports?q={"user_id":' + '"' + userid + '"'+ '}&apiKey=g68v4wvcTSO-6AudfojTLBdRTUBft52J',
        success: function (data) {
            
            for (var i = 0; i < data.length; i++) {
                temp.push(data[i]);   
            };
            
        },
        failure: function (err) {
            console.log(err);
        }
    }).done(function (data) {
        reports_pulled = temp;
        populateReports();
    });
}

// Updates list of reports with reports_pulled list
function update_reports() {
    updated_list = []
    for (i = 0; i < reports_pulled.length; i++) {
        report["date-time"] = reports_pulled[i]["date"];
        report["status"] = reports_pulled[i]["status"];
        report["description"] = reports_pulled[i]["description"];
        updated_list.push(report)
    }
    window.localStorage.setItem("reports", updated_list)
}


// Function that populates the user's list of reports onto the application
function populateReports() {
    // Iterates through the pulled reports from the database
    // and generates the necessary html to display on screen
    for (var key in reports_pulled) {
        var title = reports_pulled[key].title;
        var flightNum = reports_pulled[key].flight_num;
        var date = reports_pulled[key].date_time;
        var description = reports_pulled[key].description;
        var urls = reports_pulled[key].URLs;
        var status = reports_pulled[key].status;
        var latitude = reports_pulled[key].coordinates.latitude;
        var longitude = reports_pulled[key].coordinates.longitude;
        var country = reports_pulled[key].country;
        var city = reports_pulled[key].city;

        var card = document.createElement('div');
        var header = document.createElement('h1');
        var cardContent = document.createElement('div');
        var cardContentInner = document.createElement('div');
        var headerText = document.createTextNode(title);

        var itemDiv = document.createElement('div');
        var cardContentInner = document.createElement('div');

        var br0 = document.createElement('br');
        var br1 = document.createElement('br');
        var br2 = document.createElement('br');
        var br3 = document.createElement('br');
        var br4 = document.createElement('br');
        
        var statusTextDiv = document.createElement('b');
        var statusText = document.createTextNode("Status: ");
        var statusDataDiv = document.createElement('div');
        var statusData = document.createTextNode(status);

        var dateTextDiv = document.createElement('b');
        var dateText = document.createTextNode("Date: ");
        var dateDataDiv = document.createElement('div');
        var dateData = document.createTextNode(date);

        var locationTextDiv = document.createElement('b');
        var locationText = document.createTextNode("Location: ");
        var locationDataDiv = document.createElement("div");
        var locationData = document.createTextNode(city + ", " + country);
        
        var flightTextDiv = document.createElement('b');
        var flightText = document.createTextNode("Flight Number: ");
        var flightDataDiv = document.createElement('div');
        var flightData = document.createTextNode(flightNum);

        var descripTextDiv = document.createElement('b');
        var descripText = document.createTextNode("Description: ");
        var descripDataDiv = document.createElement('div');
        var descripData = document.createTextNode(description);

        var urlTextDiv = document.createElement('b');
        var urlText = document.createTextNode("Media: ");
        var urlDataDiv = document.createElement('div');


        card.className = "card";
        header.className = "card-header";
        cardContent.className = "card-content";
        cardContentInner.className = "card-content-inner";

        for (key in urls) {
            
            var a = document.createElement('a');
            var urlData = document.createTextNode(urls[key]);
            var br = document.createElement('br');
            var br1 = document.createElement('br');
            
            a.href = urls[key];
            a.onclick = function() {
                document.location = this.href;
            };
            a.className = "url";
            a.appendChild(urlData);
            urlDataDiv.appendChild(a);
            urlDataDiv.appendChild(br);
            urlDataDiv.appendChild(br1);
           ;
            
        }
       
        statusTextDiv.appendChild(statusText);
        statusDataDiv.appendChild(statusData); 
        cardContentInner.appendChild(statusTextDiv);
        cardContentInner.appendChild(statusDataDiv);
        cardContentInner.appendChild(br0);

        dateTextDiv.appendChild(dateText);
        dateDataDiv.appendChild(dateData); 
        cardContentInner.appendChild(dateTextDiv);
        cardContentInner.appendChild(dateDataDiv);
        cardContentInner.appendChild(br1);

        locationTextDiv.appendChild(locationText);
        locationDataDiv.appendChild(locationData); 
        cardContentInner.appendChild(locationTextDiv);
        cardContentInner.appendChild(locationDataDiv);
        cardContentInner.appendChild(br2);

        flightTextDiv.appendChild(flightText);
        flightDataDiv.appendChild(flightData); 
        cardContentInner.appendChild(flightTextDiv);
        cardContentInner.appendChild(flightDataDiv);
        cardContentInner.appendChild(br3);

        descripTextDiv.appendChild(descripText);
        descripDataDiv.appendChild(descripData); 
        cardContentInner.appendChild(descripTextDiv);
        cardContentInner.appendChild(descripDataDiv);
        cardContentInner.appendChild(br4);

        urlTextDiv.appendChild(urlText);
        
        cardContentInner.appendChild(urlTextDiv);
        cardContentInner.appendChild(urlDataDiv)
        
        
        header.appendChild(headerText);
        card.appendChild(header);
        cardContent.append(cardContentInner);
        card.appendChild(cardContent);

        document.getElementById("report-list").appendChild(card);


    };
}


// Pull to refresh content
var ptrContent = $$('.pull-to-refresh-content');

// Add 'refresh' listener on it
ptrContent.on('refresh', function (e) {
   // Emulate 2s loading
   setTimeout(function () {
        document.getElementById("report-list").innerHTML = "";
        getReports();
       // When loading done, we need to reset it
       myApp.pullToRefreshDone();
   }, 2000);
});