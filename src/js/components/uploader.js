import {onClick} from '../utils';

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

    // PICKERS

    pickMyComputer() {
        console.log("pick - My Computer");
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