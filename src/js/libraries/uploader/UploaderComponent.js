const AWS = require('aws-sdk');

export default class UploaderComponent extends window.HTMLElement {
    constructor() {
        super();
        // For Kitchen Sink - Retrieve sensitive values from localStorage
        const settings = JSON.parse(localStorage.getItem('uploader-settings'));
        if (settings) {
        	// Edlio Config.
            this.s3BucketName = settings.s3BucketName;
            this.s3BucketRegion = settings.s3BucketRegion;
            this.s3IdentityPoolId = settings.s3IdentityPoolId;
            this.filesMicroserviceURL = settings.filesMicroserviceURL;
            // Google Config.
            this.googlePickerCallback = settings.googlePickerCallback;
            this.googleAPIKey = settings.googleAPIKey;
            this.googleOAuthClientId = settings.googleOAuthClientId;
            // Dropbox Config.
            this.dropboxAppKey = settings.dropboxAppKey;
            // MS OneDrive Config. ???
        }
        // For Production - Retrieve sensitive values from Catalina Properties
        // UNDER CONSTRUCTION

        this.url = 'http://localhost:20010/v1/upload';
        this.fetchUrl = 'http://localhost:20010/v1/fetch';
        if (this.filesMicroserviceURL) {
        	this.url = this.filesMicroserviceURL + "/v1/upload";
        	this.fetchUrl = this.filesMicroserviceURL + "/v1/fetch";
        }
        this.method = 'POST';
        this.accept = "";
        this.maxSize = 0; // default to 5MB | 0 indicated no limit
        this.errors = [];
        this._files = [];
        this.maxItems = 0; // 0 for unlimitted

        AWS.config.update({
            region: this.s3BucketRegion,
            credentials: new AWS.CognitoIdentityCredentials({
                IdentityPoolId: this.s3IdentityPoolId
            })
        });
        this.s3 = new AWS.S3({
            apiVersion: '2006-03-01',
            params: {Bucket: this.s3BucketName}
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

    abort () {
        for (let key in this.currUploads) {
            this.currUploads[key][0].abort();
        }    
        this.currUploads = {};
        this.fileItem.value = null;
        this.dropzone.classList.remove('hidden');
        this.loadingzone.classList.add('hidden');
        this.progressBar.style.width = 0 + '%';
        this.cancel.classList.remove('hidden');
        this.progressBar.classList.remove('indeterminate');
    }

    setUploadingStatus (files) {
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

    /*
    handleOneDriveMessage (event) {
        var response = JSON.parse(event.data);
        if (!response || !response.value) {
            return;
        }
        if (this.imagesOnly) {
            // validate files to only images only
            if (response.value.some(isNotImage)) {
                alert('Please upload only image files (like .jpg, jpeg, .png or .gif)');
                window.removeEventListener('message', this.handleOneDriveMessageInstance);
                return;
            }
        }
        this.setUploadingStatus(response.value);
        this.request = this.oneDriveService.callback(response.value, this.fetchUrl, function(err, type, data) {
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
        function isNotImage (file) {
            return !file.name.match(/\.(jpg|jpeg|png|gif|bmp)$/);
        }
    };
    */

    updateProgress (uploadObj, uploadEvt) {
        const updateKey = uploadObj.params.Key;
        let sumProgress = 0;
        let partialProgress = 0;

        this.currUploads[updateKey] = [uploadObj, uploadEvt];

        for (let key in this.currUploads) {
            partialProgress = parseInt((this.currUploads[key][1].loaded * 100) / this.currUploads[key][1].total);
            sumProgress += partialProgress;
        }
        const avgProgress = sumProgress / Object.keys(this.currUploads).length;
        const uploadProgressEvent = new CustomEvent('upload-progress', {
            'detail': avgProgress
        });
        this.dispatchEvent(uploadProgressEvent);      
    }

    uploadAll (files) {
        if (!files.length) {
            return alert('Please choose a file to upload first.');
        }
        let validFiles = [];
        for (let i = 0; i < files.length; i ++) {
            // Check if filetype is accepted
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
        this.setErrors();
        if (!validFiles.length) {
            return;
        }

        const uploadStartEvent = new CustomEvent('upload-start', {});
        this.dispatchEvent(uploadStartEvent);


        let promiseFiles = validFiles.map(file => 
            this.uploadFile(file)
        );
        Promise.all(promiseFiles).then(values => {
            const uploadFinishEvent = new CustomEvent('upload-finish', {
                "detail": values
            });
            this.dispatchEvent(uploadFinishEvent);
        }).catch( e => {
            console.log(e);
            this.setErrors();
        });
    }

    uploadFile (file) {
        return new Promise((resolve, reject) => {
            const fileName = file.name;
            // TODO: change key
            const albumPhotosKey = encodeURIComponent('testAlbum') + '/';
            const timeStamp = new Date().getTime().toString();
            const photoKey = albumPhotosKey + timeStamp + "-" + fileName;

            const uploadObj = this.s3.putObject({
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
                    reject(err);
                }
                resolve(fileName);
            })
            .on('httpUploadProgress', (evt) => {
                this.updateProgress(uploadObj, evt);
            });
        });  
    }

    connectedCallback () {
    	const self = this;

        Dropbox.appKey = this.dropboxAppKey;
        this.dropboxService = new HostedFileService();
        this.dropboxService.name = 'dropbox';
        this.dropboxService.openPicker = () => {
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
                    this.request = this.dropboxService.callback(files, this.fetchUrl, (err, type, data) => {
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
                multiselect: self.maxItems === 0 || self.maxItems > 1,
                extensions:
                    (self.imagesOnly) ?
                        ['images'] :
                        self.accept
            });
        };

        this.googleService = new HostedFileService();
        this.googleService.name = 'google';
        this.googleService.openPicker = function() {
            var googleDriveSelf = this;
            // TODO: get from attribute
            var GOOGLE_API_KEY = self.googleAPIKey;
            // The Client ID obtained from the Google Developers Console.
            var GOOGLE_OAUTH_CLIENT_ID = self.googleOAuthClientId;
            // Scope to use to read user's drive data.
            var scope = ['https://www.googleapis.com/auth/drive.readonly'];
            var pickerApiLoaded = false;
            var oauthToken = JSON.parse(
                window.sessionStorage.getItem(GOOGLE_API_KEY)
            );
            // note that expireAt provided by Google is in second as unit
            if (oauthToken && new Date(parseInt(oauthToken.expireAt) * 1000) > new Date()) {
                googleDriveSelf.oauthToken = oauthToken;
            } else {
                window.sessionStorage.removeItem(GOOGLE_API_KEY);
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
                //var callbackDomain = 'https://callbacks.edlio.com';
                var url = 'https://accounts.google.com/o/oauth2/auth' +
                    '?response_type=token' +
                    '&client_id=' + encodeURIComponent(GOOGLE_OAUTH_CLIENT_ID) +
                    '&scope=' + encodeURIComponent(scope) +
                    '&redirect_uri=' + encodeURIComponent(self.googlePickerCallback);
                window.open(url, '_blank', 'width=500,height=500');
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
                        GOOGLE_API_KEY,
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
                    if (self.maxItems === 0 || self.maxItems > 1) {
                        builder = builder.enableFeature(google.picker.Feature.MULTISELECT_ENABLED);
                    }
                    if (self.maxItems > 1) {
                        builder.setMaxItems(self.maxItems);
                    }
                    if (self.imagesOnly) {
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
                self.errors = [];
                if (data.action == google.picker.Action.PICKED) {
                    self.setUploadingStatus(data.docs);
                    self.request = self.googleService.callback(data.docs, self.fetchUrl, function(err, type, data) {
                        self.setErrors();
                        if (err) {
                            self.dropzone.classList.remove('hidden');
                            self.loadingzone.classList.add('hidden');
                            var errorEvent = new CustomEvent('error', {
                                'detail': err
                            });
                            self.dispatchEvent(errorEvent);
                            self.errors.push({type: 'unknown'});
                            self.setErrors();
                            self.request = null;
                            self.progressBar.style.width = 0 + '%';
                            self.cancel.classList.remove('hidden');
                            self.progressBar.classList.remove('indeterminate');
                            return;
                        }
                        switch (type) {
                            case 'done':
                                self.dropzone.classList.remove('hidden');
                                self.loadingzone.classList.add('hidden');
                                self.files = self.files.concat(data);
                                var uploadedEvent = new CustomEvent('uploaded', {
                                    'detail': data
                                });
                                self.dispatchEvent(uploadedEvent);
                                self.request = null;
                                self.progressBar.style.width = 0 + '%';
                                self.cancel.classList.remove('hidden');
                                self.progressBar.classList.remove('indeterminate');
                                break;
                            case 'onprogess':
                                if (data.lengthComputable) {
                                    self.progressBar.max = data.total;
                                    self.progressBar.value = data.loaded;
                                    var percentage = parseInt((data.loaded / data.total) * 100);
                                    self.progressBar.style.width = percentage + '%';
                                    self.progressBar.textContent = percentage + '%';
                                    if (percentage === 100) { // for firefox
                                        self.progressBar.textContent = '';
                                        self.cancel.classList.add('hidden');
                                        self.progressBar.classList.add('indeterminate');
                                    }
                                }
                                break;
                            case 'onloadstart':
                                self.progressBar.value = 0;
                                self.dropzone.classList.add('hidden');
                                self.loadingzone.classList.remove('hidden');
                            case 'onloadend':
                                self.progressBar.style.width = 100 + '%';
                                self.progressBar.textContent = '';
                                self.cancel.classList.add('hidden');
                                self.progressBar.classList.add('indeterminate');
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
        this.oneDriveService.openPicker = () => {
            window.removeEventListener('message', handleOneDriveMessageInstance);
            window.addEventListener('message', handleOneDriveMessageInstance);
            var url ='https://callbacks.edlio.com/apps/files/onedrive';
            window.open(url, '_blank', 'width=800,height=600');

            function handleOneDriveMessage (event) {
		        var response = JSON.parse(event.data);
		        if (!response || !response.value) {
		            return;
		        }
		        if (this.imagesOnly) {
		            // validate files to only images only
		            if (response.value.some(isNotImage)) {
		                alert('Please upload only image files (like .jpg, jpeg, .png or .gif)');
		                window.removeEventListener('message', this.handleOneDriveMessageInstance);
		                return;
		            }
		        }
		        this.setUploadingStatus(response.value);
		        this.request = this.oneDriveService.callback(response.value, this.fetchUrl, function(err, type, data) {
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
		    };

		    function isNotImage (file) {
	            return !file.name.match(/\.(jpg|jpeg|png|gif|bmp)$/);
	        }
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
            <style>${require('../../sass/components/file-uploader.scss').toString()}</style>
            ${require('../../templates/uploader.html').toString()}
        `;

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

        this.addEventListener('upload-start', (e) => {
            this.progressBar.value = 0;
            this.dropzone.classList.add('hidden');
            this.loadingzone.classList.remove('hidden');
        });

        this.addEventListener('upload-progress', (e) => {
            const percentage = e.detail;
            this.progressBar.style.width = percentage + '%';
            this.progressBar.textContent = percentage + '%';
            if (percentage === 100) { // for firefox
                this.progressBar.textContent = '';
                this.cancel.classList.add('hidden');
                this.progressBar.classList.add('indeterminate');
            }
        });

        this.addEventListener('upload-finish', (e) => {
            console.log("Upload Finished!", e.detail);
            this.fileItem.value = null;
            this.uploadProgress = 0;
            this.currUploads = {};

            this.progressBar.style.width = 100 + '%';
            this.progressBar.textContent = '';
            this.cancel.classList.add('hidden');
            this.progressBar.classList.add('indeterminate');
            this.dropzone.classList.remove('hidden');
            this.loadingzone.classList.add('hidden');

            this.progressBar.style.width = 0 + '%';
            this.cancel.classList.remove('hidden');
            this.progressBar.classList.remove('indeterminate');
        });

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

        //track upload progress
        this.uploadProgress = 0;
        this.currUploads = {};
    }
}