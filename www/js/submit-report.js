
// function that handles the submission of a report (when submit is pressed)
$$('.confirm-title-ok-cancel').on('click', function () {
    myApp.confirm('Are you sure?', 'Submit a Report',
      function () {
        //TODO: Add logic that submits a report to the database/email
        myApp.alert('Your report has successfully been submitted');
      },
      function () {
        // Cancel has been pressed, do nothing. 
        myApp.alert('You report has been canceled');
      }
    );
});

// two different implementations - getting from library is done with plugin-camera (do phonegap plugin add cordova-plugin-camera)
// getting from picture or video is from plugin-media-capture (do phonegap plugin add cordova-plugin-media-capture)

// MEDIA CAPTURE

// capture callback
var captureSuccess = function(mediaFiles) {
    var i, path, len;
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        path = mediaFiles[i].fullPath;
        // do something interesting with the file
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
                navigator.device.capture.captureImage(captureSuccess, captureError, {limit:2});
            }
        },
        {
            text: 'Choose from Library',
            onClick: function () {
                options = setOptions(Camera.PictureSourceType.PHOTOLIBRARY, 1);
                navigator.camera.getPicture(onSuccess, cameraError, options);
            }
        },
        {
            text: 'Cancel',
            color: 'red'
        },
    ];
    myApp.actions(buttons);
});

function onSuccess(imageURI) {
    var image = document.getElementById('myImage'); // this element does not exist yet
    image.src = imageURI;
}

// function that generates action sheet when add video is pressed
$$('.video-1').on('click', function () {
    var options;
    var buttons = [
        {
            text: 'Take Video',
            onClick: function () {
                navigator.device.capture.captureVideo(captureSuccess, captureError, {limit:2});
            }
        },
        {
            text: 'Choose from Library',
            onClick: function () {
                options = setOptions(Camera.PictureSourceType.PHOTOLIBRARY, 0);
                navigator.camera.getPicture(onSuccess, cameraError, options);
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
                navigator.device.capture.captureAudio(captureSuccess, captureError, {limit:2});
            }
        },
        {
            text: 'Choose from Library'
        },
        {
            text: 'Cancel',
            color: 'red'
        },
    ];
    myApp.actions(buttons);
});