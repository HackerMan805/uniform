!function(e,o){for(var n in o)e[n]=o[n]}(window,function(e){function o(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,o),r.l=!0,r.exports}var n={};return o.m=e,o.c=n,o.d=function(e,n,t){o.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:t})},o.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(n,"a",n),n},o.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},o.p="",o(o.s=5)}([function(e,o,n){"use strict";function t(e,o,n){return e+(-1===e.indexOf("?")?"?":"&")+o+"="+n}function r(e){return t(e,"version",encodeURIComponent(Dropbox.VERSION))}function i(e,o){var n=encodeURIComponent(window.location.protocol+"//"+window.location.host),i=encodeURIComponent(Dropbox.appKey),s=encodeURIComponent(e.linkType||""),a=encodeURIComponent(e._trigger||"js"),c=Boolean(e.multiselect),l=encodeURIComponent(u(e.extensions,"join",function(e){return e.join(" ")})||""),p=Boolean(e.folderselect);o=Boolean(o);var d=Dropbox.baseUrl+"/chooser?origin="+n+"&app_key="+i+"&link_type="+s+"&trigger="+a+"&multiselect="+c+"&extensions="+l+"&folderselect="+p+"&iframe="+o;return void 0!==e.fileselect&&(d=t(d,"fileselect",Boolean(e.fileselect))),void 0!==e.sizeLimit&&(d=t(d,"size_limit",e.sizeLimit)),null!=e.initialNavigation&&(null!=e.initialNavigation.mode&&(d=t(d,"initial_navigation_mode",encodeURIComponent(e.initialNavigation.mode))),null!=e.initialNavigation.role&&(d=t(d,"initial_navigation_role",encodeURIComponent(e.initialNavigation.role))),e.initialNavigation.cursor&&(d=t(d,"initial_navigation_cursor",encodeURIComponent(e.initialNavigation.cursor)))),null!=e.initialViewType&&(d=t(d,"initial_view_type",encodeURIComponent(e.initialViewType))),null!=e.fields&&(d=t(d,"fields",encodeURIComponent("function"==typeof e.fields.join?e.fields.join(" "):void 0))),!1===e.showSignOut&&(d=t(d,"show_sign_out","false")),r(d)}function s(e){var n={options:d({},e,{success:function(t,r){"function"==typeof e.success&&e.success(t,r),o.currentChooserSession===n&&(o.currentChooserSession=null)},cancel:function(t){"function"==typeof e.cancel&&e.cancel(t),o.currentChooserSession===n&&(o.currentChooserSession=null)}})};return o.currentChooserSession=n,n}function a(e){var o=document.createElement("iframe");return o.src="about:blank",o._postAction=e,o.name="dropbox-dropins",o.style.display="block",o.style.backgroundColor="white",o.style.border="none",o}function c(e,o){var n,t=encodeURIComponent(Dropbox.appKey),i=Dropbox.baseUrl+"/dropins/job_status?job="+o+"&app_key="+t;i=r(i);var s=function(o){"COMPLETE"===o.status?("function"==typeof e.progress&&e.progress(1),"function"==typeof e.success&&e.success()):"PENDING"===o.status||"DOWNLOADING"===o.status?(null!=o.progress&&"function"==typeof e.progress&&e.progress(o.progress/100),setTimeout(n,1500)):"FAILED"===o.status&&"function"==typeof e.error&&e.error(o.error)};if("withCredentials"in new XMLHttpRequest)n=function(){var o=new XMLHttpRequest;return o.onload=function(){return s(JSON.parse(o.responseText))},o.onerror=function(){return"function"==typeof e.error?e.error():void 0},o.open("GET",i,!0),o.send()};else if(Dropbox.disableJSONP){if("undefined"==typeof XDomainRequest||null===XDomainRequest||"https:"!==document.location.protocol)throw new Error("Unable to find suitable means of cross domain communication");n=function(){var o=new XDomainRequest;return o.onload=function(){return s(JSON.parse(o.responseText))},o.onerror=function(){return"function"==typeof e.error?e.error():void 0},o.open("get",i),o.send()}}else n=function(){var o="DropboxJsonpCallback"+p++,n=!1;window[o]=function(e){return n=!0,s(e)};var t=document.createElement("script");return t.src=i+"&callback="+o,t.onreadystatechange=function(){if("loaded"===t.readyState)return n||"function"==typeof e.error&&e.error(),null!=t.parentNode?t.parentNode.removeChild(t):void 0},document.getElementsByTagName("head")[0].appendChild(t)};return"function"==typeof e.progress&&e.progress(0),n()}function l(e,n,t){var r,i=JSON.parse(e.data);switch(r=null!=o.ieframe&&t._popup?o.ieframe.contentWindow:e.source,void 0!==i.sequence_number&&r.postMessage(JSON.stringify({method:"ack",sequence_number:i.sequence_number}),Dropbox.baseUrl),i.method){case"origin_request":e.source.postMessage(JSON.stringify({method:"origin"}),Dropbox.baseUrl);break;case"ready":if(null!=t.files){var s=void 0;if(t._fetch_url_on_save){for(var a=[],l=0;l<t.files.length;l++){var u=t.files[l];a.push({filename:u.filename})}s=JSON.stringify({method:"files_with_callback",params:a})}else s=JSON.stringify({method:"files",params:t.files});if(r.postMessage(s,Dropbox.baseUrl),null!=t._ews_auth_token){var p=JSON.stringify({method:"ews_auth_token",params:{ews_auth_token:t._ews_auth_token}});r.postMessage(p,Dropbox.baseUrl)}}"function"==typeof t.ready&&t.ready();break;case"files_selected":case"files_saved":"function"==typeof n&&n(),"function"==typeof t.success&&t.success(i.params,o.last_navigation);break;case"cursor_changed":o.last_navigation={cursor:i.params};break;case"progress":"function"==typeof t.progress&&t.progress(i.params);break;case"close_dialog":"function"==typeof n&&n(),"function"==typeof t.cancel&&t.cancel(o.last_navigation);break;case"resize":"function"==typeof t.resize&&t.resize(i.params);break;case"error":"function"==typeof n&&n(),"function"==typeof t.error&&t.error(i.params);break;case"job_id":"function"==typeof n&&n(),c(t,i.params);break;case"save_callback":!function(e,o,n){if(e._fetch_url_on_save){var t=e.fetch_urls_fn;"function"!=typeof t&&"function"==typeof e.error&&e.error("Something went wrong, file url callback not provided."),t(n,o)}}(t,i.params,function(e){if(null==e)throw new Error("Please supply {urls: [...]} to success callback");if(null!=e.url&&null!=e.urls)throw new Error("Do not pass both url and urls to the save callback");if(null!=e.url&&(e.urls=[e.url]),null==e.urls)throw new Error("Please supply {urls: [...]} to success callback");return i={method:"continue_saving",params:{download_urls:e.urls}},void r.postMessage(JSON.stringify(i),Dropbox.baseUrl)});break;case"_debug_log":"undefined"!=typeof console&&null!==console&&console.log(i.params.msg)}}function u(e,o,n){return void 0!==e&&null!==e&&"function"==typeof e[o]?n(e,o):void 0}var p,d=this&&this.__assign||Object.assign||function(e){for(var o,n=1,t=arguments.length;n<t;n++){o=arguments[n];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e};Object.defineProperty(o,"__esModule",{value:!0}),null==window.Dropbox&&(window.Dropbox={}),o.popupDimensionsString=function(e,o){return"width="+e+",height="+o+",left="+(window.screenX+((window.outerWidth||document.documentElement.offsetWidth)-e)/2)+",top="+(window.screenY+((window.outerHeight||document.documentElement.offsetHeight)-o)/2)},o.chooserUrl=i,o.createIEFrame=function(){/\bTrident\b/.test(navigator.userAgent)&&null!=document.body&&null==o.ieframe&&(o.ieframe=document.createElement("iframe"),o.ieframe.setAttribute("id","dropbox_xcomm"),o.ieframe.setAttribute("src",Dropbox.baseUrl+"/static/api/1/xcomm.html"),o.ieframe.style.display="none",document.body.appendChild(o.ieframe))},o.createChooserSession=s,o.createWidgetElement=a,o.handleJobId=c,o.handleMessageEvent=l,o.saverUrl=function(){var e=encodeURIComponent(window.location.protocol+"//"+window.location.host),o=encodeURIComponent(Dropbox.appKey);return r(Dropbox.baseUrl+"/saver?origin="+e+"&app_key="+o)},o.__guardMethod__=u,o.__guard__=function(e,o){return void 0!==e&&null!==e?o(e):void 0},o.initModule=function(){o.last_navigation={},o.ieframe=null,o.currentChooserSession=null,p=1,null==Dropbox.baseUrl&&(Dropbox.baseUrl="https://www.dropbox.com"),null==Dropbox.blockBaseUrl&&(Dropbox.blockBaseUrl="https://dl-web.dropbox.com"),Dropbox.addListener=function(e,o,n){e.addEventListener?e.addEventListener(o,n,!1):e.attachEvent("on"+o,function(e){return e.preventDefault=function(){return!1},n(e)})},Dropbox.removeListener=function(e,o,n){e.removeEventListener?e.removeEventListener(o,n,!1):e.detachEvent("on"+o,n)},Dropbox.createChooserWidget=function(e){var o=s(e),n=a(i(o.options,!0));return n._handler=function(e){e.source===n.contentWindow&&e.origin===Dropbox.baseUrl&&l(e,null,o.options)},Dropbox.addListener(window,"message",n._handler),n},Dropbox.cleanupWidget=function(e){if(!e._handler)throw new Error("Invalid widget!");Dropbox.removeListener(window,"message",e._handler),delete e._handler}}},function(e,o,n){"use strict";function t(e,o){null!=o?o.innerHTML="":(o=document.createElement("a")).href="#",o.className+=" dropbox-dropin-btn",Dropbox.isBrowserSupported()?o.className+=" dropbox-dropin-default":o.className+=" dropbox-dropin-disabled";var n=document.createElement("span");return n.className="dropin-btn-status",o.appendChild(n),e=document.createTextNode(e),o.appendChild(e),o}function r(e){return e.replace(/\/+$/g,"").split("/").pop()}function i(e){var o=document.createElement("a");return o.href=e,r(o.pathname)}Object.defineProperty(o,"__esModule",{value:!0});var s=n(0),a=["text","documents","images","video","audio"];o.genericDropins={init:function(){}};var c=function(e){return e};o.createDropinButton=t,o.filenameFromPath=r,o.initModule=function(){s.initModule(),null==Dropbox.appKey&&(Dropbox.appKey=s.__guard__(document.getElementById("dropboxjs"),function(e){return e.getAttribute("data-app-key")})),Dropbox.init=function(e){null!=e.translation_function&&(c=e.translation_function),null!=e.appKey&&(Dropbox.appKey=e.appKey)};var e=function(e){var o,n,t;if("string"==typeof e[0])t=e.shift(),o="string"==typeof e[0]?e.shift():i(t),(n=e.shift()||{}).files=[{url:t,filename:o}];else{if(null==(n=e.shift()))throw new Error("Missing arguments. See documentation.");if((null==n.files||!n.files.length)&&"function"!=typeof n.files)throw new Error("Missing files. See documentation.");if(null!=n.fetch_urls_fn){if("function"!=typeof n.fetch_urls_fn)throw new Error("fetch_urls_fn must be a function if supplied.  See documentation.");n._fetch_url_on_save=!0}for(var r=0;r<n.files.length;r++){var s=n.files[r];if("function"==typeof s.url&&(n._fetch_url_on_save=!0,n.fetch_urls_fn=s.url,s.url=null,r>0))throw new Error("Old style url as callback is only supported for single files.");s.filename||(s.filename=i(s.url))}}return n};Dropbox.save=function(){for(var o=[],t=0;t<arguments.length;t++)o[t]=arguments[t];var r=e(o);if(Dropbox.isBrowserSupported()){if(r._popup=!0,"object"!=typeof r.files||!r.files.length)throw new Error("The object passed in must have a 'files' property that contains a list of objects. See documentation.");if(r.iframe&&!r.windowName)throw new Error("Dropbox.save does not yet support creating its own iframe.                       windowName must be provided when the iframe option is present.");for(var i=0,a=r.files;i<a.length;i++){var l=a[i];if(r._fetch_url_on_save){if(r.fetch_urls_fn){if(null!=l.url)throw new Error("You passed in a 'fetch_urls_fn' option to specify the file URLs.  Don't include individual URLs in each file objects.")}else if("function"!=typeof l.url)throw new Error("File urls should be all urls, or a single file with function. See documentation.")}else if("string"!=typeof l.url)throw new Error("File urls to download incorrectly configured. Each file must have a url. See documentation.")}var u=s.popupDimensionsString(735,670);return n(s.saverUrl(),u,r).window}alert(c("Your browser does not support the Dropbox Saver"))};var n=function(e,o,n){var t=function(){a.closed||(a.close(),a.postMessage(JSON.stringify({method:"close"}),Dropbox.baseUrl)),Dropbox.removeListener(window,"message",r),clearInterval(c)},r=function(e){e.source!==a&&e.source!==(void 0!==s.ieframe&&null!==s.ieframe?s.ieframe.contentWindow:void 0)||s.handleMessageEvent(e,t,n)},i=n.iframe?"":o+",resizable,scrollbars",a=window.open(e,n.windowName||"dropbox",i);if(!a)throw new Error("Failed to open/load the window. Dropbox.choose and Dropbox.save should only be called from within a user-triggered event handler such as a tap or click event.");a.focus();var c=setInterval(function(){(function(){try{return a.closed}catch(e){}})()&&(t(),"function"==typeof n.cancel&&n.cancel(s.last_navigation))},100);return Dropbox.addListener(window,"message",r),{window:a,onClose:t}},r=function(e){null==e.success&&s.__guardMethod__(console,"warn",function(e){return e.warn("You must provide a success callback to the Chooser to see the files that the user selects")}),void 0===e.fileselect||Boolean(e.fileselect)||Boolean(e.folderselect)||s.__guardMethod__(console,"error",function(e){return e.error("You must enable either fileselect or folderselect on the Chooser so the user can select something")});var o=function(){return s.__guardMethod__(console,"warn",function(e){return e.warn("The provided list of extensions or file types is not valid. See Chooser documentation: https://www.dropbox.com/developers/dropins/chooser/js")}),s.__guardMethod__(console,"warn",function(e){return e.warn("Available file types are: "+a.join(", "))}),delete e.extensions};if(null!=e.extensions&&null!=Array.isArray)if(Array.isArray(e.extensions))for(var n=0,t=e.extensions;n<t.length;n++){var r=t[n];r.match(/^\.[\.\w$#&+@!()\-'`_~]+$/)||-1!==a.indexOf(r)||o()}else o();return void 0!==e.sizeLimit&&"number"!=typeof e.sizeLimit&&e.sizeLimit<=0&&s.__guardMethod__(console,"error",function(e){return e.error("The sizeLimit option, if provided, must be a positive number")}),e},l=function(e){if(Dropbox.isBrowserSupported()){var o,t,r=s.createChooserSession(e);if(e.iframe&&!e.windowName){var i=(o=s.chooserUrl(e,!0),(t=document.createElement("iframe")).src=o,t.style.display="block",t.style.backgroundColor="white",t.style.border="none",t);i.style.width="735px",i.style.height="552px",i.style.margin="125px auto 0 auto",i.style.border="1px solid #ACACAC",i.style.boxShadow="rgba(0, 0, 0, .2) 0px 4px 16px";var a=document.createElement("div");a.style.position="fixed",a.style.left=a.style.right=a.style.top=a.style.bottom="0",a.style.zIndex="1000",a.style.backgroundColor="rgba(160, 160, 160, 0.2)",a.appendChild(i),document.body.appendChild(a);var l=function(e){e.source===i.contentWindow&&(r.onClose=function(){document.body.removeChild(a),Dropbox.removeListener(window,"message",l)},s.handleMessageEvent(e,r.onClose,r.options))};Dropbox.addListener(window,"message",l)}else{var u=s.popupDimensionsString(735,552);r.onClose=n(s.chooserUrl(r.options,r.options.iframe),u,r.options).onClose}}else alert(c("Your browser does not support the Dropbox Chooser"))};Dropbox.choose=function(e){null==e&&(e={}),e=r(e),l(e)},Dropbox.cancelChooser=function(){s.currentChooserSession&&(s.currentChooserSession.onClose&&s.currentChooserSession.onClose(),s.currentChooserSession.options.cancel&&s.currentChooserSession.options.cancel(s.last_navigation))},Dropbox.isBrowserSupported=function(){var e=function(){for(var e=0,o=[/IEMobile\/(7|8|9|10)\./,/BB10;/,/CriOS/];e<o.length;e++)if(o[e].test(navigator.userAgent))return!1;return"undefined"!=typeof JSON&&null!==JSON&&null!=window.postMessage&&null!=window.addEventListener&&!/MSIE [7-9]/.test(navigator.userAgent)}();return Dropbox.isBrowserSupported=function(){return e},e},Dropbox.createChooseButton=function(e){null==e&&(e={}),e=r(e);var o=t(c("Choose from Dropbox"));return Dropbox.addListener(o,"click",function(n){n.preventDefault(),l({success:function(n,t){o.className="dropbox-dropin-btn dropbox-dropin-success","function"==typeof e.success&&e.success(n,t)},cancel:e.cancel,linkType:e.linkType,multiselect:e.multiselect,fileselect:e.fileselect,folderselect:e.folderselect,extensions:e.extensions,sizeLimit:e.sizeLimit,iframe:e.iframe,_trigger:"button"})}),o},Dropbox.createSaveButton=function(){for(var o=[],n=0;n<arguments.length;n++)o[n]=arguments[n];var r=e(o),i=o.shift();return i=t(c("Save to Dropbox"),i),Dropbox.addListener(i,"click",function(e){if(e.preventDefault(),i.className.indexOf("dropbox-dropin-error")>=0||i.className.indexOf("dropbox-dropin-default")>=0||i.className.indexOf("dropbox-dropin-disabled")>=0){var o=("function"==typeof r.files?r.files():void 0)||r.files;if(!(null!=o?o.length:void 0))return i.className="dropbox-dropin-btn dropbox-dropin-error",void("function"==typeof r.error&&r.error("Missing files"));Dropbox.save({files:o,success:function(){i.className="dropbox-dropin-btn dropbox-dropin-success","function"==typeof r.success&&r.success()},progress:function(e){i.className="dropbox-dropin-btn dropbox-dropin-progress","function"==typeof r.progress&&r.progress(e)},cancel:function(){"function"==typeof r.cancel&&r.cancel()},error:function(e){i.className="dropbox-dropin-btn dropbox-dropin-error","function"==typeof r.error&&r.error(e)}})}}),i};var u=function(e,o){return"  background: "+e+";\n  background: -moz-linear-gradient(top, "+e+" 0%, "+o+" 100%);\n  background: -webkit-linear-gradient(top, "+e+" 0%, "+o+" 100%);\n  background: linear-gradient(to bottom, "+e+" 0%, "+o+" 100%);\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='"+e+"', endColorstr='"+o+"',GradientType=0);  "},p=document.createElement("style");p.type="text/css";var d='  @-webkit-keyframes rotate {\n    from  { -webkit-transform: rotate(0deg); }\n    to   { -webkit-transform: rotate(360deg); }\n  }\n\n  @keyframes rotate {\n    from  { transform: rotate(0deg); }\n    to   { transform: rotate(360deg); }\n  }\n\n    .dropbox-dropin-btn, .dropbox-dropin-btn:link, .dropbox-dropin-btn:hover {\n      display: inline-block;\n      height: 14px;\n      font-family: "Lucida Grande", "Segoe UI", "Tahoma", "Helvetica Neue", "Helvetica", sans-serif;\n      font-size: 11px;\n      font-weight: 600;\n      color: #636363;\n      text-decoration: none;\n      padding: 1px 7px 5px 3px;\n      border: 1px solid #ebebeb;\n      border-radius: 2px;\n      border-bottom-color: #d4d4d4;\n      '+u("#fcfcfc","#f5f5f5")+"\n    }\n\n    .dropbox-dropin-default:hover, .dropbox-dropin-error:hover {\n      border-color: #dedede;\n      border-bottom-color: #cacaca;\n      "+u("#fdfdfd","#f5f5f5")+"\n    }\n\n    .dropbox-dropin-default:active, .dropbox-dropin-error:active {\n      border-color: #d1d1d1;\n      box-shadow: inset 0 1px 1px rgba(0,0,0,0.1);\n    }\n\n    .dropbox-dropin-btn .dropin-btn-status {\n      display: inline-block;\n      width: 15px;\n      height: 14px;\n      vertical-align: bottom;\n      margin: 0 5px 0 2px;\n      background: transparent url('"+Dropbox.baseUrl+"/static/images/widgets/dbx-saver-status.png') no-repeat;\n      position: relative;\n      top: 2px;\n    }\n\n    .dropbox-dropin-default .dropin-btn-status {\n      background-position: 0px 0px;\n    }\n\n    .dropbox-dropin-progress .dropin-btn-status {\n      width: 18px;\n      margin: 0 4px 0 0;\n      background: url('"+Dropbox.baseUrl+"/static/images/widgets/dbx-progress.png') no-repeat center center;\n        -webkit-animation-name: rotate;\n        -webkit-animation-duration: 1.7s;\n        -webkit-animation-iteration-count: infinite;\n        -webkit-animation-timing-function: linear;\n      animation-name: rotate;\n      animation-duration: 1.7s;\n      animation-iteration-count: infinite;\n      animation-timing-function: linear;\n    }\n\n    .dropbox-dropin-success .dropin-btn-status {\n      background-position: -15px 0px;\n    }\n\n    .dropbox-dropin-disabled {\n      background: #e0e0e0;\n      border: 1px #dadada solid;\n      border-bottom: 1px solid #ccc;\n      box-shadow: none;\n    }\n\n    .dropbox-dropin-disabled .dropin-btn-status {\n      background-position: -30px 0px;\n    }\n\n    .dropbox-dropin-error .dropin-btn-status {\n      background-position: -45px 0px;\n    }\n\n  @media only screen and (-webkit-min-device-pixel-ratio: 1.4) {\n      .dropbox-dropin-btn .dropin-btn-status {\n        background-image: url('"+Dropbox.baseUrl+"/static/images/widgets/dbx-saver-status-2x.png');\n        background-size: 60px 14px;\n          -webkit-background-size: 60px 14px;\n      }\n\n      .dropbox-dropin-progress .dropin-btn-status {\n        background: url('"+Dropbox.baseUrl+"/static/images/widgets/dbx-progress-2x.png') no-repeat center center;\n        background-size: 20px 20px;\n          -webkit-background-size: 20px 20px;\n      }\n  }\n\n    .dropbox-saver:hover, .dropbox-chooser:hover {\n      text-decoration: none;\n      cursor: pointer;\n    }\n\n    .dropbox-chooser, .dropbox-dropin-btn {\n      line-height: 11px !important;\n      text-decoration: none !important;\n      box-sizing: content-box !important;\n        -webkit-box-sizing: content-box !important;\n        -moz-box-sizing: content-box !important;\n    }\n    ";p.styleSheet?p.styleSheet.cssText=d:p.textContent=d,document.getElementsByTagName("head")[0].appendChild(p),setTimeout(s.createIEFrame,0);var f=function(){document.removeEventListener?document.removeEventListener("DOMContentLoaded",f,!1):document.detachEvent&&document.detachEvent("onreadystatechange",f),s.createIEFrame(),o.genericDropins.init()};"interactive"===document.readyState||"complete"===document.readyState?setTimeout(f,0):document.addEventListener?document.addEventListener("DOMContentLoaded",f,!1):document.attachEvent("onreadystatechange",f)}},function(e,o,n){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var t=window.location.protocol+"//"+window.location.host,r=function(){function e(o){if(this.origin=t,this.sendMessage=function(e){},this.state={},this.options=o,!this.options)throw new Error("options must be provided");if(!this.options.appKey)throw new Error("appKey must be provided");e.validateOnError(this.options.onError)}return e.validateOnError=function(e){if(e&&"function"!=typeof e)throw new Error("onError must be a function")},e.prototype.setOnError=function(o){e.validateOnError(o),this.options.onError=o},e.prototype.hasOnCloseDialogMessage=function(){return void 0!==this.onCloseDialogMessage},e.prototype.setOnCloseDialogMessage=function(e){if("function"!=typeof e)throw new Error("onCloseDialogMessage must be a function");this.onCloseDialogMessage=e},e.prototype.sendState=function(){this.sendMessage({method:"state",params:this.state})},e.prototype.url=function(){var e=[{key:"app_key",value:this.options.appKey},{key:"origin",value:this.origin}].concat(this.urlParams()).map(function(e){return encodeURIComponent(e.key)+"="+encodeURIComponent(e.value)}).join("&");return{pathname:this.urlPathname(),search:"?"+e}},e.prototype.windowDimensions=function(){return{width:735,height:552}},e.prototype.urlParams=function(){return[]},e.prototype.urlPathname=function(){return""},e.prototype.handleMessage=function(e){switch(void 0!==e.sequenceNumber&&this.sendMessage({method:"ack",sequenceNumber:e.sequenceNumber}),e.method){case"origin_request":this.sendMessage({method:"origin"});break;case"ready":this.sendState();break;case"error":this.options.onError&&this.options.onError(e.params);break;case"close_dialog":this.onCloseDialogMessage&&this.onCloseDialogMessage(),this.onCloseDialogMessage=void 0}},e}();o.Dropin=r},,,function(e,o,n){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),n(6).initModule(),o.Dropbox=window.Dropbox},function(e,o,n){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var t=n(7),r=n(1),i=n(9),s=n(10);o.initModule=function(){r.initModule(),Dropbox.VERSION="2";var e=new t.BrowserEnvironment;Dropbox.mount=e.mount.bind(e),Dropbox.openWindow=e.openWindow.bind(e);var o=e.remove.bind(e);Dropbox.unmount=o,Dropbox.closeWindow=o,Dropbox.Mover=i.Mover,Dropbox.Previewer=s.Previewer,r.genericDropins.init=function(){for(var e=document.getElementsByTagName("a"),o=0;o<e.length;o++){var n=e[o];(n.getAttribute("class")||"").split(" ").indexOf("dropbox-saver")>=0&&function(e){Dropbox.createSaveButton({files:function(){return[{url:e.getAttribute("data-url")||e.href,filename:e.getAttribute("data-filename")||r.filenameFromPath(e.pathname)}]}},e)}(n)}}}},function(e,o,n){"use strict";function t(e){return function(){for(var o=0,n=e;o<n.length;o++)(0,n[o])()}}Object.defineProperty(o,"__esModule",{value:!0});var r=n(8);o.TARGET_ORIGIN="https://www.dropbox.com";var i=function(){},s=function(){function e(){var e=this;this.activeDropins=[],this.deleteActiveDropin=function(o){return function(){var n=e.activeDropins.indexOf(o);-1!==n&&e.activeDropins.splice(n,1)}},this.openWindow=function(n){e.throwIfAlreadyActive(n);var s=t([]);try{var a=n.url(),c=""+o.TARGET_ORIGIN+a.pathname+a.search,l=r.PopupEnvironment.open(c,n.windowDimensions(),function(){s()});s=t([l.stopInterval,s]);var u=e.attach(n,l.messagingWindow);s=t([function(){n.sendMessage({method:"close"})},s=t([u,s])]);var p={dropin:n,cleanup:i};e.activeDropins.push(p),s=t([e.deleteActiveDropin(p),s]),n.hasOnCloseDialogMessage()||n.setOnCloseDialogMessage(s),p.cleanup=s}catch(e){throw s(),e}}}return e.prototype.mount=function(e,n){if(!e)throw new Error("Dropbox component must be provided");if(!n)throw new Error("Container element must be provided");this.throwIfAlreadyActive(e);var r=t([]);try{var s=this.createIframe();r=t([this.attach(e,function(){if(!s.contentWindow)throw new Error("iframe does not contain a contentWindow");return s.contentWindow}),r]);var a=e.url();s.src=""+o.TARGET_ORIGIN+a.pathname+a.search+"&iframe=true",n.appendChild(s),r=t([function(){n.removeChild(s)},r]);var c={dropin:e,cleanup:i};this.activeDropins.push(c),r=t([this.deleteActiveDropin(c),r]),e.hasOnCloseDialogMessage()||e.setOnCloseDialogMessage(r),c.cleanup=r}catch(e){throw r(),e}},e.prototype.remove=function(e){if(!e)throw new Error("Dropbox component must be provided");for(var o=0,n=this.activeDropins;o<n.length;o++){var t=n[o];if(t.dropin===e){t.cleanup();break}}},e.prototype.throwIfAlreadyActive=function(e){for(var o=0,n=this.activeDropins;o<n.length;o++)if(n[o].dropin===e)throw new Error("Component is already in use")},e.prototype.attach=function(e,n){e.sendMessage=function(e){n().postMessage(JSON.stringify(e),o.TARGET_ORIGIN)};var t=function(t){if(t.source===n()&&t.origin===o.TARGET_ORIGIN){var r,i;try{r=JSON.parse(t.data)}catch(e){return}"object"==typeof(i=r)&&"string"==typeof i.method&&e.handleMessage(r)}};return window.addEventListener("message",t),function(){e.sendMessage=i,window.removeEventListener("message",t)}},e.prototype.createIframe=function(){var e=window.document.createElement("iframe");return e.style.height="100%",e.style.width="100%",e.style.border="none",e},e}();o.BrowserEnvironment=s},function(e,o,n){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var t=n(0),r=function(){function e(e,o){var n=this;this.popupWindow=e,this.onClose=o,this.stopInterval=function(){clearInterval(n.intervalId)},this.isWindowClosedByUser=function(){try{return n.popupWindow.closed}catch(e){}return!1},this.messagingWindow=function(){return void 0!==t.ieframe&&null!==t.ieframe?t.ieframe.contentWindow:n.popupWindow},this.handleInterval=function(){n.isWindowClosedByUser()&&(n.onClose(),n.stopInterval())},this.intervalId=setInterval(this.handleInterval,100)}return e.open=function(o,n,r){var i=t.popupDimensionsString(n.width,n.height)+",resizable,scrollbars",s=window.open(o,"_blank",i);if(null===s)throw new Error("Failed to open the window. Dropbox popups may only be attached to a user-triggered event handler such as a tap or click event.");return s.focus(),new e(s,r)},e}();o.PopupEnvironment=r},function(e,o,n){"use strict";var t,r=this&&this.__extends||(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,o){e.__proto__=o}||function(e,o){for(var n in o)o.hasOwnProperty(n)&&(e[n]=o[n])},function(e,o){function n(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(n.prototype=o.prototype,new n)}),i=this&&this.__assign||Object.assign||function(e){for(var o,n=1,t=arguments.length;n<t;n++){o=arguments[n];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e};Object.defineProperty(o,"__esModule",{value:!0});var s=function(e){function o(n){var t=e.call(this,n)||this;return o.validateOnSuccess(t.options.onSuccess),o.validateOnCancel(t.options.onCancel),t.state={entries:t.options.entries,initialFolderSelection:t.options.initialFolderSelection},t.onSuccess=t.options.onSuccess,t.onCancel=t.options.onCancel,t}return r(o,e),o.validateOnSuccess=function(e){if(e&&"function"!=typeof e)throw new Error("onSuccess must be a function")},o.validateOnCancel=function(e){if(e&&"function"!=typeof e)throw new Error("onCancel must be a function")},o.prototype.urlParams=function(){return[{key:"account_id",value:this.options.accountId},{key:"initial_folder_selection",value:this.state.initialFolderSelection}]},o.prototype.urlPathname=function(){return"/dropins/mover"},o.prototype.handleMessage=function(o){switch(e.prototype.handleMessage.call(this,o),o.method){case"success":this.onSuccess&&this.onSuccess();break;case"cancel":this.onCancel&&this.onCancel()}},o.prototype.setEntries=function(e){this.state=i({},this.state,{entries:e}),this.sendState()},o.prototype.setInitialFolderSelection=function(e){this.state=i({},this.state,{initialFolderSelection:e}),this.sendState()},o.prototype.setOnSuccess=function(e){o.validateOnSuccess(e),this.onSuccess=e},o.prototype.setOnCancel=function(e){o.validateOnCancel(e),this.onCancel=e},o}(n(2).Dropin);o.Mover=s},function(e,o,n){"use strict";var t,r=this&&this.__extends||(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,o){e.__proto__=o}||function(e,o){for(var n in o)o.hasOwnProperty(n)&&(e[n]=o[n])},function(e,o){function n(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(n.prototype=o.prototype,new n)}),i=this&&this.__assign||Object.assign||function(e){for(var o,n=1,t=arguments.length;n<t;n++){o=arguments[n];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e};Object.defineProperty(o,"__esModule",{value:!0});var s=function(e){function o(o){void 0===o&&(o={});var n=e.call(this,o)||this;return n.state={link:n.options.link},n}return r(o,e),o.prototype.urlPathname=function(){return"/dropins/previewer"},o.prototype.urlParams=function(){return this.state.link?[{key:"link",value:this.state.link}]:[]},o.prototype.setLink=function(e){this.state=i({},this.state,{link:e}),this.sendState()},o}(n(2).Dropin);o.Previewer=s}]));
var gapi=window.gapi=window.gapi||{};gapi._bs=new Date().getTime();(function(){/*
 gapi.loader.OBJECT_CREATE_TEST_OVERRIDE &&*/
var g=window,h=document,m=g.location,n=function(){},q=/\[native code\]/,u=function(a,b,c){return a[b]=a[b]||c},aa=function(a){a=a.sort();for(var b=[],c=void 0,d=0;d<a.length;d++){var e=a[d];e!=c&&b.push(e);c=e}return b},w=function(){var a;if((a=Object.create)&&q.test(a))a=a(null);else{a={};for(var b in a)a[b]=void 0}return a},z=u(g,"gapi",{});var A;A=u(g,"___jsl",w());u(A,"I",0);u(A,"hel",10);var B=function(){var a=m.href;if(A.dpo)var b=A.h;else{b=A.h;var c=/([#].*&|[#])jsh=([^&#]*)/g,d=/([?#].*&|[?#])jsh=([^&#]*)/g;if(a=a&&(c.exec(a)||d.exec(a)))try{b=decodeURIComponent(a[2])}catch(e){}}return b},ba=function(a){var b=u(A,"PQ",[]);A.PQ=[];var c=b.length;if(0===c)a();else for(var d=0,e=function(){++d===c&&a()},f=0;f<c;f++)b[f](e)},C=function(a){return u(u(A,"H",w()),a,w())};var D=u(A,"perf",w()),F=u(D,"g",w()),ca=u(D,"i",w());u(D,"r",[]);w();w();var G=function(a,b,c){var d=D.r;"function"===typeof d?d(a,b,c):d.push([a,b,c])},K=function(a,b,c){b&&0<b.length&&(b=J(b),c&&0<c.length&&(b+="___"+J(c)),28<b.length&&(b=b.substr(0,28)+(b.length-28)),c=b,b=u(ca,"_p",w()),u(b,c,w())[a]=(new Date).getTime(),G(a,"_p",c))},J=function(a){return a.join("__").replace(/\./g,"_").replace(/\-/g,"_").replace(/,/g,"_")};var L=w(),M=[],N=function(a){throw Error("Bad hint"+(a?": "+a:""));};M.push(["jsl",function(a){for(var b in a)if(Object.prototype.hasOwnProperty.call(a,b)){var c=a[b];"object"==typeof c?A[b]=u(A,b,[]).concat(c):u(A,b,c)}if(b=a.u)a=u(A,"us",[]),a.push(b),(b=/^https:(.*)$/.exec(b))&&a.push("http:"+b[1])}]);var da=/^(\/[a-zA-Z0-9_\-]+)+$/,O=[/\/amp\//,/\/amp$/,/^\/amp$/],ea=/^[a-zA-Z0-9\-_\.,!]+$/,fa=/^gapi\.loaded_[0-9]+$/,ha=/^[a-zA-Z0-9,._-]+$/,la=function(a,b,c,d){var e=a.split(";"),f=e.shift(),l=L[f],k=null;l?k=l(e,b,c,d):N("no hint processor for: "+f);k||N("failed to generate load url");b=k;c=b.match(ia);(d=b.match(ja))&&1===d.length&&ka.test(b)&&c&&1===c.length||N("failed sanity: "+a);return k},na=function(a,b,c,d){a=ma(a);fa.test(c)||N("invalid_callback");b=P(b);d=d&&d.length?P(d):null;var e=
function(a){return encodeURIComponent(a).replace(/%2C/g,",")};return[encodeURIComponent(a.pathPrefix).replace(/%2C/g,",").replace(/%2F/g,"/"),"/k=",e(a.version),"/m=",e(b),d?"/exm="+e(d):"","/rt=j/sv=1/d=1/ed=1",a.a?"/am="+e(a.a):"",a.c?"/rs="+e(a.c):"",a.f?"/t="+e(a.f):"","/cb=",e(c)].join("")},ma=function(a){"/"!==a.charAt(0)&&N("relative path");for(var b=a.substring(1).split("/"),c=[];b.length;){a=b.shift();if(!a.length||0==a.indexOf("."))N("empty/relative directory");else if(0<a.indexOf("=")){b.unshift(a);
break}c.push(a)}a={};for(var d=0,e=b.length;d<e;++d){var f=b[d].split("="),l=decodeURIComponent(f[0]),k=decodeURIComponent(f[1]);2==f.length&&l&&k&&(a[l]=a[l]||k)}b="/"+c.join("/");da.test(b)||N("invalid_prefix");c=0;for(d=O.length;c<d;++c)O[c].test(b)&&N("invalid_prefix");c=Q(a,"k",!0);d=Q(a,"am");e=Q(a,"rs");a=Q(a,"t");return{pathPrefix:b,version:c,a:d,c:e,f:a}},P=function(a){for(var b=[],c=0,d=a.length;c<d;++c){var e=a[c].replace(/\./g,"_").replace(/-/g,"_");ha.test(e)&&b.push(e)}return b.join(",")},
Q=function(a,b,c){a=a[b];!a&&c&&N("missing: "+b);if(a){if(ea.test(a))return a;N("invalid: "+b)}return null},ka=/^https?:\/\/[a-z0-9_.-]+\.google(rs)?\.com(:\d+)?\/[a-zA-Z0-9_.,!=\-\/]+$/,ja=/\/cb=/g,ia=/\/\//g,oa=function(){var a=B();if(!a)throw Error("Bad hint");return a};L.m=function(a,b,c,d){(a=a[0])||N("missing_hint");return"https://apis.google.com"+na(a,b,c,d)};var R=decodeURI("%73cript"),S=/^[-+_0-9\/A-Za-z]+={0,2}$/,T=function(a,b){for(var c=[],d=0;d<a.length;++d){var e=a[d],f;if(f=e){a:{for(f=0;f<b.length;f++)if(b[f]===e)break a;f=-1}f=0>f}f&&c.push(e)}return c},U=function(){var a=A.nonce;return void 0!==a?a&&a===String(a)&&a.match(S)?a:A.nonce=null:h.querySelector?(a=h.querySelector("script[nonce]"))?(a=a.nonce||a.getAttribute("nonce")||"",a&&a===String(a)&&a.match(S)?A.nonce=a:A.nonce=null):null:null},pa=function(a){if("loading"!=h.readyState)V(a);
else{var b=U(),c="";null!==b&&(c=' nonce="'+b+'"');h.write("<"+R+' src="'+encodeURI(a)+'"'+c+"></"+R+">")}},V=function(a){var b=h.createElement(R);b.setAttribute("src",a);a=U();null!==a&&b.setAttribute("nonce",a);b.async="true";(a=h.getElementsByTagName(R)[0])?a.parentNode.insertBefore(b,a):(h.head||h.body||h.documentElement).appendChild(b)},qa=function(a,b){var c=b&&b._c;if(c)for(var d=0;d<M.length;d++){var e=M[d][0],f=M[d][1];f&&Object.prototype.hasOwnProperty.call(c,e)&&f(c[e],a,b)}},ra=function(a,
b,c){X(function(){var c=b===B()?u(z,"_",w()):w();c=u(C(b),"_",c);a(c)},c)},Z=function(a,b){var c=b||{};"function"==typeof b&&(c={},c.callback=b);qa(a,c);b=a?a.split(":"):[];var d=c.h||oa(),e=u(A,"ah",w());if(e["::"]&&b.length){a=[];for(var f=null;f=b.shift();){var l=f.split(".");l=e[f]||e[l[1]&&"ns:"+l[0]||""]||d;var k=a.length&&a[a.length-1]||null,v=k;k&&k.hint==l||(v={hint:l,b:[]},a.push(v));v.b.push(f)}var x=a.length;if(1<x){var y=c.callback;y&&(c.callback=function(){0==--x&&y()})}for(;b=a.shift();)Y(b.b,
c,b.hint)}else Y(b||[],c,d)},Y=function(a,b,c){a=aa(a)||[];var d=b.callback,e=b.config,f=b.timeout,l=b.ontimeout,k=b.onerror,v=void 0;"function"==typeof k&&(v=k);var x=null,y=!1;if(f&&!l||!f&&l)throw"Timeout requires both the timeout parameter and ontimeout parameter to be set";k=u(C(c),"r",[]).sort();var H=u(C(c),"L",[]).sort(),E=[].concat(k),W=function(a,b){if(y)return 0;g.clearTimeout(x);H.push.apply(H,p);var d=((z||{}).config||{}).update;d?d(e):e&&u(A,"cu",[]).push(e);if(b){K("me0",a,E);try{ra(b,
c,v)}finally{K("me1",a,E)}}return 1};0<f&&(x=g.setTimeout(function(){y=!0;l()},f));var p=T(a,H);if(p.length){p=T(a,k);var r=u(A,"CP",[]),t=r.length;r[t]=function(a){if(!a)return 0;K("ml1",p,E);var b=function(b){r[t]=null;W(p,a)&&ba(function(){d&&d();b()})},c=function(){var a=r[t+1];a&&a()};0<t&&r[t-1]?r[t]=function(){b(c)}:b(c)};if(p.length){var I="loaded_"+A.I++;z[I]=function(a){r[t](a);z[I]=null};a=la(c,p,"gapi."+I,k);k.push.apply(k,p);K("ml0",p,E);b.sync||g.___gapisync?pa(a):V(a)}else r[t](n)}else W(p)&&
d&&d()};var X=function(a,b){if(A.hee&&0<A.hel)try{return a()}catch(c){b&&b(c),A.hel--,Z("debug_error",function(){try{window.___jsl.hefn(c)}catch(d){throw c;}})}else try{return a()}catch(c){throw b&&b(c),c;}};z.load=function(a,b){return X(function(){return Z(a,b)})};F.bs0=window.gapi._bs||(new Date).getTime();G("bs0");F.bs1=(new Date).getTime();G("bs1");delete window.gapi._bs;}).call(this);
gapi.load("",{callback:window["gapi_onload"],_c:{"jsl":{"ci":{"deviceType":"desktop","oauth-flow":{"authUrl":"https://accounts.google.com/o/oauth2/auth","proxyUrl":"https://accounts.google.com/o/oauth2/postmessageRelay","disableOpt":true,"idpIframeUrl":"https://accounts.google.com/o/oauth2/iframe","usegapi":false},"debug":{"reportExceptionRate":0.05,"forceIm":false,"rethrowException":false,"host":"https://apis.google.com"},"enableMultilogin":true,"googleapis.config":{"auth":{"useFirstPartyAuthV2":true}},"isPlusUser":false,"inline":{"css":1},"disableRealtimeCallback":false,"drive_share":{"skipInitCommand":true},"csi":{"rate":0.01},"client":{"cors":false},"isLoggedIn":true,"signInDeprecation":{"rate":0.0},"include_granted_scopes":true,"llang":"en","iframes":{"youtube":{"params":{"location":["search","hash"]},"url":":socialhost:/:session_prefix:_/widget/render/youtube?usegapi\u003d1","methods":["scroll","openwindow"]},"ytsubscribe":{"url":"https://www.youtube.com/subscribe_embed?usegapi\u003d1"},"plus_circle":{"params":{"url":""},"url":":socialhost:/:session_prefix::se:_/widget/plus/circle?usegapi\u003d1"},"plus_share":{"params":{"url":""},"url":":socialhost:/:session_prefix::se:_/+1/sharebutton?plusShare\u003dtrue\u0026usegapi\u003d1"},"rbr_s":{"params":{"url":""},"url":":socialhost:/:session_prefix::se:_/widget/render/recobarsimplescroller"},":source:":"3p","playemm":{"url":"https://play.google.com/work/embedded/search?usegapi\u003d1\u0026usegapi\u003d1"},"savetoandroidpay":{"url":"https://pay.google.com/gp/v/widget/save"},"blogger":{"params":{"location":["search","hash"]},"url":":socialhost:/:session_prefix:_/widget/render/blogger?usegapi\u003d1","methods":["scroll","openwindow"]},"evwidget":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/events/widget?usegapi\u003d1"},"partnersbadge":{"url":"https://www.gstatic.com/partners/badge/templates/badge.html?usegapi\u003d1"},"dataconnector":{"url":"https://dataconnector.corp.google.com/:session_prefix:ui/widgetview?usegapi\u003d1"},"surveyoptin":{"url":"https://www.google.com/shopping/customerreviews/optin?usegapi\u003d1"},":socialhost:":"https://apis.google.com","shortlists":{"url":""},"hangout":{"url":"https://talkgadget.google.com/:session_prefix:talkgadget/_/widget"},"plus_followers":{"params":{"url":""},"url":":socialhost:/_/im/_/widget/render/plus/followers?usegapi\u003d1"},"post":{"params":{"url":""},"url":":socialhost:/:session_prefix::im_prefix:_/widget/render/post?usegapi\u003d1"},":gplus_url:":"https://plus.google.com","signin":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/widget/render/signin?usegapi\u003d1","methods":["onauth"]},"rbr_i":{"params":{"url":""},"url":":socialhost:/:session_prefix::se:_/widget/render/recobarinvitation"},"donation":{"url":"https://onetoday.google.com/home/donationWidget?usegapi\u003d1"},"share":{"url":":socialhost:/:session_prefix::im_prefix:_/widget/render/share?usegapi\u003d1"},"plusone":{"params":{"count":"","size":"","url":""},"url":":socialhost:/:session_prefix::se:_/+1/fastbutton?usegapi\u003d1"},"comments":{"params":{"location":["search","hash"]},"url":":socialhost:/:session_prefix:_/widget/render/comments?usegapi\u003d1","methods":["scroll","openwindow"]},":im_socialhost:":"https://plus.googleapis.com","backdrop":{"url":"https://clients3.google.com/cast/chromecast/home/widget/backdrop?usegapi\u003d1"},"visibility":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/widget/render/visibility?usegapi\u003d1"},"autocomplete":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/widget/render/autocomplete"},"additnow":{"url":"https://apis.google.com/additnow/additnow.html?usegapi\u003d1","methods":["launchurl"]},":signuphost:":"https://plus.google.com","ratingbadge":{"url":"https://www.google.com/shopping/customerreviews/badge?usegapi\u003d1"},"appcirclepicker":{"url":":socialhost:/:session_prefix:_/widget/render/appcirclepicker"},"follow":{"url":":socialhost:/:session_prefix:_/widget/render/follow?usegapi\u003d1"},"community":{"url":":ctx_socialhost:/:session_prefix::im_prefix:_/widget/render/community?usegapi\u003d1"},"sharetoclassroom":{"url":"https://www.gstatic.com/classroom/sharewidget/widget_stable.html?usegapi\u003d1"},"ytshare":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/widget/render/ytshare?usegapi\u003d1"},"plus":{"url":":socialhost:/:session_prefix:_/widget/render/badge?usegapi\u003d1"},"family_creation":{"params":{"url":""},"url":"https://families.google.com/webcreation?usegapi\u003d1\u0026usegapi\u003d1"},"commentcount":{"url":":socialhost:/:session_prefix:_/widget/render/commentcount?usegapi\u003d1"},"configurator":{"url":":socialhost:/:session_prefix:_/plusbuttonconfigurator?usegapi\u003d1"},"zoomableimage":{"url":"https://ssl.gstatic.com/microscope/embed/"},"appfinder":{"url":"https://gsuite.google.com/:session_prefix:marketplace/appfinder?usegapi\u003d1"},"savetowallet":{"url":"https://pay.google.com/gp/v/widget/save"},"person":{"url":":socialhost:/:session_prefix:_/widget/render/person?usegapi\u003d1"},"savetodrive":{"url":"https://drive.google.com/savetodrivebutton?usegapi\u003d1","methods":["save"]},"page":{"url":":socialhost:/:session_prefix:_/widget/render/page?usegapi\u003d1"},"card":{"url":":socialhost:/:session_prefix:_/hovercard/card"}}},"h":"m;/_/scs/apps-static/_/js/k\u003doz.gapi.en.5PjYpKPKmng.O/am\u003dwQ/rt\u003dj/d\u003d1/rs\u003dAGLTcCMfF4eJJc2k8-N3q2UZxGIu-pzOtw/m\u003d__features__","u":"https://apis.google.com/js/api.js","hee":true,"fp":"f812669680a72b7ee626278259aacd1114b865f4","dpo":false},"fp":"f812669680a72b7ee626278259aacd1114b865f4","annotation":["interactivepost","recobar","signin2","autocomplete","profile"],"bimodal":["signin","share"]}});
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
const AWS = require('aws-sdk');

export default class UploaderComponent extends window.HTMLElement {
    constructor() {
        super();
        // For Kitchen Sink - Retrieve sensitive values from localStorage
        // retrieve uploader settings from localStorage
        const settings = JSON.parse(localStorage.getItem('uploader-settings'));
        // S3 Config
        if (settings) {
            this.bucketName = settings.bucketName;
            this.bucketRegion = settings.bucketRegion;
            this.identityPoolId = settings.identityPoolId;
            this.serverAddress = settings.serverAddress;
            this.googleCallback = settings.googleCallback;
        }

        this.url = 'http://localhost:20010/v1/upload';
        this.fetchUrl = 'http://localhost:20010/v1/fetch';
        if (this.serverAddress) {
        	this.url = this.serverAddress + "/v1/upload";
        	this.fetchUrl = this.serverAddress + "/v1/fetch";
        }
        this.method = 'POST';
        this.accept = "";
        this.maxSize = 0; // default to 5MB | 0 indicated no limit
        this.errors = [];
        this._files = [];
        this.maxItems = 0; // 0 for unlimitted

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

        Dropbox.appKey = 'hqsb4kb9ie9tz8q';
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
            var OAUTH_SESSION_KEY = 'AIzaSyDfuPKytWzSzmGfxSwZBMZLEr2vSkdZDX8';
            // The Client ID obtained from the Google Developers Console.
            var clientId = '232235877050-637ift6pdbkfea9ueg0097ege1eh701f.apps.googleusercontent.com';
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
                //var callbackDomain = 'https://callbacks.edlio.com';
                var url = 'https://accounts.google.com/o/oauth2/auth' +
                    '?response_type=token' +
                    '&client_id=' + encodeURIComponent(clientId) +
                    '&scope=' + encodeURIComponent(scope) +
                    '&redirect_uri=' + encodeURIComponent(self.googleCallback);
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
            window.removeEventListener('message', this.handleOneDriveMessageInstance);
            window.addEventListener('message', this.handleOneDriveMessageInstance);
            var url ='https://callbacks.edlio.com/apps/files/onedrive';
            window.open(url, '_blank', 'width=800,height=600');
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