export default class UploaderComponent extends window.HTMLElement {
    constructor () {
        super();
    }

    connectedCallback () {
        this.innerHTML = `
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
            <input type="file" id="input_file" hidden>
        `;
    }
}

class HostedFile {
    constructor () {
        this.name = '';
        this.bytes = 0;
        // the below object will store the information access to download file
        this.link = '';
    }

    // Takes the data sent from provider and construct a standard format file
    static build (data, provider, oauthToken) {
        if (Array.isArray(data)) {
            return data.map(function(rawHostedFile) {
                return HostedFile.build(rawHostedFile, provider, oauthToken);
            });
        } else {
            var result = new HostedFile();
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
        alert('Open picker function is not yet defined. Please overwrite this function');
    }

    callback (data, fetchUrl, cb) {
        // to convert single file to file list so we can call forEach
        var self = this;
        var hostedFiles = HostedFile.build(data, this.name, this.oauthToken);
        if (!Array.isArray(hostedFiles)) {
            hostedFiles = [hostedFiles];
        }
        var request = new XMLHttpRequest();
        var url = fetchUrl.indexOf('?') > 0 ?
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
