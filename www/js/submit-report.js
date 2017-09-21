
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


// function that generates action sheet when add image is pressed
$$('.image-1').on('click', function () {
    var buttons = [
        {
            text: 'Take Picture',
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

// function that generates action sheet when add video is pressed
$$('.video-1').on('click', function () {
    var buttons = [
        {
            text: 'Take Video',
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

// function that generates action sheet when add audio is pressed
$$('.audio-1').on('click', function () {
    var buttons = [
        {
            text: 'Take Audio',
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