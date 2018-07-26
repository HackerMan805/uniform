export default class UploaderComponent extends window.HTMLElement {
    constructor() {
        super();
        this.fileInput = this.getElementsByClassName("uploader-file-input")[0];
        this.picker = this.getElementsByClassName("picker-container")[0];
        this.uploadBtn = this.getElementsByClassName("file-upload-button")[0];
        // S3 Config
        this.AWS = require('aws-sdk');
        this.bucketName = 'upload.edlio.rocks';
        this.bucketRegion = 'us-west-2';
        this.identityPoolId = 'us-west-2:1d4cf1e2-f16b-42d3-aed5-390603de4c07';

        this.AWS.config.update({
            region: this.bucketRegion,
            credentials: new this.AWS.CognitoIdentityCredentials({
                IdentityPoolId: this.identityPoolId
            })
        });
        this.s3 = new this.AWS.S3({
            apiVersion: '2006-03-01',
            params: {Bucket: this.bucketName}
        });
        // Event Listeners
        this.querySelectorAll("#computer_picker")[0]
            .addEventListener('click', this.pickMyComputer.bind(this), false);
        this.querySelectorAll("#dropbox_picker")[0]
            .addEventListener('click', this.pickDropbox.bind(this), false);
        this.querySelectorAll("#google_drive_picker")[0]
            .addEventListener('click', this.pickGoogleDrive.bind(this), false);
        this.querySelectorAll("#ms_onedrive_picker")[0]
            .addEventListener('click', this.pickMSOneDrive.bind(this), false);

        this.uploadBtn.addEventListener('click', this.toggleOpen.bind(this), false);
        this.fileInput.addEventListener('change', this.uploadFile.bind(this, 'testAlbum'), false);
    }

    uploadFile(albumName) {
        var files = this.fileInput.files;
        
        if (!files.length) {
            return alert('Please choose a file to upload first.');
        }

        for (var i=0; i<files.length; i++) {
            var file = files[i];
            var fileName = file.name;
            var albumPhotosKey = encodeURIComponent(albumName) + '/';
            var timeStamp = new Date().getTime().toString();

            var photoKey = albumPhotosKey + timeStamp + "-" + fileName;
            
            this.s3.upload({
                Key: photoKey,
                Body: file,
                ContentType: file.type,
                ACL: 'public-read',
                Metadata: { 
                    school: 'school',
                    timeStamp: timeStamp
                }
            }, function(err, data) {
                if (err) {
                    return console.log('There was an error uploading your file: ', err.message);
                }
                console.log('Successfully uploaded file: ', data);
            });
        }
        this.fileInput.value = null;
    }

    toggleOpen() {
        this.picker.classList.toggle("open");
    }

    pickMyComputer() {
        this.fileInput.click();
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