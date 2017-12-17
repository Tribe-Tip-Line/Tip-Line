
// your Cloudinary keys
var CLOUD_NAME = "hq9cel0of",
    API_KEY = "381266826886153",
    API_SECRET = "qbKm9CxCiTVtCMFCyjTV8n_DQ6s";



// e.g. file:///path/to/file/image.jpg
var fileToUploadPath = "";


// Report object to be sent to authorities/database
var report = {};


// Array objects for each media content
var images = [];
var videos = [];
var audios = [];

var URLs = [];

var date = new Date();




// function that handles the submission of a report (when submit is pressed)
$$('.confirm-title-ok-cancel').on('click', function () {
    myApp.confirm('Are you sure?', 'Submit a Report',
      function () {

        report["coordinates"] = reportLocation;
        report["country"] = countryName;
        report["city"] = countryCity;
        report["user_id"] = window.localStorage.getItem("userid");
        report["title"] = document.getElementById("report-title").value;
        report["date_time"] = date.toUTCString();
        report["flight_num"] = document.getElementById("report-flight").value;
        report["status"] = "In-Progress";
        report["description"] = document.getElementById("report-description").value;
        report["add_email"] = document.getElementById("report-email").value;
        
        
        if (images.length > 0) {
            for (var j = 0; j < images.length; j++) {
                fileToUploadPath = images[j];
                upload("image"); 
            }
            
        }
        
        if (videos.length > 0) {
            for (var j = 0; j < videos.length; j++) {
                fileToUploadPath = videos[j];
                upload("video"); 
             }
        }
        if (audios.length > 0) {
            for (var j = 0; j < audios.length; j++) {
                fileToUploadPath = audios[j];
                upload("auto");
            }
        }
        
        // Timeout is added to ensure files are uploaded before sending a report
        setTimeout(submitReport, 4500);
        
      },
      function () {
        // Cancel has been pressed, do nothing. 
        myApp.alert('You report has been canceled');
      }
    );
});



// two different implementations - getting from library and picture is done with plugin-camera (do phonegap plugin add cordova-plugin-camera)
// getting from audio or video is from plugin-media-capture (do phonegap plugin add cordova-plugin-media-capture)

// MEDIA CAPTURE

// capture callback for Images
var captureSuccessImage = function(mediaFiles) {
    var i, path, len;
    var element = document.getElementById("add-image");
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        path = mediaFiles[i].name;
        images.push(mediaFiles[i].fullPath);
        
        if (element.innerHTML == "Add Image") {
            element.innerHTML = "<img src=" + mediaFiles[i].fullPath + "></img>&nbsp;";
        } else {
            element.innerHTML += "<img src=" + mediaFiles[i].fullPath + "></img>&nbsp;";
        }
    }

};

// capture callback for Videos
var captureSuccessVideo = function(mediaFiles) {
    var i, path, len;
    var text = "";
    var element = document.getElementById("add-video");
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        path = mediaFiles[i].name;
        videos.push(mediaFiles[i].fullPath);
        
        if (element.innerHTML == "Add Video") {
            element.innerHTML = mediaFiles[i].name + "<br>";
        } else {
            element.innerHTML += mediaFiles[i].name + "<br>";
        }
    }

};

// capture callback for Audio
var captureSuccessAudio = function(mediaFiles) {
    var i, path, len;
    var element = document.getElementById("add-audio");
    var text = "";
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        path = mediaFiles[i].name;
        audios.push(mediaFiles[i].fullPath);
        if (element.innerHTML == "Add Audio") {
            element.innerHTML = mediaFiles[i].name + "<br>";
        } else {
            element.innerHTML += mediaFiles[i].name + "<br>";
        }
    }

};

// capture error callback
var captureError = function(error) {
    return null;
};

// CAMERA
function setOptions(srcType, isPicture) {
    var mType;
    if (isPicture) {
        mType = Camera.MediaType.PICTURE;
    } else {
        mType = Camera.MediaType.VIDEO;
    }
    var option = {
        // Some common settings are 20, 50, and 100
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: mType,
        allowEdit: true,
        correctOrientation: true  //Corrects Android orientation quirks
    };
    return option;
}

// camera error callback 
function cameraError(error) {
    console.debug("Couldn't get media: " + error, "app");
}

// function that generates action sheet when add image is pressed
$$('.image-1').on('click', function () {
    var options;
    var buttons = [
        {
            text: 'Take Picture',
            onClick: function () {
                options = setOptions(Camera.PictureSourceType.CAMERA, 1);
                navigator.camera.getPicture(onSuccessImage, cameraError, options);
            }
        },
        {
            text: 'Choose from Library',
            onClick: function () {
                options = setOptions(Camera.PictureSourceType.PHOTOLIBRARY, 1);
                navigator.camera.getPicture(onSuccessImage, cameraError, options);
            }
        },
        {
            text: 'Cancel',
            color: 'red'
        },
    ];
    myApp.actions(buttons);
});

