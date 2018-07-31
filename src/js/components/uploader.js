const AWS = require('aws-sdk');
const isIE = /*@cc_on!@*/false || !!document.documentMode;
<<<<<<< HEAD
//const compiledStyle = require('../../sass/components/file-uploader.scss');
=======
>>>>>>> 2f9630976974d226b685a00a3bd74203de6d11e6

/**
 * Hosted file is a strong type file sending to server for downloading file from 3rd party picker
 */
class HostedFile {
    constructor () {
        this.name = '';
        this.bytes = 0;
        // the below object will store the information access to download file
        this.link = '';
    }

    static build (data, provider, oauthToken) {
        if (Array.isArray(data)) {
            return data.map((rawHostedFile) => {
                return HostedFile.build(rawHostedFile, provider, oauthToken);
            });
        } else {
            const result = new HostedFile();
            switch (provider) {
                case 'google':
                    result.bytes = data.sizeBytes;
                    result.name = data.name;
                    // link can be found at https://developers.google.com/drive/v3/web/manage-downloads
                    if (data.type === 'document') {
                        var exportMimeType = 'application/pdf';
                        switch (data.mimeType) {
                            case 'application/vnd.google-apps.document':
                                result.name = result.name + '.docx';
                                exportMimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
                                break;
                            case 'application/vnd.google-apps.spreadsheet':
                                result.name = result.name + '.xlsx';
                                exportMimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                                break;
                            case 'application/vnd.google-apps.presentation':
                                result.name = result.name + '.pptx';
                                exportMimeType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
                                break;
                        }
                        result.link = encodeURIComponent('https://www.googleapis.com/drive/v3/files/' + data.id + '/export?mimeType=' + exportMimeType + '&access_token=' + oauthToken.token);
                    } else {
                        result.link = encodeURIComponent('https://www.googleapis.com/drive/v3/files/' + data.id + '?alt=media&access_token=' + oauthToken.token);
                    }
                    return result;
                case 'dropbox':
                    result.bytes = data.bytes;
                    result.name = data.name;
                    result.link = data.link;
                    return result;
                case 'microsoft':
                    result.bytes = data.size;
                    result.name = data.name;
                    result.link = encodeURIComponent(data['@microsoft.graph.downloadUrl']);
                    return result;
            }
        }
    }
}

class HostedFileService {
    constructor () {
        this.name = 'undefined';
        this.oauthToken = {
            token: '',
            expireAt: 0
        };
    }

    openPicker () {
        alert('Open picker function is not yet defined. Please override this function');
    }

    callback () {
        // to convert single file to file list so we can call forEach
        let hostedFiles = HostedFile.build(data, this.name, this.oauthToken);
        if (!Array.isArray(hostedFiles)) {
            hostedFiles = [hostedFiles];
        }
        const request = new XMLHttpRequest();
        const url = fetchUrl.indexOf('?') > 0 ?
            fetchUrl + '&source=' + this.name :
            fetchUrl + '?url=' + this.name;
        request.upload.onprogress = function(e) {
            cb(null, 'onprogress', e);
        };
        request.upload.onloadstart = function (e) {
            cb(null, 'onloadstart', e);
        };
        request.upload.onloadend = function (e) {
            cb(null, 'onloadend', e);
        };
        request.open('POST', url, true);
        request.onreadystatechange = function() {
            if (request.readyState == XMLHttpRequest.DONE) {
                if (request.status >= 200 && request.status < 300) {
                    cb(null, 'done', request.response ? JSON.parse(request.response) : []);
                } else if (request.status > 0) {
                    // if aboted, status will be zero
                    cb(request, 'error', null);
                }
            }
        };
        request.send(JSON.stringify(hostedFiles));
        return request;
    }
}

export default class UploaderComponent extends window.HTMLElement {
    constructor() {
        super();

        // S3 Config
        this.bucketName = 'upload.edlio.rocks';
        this.bucketRegion = 'us-west-2';
        this.identityPoolId = 'us-west-2:1d4cf1e2-f16b-42d3-aed5-390603de4c07';

        this.url = 'http://localhost:3000/v1/upload';
        this.fetchUrl = 'http://localhost:3000/v1/fetch';
        this.method = 'POST';
        this.accept = '';
        this.maxSize = 0; // default to 5MB | 0 indicated no limit
        this.errors = [];
        this._files = [];
        this.maxItems = 1; // 0 for unlimitted

        AWS.config.update({
            region: this.bucketRegion,
            credentials: new AWS.CognitoIdentityCredentials({
                IdentityPoolId: this.identityPoolId
            })
        });
        this.s3 = new AWS.S3({
            apiVersion: '2006-03-01',
            params: {Bucket: this.bucketName}
        });
    }

    get files () {
        return this._files;
    }
    set files (val) {
        this._files = val;
        this.dispatchEvent(new CustomEvent('change', {
            'detail': val
        }));
    }

