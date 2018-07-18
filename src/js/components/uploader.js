var AWS = require('aws-sdk');

var bucketName = 'upload.edlio.rocks';
var bucketRegion = 'us-west-2';
var identityPoolId = 'us-west-2:1d4cf1e2-f16b-42d3-aed5-390603de4c07';

AWS.config.update({
    region: bucketRegion,
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: identityPoolId
    })
});

var s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: {Bucket: bucketName}
});

export default class UploaderComponent extends window.HTMLElement {
    constructor() {
        super();
    }

    toggleOpen() {
        var uploader = this;
        uploader.picker = uploader.getElementsByClassName("picker-container")[0];
        uploader.picker.classList.toggle("open");

        if (uploader.picker.classList.contains("open")) {
            if (!uploader.picker.listenersOn) {
                uploader.picker.listenersOn = true;

                uploader.querySelectorAll("#computer_picker")[0]
                    .addEventListener('click', uploader.pickMyComputer);

                uploader.querySelectorAll("#dropbox_picker")[0]
                    .addEventListener('click', uploader.pickDropbox);

                uploader.querySelectorAll("#google_drive_picker")[0]
                    .addEventListener('click', uploader.pickGoogleDrive);

                uploader.querySelectorAll("#ms_onedrive_picker")[0]
                    .addEventListener('click', uploader.pickMSOneDrive);
            }
        }
    }

    uploadFile(albumName) {
        var files = document.getElementById('file_test').files;
        
        if (!files.length) {
            return alert('Please choose a file to upload first.');
        }
        
        var file = files[0];
        var fileName = file.name;
        var albumPhotosKey = encodeURIComponent(albumName) + '/';

        var photoKey = albumPhotosKey + fileName;
        
        s3.upload({
            Key: photoKey,
            Body: file,
            ACL: 'public-read'
        }, function(err, data) {
            if (err) {
                return alert('There was an error uploading your photo: ', err.message);
            }
            alert('Successfully uploaded photo.');
            console.log(data);
        });
    }

    pickMyComputer() {
        console.log("pick - My Computer");

        // OPEN my computer file picker and choose file

        // File chosen gets sent to AWS SDK to upload to S3
    }

    pickDropbox() {
        console.log("pick - Dropbox");
    }

    pickGoogleDrive() {
        console.log("pick - Google Drive");
    }

    pickMSOneDrive() {
        console.log("pick - Microsoft OneDrive");
    }
}