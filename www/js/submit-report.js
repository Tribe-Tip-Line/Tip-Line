
// Report object to be sent to authorities/database
var report = {
    "User": "test user"
};


// Array objects for each media content
var images = [];
var videos = [];
var audios = [];

var date = new Date();


// function that handles the submission of a report (when submit is pressed)
$$('.confirm-title-ok-cancel').on('click', function () {
    myApp.confirm('Are you sure?', 'Submit a Report',
      function () {
        //Constructs the report object with location, date, description, and its respective media
        navigator.geolocation.getCurrentPosition(onSuccessfulGeolocationReport, onErrorGeolocation, {maximumAge: 300000, timeout: 30000, enableHighAccuracy : true });
        report["Date"] = date.getDate();
        report["Description"] = document.getElementById("report-description").value;
        if (images.length > 0) {
            report["Images"] = images;
        }
        if (videos.length > 0) {
            report["Videos"] = videos;
        }
        if (audios.length > 0) {
            report["Audios"] = audios;
        }
        myApp.alert('Your report has successfully been submitted');
        
      },
      function () {
        // Cancel has been pressed, do nothing. 
        myApp.alert('You report has been canceled');
      }
    );
});


// Gets location of user to add in report object
function onSuccessfulGeolocationReport(position) {
    report["Location"] = position.coords.latitude + "," + position.coords.longitude;
}

// two different implementations - getting from library is done with plugin-camera (do phonegap plugin add cordova-plugin-camera)
// getting from picture or video is from plugin-media-capture (do phonegap plugin add cordova-plugin-media-capture)

// MEDIA CAPTURE

// capture callback for Images
var captureSuccessImage = function(mediaFiles) {
    var i, path, len;
    var element = document.getElementById("add-image");
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        path = mediaFiles[i].name;
        images.push(mediaFiles[i]);
        // do something interesting with the file
    }
    // Iterates through the images array to display the the images attached 
    var text = "";
    for (var j = 0; j < images.length; j++) {
        text += "<img src=" + images[j].fullPath + ">" + "</img>&nbsp;";
    }
    if (element.innerHTML === "Add Image") {
        element.innerHTML = text;
    } else {
        element.innerHTML += text;
    }
};

// capture callback for Videos
var captureSuccessVideo = function(mediaFiles) {
    var i, path, len;
    var element = document.getElementById("add-video");
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        path = mediaFiles[i].name;
        videos.push(mediaFiles[i]);
        // do something interesting with the file
    }
    // Iterates through the videos array to display the titles of the videos attached
    var text = "";
    for (var j = 0; j < videos.length; j++) {
        text += videos[j].name + "<br>";
    }
    element.innerHTML = text;

};

// capture callback for Audio
var captureSuccessAudio = function(mediaFiles) {
    var i, path, len;
    var element = document.getElementById("add-audio");
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        path = mediaFiles[i].name;
        audios.push(mediaFiles[i]);
        // do something interesting with the file
    }
    // Iterates through the audios array to display the titles of the audios attached
    var text = "";
    for (var j = 0; j < audios.length; j++) {
        text += audios[j].name + "<br>";
    }
    element.innerHTML = text;

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
                navigator.device.capture.captureImage(captureSuccessImage, captureError, {limit:2});
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
    var image = document.getElementById('add-image'); // this element does not exist yet
    images.push(imageURI);
    if (image.innerHTML == "Add Image") {
        image.innerHTML = "<img src=" + imageURI + "></img>&nbsp;";
    } else {
        image.innerHTML += "<img src=" + imageURI + "></img>&nbsp;";
    }

}

function onSuccess(imageURI) {
    var video = document.getElementById('add-video');
    video.innerHTML = imageURI;

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
        // {
        //     text: 'Choose from Library',
        //     onClick: function () {
        //         options = setOptions(Camera.PictureSourceType.PHOTOLIBRARY, 0);
        //         navigator.camera.getPicture(onSuccess, cameraError, options);
        //     }
        // },
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