    uploadToServer (files) {
        if (!files.length) {
            return;
        }
        this.errors = [];
        if (this.maxItems !== 0 && files.length > this.maxItems) {
            this.errors.push({
                type: 'multiple'
            });
            this.setErrors();
            return;
        }
        // reset errors
        const formData = new FormData();
        const validFiles = [];
        for (let i = 0; i < files.length; i ++) {
            // Check if filetype is accepted
            // TODO: might need to refactor into multiple XMLHttpRequest
            //       to track multiple progress bar
            const file = files[i];
            const mimeType = ((file.type !== '') ? file.type.match(/^[^\/]*\//)[0] : null);
            const fileType = file.name.match(/\.[^\.]*$/)[0];
            const fileSize = file.size;
            if (this.accept !== '' && !(this.accept.indexOf(mimeType) > -1 || this.accept.indexOf(fileType) > -1)) {
                this.errors.push({
                    filename: file.name,
                    type: 'extensions'
                });
                continue;
            }
            if (this.fileSize > 0 && fileSize >= this.maxSize) {
                this.errors.push({
                    filename: file.name,
                    type: 'size',
                    size: file.size
                });
                continue;
            }
            validFiles.push(file);
        }
        this.setUploadingStatus(files);
        this.setErrors();
        if (!validFiles.length) {
            return;
        }
        for (var i = 0; i < validFiles.length; i ++) {
            formData.append('files', validFiles[i], validFiles[i].name);
        }
        this.request = new XMLHttpRequest();
        this.request.upload.onprogress = (e) => {
            if (e.lengthComputable) {
                this.progressBar.max = e.total;
                this.progressBar.value = e.loaded;
                var percentage = parseInt((e.loaded / e.total) * 100);
                this.progressBar.style.width = percentage + '%';
                this.progressBar.textContent = percentage + '%';
                if (percentage === 100) { // for firefox
                    this.progressBar.textContent = '';
                    this.cancel.classList.add('hidden');
                    this.progressBar.classList.add('indeterminate');
                }
            }
        };
        this.request.upload.onloadstart = (e) => {
            this.progressBar.value = 0;
            this.dropzone.classList.add('hidden');
            this.loadingzone.classList.remove('hidden');
        };
        this.request.upload.onloadend = (e) => {
            this.progressBar.style.width = 100 + '%';
            this.progressBar.textContent = '';
            this.cancel.classList.add('hidden');
            this.progressBar.classList.add('indeterminate');
        };
        this.request.open(this.method, this.url, true);
        this.request.onreadystatechange = () => {
            this.dropzone.classList.remove('hidden');
            this.loadingzone.classList.add('hidden');
            if (this.request.readyState == XMLHttpRequest.DONE) {
                if (this.request.status >= 200 && this.request.status < 300) {
                    var responseData = JSON.parse(this.request.response);
                    this.files = this.files.concat(responseData);
                    var uploadedEvent = new CustomEvent('uploaded', {
                        'detail': responseData
                    });
                    this.dispatchEvent(uploadedEvent);
                } else if (this.request.status > 0) {
                    // if aborted, status will be zero which is not
                    // an error
                    var errorEvent = new CustomEvent('error', {
                        'detail': this.request
                    });
                    this.dispatchEvent(errorEvent);
                    var error = {type: 'unknown'};
                    if (files.length === 1) {
                        error.filename = files[0].name;
                    }
                    this.errors.push(error);
                    this.setErrors();
                }
                this.progressBar.style.width = 0 + '%';
                this.cancel.classList.remove('hidden');
                this.progressBar.classList.remove('indeterminate');
                this.request = null; // reset the request
            }
        };
        this.request.send(formData);
    }

    abort () {
        if (this.request) {
            this.request.abort();
            this.dropzone.classList.remove('hidden');
            this.loadingzone.classList.add('hidden');
            this.progressBar.style.width = 0 + '%';
            this.cancel.classList.remove('hidden');
            this.progressBar.classList.remove('indeterminate');
        }
    }

    setUploadStatus (files) {
        if (files.length === 1) {
            this._shadowRoot.querySelector('.loadingzone .status .summary')
                .textContent = '\'' + files[0].name + '\'';
        } else {
            let allowedFileType = '';
            switch (this.accept) {
                case 'image/*':
                    allowedFileType = 'photo';
                    break;
                case 'video/*':
                    allowedFileType = 'video';
                    break;
                case 'audio/*':
                    allowedFileType = 'audio file';
                    break;
                default:
                    allowedFileType = 'file';
                    break;
            }
            allowedFileType += 's';
            this._shadowRoot.querySelector('.loadingzone .status .summary')
                .textContent = files.length + ' ' + allowedFileType;
        }
    }

    setAccept () {
        this.fileItem.accept = this.accept;
        const formattedAcceptMessage = {
            'image/*': '.jpg, jpeg, .png, .gif',
            'video/*': '.mp4, .m4v, .mov, .wmv, .avi',
            'audio/*': '.mp3, wav'
        };
        if (!this.accept) {
            this.allowedExtensions.textContent = 'Any';
        } else {
            this.allowedExtensions.textContent =
                formattedAcceptMessage[this.accept] ?
                    formattedAcceptMessage[this.accept] :
                    this.accept;
        }
        let allowedFileType = '';
        switch (this.accept) {
            case 'image/*':
                allowedFileType = 'photo';
                break;
            case 'video/*':
                allowedFileType = 'video';
                break;
            case 'audio/*':
                allowedFileType = 'audio file';
                break;
            default:
                allowedFileType = 'file';
                break;
        }
        if (this.maxItems === 0 || this.maxItems > 1) {
            allowedFileType += '(s)';
        }
        for (var i = 0; i < this.allowedFileTypes.length; i ++) {
            this.allowedFileTypes[i].textContent = allowedFileType;
        }
    }

    setMaxSize () {
        if (this.maxSize > 0) {
            this.sizeLimitItem.classList.remove('hidden');
            this.maxSizeItem.textContent = parseFloat((parseInt(this.maxSize) / 1000000).toFixed(2));
        } else {
            this.sizeLimitItem.classList.add('hidden');
        }
    }

    setErrors () {
        // remove all child nodes from error nodes
        while (this.errorsItem.firstChild) {
            this.errorsItem.removeChild(this.errorsItem.firstChild);
        }
        this.errors.forEach((error) => {
            const div = document.createElement('div');
            const hint = document.createElement('div');
            hint.classList.add('hint');
            switch (error.type) {
                case 'extensions':
                    div.textContent = 'Sorry, "' + error.filename + '" is not a valid file.';
                    hint.textContent = 'Please upload your file with accepted file types listed below.';
                    break;
                case 'size':
                    div.textContent = 'Sorry, "' + error.filename + '" is too large (' + parseFloat((parseInt(error.size) / 1000000).toFixed(2)) + ' MB).';
                    hint.textContent = 'Please upload with smaller size.'
                    break;
                case 'multiple':
                    div.textContent = 'You can only upload ' + this.maxItems + ' file' + (this.maxItems > 0 ? 's' : '') + ' at once.';
                    hint.textContent = 'Please reduce the amount of files and try again.';
                    break;
                case 'unknown':
                    if (error.filename) {
                        div.textContent = 'Sorry, "' + error.filename + '" was not uploaded!';
                    } else {
                        div.textContent = 'Sorry, we were not able to upload your files!';
                    }
                    hint.textContent = 'Please try again. If you continue to have problems, please contact tech support.';
                    break;
            }
            this.errorsItem.appendChild(div);
            this.errorsItem.appendChild(hint);
        });
    }

    setImagesOnly () {
        const fileIconHolder = this._shadowRoot.querySelector('.type.file-icon');
        const svg = (this.imagesOnly) ? this.pictureIcon : this.fileIcon;
        fileIconHolder.parentNode.replaceChild(svg, fileIconHolder);
    }

    setMaxItems () {
        this.fileItem.multiple = (this.maxItems === 0 || this.maxItems > 0);
    }

    uploadAll (files) {
        const uploadStartEvent = new CustomEvent('upload-start', {
            'detail': data
        });
        this.dispatchEvent(uploadStartEvent);
        console.log("beginning bulk upload");

        if (!files.length) {
            return alert('Please choose a file to upload first.');
        }
        files = Array.from(files);
        let promiseFiles = files.map(file => 
            this.uploadFile(file)
        );

        Promise.all(promiseFiles).then(values => {
            console.log("files uploaded!");
            const uploadFinishEvent = new CustomEvent('upload-finish', {
                'detail': data
            });
            this.dispatchEvent(uploadFinishEvent);
            this.fileItem.value = null;
        });
    }

    uploadFile (file) {
        return new Promise((resolve, reject) => {
            const fileName = file.name;
            // TODO: change key
            const albumPhotosKey = encodeURIComponent('testAlbum') + '/';
            const timeStamp = new Date().getTime().toString();

            const photoKey = albumPhotosKey + timeStamp + "-" + fileName;
        
            console.log("uploading file");
            this.s3.upload({
                Key: photoKey,
                Body: file,
                ContentType: file.type,
                ACL: 'public-read',
                Metadata: { 
                    school: 'school',
                    timeStamp: timeStamp
                }
            }, (err, data) => {
                if (err) {
                    console.log('There was an error uploading your file: ', err.message)
                    return reject(err);
                }
                resolve(data);
                console.log("uploaded", data);
            });
        });  

    }

    connectedCallback () {
        this.dropboxService = new HostedFileService();
        this.dropboxService.name = 'dropbox';
        this.dropboxService.openPicker = function() {
            Dropbox.choose({
                success: (files) => {
                    // since Dropbox api doesn't allow us to specify
                    // number of max files, we will have to protect
                    // ourselves by checking here.
                    if (this.maxItems !== 0 && files.length > this.maxItems) {
                        this.dropzone.classList.remove('hidden');
                        this.loadingzone.classList.add('hidden');
                        this.errors.push({
                            type: 'multiple'
                        });
                        this.setErrors();
                        return;
                    }
                    this.setUploadingStatus(files);
                    this.request = this.dropboxService.callback(files, this.fetchUrl, function(err, type, data) {
                        this.errors = [];
                        this.setErrors();
                        if (err) {
                            this.dropzone.classList.remove('hidden');
                            this.loadingzone.classList.add('hidden');
                            var errorEvent = new CustomEvent('error', {
                                'detail': err
                            });
                            this.dispatchEvent(errorEvent);
                            this.errors.push({type: 'unknown'});
                            this.setErrors();
                            this.request = null;
                            this.progressBar.style.width = 0 + '%';
                            this.cancel.classList.remove('hidden');
                            this.progressBar.classList.remove('indeterminate');
                            return;
                        }
                        switch (type) {
                            case 'done':
                                this.dropzone.classList.remove('hidden');
                                this.loadingzone.classList.add('hidden');
                                this.files = this.files.concat(data);
                                var uploadedEvent = new CustomEvent('uploaded', {
                                    'detail': data
                                });
                                this.dispatchEvent(uploadedEvent);
                                this.request = null;
                                this.progressBar.style.width = 0 + '%';
                                this.cancel.classList.remove('hidden');
                                this.progressBar.classList.remove('indeterminate');
                                break;
                            case 'onprogess':
                                if (data.lengthComputable) {
                                    this.progressBar.max = data.total;
                                    this.progressBar.value = data.loaded;
                                    var percentage = parseInt((data.loaded / data.total) * 100);
                                    this.progressBar.style.width = percentage + '%';
                                    this.progressBar.textContent = percentage + '%';
                                    if (percentage === 100) { // for firefox
                                        this.progressBar.textContent = '';
                                        this.cancel.classList.add('hidden');
                                        this.progressBar.classList.add('indeterminate');
                                    }
                                }
                                break;
                            case 'onloadstart':
                                this.progressBar.value = 0;
                                this.dropzone.classList.add('hidden');
                                this.loadingzone.classList.remove('hidden');
                            case 'onloadend':
                                this.progressBar.style.width = 100 + '%';
                                this.progressBar.textContent = '';
                                this.cancel.classList.add('hidden');
                                this.progressBar.classList.add('indeterminate');
                                break;
                        }
                    });
                },
                linkType: 'direct',
                multiselect: this.maxItems === 0 || this.maxItems > 1,
                extensions:
                    (this.imagesOnly) ?
                        ['images'] :
                        this.accept
            });
        };
        this.googleService = new HostedFileService();
        this.googleService.name = 'google';
        this.googleService.openPicker = () => {
            var googleDriveSelf = this;
            // TODO: get from attribute
            var OAUTH_SESSION_KEY = '';
            // The Client ID obtained from the Google Developers Console.
            var clientId = '';
            // Scope to use to read user's drive data.
            var scope = ['https://www.googleapis.com/auth/drive.readonly'];
            var pickerApiLoaded = false;
            var oauthToken = JSON.parse(
                window.sessionStorage.getItem(OAUTH_SESSION_KEY)
            );
            // note that expireAt provided by Google is in second as unit
            if (oauthToken && new Date(parseInt(oauthToken.expireAt) * 1000) > new Date()) {
                googleDriveSelf.oauthToken = oauthToken;
            } else {
                window.sessionStorage.removeItem(OAUTH_SESSION_KEY);
            }
            onApiLoad();
            // Use the API Loader script to load google.picker and gapi.auth.
            function onApiLoad() {
                window.removeEventListener('message', handleAuthResult);
                window.addEventListener('message', handleAuthResult);
                if (!googleDriveSelf.oauthToken.token) {
                    onAuthApiLoad();
                }
                gapi.load('picker', {'callback': onPickerApiLoad});
            }
            function onAuthApiLoad() {
                // TODO: get from attribute
                var callbackDomain = '';
                var url = 'https://accounts.google.com/o/oauth2/auth' +
                    '?response_type=token' +
                    '&client_id=' + encodeURIComponent(clientId) +
                    '&scope=' + encodeURIComponent(scope) +
                    '&redirect_uri=' + '';
                window.open(
                    (isIE) ?
                        '/apps/files/redirect?url=' + encodeURIComponent(url) :
                        url,
                    '_blank',
                    'width=500,height=500'
                );
            }
            function onPickerApiLoad() {
                pickerApiLoaded = true;
                createPicker();
            }
            function handleAuthResult(event) {
                var token = JSON.parse(event.data);
                // double check for racing condition since sometimes
                // postMessage method got invoked twice
                if (token.token && !googleDriveSelf.oauthToken.token) {
                    googleDriveSelf.oauthToken = token;
                    window.sessionStorage.setItem(
                        OAUTH_SESSION_KEY,
                        JSON.stringify(googleDriveSelf.oauthToken)
                    );
                    createPicker();
                }
            }
            // Create and render a Picker object for picking user Photos.
            function createPicker() {
                if (pickerApiLoaded && googleDriveSelf.oauthToken.token) {
                    var builder = new google.picker.PickerBuilder()
                        .setOAuthToken(googleDriveSelf.oauthToken.token)
                        .setCallback(pickerCallback);
                    if (this.maxItems === 0 || this.maxItems > 1) {
                        builder = builder.enableFeature(google.picker.Feature.MULTISELECT_ENABLED);
                    }
                    if (this.maxItems > 1) {
                        builder.setMaxItems(this.maxItems);
                    }
                    if (this.imagesOnly) {
                        builder.addView(google.picker.ViewId.DOCS_IMAGES);
                    } else {
                        builder.addView(google.picker.ViewId.DOCS);
                    }
                    var picker = builder.build();
                    picker.setVisible(true);
                }
            }
            // A simple callback implementation.
            function pickerCallback(data) {
                // reset errors
                this.errors = [];
                if (data.action == google.picker.Action.PICKED) {
                    this.setUploadingStatus(data.docs);
                    this.request = this.googleService.callback(data.docs, this.fetchUrl, function(err, type, data) {
                        this.setErrors();
                        if (err) {
                            this.dropzone.classList.remove('hidden');
                            this.loadingzone.classList.add('hidden');
                            var errorEvent = new CustomEvent('error', {
                                'detail': err
                            });
                            this.dispatchEvent(errorEvent);
                            this.errors.push({type: 'unknown'});
                            this.setErrors();
                            this.request = null;
                            this.progressBar.style.width = 0 + '%';
                            this.cancel.classList.remove('hidden');
                            this.progressBar.classList.remove('indeterminate');
                            return;
                        }
                        switch (type) {
                            case 'done':
                                this.dropzone.classList.remove('hidden');
                                this.loadingzone.classList.add('hidden');
                                this.files = this.files.concat(data);
                                var uploadedEvent = new CustomEvent('uploaded', {
                                    'detail': data
                                });
                                this.dispatchEvent(uploadedEvent);
                                this.request = null;
                                this.progressBar.style.width = 0 + '%';
                                this.cancel.classList.remove('hidden');
                                this.progressBar.classList.remove('indeterminate');
                                break;
                            case 'onprogess':
                                if (data.lengthComputable) {
                                    this.progressBar.max = data.total;
                                    this.progressBar.value = data.loaded;
                                    var percentage = parseInt((data.loaded / data.total) * 100);
                                    this.progressBar.style.width = percentage + '%';
                                    this.progressBar.textContent = percentage + '%';
                                    if (percentage === 100) { // for firefox
                                        this.progressBar.textContent = '';
                                        this.cancel.classList.add('hidden');
                                        this.progressBar.classList.add('indeterminate');
                                    }
                                }
                                break;
                            case 'onloadstart':
                                this.progressBar.value = 0;
                                this.dropzone.classList.add('hidden');
                                this.loadingzone.classList.remove('hidden');
                            case 'onloadend':
                                this.progressBar.style.width = 100 + '%';
                                this.progressBar.textContent = '';
                                this.cancel.classList.add('hidden');
                                this.progressBar.classList.add('indeterminate');
                                break;
                        }
                    });
                }
            }
        };
        this.oneDriveService = new HostedFileService();
        this.oneDriveService.name = 'microsoft';
        // because IE is pain in the butt and has its own memory
        // management that causes the window.removeEventListener func
        // not removing correct handleOneDriveMessage
        // this.handleOneDriveMessageInstance = this.handleOneDriveMessage.bind(this);
        this.oneDriveService.openPicker = function() {
            window.removeEventListener('message', this.handleOneDriveMessageInstance);
            window.addEventListener('message', this.handleOneDriveMessageInstance);
            var url ='https://callbacks.edlio.com/apps/files/onedrive';
            window.open(
                (isIE) ?
                    '/apps/files/redirect?url=' + encodeURIComponent(url) :
                    url,
                '_blank',
                'width=800,height=600'
            );
        };
        /**
         * Due to webcomponents not supporting svg>use tag, we will have to
         * create these svg element internally and insert into DOM ourselves
         * so that these SVG can be properly rendered in Firefox.
         */
        const div = document.createElement('div');
        div.innerHTML = '<svg class="type file-icon" viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg"><path d="M1724 508q28 28 48 76t20 88v1152q0 40-28 68t-68 28h-1344q-40 0-68-28t-28-68v-1600q0-40 28-68t68-28h896q40 0 88 20t76 48zm-444-244v376h376q-10-29-22-41l-313-313q-12-12-41-22zm384 1528v-1024h-416q-40 0-68-28t-28-68v-416h-768v1536h1280z"/></svg>';
        this.fileIcon = div.firstChild;
        div.innerHTML = '<svg class="type file-icon" viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg"><path d="M704 704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm1024 384v448h-1408v-192l320-320 160 160 512-512zm96-704h-1600q-13 0-22.5 9.5t-9.5 22.5v1216q0 13 9.5 22.5t22.5 9.5h1600q13 0 22.5-9.5t9.5-22.5v-1216q0-13-9.5-22.5t-22.5-9.5zm160 32v1216q0 66-47 113t-113 47h-1600q-66 0-113-47t-47-113v-1216q0-66 47-113t113-47h1600q66 0 113 47t47 113z"/></svg>';
        this.pictureIcon = div.firstChild;

        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._shadowRoot.innerHTML = `
<style>
${require('../../sass/components/file-uploader.scss').toString()}
</style>
<div class="errors"></div>
            <div class="dropzone">
                <!-- temporary holder to be replaced with svg below -->
                <div class="type file-icon"></div>
                <span class="desktop-only">
                    <section class="dropdown">
                        <header>
                            <a href="javascript:;">Upload</a>
                        </header>
                        <nav class="menu">
                            <a href="javascript:;" class="computer">
                                <svg viewbox="0 0 2048 2048" class="file-icon">
                                    <path d="M1856 1120v-832q0-13-9.5-22.5t-22.5-9.5h-1600q-13 0-22.5 9.5t-9.5 22.5v832q0 13 9.5 22.5t22.5 9.5h1600q13 0 22.5-9.5t9.5-22.5zm128-832v1088q0 66-47 113t-113 47h-544q0 37 16 77.5t32 71 16 43.5q0 26-19 45t-45 19h-512q-26 0-45-19t-19-45q0-14 16-44t32-70 16-78h-544q-66 0-113-47t-47-113v-1088q0-66 47-113t113-47h1600q66 0 113 47t47 113z"/>
                                </svg> Your computer
                            </a>
                            <a href="javascript:;" class="dropbox">
                                <img class="file-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5RDBDNzc3OTU1ODgxMUUzOUJBMUI0NDgxNUY1Q0ZFOCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5RDBDNzc3QTU1ODgxMUUzOUJBMUI0NDgxNUY1Q0ZFOCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjlEMEM3Nzc3NTU4ODExRTM5QkExQjQ0ODE1RjVDRkU4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjlEMEM3Nzc4NTU4ODExRTM5QkExQjQ0ODE1RjVDRkU4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+rzHtPgAAA4dJREFUeNrsmGlIFVEUx58WLbavhESgkVa0aZAttkDSvkhJZGlhBCFEkBARFSVRUFC2IPRByaysCLNFWmmjaEHSaLUSo4Wi0kJIkrbX/8B/5DHOcueOHyQ68EOcmXPumXuWe+aFBYPBQEuUsP+O6TgWtum96vMTQDtwyeM6SeAPuKrycDA7MtDag/FJ4DIQnWHgkaJeLCgFbcBU2nCVcIVnxGABuEanRB6CeQq6M0ElaCvR4U4X8X9fjk0Hn8BSi3vFYIOD7hrulFlSQQ2Yq+NYBBc+B7o46G8BRy2uyw7vcNDrCE6Bs6CzqmMLQK1iqEQWgvtcQBa8a7PDVjKLEUmzc6w9iAO3wHFWnheJB7tJgkddybdD4A7tSLQak7kPK2acZtuRsK1jS/jgknt2MhrMBvXgubmPzQGnPRgrYyirTdf7MffGerAlKXTC6GPmHDsDYsBbFyMNIB2MsnBK5A13Xyrwm4st2ZVBhlNOyf8SRIGLNoYOg+786ybHQA9wwOb+Fa5VqdoufoNpYFvItSrmgezUdw8h+gGWgZGSO6a8TOL9JuJ2JK2XkIPhTEw/Ug4GghLwAqz10/ljmJSTwcpmGBpWcJfmM6+0HEvl1g9gn9sHXoNEDYcSWCT72YT7g6dgiVfHdvKwDVi0gZtsBR0UHJIXKuRpEGVx/yDYo+KYdPzrIEvhGPrCpLaTND6T7mJrFV82wsqxTkxu6TkTFcMj41A+z8nYkOvR4B6PGdWjLZFrJxtDg1GVXbnVrTTyJ559aCtLP1t3muZLVYA6Y8ek0+8Fvdj0dKSM/NLQvcHzehcLrEmO1bCcF4GfikafMazSWsawKCoUdaWRZ3Bs/6hSlVJ13RQOdBkmB4Pt7OQbQS7DW+Sie4HHVYHXPlbPZJzBUcYskkspPFNXh1xfztlqsU13/8yxWsb2Oj8fI+dBJNgcci2Z+SC5OcVmthIHjtABQ6RAenOK8f2VJIZO0phMuSPAV75tXwe9nuAdKz2eh3geQxjdHI7VMqnLaXwoq0hVSqkvve4VGG9OdJ3pwqicTCZpnmYryQ0ZMDOZv753LMBPLanSHB+TRT5tFDbXl3jjTwo8Q2UyuO1BT77ah7BaG1SVwjXevJrzfAqLwOm7IIND5hOvi4T7CE0xKy/HIWwFusb9OBbgd2QWh8nHrLo4r2HTrUoVqWLDlZnqwb//i2JLlL8CDAD8Hc9YWv7augAAAABJRU5ErkJggg==" alt="">
                                Dropbox
                            </a>
                            <a href="javascript:;" class="google-drive">
                                <img class="file-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozMUVFREM3NzBBMjA2ODExOTJCMDk0RkE2RERFODM4NCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFOUMzNUJDMTYxNkQxMUUxOTVGNkVDODhEOEU3M0E2QiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFOUMzNUJDMDYxNkQxMUUxOTVGNkVDODhEOEU3M0E2QiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjA0ODAxMTc0MDcyMDY4MTFBN0JBQUQzNzI5Qjg2QkI5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjMxRUVEQzc3MEEyMDY4MTE5MkIwOTRGQTZEREU4Mzg0Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+zjIutAAABP5JREFUeNrsV01oXFUUPve+N78x6WAalOLPBFwWSaGL+FN4SHWlMHFpjaSirjMLl9IGiouCJLrVdmqVuhHszoULY4uCdpGACiJC4k9rx7Tk0bST5M2793rO/XtvTNKMVMjGCXfunZn77vfd73zn3BumlIK9fHHY49eeEwjpjTG268SJj1+Y/eiRlWmem6qf08+y3Bq6nys/ebm525oUfqbfdiFQfP+lMewWWiPXYGJ4w4JzDd5LwhOg12hp/Kvl3Qj0G4JZenurfT8I6cC57QPsAz3Oemqs9Z94AHffwC7C/cHVtAhvX93nwS2QadyS4oEbR8l3zzTuiUDpg2M1XHzWyGxmn7l5H/zSCTRYpoIlY0loVbhWY/beFGAwjeB1IsDRfTzksCY4nL42aOJPgNyC+eZU0aTq3SvPnrwrxE4mrLQm62Q8bDX9szIiqLVE//7pYzEcHZE+FJkhtbt0U0qS0WL8MFo4/EX870zIAKVHcLO2VoB2xwtcj0/+OQSpYFZylguFUQK8EqzmTNx3CKofTkb4YINx5oE1OI6DYghBEMDPSRE+uVnxMc/7Aaw5IVN2qnvlaNS/B8h4fi0koT1gVOCFEMPONYlT1wdRVh4b3Vm+Bmz5jHKf6ItA9fzkFOKNmdRyKUYkuCESErhpd1Q4gxOooUWombj6Bsqh03uUfBtN3dWElfOTNRwtodw1H3cgYJoIZkysN7EaSVhsv3r2ED3XXWgs4fw6OBoaHOeQCaWwPRlSxIg3Wn7iUry9CRWcADKerfNm99lYE6FxQH6AfK0/rsz27e6JoDS9Mr1WQ0ENP0xvq0Dl3Mt1HCy5mDsDckcEn+eKFMG/RF5sv3JmIr/Q6tfPfxlwFYWBgpCTEjoFEVRYIjYtSRFMy8pT3yz3KIBTW26kXK9cStsxfSswr6XcctJJJY53UwGdjRRirBXx7S6sb3RBiAyc1DDrqlaPCctnjzXw+8iBggM0hcQ+Z+SVafpue6q15ZQbfvrzZdzdDO1QovzdRMDanS7ciBNYvdWFznoKaepUUVHn8njkCeB3s96sbteGOC5GBJTuZSKWlZBzOxYvKeaUIKMJcEQ0GVRmfRMJdVK4jW09oe+MCmHP5cDUUfC3RKldgvJyKCT74MCPb9QLUF0dffMU+oNDWChhK/uC07gEsL/YhuHidTy2lQZXtpdC6ExwpaHEN+Fc5AgohTFlnxloQ4JMp1xtRyaDvx8BlpZABUYizgtYE8pZ1bNP3kgehPbGA0hAYvyVVyFFFYQQribozPEh2HztwkX8YR6s4YBYKyM9tWL8MAysHLQpRelQxIpYNQcRmCIV9NwRuK4Zvhy7TMqCNf/Tewfmeyohrts04HnnGwmH/jhCcujgsOIA4g/okqP37C4leABxbsBN6uaPAuZrSX73PQSS1y8s4qpzroyCNO6vrjwOpVuP6uDw4iCeA2XwFda/ZQAZ5jbngyEwh7tf3uksmMEWu0ygmNd+ew6oXNCuGcbcJkpWIyDLFp0xCnraPy4AscXY/jBCFXomDP01DoGoYrwHdNyVRXQHDfmEQKnY6EZjlE3mDyR/OaEdsSbuPt71RoQX0YUwqY099H0Twc2Zz/H4pSOYel2iMd4B51mptmsYUtIQk8a0Ng0Xf3hn5FC/N6Lm/l9f9OB6sl1MqawwmV3bhuMU00wKacORn6/HzR3vhP//c7qXr78FGABLoes2ETA/aQAAAABJRU5ErkJggg==" alt="">
                                Google Drive
                            </a>
                            <a href="javascript:;" class="microsoft-one-drive">
                                <img class="file-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAABhlBMVEUAAAAARrgARbkARrEARrcAVNgATbEAU9gAUtoAVdgARrgARrgARrgARrgARrgARrgARrgARbgARrgARrgARrgARrgARrgARrgARrgARrgARrgARrgARrgARrgARrgARrgARrgARrgARrgARrgARrgARrgARrgARrgARrgARrgARrgARrgARrgARrgARrgARrcARrgARrgASb8ATcgAVdsAVNgARrgAVNgAVNgAVNgAVNgARrgARrgARrgAVNgAVNgAVNgARrgARrgAVNgAVNgARrgARrgAVNgARrgAVNgAVNgARrgAVNgAVdgARrgAVNgARrgARrgAVNgARrgARrgARrgAT8wAVNgAVNgARrgARrgARrgARrgARrcATcgAVNgAVNgAVNgAVtgAVNgAVNgAVNgAVNgAVNgAVNgAVNgARrgARrkAR7oAS8MAUM4AUdIAT80ASsEATcgAVNcAVNkAVNgAU9YAS8QAS8IAU9cAU9UAUdEASL0AUNAAUtQASL4ASLz///8FsKDYAAAAanRSTlMAAAAAAAAAAAAAGF6Tl4pGCgFLyvv0qSgJHh0HTOfEIhBvvN7cutuQAhKj4oD9+Ukb1f1/IQM8+eCOFzOg/P6gDF3m9Uos4HlgkB9osBH49w+sXZbj9vjpMwUmPj8+TMLwcgMcXGppaEAGkjPQHgAAAAFiS0dEgRK6rv4AAAAJcEhZcwAACxMAAAsTAQCanBgAAAEdSURBVDjLY2AYeYCRkYubh5ePX4ARh7ygkLBIVlaWqJg4I7oSJiYJSSlpGdksCJCTR1PAqKCopKyiqpYFA+oaKCoYNbVEoDLZOTkgSlscWQEjs44uVDo3Lz+/oDArS0+fBVmBgSFUvqi4pLS0pKw8x8jYxJQVocBMFKKgorIUDKqqy8wtLK2gKhg1rG1sIQoKSkoRwM7eAayCkc3RCWpBTXUpMnB2gShwdYPI59bWFaMoKHVnB6lg9IDIl5eVlKIBC08vVg4GRm+wfE41hjwQ+PhyMjDK+IEU1JdhkS/1BzqDMSAQpKChDpsCuyCgKxilgkNCQ0PDsCkIjwA7MzIqOiY2Lt4OQz4hMYkTFpqc7MkpqWmoID0jk5VhhAAACRCdMcetY6oAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTUtMDctMjVUMjE6NDk6MzErMDg6MDBI0w9NAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE0LTExLTIwVDIyOjAzOjA0KzA4OjAwasKZswAAAE50RVh0c29mdHdhcmUASW1hZ2VNYWdpY2sgNi44LjgtMTAgUTE2IHg4Nl82NCAyMDE1LTA3LTE5IGh0dHA6Ly93d3cuaW1hZ2VtYWdpY2sub3JnBQycNQAAABh0RVh0VGh1bWI6OkRvY3VtZW50OjpQYWdlcwAxp/+7LwAAABh0RVh0VGh1bWI6OkltYWdlOjpIZWlnaHQAMjU26cNEGQAAABd0RVh0VGh1bWI6OkltYWdlOjpXaWR0aAAyNTZ6MhREAAAAGXRFWHRUaHVtYjo6TWltZXR5cGUAaW1hZ2UvcG5nP7JWTgAAABd0RVh0VGh1bWI6Ok1UaW1lADE0MTY0OTIxODRxfa6LAAAAE3RFWHRUaHVtYjo6U2l6ZQA4LjE1S0JC60cc4AAAAFp0RVh0VGh1bWI6OlVSSQBmaWxlOi8vL2hvbWUvd3d3cm9vdC93d3cuZWFzeWljb24ubmV0L2Nkbi1pbWcuZWFzeWljb24uY24vc3JjLzExODAxLzExODAxMzQucG5nPa8Q4wAAAABJRU5ErkJggg==" alt="">
                                Microsoft OneDrive
                            </a>
                        </nav>
                    </section>
                    &nbsp;or drop your <span class="allowed-file-type">file(s)</span> here</span>
                <span class="mobile-only">
                    <a href="javascript:;" class="native-file-picker">Upload</a> <span class="allowed-file-type">file(s)</span>
                </span>
            </div>
            <div class="hidden loadingzone">
                <div class="status">
                    Uploading <span class="summary"></span> ...
                </div>
                <div class="progress">
                    <div class="progress-bar">
                    </div>
                </div>
                <a class="cancel">
                    Cancel
                </a>
            </div>
            <div class="row">
                <div class="meta">
                    <span class="extension-limit">
                        Accepted file types: <span class="allowed-extensions"></span> <br>
                    </span>
                    <span class="size-limit">
                        Max file size: <span class="max-size"></span> MB
                    </span>
                </div>
            </div>
            <div class="files"></div>
            <input type="file" id="input_file" hidden>`;

        // Caches DOM query
        this.dropzone = this._shadowRoot.querySelector('.dropzone');
        this.loadingzone = this._shadowRoot.querySelector('.loadingzone');
        this.progressBar = this._shadowRoot.querySelector('.loadingzone .progress-bar');
        this.cancel = this._shadowRoot.querySelector('.loadingzone .cancel');
        this.dropdown = this._shadowRoot.querySelector('.dropdown');
        this.dropdownMenu = this._shadowRoot.querySelector('.menu');
        this.computerItem = this._shadowRoot.querySelector('.computer');
        this.dropboxItem = this._shadowRoot.querySelector('.dropbox');
        this.googleItem = this._shadowRoot.querySelector('.google-drive');
        this.microsoftItem = this._shadowRoot.querySelector('.microsoft-one-drive');
        this.fileItem = this._shadowRoot.querySelector('#input_file');
        this.allowedExtensions = this._shadowRoot.querySelector('.allowed-extensions');
        this.maxSizeItem = this._shadowRoot.querySelector('.max-size');
        this.errorsItem = this._shadowRoot.querySelector('.errors');
        this.uploaderIcon = this._shadowRoot.querySelector('.dropzone .file-icon');
        this.filesItem = this._shadowRoot.querySelector('.files');
        this.sizeLimitItem = this._shadowRoot.querySelector('.size-limit');
        this.allowedFileTypes = this._shadowRoot.querySelectorAll('.allowed-file-type');
        this.nativeFilePicker = this._shadowRoot.querySelector('.native-file-picker');
        this.fileItem.onchange = (evt) => {
            const files = evt.target.files;
            this.uploadAll(files);
        }
        // this._closeDropdownRef = this.closeDropdownmenu.bind(this);
        document.body.addEventListener('click', this._closeDropdownRef);
        this.dropdown.addEventListener('click', (evt) => {
            evt.stopPropagation();
            evt.preventDefault();
            this.dropdownMenu.classList.toggle('open');
        });
        this.computerItem.addEventListener('click', (evt) => {
            evt.stopPropagation();
            evt.preventDefault();
            this.dropdownMenu.classList.remove('open');
            this.fileItem.click();
        });
        this.nativeFilePicker.addEventListener('click', (evt) => {
            evt.stopPropagation();
            evt.preventDefault();
            this.fileItem.click();
        });
        this.dropboxItem.addEventListener('click', (evt) => {
            evt.stopPropagation();
            evt.preventDefault();
            this.dropdownMenu.classList.remove('open');
            this.dropboxService.openPicker();
        });
        this.googleItem.addEventListener('click', (evt) => {
            evt.stopPropagation();
            evt.preventDefault();
            this.dropdownMenu.classList.remove('open');
            this.googleService.openPicker();
        });
        this.microsoftItem.addEventListener('click', (evt) => {
            evt.stopPropagation();
            evt.preventDefault();
            this.dropdownMenu.classList.remove('open');
            this.oneDriveService.openPicker();
        });
        this.dropzone.addEventListener('dragover', (evt) => {
            evt.stopPropagation();
            evt.preventDefault();
            if (this.dropdownMenu.classList.contains('open')) {
                this.dropdownMenu.classList.remove('open');
            }
            this.dropzone.classList.add('dragover');
        });
        this.dropzone.addEventListener('dragleave', (evt) => {
            evt.stopPropagation();
            evt.preventDefault();
            this.dropzone.classList.remove('dragover');
        });
        this.dropzone.addEventListener('drop', (evt) => {
            evt.stopPropagation();
            evt.preventDefault();
            this.dropzone.classList.remove('dragover');
            var files = evt.dataTransfer.files; // FileList object.
            this.uploadAll(files);
        });
        this.cancel.addEventListener('click', (evt) => {
            evt.stopPropagation();
            evt.preventDefault();
            this.abort();
        });
        if (this.hasAttribute('url')) {
            this.url = this.getAttribute('url');
        }
        if (this.hasAttribute('fetch-url')) {
            this.fetchUrl = this.getAttribute('fetch-url');
        }
        if (this.hasAttribute('method')) {
            this.method = this.getAttribute('method');
        }
        if (this.hasAttribute('accept')) {
            this.accept = this.getAttribute('accept');
        }
        if (this.hasAttribute('max-size')) {
            this.maxSize = parseInt(this.getAttribute('max-size'));
        }
        if (this.hasAttribute('images-only')) {
            this.imagesOnly = this.getAttribute('images-only') === 'true';
            // default images extensions
            this.accept = 'image/*';
        }
        if (this.hasAttribute('default-list-view')) {
            this.defaultListView = this.getAttribute('default-list-view');
        }
        if (this.hasAttribute('max-items')) {
            this.maxItems = parseInt(this.getAttribute('max-items'));
        }
        this.setImagesOnly();
        this.setMaxSize();
        this.setAccept();
        this.setMaxItems();
    }
}