// function callback for when picture is chosen from library
function onSuccessImage(imageURI) {
    console.log("its working");
    var image = document.getElementById('add-image'); // this element does not exist yet
    images.push(imageURI);
    if (image.innerHTML == "Add Image") {
        image.innerHTML = "<img src=" + imageURI + "></img>&nbsp;";
    } else {
        image.innerHTML += "<img src=" + imageURI + "></img>&nbsp;";
    }

}


// function that generates action sheet when add video is pressed
$$('.video-1').on('click', function () {
    var options;
    var buttons = [
        {
            text: 'Take Video',
            onClick: function () {
                navigator.device.capture.captureVideo(captureSuccessVideo, captureError, {limit:2});
            }
        },
        {
            text: 'Cancel',
            color: 'red'
        },
    ];
    myApp.actions(buttons);
});

// function that generates action sheet when add audio is pressed
$$('.audio-1').on('click', function () {
    var buttons = [
        {
            text: 'Take Audio',
            onClick: function () {
                navigator.device.capture.captureAudio(captureSuccessAudio, captureError, {limit:2});
            }
        },
        {
            text: 'Cancel',
            color: 'red'
        },
    ];
    myApp.actions(buttons);
});

// function that uploads media files to cloudinary
function upload(mediaType) {
    var uri = encodeURI('https://api.cloudinary.com/v1_1/'+ CLOUD_NAME +'/' + mediaType + '/upload');
    var options = new FileUploadOptions();
    options.fileKey="file";
    options.fileName=fileToUploadPath.substr(fileToUploadPath.lastIndexOf('/')+1);
    var timestamp = Math.floor(Date.now() / 1000);

    // add in the params required for Cloudinary
    // options.params = {
    // api_key: API_KEY,
    // timestamp: timestamp,
    // signature: new Hashes.SHA1().hex('timestamp='+timestamp+API_SECRET)
    // };
    options.params = {
        upload_preset:'ew8aivab'
    }

    var ft = new FileTransfer();
    
    ft.upload(fileToUploadPath, uri, 
        function(result){
    
            // success!
            response = JSON.parse(result.response);  
            
    
            // console.log(response);
            // console.log('===== response =====');
            // console.log(response);
            URLs.push(response["url"]);
            report["URLs"] = URLs;
            
            
            /*
                response is the JSON returned from Cloudinary on successful upload:
    
                {
                    bytes = 4299687;
                    "created_at" = "2015-03-31T05:24:52Z";
                    etag = 38825bcbea005ba3c5da79591625f098;
                    format = jpg;
                    height = 2448;
                    "public_id" = e9fz4zcrvf5n4clmlh1s;
                    "resource_type" = image;
                    "secure_url" = "https://.../e9fz4zcrvf5n4clmlh1s.jpg";
                    signature = d87e52bd9facd534cf2c6bdc3a6707a97036232c;
                    tags =     (
                    );
                    type = upload;
                    url = "http://.../e9fz4zcrvf5n4clmlh1s.jpg";
                    version = 1427779492;
                    width = 3264;
                }
            */
        }, 
        function(error) {
            // fail!
            myApp.alert("ERROR: Failed to upload file to Cloudinary");
    
        }, 
        options
    );

}

// function that submits the report object to database
var submitReport = function() {
    $.ajax( { url: "https://api.mlab.com/api/1/databases/tiplineapplication/collections/reports?apiKey=g68v4wvcTSO-6AudfojTLBdRTUBft52J",
    data: JSON.stringify( { "user_id": report['user_id'], "title" : report['title'], "coordinates": report['coordinates'], "date_time": report['date_time'], "flight_num": report['flight_num'], "status": report['status'], "description": report['description'], "URLs": report['URLs'], "country": report["country"], "city": report["city"], "additional_email": report['add_email'] } ),
    type: "POST",
    contentType: "application/json", 
    success: function(response) {
        myApp.alert('Your report has successfully been submitted');
        refresh();

    },
    error: function(e) {
        console.log('Error: ' + e.message);
    }} );
}

// Method to reset all the fields on the report submit screen
function refresh() {
    document.getElementById("report-title").value = "";
    document.getElementById("report-flight").value = "";
    document.getElementById("report-description").value = "";

    report = {};

    images = [];
    videos = [];
    audios = [];
    
    URLs = [];

    var addImage = document.getElementById('add-image');
    addImage.innerHTML = "Add Image";

    var addVideo = document.getElementById("add-video");
    addVideo.innerHTML = "Add Video";

    var addAudio = document.getElementById("add-audio");
    addAudio.innerHTML = "Add Audio";

}
