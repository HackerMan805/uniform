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