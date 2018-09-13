const HostedFile = require('./HostedFile');

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

    callback (data, fetchUrl, cb) {
        // to convert single file to file list so we can call forEach
        let hostedFiles = HostedFile.build(data, this.name, this.oauthToken);
        if (!Array.isArray(hostedFiles)) {
            hostedFiles = [hostedFiles];
        }
        let request = new XMLHttpRequest();
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
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
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

module.exports = HostedFileService;