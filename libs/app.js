/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.onClick = onClick;
// helper function to bind click event and touch event
function onClick(node, cb) {
    node.addEventListener('click', function (event) {
        event.stopPropagation();
        cb();
    });
    node.addEventListener('touchend', function (event) {
        event.preventDefault();
        event.stopPropagation();
        cb();
    });
};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(3);

__webpack_require__(7);

var _accordion = __webpack_require__(8);

var _accordion2 = _interopRequireDefault(_accordion);

var _drawer = __webpack_require__(9);

var _drawer2 = _interopRequireDefault(_drawer);

var _example = __webpack_require__(10);

var _example2 = _interopRequireDefault(_example);

var _modal = __webpack_require__(11);

var _modal2 = _interopRequireDefault(_modal);

var _notification = __webpack_require__(12);

var _notification2 = _interopRequireDefault(_notification);

var _select = __webpack_require__(13);

var _select2 = _interopRequireDefault(_select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

main();

function main() {
    if (!window.customElements) {
        console.error('Failed to detect window.customElements. Did you import webcomponents polyfill?');
        return;
    }
    window.customElements.define('uniform-accordion', _accordion2.default);
    window.customElements.define('uniform-drawer', _drawer2.default);
    window.customElements.define('uniform-example', _example2.default);
    window.customElements.define('uniform-modal', _modal2.default);
    window.customElements.define('uniform-notification', _notification2.default);
    window.customElements.define('uniform-select', _select2.default);
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, setImmediate) {/**
@license @nocompile
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
(function(){/*

 Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
'use strict';var r,aa="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)},ba="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this;function da(){da=function(){};ba.Symbol||(ba.Symbol=ea)}var ea=function(){var a=0;return function(b){return"jscomp_symbol_"+(b||"")+a++}}();
function fa(){da();var a=ba.Symbol.iterator;a||(a=ba.Symbol.iterator=ba.Symbol("iterator"));"function"!=typeof Array.prototype[a]&&aa(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return ha(this)}});fa=function(){}}function ha(a){var b=0;return ia(function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}})}function ia(a){fa();a={next:a};a[ba.Symbol.iterator]=function(){return this};return a}function ja(a){fa();var b=a[Symbol.iterator];return b?b.call(a):ha(a)}var ka;
if("function"==typeof Object.setPrototypeOf)ka=Object.setPrototypeOf;else{var la;a:{var ma={Ua:!0},na={};try{na.__proto__=ma;la=na.Ua;break a}catch(a){}la=!1}ka=la?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null}var oa=ka;function pa(){this.f=!1;this.b=null;this.Da=void 0;this.a=1;this.S=0;this.c=null}function qa(a){if(a.f)throw new TypeError("Generator is already running");a.f=!0}pa.prototype.B=function(a){this.Da=a};
function ra(a,b){a.c={Wa:b,$a:!0};a.a=a.S}pa.prototype.return=function(a){this.c={return:a};this.a=this.S};function sa(a,b){a.a=3;return{value:b}}function ta(a){this.a=new pa;this.b=a}function va(a,b){qa(a.a);var c=a.a.b;if(c)return wa(a,"return"in c?c["return"]:function(a){return{value:a,done:!0}},b,a.a.return);a.a.return(b);return xa(a)}
function wa(a,b,c,d){try{var e=b.call(a.a.b,c);if(!(e instanceof Object))throw new TypeError("Iterator result "+e+" is not an object");if(!e.done)return a.a.f=!1,e;var f=e.value}catch(g){return a.a.b=null,ra(a.a,g),xa(a)}a.a.b=null;d.call(a.a,f);return xa(a)}function xa(a){for(;a.a.a;)try{var b=a.b(a.a);if(b)return a.a.f=!1,{value:b.value,done:!1}}catch(c){a.a.Da=void 0,ra(a.a,c)}a.a.f=!1;if(a.a.c){b=a.a.c;a.a.c=null;if(b.$a)throw b.Wa;return{value:b.return,done:!0}}return{value:void 0,done:!0}}
function ya(a){this.next=function(b){qa(a.a);a.a.b?b=wa(a,a.a.b.next,b,a.a.B):(a.a.B(b),b=xa(a));return b};this.throw=function(b){qa(a.a);a.a.b?b=wa(a,a.a.b["throw"],b,a.a.B):(ra(a.a,b),b=xa(a));return b};this.return=function(b){return va(a,b)};fa();this[Symbol.iterator]=function(){return this}}function za(a,b){b=new ya(new ta(b));oa&&oa(b,a.prototype);return b}function Aa(a){for(var b,c=[];!(b=a.next()).done;)c.push(b.value);return c}
(function(){if(!function(){var a=document.createEvent("Event");a.initEvent("foo",!0,!0);a.preventDefault();return a.defaultPrevented}()){var a=Event.prototype.preventDefault;Event.prototype.preventDefault=function(){this.cancelable&&(a.call(this),Object.defineProperty(this,"defaultPrevented",{get:function(){return!0},configurable:!0}))}}var b=/Trident/.test(navigator.userAgent);if(!window.CustomEvent||b&&"function"!==typeof window.CustomEvent)window.CustomEvent=function(a,b){b=b||{};var c=document.createEvent("CustomEvent");
c.initCustomEvent(a,!!b.bubbles,!!b.cancelable,b.detail);return c},window.CustomEvent.prototype=window.Event.prototype;if(!window.Event||b&&"function"!==typeof window.Event){var c=window.Event;window.Event=function(a,b){b=b||{};var c=document.createEvent("Event");c.initEvent(a,!!b.bubbles,!!b.cancelable);return c};if(c)for(var d in c)window.Event[d]=c[d];window.Event.prototype=c.prototype}if(!window.MouseEvent||b&&"function"!==typeof window.MouseEvent){b=window.MouseEvent;window.MouseEvent=function(a,
b){b=b||{};var c=document.createEvent("MouseEvent");c.initMouseEvent(a,!!b.bubbles,!!b.cancelable,b.view||window,b.detail,b.screenX,b.screenY,b.clientX,b.clientY,b.ctrlKey,b.altKey,b.shiftKey,b.metaKey,b.button,b.relatedTarget);return c};if(b)for(d in b)window.MouseEvent[d]=b[d];window.MouseEvent.prototype=b.prototype}Array.from||(Array.from=function(a){return[].slice.call(a)});Object.assign||(Object.assign=function(a,b){for(var c=[].slice.call(arguments,1),d=0,e;d<c.length;d++)if(e=c[d])for(var f=
a,n=e,p=Object.getOwnPropertyNames(n),G=0;G<p.length;G++)e=p[G],f[e]=n[e];return a})})(window.WebComponents);(function(){function a(){}function b(a,b){if(!a.childNodes.length)return[];switch(a.nodeType){case Node.DOCUMENT_NODE:return ua.call(a,b);case Node.DOCUMENT_FRAGMENT_NODE:return jf.call(a,b);default:return A.call(a,b)}}var c="undefined"===typeof HTMLTemplateElement,d=!(document.createDocumentFragment().cloneNode()instanceof DocumentFragment),e=!1;/Trident/.test(navigator.userAgent)&&function(){function a(a,b){if(a instanceof DocumentFragment)for(var d;d=a.firstChild;)c.call(this,d,b);else c.call(this,
a,b);return a}e=!0;var b=Node.prototype.cloneNode;Node.prototype.cloneNode=function(a){a=b.call(this,a);this instanceof DocumentFragment&&(a.__proto__=DocumentFragment.prototype);return a};DocumentFragment.prototype.querySelectorAll=HTMLElement.prototype.querySelectorAll;DocumentFragment.prototype.querySelector=HTMLElement.prototype.querySelector;Object.defineProperties(DocumentFragment.prototype,{nodeType:{get:function(){return Node.DOCUMENT_FRAGMENT_NODE},configurable:!0},localName:{get:function(){},
configurable:!0},nodeName:{get:function(){return"#document-fragment"},configurable:!0}});var c=Node.prototype.insertBefore;Node.prototype.insertBefore=a;var d=Node.prototype.appendChild;Node.prototype.appendChild=function(b){b instanceof DocumentFragment?a.call(this,b,null):d.call(this,b);return b};var f=Node.prototype.removeChild,g=Node.prototype.replaceChild;Node.prototype.replaceChild=function(b,c){b instanceof DocumentFragment?(a.call(this,b,c),f.call(this,c)):g.call(this,b,c);return c};Document.prototype.createDocumentFragment=
function(){var a=this.createElement("df");a.__proto__=DocumentFragment.prototype;return a};var h=Document.prototype.importNode;Document.prototype.importNode=function(a,b){b=h.call(this,a,b||!1);a instanceof DocumentFragment&&(b.__proto__=DocumentFragment.prototype);return b}}();var f=Node.prototype.cloneNode,g=Document.prototype.createElement,h=Document.prototype.importNode,k=Node.prototype.removeChild,m=Node.prototype.appendChild,n=Node.prototype.replaceChild,p=DOMParser.prototype.parseFromString,
G=Object.getOwnPropertyDescriptor(window.HTMLElement.prototype,"innerHTML"),B=Object.getOwnPropertyDescriptor(window.Node.prototype,"childNodes"),A=Element.prototype.querySelectorAll,ua=Document.prototype.querySelectorAll,jf=DocumentFragment.prototype.querySelectorAll,kf=function(){if(!c){var a=document.createElement("template"),b=document.createElement("template");b.content.appendChild(document.createElement("div"));a.content.appendChild(b);a=a.cloneNode(!0);return 0===a.content.childNodes.length||
0===a.content.firstChild.content.childNodes.length||d}}();if(c){var ca=document.implementation.createHTMLDocument("template"),Ec=!0,q=document.createElement("style");q.textContent="template{display:none;}";var Fc=document.head;Fc.insertBefore(q,Fc.firstElementChild);a.prototype=Object.create(HTMLElement.prototype);var lf=!document.createElement("div").hasOwnProperty("innerHTML");a.R=function(b){if(!b.content&&b.namespaceURI===document.documentElement.namespaceURI){b.content=ca.createDocumentFragment();
for(var c;c=b.firstChild;)m.call(b.content,c);if(lf)b.__proto__=a.prototype;else if(b.cloneNode=function(b){return a.b(this,b)},Ec)try{l(b),D(b)}catch(ph){Ec=!1}a.a(b.content)}};var ob={option:["select"],thead:["table"],col:["colgroup","table"],tr:["tbody","table"],th:["tr","tbody","table"],td:["tr","tbody","table"]},l=function(b){Object.defineProperty(b,"innerHTML",{get:function(){return pb(this)},set:function(b){var c=ob[(/<([a-z][^/\0>\x20\t\r\n\f]+)/i.exec(b)||["",""])[1].toLowerCase()];if(c)for(var d=
0;d<c.length;d++)b="<"+c[d]+">"+b+"</"+c[d]+">";ca.body.innerHTML=b;for(a.a(ca);this.content.firstChild;)k.call(this.content,this.content.firstChild);b=ca.body;if(c)for(d=0;d<c.length;d++)b=b.lastChild;for(;b.firstChild;)m.call(this.content,b.firstChild)},configurable:!0})},D=function(a){Object.defineProperty(a,"outerHTML",{get:function(){return"<template>"+this.innerHTML+"</template>"},set:function(a){if(this.parentNode){ca.body.innerHTML=a;for(a=this.ownerDocument.createDocumentFragment();ca.body.firstChild;)m.call(a,
ca.body.firstChild);n.call(this.parentNode,a,this)}else throw Error("Failed to set the 'outerHTML' property on 'Element': This element has no parent node.");},configurable:!0})};l(a.prototype);D(a.prototype);a.a=function(c){c=b(c,"template");for(var d=0,e=c.length,f;d<e&&(f=c[d]);d++)a.R(f)};document.addEventListener("DOMContentLoaded",function(){a.a(document)});Document.prototype.createElement=function(){var b=g.apply(this,arguments);"template"===b.localName&&a.R(b);return b};DOMParser.prototype.parseFromString=
function(){var b=p.apply(this,arguments);a.a(b);return b};Object.defineProperty(HTMLElement.prototype,"innerHTML",{get:function(){return pb(this)},set:function(b){G.set.call(this,b);a.a(this)},configurable:!0,enumerable:!0});var mf=/[&\u00A0"]/g,nf=/[&\u00A0<>]/g,Gc=function(a){switch(a){case "&":return"&amp;";case "<":return"&lt;";case ">":return"&gt;";case '"':return"&quot;";case "\u00a0":return"&nbsp;"}};q=function(a){for(var b={},c=0;c<a.length;c++)b[a[c]]=!0;return b};var of=q("area base br col command embed hr img input keygen link meta param source track wbr".split(" ")),
pf=q("style script xmp iframe noembed noframes plaintext noscript".split(" ")),pb=function(a,b){"template"===a.localName&&(a=a.content);for(var c="",d=b?b(a):B.get.call(a),e=0,f=d.length,g;e<f&&(g=d[e]);e++){a:{var h=g;var k=a;var m=b;switch(h.nodeType){case Node.ELEMENT_NODE:for(var n=h.localName,l="<"+n,p=h.attributes,A=0;k=p[A];A++)l+=" "+k.name+'="'+k.value.replace(mf,Gc)+'"';l+=">";h=of[n]?l:l+pb(h,m)+"</"+n+">";break a;case Node.TEXT_NODE:h=h.data;h=k&&pf[k.localName]?h:h.replace(nf,Gc);break a;
case Node.COMMENT_NODE:h="\x3c!--"+h.data+"--\x3e";break a;default:throw window.console.error(h),Error("not implemented");}}c+=h}return c}}if(c||kf){a.b=function(a,b){var c=f.call(a,!1);this.R&&this.R(c);b&&(m.call(c.content,f.call(a.content,!0)),qb(c.content,a.content));return c};var qb=function(c,d){if(d.querySelectorAll&&(d=b(d,"template"),0!==d.length)){c=b(c,"template");for(var e=0,f=c.length,g,h;e<f;e++)h=d[e],g=c[e],a&&a.R&&a.R(h),n.call(g.parentNode,qf.call(h,!0),g)}},qf=Node.prototype.cloneNode=
function(b){if(!e&&d&&this instanceof DocumentFragment)if(b)var c=rf.call(this.ownerDocument,this,!0);else return this.ownerDocument.createDocumentFragment();else this.nodeType===Node.ELEMENT_NODE&&"template"===this.localName&&this.namespaceURI==document.documentElement.namespaceURI?c=a.b(this,b):c=f.call(this,b);b&&qb(c,this);return c},rf=Document.prototype.importNode=function(c,d){d=d||!1;if("template"===c.localName)return a.b(c,d);var e=h.call(this,c,d);if(d){qb(e,c);c=b(e,'script:not([type]),script[type="application/javascript"],script[type="text/javascript"]');
for(var f,k=0;k<c.length;k++){f=c[k];d=g.call(document,"script");d.textContent=f.textContent;for(var m=f.attributes,l=0,p;l<m.length;l++)p=m[l],d.setAttribute(p.name,p.value);n.call(f.parentNode,d,f)}}return e}}c&&(window.HTMLTemplateElement=a)})();var Ba=setTimeout;function Ca(){}function Da(a,b){return function(){a.apply(b,arguments)}}function t(a){if(!(this instanceof t))throw new TypeError("Promises must be constructed via new");if("function"!==typeof a)throw new TypeError("not a function");this.J=0;this.Aa=!1;this.A=void 0;this.V=[];Ea(a,this)}
function Fa(a,b){for(;3===a.J;)a=a.A;0===a.J?a.V.push(b):(a.Aa=!0,t.a(function(){var c=1===a.J?b.bb:b.cb;if(null===c)(1===a.J?Ga:Ha)(b.va,a.A);else{try{var d=c(a.A)}catch(e){Ha(b.va,e);return}Ga(b.va,d)}}))}function Ga(a,b){try{if(b===a)throw new TypeError("A promise cannot be resolved with itself.");if(b&&("object"===typeof b||"function"===typeof b)){var c=b.then;if(b instanceof t){a.J=3;a.A=b;Ia(a);return}if("function"===typeof c){Ea(Da(c,b),a);return}}a.J=1;a.A=b;Ia(a)}catch(d){Ha(a,d)}}
function Ha(a,b){a.J=2;a.A=b;Ia(a)}function Ia(a){2===a.J&&0===a.V.length&&t.a(function(){a.Aa||t.b(a.A)});for(var b=0,c=a.V.length;b<c;b++)Fa(a,a.V[b]);a.V=null}function Ja(a,b,c){this.bb="function"===typeof a?a:null;this.cb="function"===typeof b?b:null;this.va=c}function Ea(a,b){var c=!1;try{a(function(a){c||(c=!0,Ga(b,a))},function(a){c||(c=!0,Ha(b,a))})}catch(d){c||(c=!0,Ha(b,d))}}t.prototype["catch"]=function(a){return this.then(null,a)};
t.prototype.then=function(a,b){var c=new this.constructor(Ca);Fa(this,new Ja(a,b,c));return c};t.prototype["finally"]=function(a){var b=this.constructor;return this.then(function(c){return b.resolve(a()).then(function(){return c})},function(c){return b.resolve(a()).then(function(){return b.reject(c)})})};
t.c=function(a){return new t(function(b,c){function d(a,g){try{if(g&&("object"===typeof g||"function"===typeof g)){var h=g.then;if("function"===typeof h){h.call(g,function(b){d(a,b)},c);return}}e[a]=g;0===--f&&b(e)}catch(n){c(n)}}if(!a||"undefined"===typeof a.length)throw new TypeError("Promise.all accepts an array");var e=Array.prototype.slice.call(a);if(0===e.length)return b([]);for(var f=e.length,g=0;g<e.length;g++)d(g,e[g])})};
t.resolve=function(a){return a&&"object"===typeof a&&a.constructor===t?a:new t(function(b){b(a)})};t.reject=function(a){return new t(function(b,c){c(a)})};t.f=function(a){return new t(function(b,c){for(var d=0,e=a.length;d<e;d++)a[d].then(b,c)})};t.a="function"===typeof setImmediate&&function(a){setImmediate(a)}||function(a){Ba(a,0)};t.b=function(a){"undefined"!==typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",a)};/*

Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
if(!window.Promise&&(window.Promise=t,t.prototype.then=t.prototype.then,t.all=t.c,t.race=t.f,t.resolve=t.resolve,t.reject=t.reject,!window.setImmediate)){var Ka=document.createTextNode(""),La=[];(new MutationObserver(function(){for(var a=La.length,b=0;b<a;b++)La[b]();La.splice(0,a)})).observe(Ka,{characterData:!0});t.a=function(a){La.push(a);Ka.textContent=0<Ka.textContent.length?"":"a"}};var Ma={},Na=Object.create,Oa=Object.defineProperties,Pa=Object.defineProperty;function u(a,b){b=void 0===b?{}:b;return{value:a,configurable:!!b.Ba,writable:!!b.kb,enumerable:!!b.e}}var Qa=void 0;try{Qa=1===Pa({},"y",{get:function(){return 1}}).y}catch(a){Qa=!1}var Ra={};function Sa(a){a=String(a);for(var b="",c=0;Ra[a+b];)b=c+=1;Ra[a+b]=1;var d="Symbol("+a+b+")";Qa&&Pa(Object.prototype,d,{get:void 0,set:function(a){Pa(this,d,u(a,{Ba:!0,kb:!0}))},configurable:!0,enumerable:!1});return d}var Ta=Na(null);
function v(a){if(this instanceof v)throw new TypeError("Symbol is not a constructor");a=void 0===a?"":String(a);var b=Sa(a);return Qa?Na(Ta,{xa:u(a),Na:u(b)}):b}Oa(v,{"for":u(function(a){a=String(a);if(Ma[a])return Ma[a];var b=v(a);return Ma[a]=b}),keyFor:u(function(a){if(Qa&&(!a||"Symbol"!==a[v.toStringTag]))throw new TypeError(""+a+" is not a symbol");for(var b in Ma)if(Ma[b]===a)return Qa?Ma[b].xa:Ma[b].substr(7,Ma[b].length-8)})});
Oa(v,{Bb:u(v("hasInstance")),Cb:u(v("isConcatSpreadable")),iterator:u(v("iterator")),match:u(v("match")),replace:u(v("replace")),search:u(v("search")),Eb:u(v("species")),split:u(v("split")),Fb:u(v("toPrimitive")),toStringTag:u(v("toStringTag")),unscopables:u(v("unscopables"))});Oa(Ta,{constructor:u(v),toString:u(function(){return this.Na}),valueOf:u(function(){return"Symbol("+this.xa+")"})});Qa&&Pa(Ta,v.toStringTag,u("Symbol",{Ba:!0}));var Ua="function"===typeof Symbol?Symbol:v;/*

Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
if(!window.Symbol){window.Symbol=Ua;var Va=window.Symbol.iterator;Array.prototype[Va]=function b(){var c,d=this;return za(b,function(b){1==b.a&&(c=0);if(3!=b.a)return c<d.length?b=sa(b,d[c]):(b.a=0,b=void 0),b;c++;b.a=2})};Set.prototype[Va]=function c(){var d,e=this,f;return za(c,function(c){1==c.a&&(d=[],e.forEach(function(c){d.push(c)}),f=0);if(3!=c.a)return f<d.length?c=sa(c,d[f]):(c.a=0,c=void 0),c;f++;c.a=2})};Map.prototype[Va]=function d(){var e,f=this,g;return za(d,function(d){1==d.a&&(e=[],
f.forEach(function(d,f){e.push([f,d])}),g=0);if(3!=d.a)return g<e.length?d=sa(d,e[g]):(d.a=0,d=void 0),d;g++;d.a=2})};String.prototype[Va]=function e(){var f,g=this;return za(e,function(e){1==e.a&&(f=0);if(3!=e.a)return f<g.length?e=sa(e,g[f]):(e.a=0,e=void 0),e;f++;e.a=2})}};/*

 Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
window.WebComponents=window.WebComponents||{flags:{}};var Wa=document.querySelector('script[src*="webcomponents-bundle"]'),Xa=/wc-(.+)/,w={};if(!w.noOpts){location.search.slice(1).split("&").forEach(function(a){a=a.split("=");var b;a[0]&&(b=a[0].match(Xa))&&(w[b[1]]=a[1]||!0)});if(Wa)for(var Ya=0,Za;Za=Wa.attributes[Ya];Ya++)"src"!==Za.name&&(w[Za.name]=Za.value||!0);if(w.log&&w.log.split){var $a=w.log.split(",");w.log={};$a.forEach(function(a){w.log[a]=!0})}else w.log={}}
window.WebComponents.flags=w;var ab=w.shadydom;ab&&(window.ShadyDOM=window.ShadyDOM||{},window.ShadyDOM.force=ab);var bb=w.register||w.ce;bb&&window.customElements&&(window.customElements.forcePolyfill=bb);/*

Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
function cb(){this.Fa=this.root=null;this.fa=!1;this.N=this.ba=this.qa=this.assignedSlot=this.assignedNodes=this.T=null;this.childNodes=this.nextSibling=this.previousSibling=this.lastChild=this.firstChild=this.parentNode=this.W=void 0;this.Ja=this.ya=!1;this.$={}}cb.prototype.toJSON=function(){return{}};function x(a){a.la||(a.la=new cb);return a.la}function y(a){return a&&a.la};var z=window.ShadyDOM||{};z.Ya=!(!Element.prototype.attachShadow||!Node.prototype.getRootNode);var db=Object.getOwnPropertyDescriptor(Node.prototype,"firstChild");z.K=!!(db&&db.configurable&&db.get);z.ta=z.force||!z.Ya;var eb=navigator.userAgent.match("Trident"),fb=navigator.userAgent.match("Edge");void 0===z.Ha&&(z.Ha=z.K&&(eb||fb));function gb(a){return(a=y(a))&&void 0!==a.firstChild}function C(a){return"ShadyRoot"===a.Qa}function hb(a){a=a.getRootNode();if(C(a))return a}
var ib=Element.prototype,jb=ib.matches||ib.matchesSelector||ib.mozMatchesSelector||ib.msMatchesSelector||ib.oMatchesSelector||ib.webkitMatchesSelector;function kb(a,b){if(a&&b)for(var c=Object.getOwnPropertyNames(b),d=0,e;d<c.length&&(e=c[d]);d++){var f=e,g=a,h=Object.getOwnPropertyDescriptor(b,f);h&&Object.defineProperty(g,f,h)}}function lb(a,b){for(var c=[],d=1;d<arguments.length;++d)c[d-1]=arguments[d];for(d=0;d<c.length;d++)kb(a,c[d]);return a}function mb(a,b){for(var c in b)a[c]=b[c]}
var nb=document.createTextNode(""),rb=0,sb=[];(new MutationObserver(function(){for(;sb.length;)try{sb.shift()()}catch(a){throw nb.textContent=rb++,a;}})).observe(nb,{characterData:!0});function tb(a){sb.push(a);nb.textContent=rb++}var ub=!!document.contains;function vb(a,b){for(;b;){if(b==a)return!0;b=b.parentNode}return!1}
function wb(a){for(var b=a.length-1;0<=b;b--){var c=a[b],d=c.getAttribute("id")||c.getAttribute("name");d&&"length"!==d&&isNaN(d)&&(a[d]=c)}a.item=function(b){return a[b]};a.namedItem=function(b){if("length"!==b&&isNaN(b)&&a[b])return a[b];for(var c=ja(a),d=c.next();!d.done;d=c.next())if(d=d.value,(d.getAttribute("id")||d.getAttribute("name"))==b)return d;return null};return a};var xb=[],yb;function zb(a){yb||(yb=!0,tb(Ab));xb.push(a)}function Ab(){yb=!1;for(var a=!!xb.length;xb.length;)xb.shift()();return a}Ab.list=xb;function Bb(){this.a=!1;this.addedNodes=[];this.removedNodes=[];this.ea=new Set}function Cb(a){a.a||(a.a=!0,tb(function(){a.flush()}))}Bb.prototype.flush=function(){if(this.a){this.a=!1;var a=this.takeRecords();a.length&&this.ea.forEach(function(b){b(a)})}};Bb.prototype.takeRecords=function(){if(this.addedNodes.length||this.removedNodes.length){var a=[{addedNodes:this.addedNodes,removedNodes:this.removedNodes}];this.addedNodes=[];this.removedNodes=[];return a}return[]};
function Db(a,b){var c=x(a);c.T||(c.T=new Bb);c.T.ea.add(b);var d=c.T;return{Oa:b,P:d,Ra:a,takeRecords:function(){return d.takeRecords()}}}function Eb(a){var b=a&&a.P;b&&(b.ea.delete(a.Oa),b.ea.size||(x(a.Ra).T=null))}
function Fb(a,b){var c=b.getRootNode();return a.map(function(a){var b=c===a.target.getRootNode();if(b&&a.addedNodes){if(b=Array.from(a.addedNodes).filter(function(a){return c===a.getRootNode()}),b.length)return a=Object.create(a),Object.defineProperty(a,"addedNodes",{value:b,configurable:!0}),a}else if(b)return a}).filter(function(a){return a})};var Gb=Element.prototype.insertBefore,Hb=Element.prototype.replaceChild,Ib=Element.prototype.removeChild,Jb=Element.prototype.setAttribute,Kb=Element.prototype.removeAttribute,Lb=Element.prototype.cloneNode,Mb=Document.prototype.importNode,Nb=Element.prototype.addEventListener,Ob=Element.prototype.removeEventListener,Pb=Window.prototype.addEventListener,Qb=Window.prototype.removeEventListener,Rb=Element.prototype.dispatchEvent,Sb=Node.prototype.contains||HTMLElement.prototype.contains,Tb=Document.prototype.getElementById,
Ub=Element.prototype.querySelector,Vb=DocumentFragment.prototype.querySelector,Wb=Document.prototype.querySelector,Xb=Element.prototype.querySelectorAll,Yb=DocumentFragment.prototype.querySelectorAll,Zb=Document.prototype.querySelectorAll,E={};E.appendChild=Element.prototype.appendChild;E.insertBefore=Gb;E.replaceChild=Hb;E.removeChild=Ib;E.setAttribute=Jb;E.removeAttribute=Kb;E.cloneNode=Lb;E.importNode=Mb;E.addEventListener=Nb;E.removeEventListener=Ob;E.lb=Pb;E.mb=Qb;E.dispatchEvent=Rb;
E.contains=Sb;E.getElementById=Tb;E.vb=Ub;E.zb=Vb;E.tb=Wb;E.querySelector=function(a){switch(this.nodeType){case Node.ELEMENT_NODE:return Ub.call(this,a);case Node.DOCUMENT_NODE:return Wb.call(this,a);default:return Vb.call(this,a)}};E.wb=Xb;E.Ab=Yb;E.ub=Zb;E.querySelectorAll=function(a){switch(this.nodeType){case Node.ELEMENT_NODE:return Xb.call(this,a);case Node.DOCUMENT_NODE:return Zb.call(this,a);default:return Yb.call(this,a)}};var $b=/[&\u00A0"]/g,ac=/[&\u00A0<>]/g;function bc(a){switch(a){case "&":return"&amp;";case "<":return"&lt;";case ">":return"&gt;";case '"':return"&quot;";case "\u00a0":return"&nbsp;"}}function cc(a){for(var b={},c=0;c<a.length;c++)b[a[c]]=!0;return b}var dc=cc("area base br col command embed hr img input keygen link meta param source track wbr".split(" ")),ec=cc("style script xmp iframe noembed noframes plaintext noscript".split(" "));
function fc(a,b){"template"===a.localName&&(a=a.content);for(var c="",d=b?b(a):a.childNodes,e=0,f=d.length,g;e<f&&(g=d[e]);e++){a:{var h=g;var k=a;var m=b;switch(h.nodeType){case Node.ELEMENT_NODE:for(var n=h.localName,p="<"+n,G=h.attributes,B=0;k=G[B];B++)p+=" "+k.name+'="'+k.value.replace($b,bc)+'"';p+=">";h=dc[n]?p:p+fc(h,m)+"</"+n+">";break a;case Node.TEXT_NODE:h=h.data;h=k&&ec[k.localName]?h:h.replace(ac,bc);break a;case Node.COMMENT_NODE:h="\x3c!--"+h.data+"--\x3e";break a;default:throw window.console.error(h),
Error("not implemented");}}c+=h}return c};var F=document.createTreeWalker(document,NodeFilter.SHOW_ALL,null,!1),H=document.createTreeWalker(document,NodeFilter.SHOW_ELEMENT,null,!1);function gc(a){var b=[];F.currentNode=a;for(a=F.firstChild();a;)b.push(a),a=F.nextSibling();return b}
var I={parentNode:function(a){F.currentNode=a;return F.parentNode()},firstChild:function(a){F.currentNode=a;return F.firstChild()},lastChild:function(a){F.currentNode=a;return F.lastChild()},previousSibling:function(a){F.currentNode=a;return F.previousSibling()},nextSibling:function(a){F.currentNode=a;return F.nextSibling()}};I.childNodes=gc;I.parentElement=function(a){H.currentNode=a;return H.parentNode()};I.firstElementChild=function(a){H.currentNode=a;return H.firstChild()};
I.lastElementChild=function(a){H.currentNode=a;return H.lastChild()};I.previousElementSibling=function(a){H.currentNode=a;return H.previousSibling()};I.nextElementSibling=function(a){H.currentNode=a;return H.nextSibling()};I.children=function(a){var b=[];H.currentNode=a;for(a=H.firstChild();a;)b.push(a),a=H.nextSibling();return wb(b)};I.innerHTML=function(a){return fc(a,function(a){return gc(a)})};
I.textContent=function(a){switch(a.nodeType){case Node.ELEMENT_NODE:case Node.DOCUMENT_FRAGMENT_NODE:a=document.createTreeWalker(a,NodeFilter.SHOW_TEXT,null,!1);for(var b="",c;c=a.nextNode();)b+=c.nodeValue;return b;default:return a.nodeValue}};var hc=z.K,ic=[Node.prototype,Element.prototype,HTMLElement.prototype];function J(a){var b;a:{for(b=0;b<ic.length;b++){var c=ic[b];if(c.hasOwnProperty(a)){b=c;break a}}b=void 0}if(!b)throw Error("Could not find descriptor for "+a);return Object.getOwnPropertyDescriptor(b,a)}
var K=hc?{parentNode:J("parentNode"),firstChild:J("firstChild"),lastChild:J("lastChild"),previousSibling:J("previousSibling"),nextSibling:J("nextSibling"),childNodes:J("childNodes"),parentElement:J("parentElement"),previousElementSibling:J("previousElementSibling"),nextElementSibling:J("nextElementSibling"),innerHTML:J("innerHTML"),textContent:J("textContent"),firstElementChild:J("firstElementChild"),lastElementChild:J("lastElementChild"),children:J("children")}:{},jc=hc?{firstElementChild:Object.getOwnPropertyDescriptor(DocumentFragment.prototype,
"firstElementChild"),lastElementChild:Object.getOwnPropertyDescriptor(DocumentFragment.prototype,"lastElementChild"),children:Object.getOwnPropertyDescriptor(DocumentFragment.prototype,"children")}:{},kc=hc?{firstElementChild:Object.getOwnPropertyDescriptor(Document.prototype,"firstElementChild"),lastElementChild:Object.getOwnPropertyDescriptor(Document.prototype,"lastElementChild"),children:Object.getOwnPropertyDescriptor(Document.prototype,"children")}:{},lc={Ea:K,yb:jc,sb:kc,parentNode:function(a){return K.parentNode.get.call(a)},
firstChild:function(a){return K.firstChild.get.call(a)},lastChild:function(a){return K.lastChild.get.call(a)},previousSibling:function(a){return K.previousSibling.get.call(a)},nextSibling:function(a){return K.nextSibling.get.call(a)},childNodes:function(a){return Array.prototype.slice.call(K.childNodes.get.call(a))},parentElement:function(a){return K.parentElement.get.call(a)},previousElementSibling:function(a){return K.previousElementSibling.get.call(a)},nextElementSibling:function(a){return K.nextElementSibling.get.call(a)},
innerHTML:function(a){return K.innerHTML.get.call(a)},textContent:function(a){return K.textContent.get.call(a)},children:function(a){switch(a.nodeType){case Node.DOCUMENT_FRAGMENT_NODE:return jc.children.get.call(a);case Node.DOCUMENT_NODE:return kc.children.get.call(a);default:return K.children.get.call(a)}},firstElementChild:function(a){switch(a.nodeType){case Node.DOCUMENT_FRAGMENT_NODE:return jc.firstElementChild.get.call(a);case Node.DOCUMENT_NODE:return kc.firstElementChild.get.call(a);default:return K.firstElementChild.get.call(a)}},
lastElementChild:function(a){switch(a.nodeType){case Node.DOCUMENT_FRAGMENT_NODE:return jc.lastElementChild.get.call(a);case Node.DOCUMENT_NODE:return kc.lastElementChild.get.call(a);default:return K.lastElementChild.get.call(a)}}};var L=z.Ha?lc:I;function mc(a){for(;a.firstChild;)a.removeChild(a.firstChild)}
var nc=z.K,oc=document.implementation.createHTMLDocument("inert"),pc=Object.getOwnPropertyDescriptor(Node.prototype,"isConnected"),qc=pc&&pc.get,rc=Object.getOwnPropertyDescriptor(Document.prototype,"activeElement"),sc={parentElement:{get:function(){var a=y(this);(a=a&&a.parentNode)&&a.nodeType!==Node.ELEMENT_NODE&&(a=null);return void 0!==a?a:L.parentElement(this)},configurable:!0},parentNode:{get:function(){var a=y(this);a=a&&a.parentNode;return void 0!==a?a:L.parentNode(this)},configurable:!0},
nextSibling:{get:function(){var a=y(this);a=a&&a.nextSibling;return void 0!==a?a:L.nextSibling(this)},configurable:!0},previousSibling:{get:function(){var a=y(this);a=a&&a.previousSibling;return void 0!==a?a:L.previousSibling(this)},configurable:!0},nextElementSibling:{get:function(){var a=y(this);if(a&&void 0!==a.nextSibling){for(a=this.nextSibling;a&&a.nodeType!==Node.ELEMENT_NODE;)a=a.nextSibling;return a}return L.nextElementSibling(this)},configurable:!0},previousElementSibling:{get:function(){var a=
y(this);if(a&&void 0!==a.previousSibling){for(a=this.previousSibling;a&&a.nodeType!==Node.ELEMENT_NODE;)a=a.previousSibling;return a}return L.previousElementSibling(this)},configurable:!0}},tc={className:{get:function(){return this.getAttribute("class")||""},set:function(a){this.setAttribute("class",a)},configurable:!0}},uc={childNodes:{get:function(){if(gb(this)){var a=y(this);if(!a.childNodes){a.childNodes=[];for(var b=this.firstChild;b;b=b.nextSibling)a.childNodes.push(b)}var c=a.childNodes}else c=
L.childNodes(this);c.item=function(a){return c[a]};return c},configurable:!0},childElementCount:{get:function(){return this.children.length},configurable:!0},firstChild:{get:function(){var a=y(this);a=a&&a.firstChild;return void 0!==a?a:L.firstChild(this)},configurable:!0},lastChild:{get:function(){var a=y(this);a=a&&a.lastChild;return void 0!==a?a:L.lastChild(this)},configurable:!0},textContent:{get:function(){if(gb(this)){for(var a=[],b=0,c=this.childNodes,d;d=c[b];b++)d.nodeType!==Node.COMMENT_NODE&&
a.push(d.textContent);return a.join("")}return L.textContent(this)},set:function(a){if("undefined"===typeof a||null===a)a="";switch(this.nodeType){case Node.ELEMENT_NODE:case Node.DOCUMENT_FRAGMENT_NODE:if(!gb(this)&&nc){var b=this.firstChild;(b!=this.lastChild||b&&b.nodeType!=Node.TEXT_NODE)&&mc(this);lc.Ea.textContent.set.call(this,a)}else mc(this),(0<a.length||this.nodeType===Node.ELEMENT_NODE)&&this.appendChild(document.createTextNode(a));break;default:this.nodeValue=a}},configurable:!0},firstElementChild:{get:function(){var a=
y(this);if(a&&void 0!==a.firstChild){for(a=this.firstChild;a&&a.nodeType!==Node.ELEMENT_NODE;)a=a.nextSibling;return a}return L.firstElementChild(this)},configurable:!0},lastElementChild:{get:function(){var a=y(this);if(a&&void 0!==a.lastChild){for(a=this.lastChild;a&&a.nodeType!==Node.ELEMENT_NODE;)a=a.previousSibling;return a}return L.lastElementChild(this)},configurable:!0},children:{get:function(){return gb(this)?wb(Array.prototype.filter.call(this.childNodes,function(a){return a.nodeType===Node.ELEMENT_NODE})):
L.children(this)},configurable:!0},innerHTML:{get:function(){return gb(this)?fc("template"===this.localName?this.content:this):L.innerHTML(this)},set:function(a){var b="template"===this.localName?this.content:this;mc(b);var c=this.localName||"div";c=this.namespaceURI&&this.namespaceURI!==oc.namespaceURI?oc.createElementNS(this.namespaceURI,c):oc.createElement(c);nc?lc.Ea.innerHTML.set.call(c,a):c.innerHTML=a;for(a="template"===this.localName?c.content:c;a.firstChild;)b.appendChild(a.firstChild)},
configurable:!0}},vc={shadowRoot:{get:function(){var a=y(this);return a&&a.Fa||null},configurable:!0}},wc={activeElement:{get:function(){var a=rc&&rc.get?rc.get.call(document):z.K?void 0:document.activeElement;if(a&&a.nodeType){var b=!!C(this);if(this===document||b&&this.host!==a&&E.contains.call(this.host,a)){for(b=hb(a);b&&b!==this;)a=b.host,b=hb(a);a=this===document?b?null:a:b===this?a:null}else a=null}else a=null;return a},set:function(){},configurable:!0}};
function M(a,b,c){for(var d in b){var e=Object.getOwnPropertyDescriptor(a,d);e&&e.configurable||!e&&c?Object.defineProperty(a,d,b[d]):c&&console.warn("Could not define",d,"on",a)}}function xc(a){M(a,sc);M(a,tc);M(a,uc);M(a,wc)}
function yc(){var a=zc.prototype;a.__proto__=DocumentFragment.prototype;M(a,sc,!0);M(a,uc,!0);M(a,wc,!0);Object.defineProperties(a,{nodeType:{value:Node.DOCUMENT_FRAGMENT_NODE,configurable:!0},nodeName:{value:"#document-fragment",configurable:!0},nodeValue:{value:null,configurable:!0}});["localName","namespaceURI","prefix"].forEach(function(b){Object.defineProperty(a,b,{value:void 0,configurable:!0})});["ownerDocument","baseURI","isConnected"].forEach(function(b){Object.defineProperty(a,b,{get:function(){return this.host[b]},
configurable:!0})})}var Ac=z.K?function(){}:function(a){var b=x(a);b.ya||(b.ya=!0,M(a,sc,!0),M(a,tc,!0))},Bc=z.K?function(){}:function(a){x(a).Ja||(M(a,uc,!0),M(a,vc,!0))};var Cc=L.childNodes;function Dc(a,b,c){Ac(a);c=c||null;var d=x(a),e=x(b),f=c?x(c):null;d.previousSibling=c?f.previousSibling:b.lastChild;if(f=y(d.previousSibling))f.nextSibling=a;if(f=y(d.nextSibling=c))f.previousSibling=a;d.parentNode=b;c?c===e.firstChild&&(e.firstChild=a):(e.lastChild=a,e.firstChild||(e.firstChild=a));e.childNodes=null}
function Hc(a){var b=x(a);if(void 0===b.firstChild){b.childNodes=null;var c=Cc(a);b.firstChild=c[0]||null;b.lastChild=c[c.length-1]||null;Bc(a);for(b=0;b<c.length;b++){var d=c[b],e=x(d);e.parentNode=a;e.nextSibling=c[b+1]||null;e.previousSibling=c[b-1]||null;Ac(d)}}};var Ic=L.parentNode;
function Jc(a,b,c){if(b===a)throw Error("Failed to execute 'appendChild' on 'Node': The new child element contains the parent.");if(c){var d=y(c);d=d&&d.parentNode;if(void 0!==d&&d!==a||void 0===d&&Ic(c)!==a)throw Error("Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.");}if(c===b)return b;b.parentNode&&Kc(b.parentNode,b);var e,f;if(!b.__noInsertionPoint){if(f=e=hb(a)){var g;"slot"===b.localName?g=[b]:b.querySelectorAll&&
(g=b.querySelectorAll("slot"));f=g&&g.length?g:void 0}f&&(g=e,d=f,g.a=g.a||[],g.m=g.m||[],g.v=g.v||{},g.a.push.apply(g.a,d instanceof Array?d:Aa(ja(d))))}("slot"===a.localName||f)&&(e=e||hb(a))&&Lc(e);if(gb(a)){e=c;Bc(a);f=x(a);void 0!==f.firstChild&&(f.childNodes=null);if(b.nodeType===Node.DOCUMENT_FRAGMENT_NODE){f=b.childNodes;for(g=0;g<f.length;g++)Dc(f[g],a,e);e=x(b);f=void 0!==e.firstChild?null:void 0;e.firstChild=e.lastChild=f;e.childNodes=f}else Dc(b,a,e);e=y(a);if(Mc(a)){Lc(e.root);var h=
!0}else e.root&&(h=!0)}h||(h=C(a)?a.host:a,c?(c=Nc(c),E.insertBefore.call(h,b,c)):E.appendChild.call(h,b));Oc(a,b);return b}
function Kc(a,b){if(b.parentNode!==a)throw Error("The node to be removed is not a child of this node: "+b);var c=hb(b),d=y(a);if(gb(a)){var e=x(b),f=x(a);b===f.firstChild&&(f.firstChild=e.nextSibling);b===f.lastChild&&(f.lastChild=e.previousSibling);var g=e.previousSibling,h=e.nextSibling;g&&(x(g).nextSibling=h);h&&(x(h).previousSibling=g);e.parentNode=e.previousSibling=e.nextSibling=void 0;void 0!==f.childNodes&&(f.childNodes=null);if(Mc(a)){Lc(d.root);var k=!0}}Pc(b);if(c){(e=a&&"slot"===a.localName)&&
(k=!0);if(c.m){Qc(c);f=c.v;for(A in f)for(g=f[A],h=0;h<g.length;h++){var m=g[h];if(vb(b,m)){g.splice(h,1);var n=c.m.indexOf(m);0<=n&&c.m.splice(n,1);h--;n=y(m);if(m=n.N)for(var p=0;p<m.length;p++){var G=m[p],B=Rc(G);B&&E.removeChild.call(B,G)}n.N=[];n.assignedNodes=[];n=!0}}var A=n}else A=void 0;(A||e)&&Lc(c)}k||(k=C(a)?a.host:a,(!d.root&&"slot"!==b.localName||k===Ic(b))&&E.removeChild.call(k,b));Oc(a,null,b);return b}
function Pc(a){var b=y(a);if(b&&void 0!==b.W){b=a.childNodes;for(var c=0,d=b.length,e;c<d&&(e=b[c]);c++)Pc(e)}if(a=y(a))a.W=void 0}function Nc(a){var b=a;a&&"slot"===a.localName&&(b=(b=(b=y(a))&&b.N)&&b.length?b[0]:Nc(a.nextSibling));return b}function Mc(a){return(a=(a=y(a))&&a.root)&&Sc(a)}
function Tc(a,b){if("slot"===b)a=a.parentNode,Mc(a)&&Lc(y(a).root);else if("slot"===a.localName&&"name"===b&&(b=hb(a))){if(b.m){var c=a.Ma,d=Uc(a);if(d!==c){c=b.v[c];var e=c.indexOf(a);0<=e&&c.splice(e,1);c=b.v[d]||(b.v[d]=[]);c.push(a);1<c.length&&(b.v[d]=Vc(c))}}Lc(b)}}function Oc(a,b,c){if(a=(a=y(a))&&a.T)b&&a.addedNodes.push(b),c&&a.removedNodes.push(c),Cb(a)}
function Wc(a){if(a&&a.nodeType){var b=x(a),c=b.W;void 0===c&&(C(a)?(c=a,b.W=c):(c=(c=a.parentNode)?Wc(c):a,E.contains.call(document.documentElement,a)&&(b.W=c)));return c}}function Xc(a,b,c){var d=[];Yc(a.childNodes,b,c,d);return d}function Yc(a,b,c,d){for(var e=0,f=a.length,g;e<f&&(g=a[e]);e++){var h;if(h=g.nodeType===Node.ELEMENT_NODE){h=g;var k=b,m=c,n=d,p=k(h);p&&n.push(h);m&&m(p)?h=p:(Yc(h.childNodes,k,m,n),h=void 0)}if(h)break}}var Zc=null;
function $c(a,b,c){Zc||(Zc=window.ShadyCSS&&window.ShadyCSS.ScopingShim);Zc&&"class"===b?Zc.setElementClass(a,c):(E.setAttribute.call(a,b,c),Tc(a,b))}function ad(a,b){if(a.ownerDocument!==document||"template"===a.localName)return E.importNode.call(document,a,b);var c=E.importNode.call(document,a,!1);if(b){a=a.childNodes;b=0;for(var d;b<a.length;b++)d=ad(a[b],!0),c.appendChild(d)}return c};var bd="__eventWrappers"+Date.now(),cd=function(){var a=Object.getOwnPropertyDescriptor(Event.prototype,"composed");return a?function(b){return a.get.call(b)}:null}(),dd={blur:!0,focus:!0,focusin:!0,focusout:!0,click:!0,dblclick:!0,mousedown:!0,mouseenter:!0,mouseleave:!0,mousemove:!0,mouseout:!0,mouseover:!0,mouseup:!0,wheel:!0,beforeinput:!0,input:!0,keydown:!0,keyup:!0,compositionstart:!0,compositionupdate:!0,compositionend:!0,touchstart:!0,touchend:!0,touchmove:!0,touchcancel:!0,pointerover:!0,
pointerenter:!0,pointerdown:!0,pointermove:!0,pointerup:!0,pointercancel:!0,pointerout:!0,pointerleave:!0,gotpointercapture:!0,lostpointercapture:!0,dragstart:!0,drag:!0,dragenter:!0,dragleave:!0,dragover:!0,drop:!0,dragend:!0,DOMActivate:!0,DOMFocusIn:!0,DOMFocusOut:!0,keypress:!0},ed={DOMAttrModified:!0,DOMAttributeNameChanged:!0,DOMCharacterDataModified:!0,DOMElementNameChanged:!0,DOMNodeInserted:!0,DOMNodeInsertedIntoDocument:!0,DOMNodeRemoved:!0,DOMNodeRemovedFromDocument:!0,DOMSubtreeModified:!0};
function fd(a,b){var c=[],d=a;for(a=a===window?window:a.getRootNode();d;)c.push(d),d=d.assignedSlot?d.assignedSlot:d.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&d.host&&(b||d!==a)?d.host:d.parentNode;c[c.length-1]===document&&c.push(window);return c}function gd(a,b){if(!C)return a;a=fd(a,!0);for(var c=0,d,e,f,g;c<b.length;c++)if(d=b[c],f=d===window?window:d.getRootNode(),f!==e&&(g=a.indexOf(f),e=f),!C(f)||-1<g)return d}
var hd={get composed(){void 0===this.Z&&(cd?this.Z=cd(this):!1!==this.isTrusted&&(this.Z=dd[this.type]));return this.Z||!1},composedPath:function(){this.wa||(this.wa=fd(this.__target,this.composed));return this.wa},get target(){return gd(this.currentTarget,this.composedPath())},get relatedTarget(){if(!this.ka)return null;this.za||(this.za=fd(this.ka,!0));return gd(this.currentTarget,this.za)},stopPropagation:function(){Event.prototype.stopPropagation.call(this);this.ja=!0},stopImmediatePropagation:function(){Event.prototype.stopImmediatePropagation.call(this);
this.ja=this.Ia=!0}};function id(a){function b(b,d){b=new a(b,d);b.Z=d&&!!d.composed;return b}mb(b,a);b.prototype=a.prototype;return b}var jd={focus:!0,blur:!0};function kd(a){return a.__target!==a.target||a.ka!==a.relatedTarget}function ld(a,b,c){if(c=b.__handlers&&b.__handlers[a.type]&&b.__handlers[a.type][c])for(var d=0,e;(e=c[d])&&(!kd(a)||a.target!==a.relatedTarget)&&(e.call(b,a),!a.Ia);d++);}
function md(a){var b=a.composedPath();Object.defineProperty(a,"currentTarget",{get:function(){return d},configurable:!0});for(var c=b.length-1;0<=c;c--){var d=b[c];ld(a,d,"capture");if(a.ja)return}Object.defineProperty(a,"eventPhase",{get:function(){return Event.AT_TARGET}});var e;for(c=0;c<b.length;c++){d=b[c];var f=y(d);f=f&&f.root;if(0===c||f&&f===e)if(ld(a,d,"bubble"),d!==window&&(e=d.getRootNode()),a.ja)break}}
function nd(a,b,c,d,e,f){for(var g=0;g<a.length;g++){var h=a[g],k=h.type,m=h.capture,n=h.once,p=h.passive;if(b===h.node&&c===k&&d===m&&e===n&&f===p)return g}return-1}
function od(a,b,c){if(b){var d=typeof b;if("function"===d||"object"===d)if("object"!==d||b.handleEvent&&"function"===typeof b.handleEvent){var e=this instanceof Window?E.lb:E.addEventListener;if(ed[a])return e.call(this,a,b,c);if(c&&"object"===typeof c){var f=!!c.capture;var g=!!c.once;var h=!!c.passive}else f=!!c,h=g=!1;var k=c&&c.ma||this,m=b[bd];if(m){if(-1<nd(m,k,a,f,g,h))return}else b[bd]=[];m=function(e){g&&this.removeEventListener(a,b,c);e.__target||pd(e);if(k!==this){var f=Object.getOwnPropertyDescriptor(e,
"currentTarget");Object.defineProperty(e,"currentTarget",{get:function(){return k},configurable:!0})}if(!C(k)||-1!=e.composedPath().indexOf(k))if(e.composed||-1<e.composedPath().indexOf(k))if(kd(e)&&e.target===e.relatedTarget)e.eventPhase===Event.BUBBLING_PHASE&&e.stopImmediatePropagation();else if(e.eventPhase===Event.CAPTURING_PHASE||e.bubbles||e.target===k||k instanceof Window){var h="function"===d?b.call(k,e):b.handleEvent&&b.handleEvent(e);k!==this&&(f?(Object.defineProperty(e,"currentTarget",
f),f=null):delete e.currentTarget);return h}};b[bd].push({node:k,type:a,capture:f,once:g,passive:h,nb:m});jd[a]?(this.__handlers=this.__handlers||{},this.__handlers[a]=this.__handlers[a]||{capture:[],bubble:[]},this.__handlers[a][f?"capture":"bubble"].push(m)):e.call(this,a,m,c)}}}
function qd(a,b,c){if(b){var d=this instanceof Window?E.mb:E.removeEventListener;if(ed[a])return d.call(this,a,b,c);if(c&&"object"===typeof c){var e=!!c.capture;var f=!!c.once;var g=!!c.passive}else e=!!c,g=f=!1;var h=c&&c.ma||this,k=void 0;var m=null;try{m=b[bd]}catch(n){}m&&(f=nd(m,h,a,e,f,g),-1<f&&(k=m.splice(f,1)[0].nb,m.length||(b[bd]=void 0)));d.call(this,a,k||b,c);k&&jd[a]&&this.__handlers&&this.__handlers[a]&&(a=this.__handlers[a][e?"capture":"bubble"],k=a.indexOf(k),-1<k&&a.splice(k,1))}}
function rd(){for(var a in jd)window.addEventListener(a,function(a){a.__target||(pd(a),md(a))},!0)}function pd(a){a.__target=a.target;a.ka=a.relatedTarget;if(z.K){var b=Object.getPrototypeOf(a);if(!b.hasOwnProperty("__patchProto")){var c=Object.create(b);c.pb=b;kb(c,hd);b.__patchProto=c}a.__proto__=b.__patchProto}else kb(a,hd)}var sd=id(window.Event),td=id(window.CustomEvent),ud=id(window.MouseEvent);
function vd(){window.Event=sd;window.CustomEvent=td;window.MouseEvent=ud;rd();if(!cd&&Object.getOwnPropertyDescriptor(Event.prototype,"isTrusted")){var a=function(){var a=new MouseEvent("click",{bubbles:!0,cancelable:!0,composed:!0});this.dispatchEvent(a)};Element.prototype.click?Element.prototype.click=a:HTMLElement.prototype.click&&(HTMLElement.prototype.click=a)}};function wd(a,b){return{index:a,X:[],da:b}}
function xd(a,b,c,d){var e=0,f=0,g=0,h=0,k=Math.min(b-e,d-f);if(0==e&&0==f)a:{for(g=0;g<k;g++)if(a[g]!==c[g])break a;g=k}if(b==a.length&&d==c.length){h=a.length;for(var m=c.length,n=0;n<k-g&&yd(a[--h],c[--m]);)n++;h=n}e+=g;f+=g;b-=h;d-=h;if(0==b-e&&0==d-f)return[];if(e==b){for(b=wd(e,0);f<d;)b.X.push(c[f++]);return[b]}if(f==d)return[wd(e,b-e)];k=e;g=f;d=d-g+1;h=b-k+1;b=Array(d);for(m=0;m<d;m++)b[m]=Array(h),b[m][0]=m;for(m=0;m<h;m++)b[0][m]=m;for(m=1;m<d;m++)for(n=1;n<h;n++)if(a[k+n-1]===c[g+m-1])b[m][n]=
b[m-1][n-1];else{var p=b[m-1][n]+1,G=b[m][n-1]+1;b[m][n]=p<G?p:G}k=b.length-1;g=b[0].length-1;d=b[k][g];for(a=[];0<k||0<g;)0==k?(a.push(2),g--):0==g?(a.push(3),k--):(h=b[k-1][g-1],m=b[k-1][g],n=b[k][g-1],p=m<n?m<h?m:h:n<h?n:h,p==h?(h==d?a.push(0):(a.push(1),d=h),k--,g--):p==m?(a.push(3),k--,d=m):(a.push(2),g--,d=n));a.reverse();b=void 0;k=[];for(g=0;g<a.length;g++)switch(a[g]){case 0:b&&(k.push(b),b=void 0);e++;f++;break;case 1:b||(b=wd(e,0));b.da++;e++;b.X.push(c[f]);f++;break;case 2:b||(b=wd(e,
0));b.da++;e++;break;case 3:b||(b=wd(e,0)),b.X.push(c[f]),f++}b&&k.push(b);return k}function yd(a,b){return a===b};var Rc=L.parentNode,zd=L.childNodes,Ad={},Bd=z.deferConnectionCallbacks&&"loading"===document.readyState,Cd;function Dd(a){var b=[];do b.unshift(a);while(a=a.parentNode);return b}
function zc(a,b,c){if(a!==Ad)throw new TypeError("Illegal constructor");this.Qa="ShadyRoot";this.host=b;this.c=c&&c.mode;Hc(b);a=x(b);a.root=this;a.Fa="closed"!==this.c?this:null;a=x(this);a.firstChild=a.lastChild=a.parentNode=a.nextSibling=a.previousSibling=null;a.childNodes=[];this.b=this.ca=!1;this.a=this.v=this.m=null;Lc(this)}function Lc(a){a.ca||(a.ca=!0,zb(function(){return Ed(a)}))}
function Ed(a){for(var b;a;){a.ca&&(b=a);a:{var c=a;a=c.host.getRootNode();if(C(a))for(var d=c.host.childNodes,e=0;e<d.length;e++)if(c=d[e],"slot"==c.localName)break a;a=void 0}}b&&b._renderRoot()}
zc.prototype._renderRoot=function(){var a=Bd;Bd=!0;this.ca=!1;if(this.m){Qc(this);for(var b=0,c;b<this.m.length;b++){c=this.m[b];var d=y(c),e=d.assignedNodes;d.assignedNodes=[];d.N=[];if(d.qa=e)for(d=0;d<e.length;d++){var f=y(e[d]);f.ba=f.assignedSlot;f.assignedSlot===c&&(f.assignedSlot=null)}}for(c=this.host.firstChild;c;c=c.nextSibling)Fd(this,c);for(b=0;b<this.m.length;b++){c=this.m[b];e=y(c);if(!e.assignedNodes.length)for(d=c.firstChild;d;d=d.nextSibling)Fd(this,d,c);(d=(d=y(c.parentNode))&&d.root)&&
Sc(d)&&d._renderRoot();Gd(this,e.N,e.assignedNodes);if(d=e.qa){for(f=0;f<d.length;f++)y(d[f]).ba=null;e.qa=null;d.length>e.assignedNodes.length&&(e.fa=!0)}e.fa&&(e.fa=!1,Hd(this,c))}b=this.m;c=[];for(e=0;e<b.length;e++)d=b[e].parentNode,(f=y(d))&&f.root||!(0>c.indexOf(d))||c.push(d);for(b=0;b<c.length;b++){e=c[b];d=e===this?this.host:e;f=[];e=e.childNodes;for(var g=0;g<e.length;g++){var h=e[g];if("slot"==h.localName){h=y(h).N;for(var k=0;k<h.length;k++)f.push(h[k])}else f.push(h)}e=void 0;g=zd(d);
h=xd(f,f.length,g,g.length);for(var m=k=0;k<h.length&&(e=h[k]);k++){for(var n=0,p;n<e.X.length&&(p=e.X[n]);n++)Rc(p)===d&&E.removeChild.call(d,p),g.splice(e.index+m,1);m-=e.da}for(m=0;m<h.length&&(e=h[m]);m++)for(k=g[e.index],n=e.index;n<e.index+e.da;n++)p=f[n],E.insertBefore.call(d,p,k),g.splice(n,0,p)}}if(!this.b)for(p=this.host.childNodes,c=0,b=p.length;c<b;c++)e=p[c],d=y(e),Rc(e)!==this.host||"slot"!==e.localName&&d.assignedSlot||E.removeChild.call(this.host,e);this.b=!0;Bd=a;Cd&&Cd()};
function Fd(a,b,c){var d=x(b),e=d.ba;d.ba=null;c||(c=(a=a.v[b.slot||"__catchall"])&&a[0]);c?(x(c).assignedNodes.push(b),d.assignedSlot=c):d.assignedSlot=void 0;e!==d.assignedSlot&&d.assignedSlot&&(x(d.assignedSlot).fa=!0)}function Gd(a,b,c){for(var d=0,e;d<c.length&&(e=c[d]);d++)if("slot"==e.localName){var f=y(e).assignedNodes;f&&f.length&&Gd(a,b,f)}else b.push(c[d])}function Hd(a,b){E.dispatchEvent.call(b,new Event("slotchange"));b=y(b);b.assignedSlot&&Hd(a,b.assignedSlot)}
function Qc(a){if(a.a&&a.a.length){for(var b=a.a,c,d=0;d<b.length;d++){var e=b[d];Hc(e);Hc(e.parentNode);var f=Uc(e);a.v[f]?(c=c||{},c[f]=!0,a.v[f].push(e)):a.v[f]=[e];a.m.push(e)}if(c)for(var g in c)a.v[g]=Vc(a.v[g]);a.a=[]}}function Uc(a){var b=a.name||a.getAttribute("name")||"__catchall";return a.Ma=b}function Vc(a){return a.sort(function(a,c){a=Dd(a);for(var b=Dd(c),e=0;e<a.length;e++){c=a[e];var f=b[e];if(c!==f)return a=Array.from(c.parentNode.childNodes),a.indexOf(c)-a.indexOf(f)}})}
function Sc(a){Qc(a);return!(!a.m||!a.m.length)}
if(window.customElements&&z.ta){var Id=new Map;Cd=function(){var a=Array.from(Id);Id.clear();a=ja(a);for(var b=a.next();!b.done;b=a.next()){b=ja(b.value);var c=b.next().value;b.next().value?c.Ka():c.La()}};Bd&&document.addEventListener("readystatechange",function(){Bd=!1;Cd()},{once:!0});var Jd=function(a,b,c){var d=0,e="__isConnected"+d++;if(b||c)a.prototype.connectedCallback=a.prototype.Ka=function(){Bd?Id.set(this,!0):this[e]||(this[e]=!0,b&&b.call(this))},a.prototype.disconnectedCallback=a.prototype.La=
function(){Bd?this.isConnected||Id.set(this,!1):this[e]&&(this[e]=!1,c&&c.call(this))};return a},define=window.customElements.define;Object.defineProperty(window.CustomElementRegistry.prototype,"define",{value:function(a,b){var c=b.prototype.connectedCallback,d=b.prototype.disconnectedCallback;define.call(window.customElements,a,Jd(b,c,d));b.prototype.connectedCallback=c;b.prototype.disconnectedCallback=d}})};function Kd(a){var b=a.getRootNode();C(b)&&Ed(b);return(a=y(a))&&a.assignedSlot||null}
var Ld={addEventListener:od.bind(window),removeEventListener:qd.bind(window)},Md={addEventListener:od,removeEventListener:qd,appendChild:function(a){return Jc(this,a)},insertBefore:function(a,b){return Jc(this,a,b)},removeChild:function(a){return Kc(this,a)},replaceChild:function(a,b){Jc(this,a,b);Kc(this,b);return a},cloneNode:function(a){if("template"==this.localName)var b=E.cloneNode.call(this,a);else if(b=E.cloneNode.call(this,!1),a&&b.nodeType!==Node.ATTRIBUTE_NODE){a=this.childNodes;for(var c=
0,d;c<a.length;c++)d=a[c].cloneNode(!0),b.appendChild(d)}return b},getRootNode:function(){return Wc(this)},contains:function(a){return vb(this,a)},dispatchEvent:function(a){Ab();return E.dispatchEvent.call(this,a)}};
Object.defineProperties(Md,{isConnected:{get:function(){if(qc&&qc.call(this))return!0;if(this.nodeType==Node.DOCUMENT_FRAGMENT_NODE)return!1;var a=this.ownerDocument;if(ub){if(E.contains.call(a,this))return!0}else if(a.documentElement&&E.contains.call(a.documentElement,this))return!0;for(a=this;a&&!(a instanceof Document);)a=a.parentNode||(C(a)?a.host:void 0);return!!(a&&a instanceof Document)},configurable:!0}});
var Nd={get assignedSlot(){return Kd(this)}},Od={querySelector:function(a){return Xc(this,function(b){return jb.call(b,a)},function(a){return!!a})[0]||null},querySelectorAll:function(a,b){if(b){b=Array.prototype.slice.call(E.querySelectorAll.call(this,a));var c=this.getRootNode();return b.filter(function(a){return a.getRootNode()==c})}return Xc(this,function(b){return jb.call(b,a)})}},Pd={assignedNodes:function(a){if("slot"===this.localName){var b=this.getRootNode();C(b)&&Ed(b);return(b=y(this))?
(a&&a.flatten?b.N:b.assignedNodes)||[]:[]}}},Qd=lb({setAttribute:function(a,b){$c(this,a,b)},removeAttribute:function(a){E.removeAttribute.call(this,a);Tc(this,a)},attachShadow:function(a){if(!this)throw"Must provide a host.";if(!a)throw"Not enough arguments.";return new zc(Ad,this,a)},get slot(){return this.getAttribute("slot")},set slot(a){$c(this,"slot",a)},get assignedSlot(){return Kd(this)}},Od,Pd);Object.defineProperties(Qd,vc);
var Rd=lb({importNode:function(a,b){return ad(a,b)},getElementById:function(a){return Xc(this,function(b){return b.id==a},function(a){return!!a})[0]||null}},Od);Object.defineProperties(Rd,{_activeElement:wc.activeElement});
for(var Sd=HTMLElement.prototype.blur,Td={blur:function(){var a=y(this);(a=(a=a&&a.root)&&a.activeElement)?a.blur():Sd.call(this)}},Ud={},Vd=ja(Object.getOwnPropertyNames(Document.prototype)),Wd=Vd.next();!Wd.done;Ud={H:Ud.H},Wd=Vd.next())Ud.H=Wd.value,"on"===Ud.H.substring(0,2)&&Object.defineProperty(Td,Ud.H,{set:function(a){return function(b){var c=x(this),d=a.H.substring(2);c.$[a.H]&&this.removeEventListener(d,c.$[a.H]);this.addEventListener(d,b,{});c.$[a.H]=b}}(Ud),get:function(a){return function(){var b=
y(this);return b&&b.$[a.H]}}(Ud),configurable:!0});var Xd={addEventListener:function(a,b,c){"object"!==typeof c&&(c={capture:!!c});c.ma=this;this.host.addEventListener(a,b,c)},removeEventListener:function(a,b,c){"object"!==typeof c&&(c={capture:!!c});c.ma=this;this.host.removeEventListener(a,b,c)},getElementById:function(a){return Xc(this,function(b){return b.id==a},function(a){return!!a})[0]||null}};
function N(a,b){for(var c=Object.getOwnPropertyNames(b),d=0;d<c.length;d++){var e=c[d],f=Object.getOwnPropertyDescriptor(b,e);f.value?a[e]=f.value:Object.defineProperty(a,e,f)}};if(z.ta){var ShadyDOM={inUse:z.ta,patch:function(a){Bc(a);Ac(a);return a},isShadyRoot:C,enqueue:zb,flush:Ab,settings:z,filterMutations:Fb,observeChildren:Db,unobserveChildren:Eb,nativeMethods:E,nativeTree:L,deferConnectionCallbacks:z.deferConnectionCallbacks};window.ShadyDOM=ShadyDOM;vd();var Yd=window.customElements&&window.customElements.nativeHTMLElement||HTMLElement;N(zc.prototype,Xd);N(window.Node.prototype,Md);N(window.Window.prototype,Ld);N(window.Text.prototype,Nd);N(window.DocumentFragment.prototype,
Od);N(window.Element.prototype,Qd);N(window.Document.prototype,Rd);window.HTMLSlotElement&&N(window.HTMLSlotElement.prototype,Pd);N(Yd.prototype,Td);z.K&&(xc(window.Node.prototype),xc(window.Text.prototype),xc(window.DocumentFragment.prototype),xc(window.Element.prototype),xc(Yd.prototype),xc(window.Document.prototype),window.HTMLSlotElement&&xc(window.HTMLSlotElement.prototype));yc();window.ShadowRoot=zc};var Zd=new Set("annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" "));function $d(a){var b=Zd.has(a);a=/^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(a);return!b&&a}function O(a){var b=a.isConnected;if(void 0!==b)return b;for(;a&&!(a.__CE_isImportDocument||a instanceof Document);)a=a.parentNode||(window.ShadowRoot&&a instanceof ShadowRoot?a.host:void 0);return!(!a||!(a.__CE_isImportDocument||a instanceof Document))}
function ae(a,b){for(;b&&b!==a&&!b.nextSibling;)b=b.parentNode;return b&&b!==a?b.nextSibling:null}
function be(a,b,c){c=void 0===c?new Set:c;for(var d=a;d;){if(d.nodeType===Node.ELEMENT_NODE){var e=d;b(e);var f=e.localName;if("link"===f&&"import"===e.getAttribute("rel")){d=e.import;if(d instanceof Node&&!c.has(d))for(c.add(d),d=d.firstChild;d;d=d.nextSibling)be(d,b,c);d=ae(a,e);continue}else if("template"===f){d=ae(a,e);continue}if(e=e.__CE_shadowRoot)for(e=e.firstChild;e;e=e.nextSibling)be(e,b,c)}d=d.firstChild?d.firstChild:ae(a,d)}}function P(a,b,c){a[b]=c};function ce(){this.a=new Map;this.B=new Map;this.f=[];this.c=!1}function de(a,b,c){a.a.set(b,c);a.B.set(c.constructor,c)}function ee(a,b){a.c=!0;a.f.push(b)}function fe(a,b){a.c&&be(b,function(b){return a.b(b)})}ce.prototype.b=function(a){if(this.c&&!a.__CE_patched){a.__CE_patched=!0;for(var b=0;b<this.f.length;b++)this.f[b](a)}};function Q(a,b){var c=[];be(b,function(a){return c.push(a)});for(b=0;b<c.length;b++){var d=c[b];1===d.__CE_state?a.connectedCallback(d):ge(a,d)}}
function R(a,b){var c=[];be(b,function(a){return c.push(a)});for(b=0;b<c.length;b++){var d=c[b];1===d.__CE_state&&a.disconnectedCallback(d)}}
function S(a,b,c){c=void 0===c?{}:c;var d=c.jb||new Set,e=c.ia||function(b){return ge(a,b)},f=[];be(b,function(b){if("link"===b.localName&&"import"===b.getAttribute("rel")){var c=b.import;c instanceof Node&&(c.__CE_isImportDocument=!0,c.__CE_hasRegistry=!0);c&&"complete"===c.readyState?c.__CE_documentLoadHandled=!0:b.addEventListener("load",function(){var c=b.import;if(!c.__CE_documentLoadHandled){c.__CE_documentLoadHandled=!0;var f=new Set(d);f.delete(c);S(a,c,{jb:f,ia:e})}})}else f.push(b)},d);
if(a.c)for(b=0;b<f.length;b++)a.b(f[b]);for(b=0;b<f.length;b++)e(f[b])}
function ge(a,b){if(void 0===b.__CE_state){var c=b.ownerDocument;if(c.defaultView||c.__CE_isImportDocument&&c.__CE_hasRegistry)if(c=a.a.get(b.localName)){c.constructionStack.push(b);var d=c.constructor;try{try{if(new d!==b)throw Error("The custom element constructor did not produce the element being upgraded.");}finally{c.constructionStack.pop()}}catch(g){throw b.__CE_state=2,g;}b.__CE_state=1;b.__CE_definition=c;if(c.attributeChangedCallback)for(c=c.observedAttributes,d=0;d<c.length;d++){var e=c[d],
f=b.getAttribute(e);null!==f&&a.attributeChangedCallback(b,e,null,f,null)}O(b)&&a.connectedCallback(b)}}}ce.prototype.connectedCallback=function(a){var b=a.__CE_definition;b.connectedCallback&&b.connectedCallback.call(a)};ce.prototype.disconnectedCallback=function(a){var b=a.__CE_definition;b.disconnectedCallback&&b.disconnectedCallback.call(a)};
ce.prototype.attributeChangedCallback=function(a,b,c,d,e){var f=a.__CE_definition;f.attributeChangedCallback&&-1<f.observedAttributes.indexOf(b)&&f.attributeChangedCallback.call(a,b,c,d,e)};function he(a){var b=document;this.w=a;this.a=b;this.P=void 0;S(this.w,this.a);"loading"===this.a.readyState&&(this.P=new MutationObserver(this.b.bind(this)),this.P.observe(this.a,{childList:!0,subtree:!0}))}function ie(a){a.P&&a.P.disconnect()}he.prototype.b=function(a){var b=this.a.readyState;"interactive"!==b&&"complete"!==b||ie(this);for(b=0;b<a.length;b++)for(var c=a[b].addedNodes,d=0;d<c.length;d++)S(this.w,c[d])};function je(){var a=this;this.a=this.A=void 0;this.b=new Promise(function(b){a.a=b;a.A&&b(a.A)})}je.prototype.resolve=function(a){if(this.A)throw Error("Already resolved.");this.A=a;this.a&&this.a(a)};function T(a){this.na=!1;this.w=a;this.sa=new Map;this.oa=function(a){return a()};this.aa=!1;this.pa=[];this.Pa=new he(a)}r=T.prototype;
r.define=function(a,b){var c=this;if(!(b instanceof Function))throw new TypeError("Custom element constructors must be functions.");if(!$d(a))throw new SyntaxError("The element name '"+a+"' is not valid.");if(this.w.a.get(a))throw Error("A custom element with name '"+a+"' has already been defined.");if(this.na)throw Error("A custom element is already being defined.");this.na=!0;try{var d=function(a){var b=e[a];if(void 0!==b&&!(b instanceof Function))throw Error("The '"+a+"' callback must be a function.");
return b},e=b.prototype;if(!(e instanceof Object))throw new TypeError("The custom element constructor's prototype is not an object.");var f=d("connectedCallback");var g=d("disconnectedCallback");var h=d("adoptedCallback");var k=d("attributeChangedCallback");var m=b.observedAttributes||[]}catch(n){return}finally{this.na=!1}b={localName:a,constructor:b,connectedCallback:f,disconnectedCallback:g,adoptedCallback:h,attributeChangedCallback:k,observedAttributes:m,constructionStack:[]};de(this.w,a,b);this.pa.push(b);
this.aa||(this.aa=!0,this.oa(function(){return ke(c)}))};r.ia=function(a){S(this.w,a)};
function ke(a){if(!1!==a.aa){a.aa=!1;for(var b=a.pa,c=[],d=new Map,e=0;e<b.length;e++)d.set(b[e].localName,[]);S(a.w,document,{ia:function(b){if(void 0===b.__CE_state){var e=b.localName,f=d.get(e);f?f.push(b):a.w.a.get(e)&&c.push(b)}}});for(e=0;e<c.length;e++)ge(a.w,c[e]);for(;0<b.length;){var f=b.shift();e=f.localName;f=d.get(f.localName);for(var g=0;g<f.length;g++)ge(a.w,f[g]);(e=a.sa.get(e))&&e.resolve(void 0)}}}r.get=function(a){if(a=this.w.a.get(a))return a.constructor};
r.whenDefined=function(a){if(!$d(a))return Promise.reject(new SyntaxError("'"+a+"' is not a valid custom element name."));var b=this.sa.get(a);if(b)return b.b;b=new je;this.sa.set(a,b);this.w.a.get(a)&&!this.pa.some(function(b){return b.localName===a})&&b.resolve(void 0);return b.b};r.eb=function(a){ie(this.Pa);var b=this.oa;this.oa=function(c){return a(function(){return b(c)})}};window.CustomElementRegistry=T;T.prototype.define=T.prototype.define;T.prototype.upgrade=T.prototype.ia;
T.prototype.get=T.prototype.get;T.prototype.whenDefined=T.prototype.whenDefined;T.prototype.polyfillWrapFlushCallback=T.prototype.eb;var le=window.Document.prototype.createElement,me=window.Document.prototype.createElementNS,ne=window.Document.prototype.importNode,oe=window.Document.prototype.prepend,pe=window.Document.prototype.append,qe=window.DocumentFragment.prototype.prepend,re=window.DocumentFragment.prototype.append,se=window.Node.prototype.cloneNode,te=window.Node.prototype.appendChild,ue=window.Node.prototype.insertBefore,ve=window.Node.prototype.removeChild,we=window.Node.prototype.replaceChild,xe=Object.getOwnPropertyDescriptor(window.Node.prototype,
"textContent"),ye=window.Element.prototype.attachShadow,ze=Object.getOwnPropertyDescriptor(window.Element.prototype,"innerHTML"),Ae=window.Element.prototype.getAttribute,Be=window.Element.prototype.setAttribute,Ce=window.Element.prototype.removeAttribute,De=window.Element.prototype.getAttributeNS,Ee=window.Element.prototype.setAttributeNS,Fe=window.Element.prototype.removeAttributeNS,Ge=window.Element.prototype.insertAdjacentElement,He=window.Element.prototype.insertAdjacentHTML,Ie=window.Element.prototype.prepend,
Je=window.Element.prototype.append,Ke=window.Element.prototype.before,Le=window.Element.prototype.after,Me=window.Element.prototype.replaceWith,Ne=window.Element.prototype.remove,Oe=window.HTMLElement,Pe=Object.getOwnPropertyDescriptor(window.HTMLElement.prototype,"innerHTML"),Qe=window.HTMLElement.prototype.insertAdjacentElement,Re=window.HTMLElement.prototype.insertAdjacentHTML;var Se=new function(){};function Te(){var a=Ue;window.HTMLElement=function(){function b(){var b=this.constructor,d=a.B.get(b);if(!d)throw Error("The custom element being constructed was not registered with `customElements`.");var e=d.constructionStack;if(0===e.length)return e=le.call(document,d.localName),Object.setPrototypeOf(e,b.prototype),e.__CE_state=1,e.__CE_definition=d,a.b(e),e;d=e.length-1;var f=e[d];if(f===Se)throw Error("The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.");
e[d]=Se;Object.setPrototypeOf(f,b.prototype);a.b(f);return f}b.prototype=Oe.prototype;Object.defineProperty(b.prototype,"constructor",{writable:!0,configurable:!0,enumerable:!1,value:b});return b}()};function Ve(a,b,c){function d(b){return function(c){for(var d=[],e=0;e<arguments.length;++e)d[e]=arguments[e];e=[];for(var f=[],m=0;m<d.length;m++){var n=d[m];n instanceof Element&&O(n)&&f.push(n);if(n instanceof DocumentFragment)for(n=n.firstChild;n;n=n.nextSibling)e.push(n);else e.push(n)}b.apply(this,d);for(d=0;d<f.length;d++)R(a,f[d]);if(O(this))for(d=0;d<e.length;d++)f=e[d],f instanceof Element&&Q(a,f)}}void 0!==c.ha&&(b.prepend=d(c.ha));void 0!==c.append&&(b.append=d(c.append))};function We(){var a=Ue;P(Document.prototype,"createElement",function(b){if(this.__CE_hasRegistry){var c=a.a.get(b);if(c)return new c.constructor}b=le.call(this,b);a.b(b);return b});P(Document.prototype,"importNode",function(b,c){b=ne.call(this,b,c);this.__CE_hasRegistry?S(a,b):fe(a,b);return b});P(Document.prototype,"createElementNS",function(b,c){if(this.__CE_hasRegistry&&(null===b||"http://www.w3.org/1999/xhtml"===b)){var d=a.a.get(c);if(d)return new d.constructor}b=me.call(this,b,c);a.b(b);return b});
Ve(a,Document.prototype,{ha:oe,append:pe})};function Xe(){function a(a,d){Object.defineProperty(a,"textContent",{enumerable:d.enumerable,configurable:!0,get:d.get,set:function(a){if(this.nodeType===Node.TEXT_NODE)d.set.call(this,a);else{var c=void 0;if(this.firstChild){var e=this.childNodes,h=e.length;if(0<h&&O(this)){c=Array(h);for(var k=0;k<h;k++)c[k]=e[k]}}d.set.call(this,a);if(c)for(a=0;a<c.length;a++)R(b,c[a])}}})}var b=Ue;P(Node.prototype,"insertBefore",function(a,d){if(a instanceof DocumentFragment){var c=Array.prototype.slice.apply(a.childNodes);
a=ue.call(this,a,d);if(O(this))for(d=0;d<c.length;d++)Q(b,c[d]);return a}c=O(a);d=ue.call(this,a,d);c&&R(b,a);O(this)&&Q(b,a);return d});P(Node.prototype,"appendChild",function(a){if(a instanceof DocumentFragment){var c=Array.prototype.slice.apply(a.childNodes);a=te.call(this,a);if(O(this))for(var e=0;e<c.length;e++)Q(b,c[e]);return a}c=O(a);e=te.call(this,a);c&&R(b,a);O(this)&&Q(b,a);return e});P(Node.prototype,"cloneNode",function(a){a=se.call(this,a);this.ownerDocument.__CE_hasRegistry?S(b,a):
fe(b,a);return a});P(Node.prototype,"removeChild",function(a){var c=O(a),e=ve.call(this,a);c&&R(b,a);return e});P(Node.prototype,"replaceChild",function(a,d){if(a instanceof DocumentFragment){var c=Array.prototype.slice.apply(a.childNodes);a=we.call(this,a,d);if(O(this))for(R(b,d),d=0;d<c.length;d++)Q(b,c[d]);return a}c=O(a);var f=we.call(this,a,d),g=O(this);g&&R(b,d);c&&R(b,a);g&&Q(b,a);return f});xe&&xe.get?a(Node.prototype,xe):ee(b,function(b){a(b,{enumerable:!0,configurable:!0,get:function(){for(var a=
[],b=0;b<this.childNodes.length;b++)a.push(this.childNodes[b].textContent);return a.join("")},set:function(a){for(;this.firstChild;)ve.call(this,this.firstChild);te.call(this,document.createTextNode(a))}})})};function Ye(a){function b(b){return function(c){for(var d=[],e=0;e<arguments.length;++e)d[e]=arguments[e];e=[];for(var h=[],k=0;k<d.length;k++){var m=d[k];m instanceof Element&&O(m)&&h.push(m);if(m instanceof DocumentFragment)for(m=m.firstChild;m;m=m.nextSibling)e.push(m);else e.push(m)}b.apply(this,d);for(d=0;d<h.length;d++)R(a,h[d]);if(O(this))for(d=0;d<e.length;d++)h=e[d],h instanceof Element&&Q(a,h)}}var c=Element.prototype;void 0!==Ke&&(c.before=b(Ke));void 0!==Ke&&(c.after=b(Le));void 0!==Me&&
P(c,"replaceWith",function(b){for(var c=[],d=0;d<arguments.length;++d)c[d]=arguments[d];d=[];for(var g=[],h=0;h<c.length;h++){var k=c[h];k instanceof Element&&O(k)&&g.push(k);if(k instanceof DocumentFragment)for(k=k.firstChild;k;k=k.nextSibling)d.push(k);else d.push(k)}h=O(this);Me.apply(this,c);for(c=0;c<g.length;c++)R(a,g[c]);if(h)for(R(a,this),c=0;c<d.length;c++)g=d[c],g instanceof Element&&Q(a,g)});void 0!==Ne&&P(c,"remove",function(){var b=O(this);Ne.call(this);b&&R(a,this)})};function Ze(){function a(a,b){Object.defineProperty(a,"innerHTML",{enumerable:b.enumerable,configurable:!0,get:b.get,set:function(a){var c=this,e=void 0;O(this)&&(e=[],be(this,function(a){a!==c&&e.push(a)}));b.set.call(this,a);if(e)for(var f=0;f<e.length;f++){var g=e[f];1===g.__CE_state&&d.disconnectedCallback(g)}this.ownerDocument.__CE_hasRegistry?S(d,this):fe(d,this);return a}})}function b(a,b){P(a,"insertAdjacentElement",function(a,c){var e=O(c);a=b.call(this,a,c);e&&R(d,c);O(a)&&Q(d,c);return a})}
function c(a,b){function c(a,b){for(var c=[];a!==b;a=a.nextSibling)c.push(a);for(b=0;b<c.length;b++)S(d,c[b])}P(a,"insertAdjacentHTML",function(a,d){a=a.toLowerCase();if("beforebegin"===a){var e=this.previousSibling;b.call(this,a,d);c(e||this.parentNode.firstChild,this)}else if("afterbegin"===a)e=this.firstChild,b.call(this,a,d),c(this.firstChild,e);else if("beforeend"===a)e=this.lastChild,b.call(this,a,d),c(e||this.firstChild,null);else if("afterend"===a)e=this.nextSibling,b.call(this,a,d),c(this.nextSibling,
e);else throw new SyntaxError("The value provided ("+String(a)+") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.");})}var d=Ue;ye&&P(Element.prototype,"attachShadow",function(a){return this.__CE_shadowRoot=a=ye.call(this,a)});ze&&ze.get?a(Element.prototype,ze):Pe&&Pe.get?a(HTMLElement.prototype,Pe):ee(d,function(b){a(b,{enumerable:!0,configurable:!0,get:function(){return se.call(this,!0).innerHTML},set:function(a){var b="template"===this.localName,c=b?this.content:this,d=me.call(document,
this.namespaceURI,this.localName);for(d.innerHTML=a;0<c.childNodes.length;)ve.call(c,c.childNodes[0]);for(a=b?d.content:d;0<a.childNodes.length;)te.call(c,a.childNodes[0])}})});P(Element.prototype,"setAttribute",function(a,b){if(1!==this.__CE_state)return Be.call(this,a,b);var c=Ae.call(this,a);Be.call(this,a,b);b=Ae.call(this,a);d.attributeChangedCallback(this,a,c,b,null)});P(Element.prototype,"setAttributeNS",function(a,b,c){if(1!==this.__CE_state)return Ee.call(this,a,b,c);var e=De.call(this,a,
b);Ee.call(this,a,b,c);c=De.call(this,a,b);d.attributeChangedCallback(this,b,e,c,a)});P(Element.prototype,"removeAttribute",function(a){if(1!==this.__CE_state)return Ce.call(this,a);var b=Ae.call(this,a);Ce.call(this,a);null!==b&&d.attributeChangedCallback(this,a,b,null,null)});P(Element.prototype,"removeAttributeNS",function(a,b){if(1!==this.__CE_state)return Fe.call(this,a,b);var c=De.call(this,a,b);Fe.call(this,a,b);var e=De.call(this,a,b);c!==e&&d.attributeChangedCallback(this,b,c,e,a)});Qe?b(HTMLElement.prototype,
Qe):Ge?b(Element.prototype,Ge):console.warn("Custom Elements: `Element#insertAdjacentElement` was not patched.");Re?c(HTMLElement.prototype,Re):He?c(Element.prototype,He):console.warn("Custom Elements: `Element#insertAdjacentHTML` was not patched.");Ve(d,Element.prototype,{ha:Ie,append:Je});Ye(d)};var $e=window.customElements;if(!$e||$e.forcePolyfill||"function"!=typeof $e.define||"function"!=typeof $e.get){var Ue=new ce;Te();We();Ve(Ue,DocumentFragment.prototype,{ha:qe,append:re});Xe();Ze();document.__CE_hasRegistry=!0;var customElements=new T(Ue);Object.defineProperty(window,"customElements",{configurable:!0,enumerable:!0,value:customElements})};function af(){this.end=this.start=0;this.rules=this.parent=this.previous=null;this.cssText=this.parsedCssText="";this.atRule=!1;this.type=0;this.parsedSelector=this.selector=this.keyframesName=""}
function bf(a){a=a.replace(cf,"").replace(df,"");var b=ef,c=a,d=new af;d.start=0;d.end=c.length;for(var e=d,f=0,g=c.length;f<g;f++)if("{"===c[f]){e.rules||(e.rules=[]);var h=e,k=h.rules[h.rules.length-1]||null;e=new af;e.start=f+1;e.parent=h;e.previous=k;h.rules.push(e)}else"}"===c[f]&&(e.end=f+1,e=e.parent||d);return b(d,a)}
function ef(a,b){var c=b.substring(a.start,a.end-1);a.parsedCssText=a.cssText=c.trim();a.parent&&(c=b.substring(a.previous?a.previous.end:a.parent.start,a.start-1),c=ff(c),c=c.replace(gf," "),c=c.substring(c.lastIndexOf(";")+1),c=a.parsedSelector=a.selector=c.trim(),a.atRule=0===c.indexOf("@"),a.atRule?0===c.indexOf("@media")?a.type=hf:c.match(sf)&&(a.type=tf,a.keyframesName=a.selector.split(gf).pop()):a.type=0===c.indexOf("--")?uf:vf);if(c=a.rules)for(var d=0,e=c.length,f;d<e&&(f=c[d]);d++)ef(f,
b);return a}function ff(a){return a.replace(/\\([0-9a-f]{1,6})\s/gi,function(a,c){a=c;for(c=6-a.length;c--;)a="0"+a;return"\\"+a})}
function wf(a,b,c){c=void 0===c?"":c;var d="";if(a.cssText||a.rules){var e=a.rules,f;if(f=e)f=e[0],f=!(f&&f.selector&&0===f.selector.indexOf("--"));if(f){f=0;for(var g=e.length,h;f<g&&(h=e[f]);f++)d=wf(h,b,d)}else b?b=a.cssText:(b=a.cssText,b=b.replace(xf,"").replace(yf,""),b=b.replace(zf,"").replace(Af,"")),(d=b.trim())&&(d="  "+d+"\n")}d&&(a.selector&&(c+=a.selector+" {\n"),c+=d,a.selector&&(c+="}\n\n"));return c}
var vf=1,tf=7,hf=4,uf=1E3,cf=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,df=/@import[^;]*;/gim,xf=/(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,yf=/(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,zf=/@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,Af=/[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,sf=/^@[^\s]*keyframes/,gf=/\s+/g;var U=!(window.ShadyDOM&&window.ShadyDOM.inUse),Bf;function Cf(a){Bf=a&&a.shimcssproperties?!1:U||!(navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/)||!window.CSS||!CSS.supports||!CSS.supports("box-shadow","0 0 0 var(--foo)"))}window.ShadyCSS&&void 0!==window.ShadyCSS.nativeCss?Bf=window.ShadyCSS.nativeCss:window.ShadyCSS?(Cf(window.ShadyCSS),window.ShadyCSS=void 0):Cf(window.WebComponents&&window.WebComponents.flags);var V=Bf;var Df=/(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi,Ef=/(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi,Ff=/(--[\w-]+)\s*([:,;)]|$)/gi,Gf=/(animation\s*:)|(animation-name\s*:)/,Hf=/@media\s(.*)/,If=/\{[^}]*\}/g;var Jf=new Set;function Kf(a,b){if(!a)return"";"string"===typeof a&&(a=bf(a));b&&Lf(a,b);return wf(a,V)}function Mf(a){!a.__cssRules&&a.textContent&&(a.__cssRules=bf(a.textContent));return a.__cssRules||null}function Nf(a){return!!a.parent&&a.parent.type===tf}function Lf(a,b,c,d){if(a){var e=!1,f=a.type;if(d&&f===hf){var g=a.selector.match(Hf);g&&(window.matchMedia(g[1]).matches||(e=!0))}f===vf?b(a):c&&f===tf?c(a):f===uf&&(e=!0);if((a=a.rules)&&!e){e=0;f=a.length;for(var h;e<f&&(h=a[e]);e++)Lf(h,b,c,d)}}}
function Of(a,b,c,d){var e=document.createElement("style");b&&e.setAttribute("scope",b);e.textContent=a;Pf(e,c,d);return e}var Qf=null;function Pf(a,b,c){b=b||document.head;b.insertBefore(a,c&&c.nextSibling||b.firstChild);Qf?a.compareDocumentPosition(Qf)===Node.DOCUMENT_POSITION_PRECEDING&&(Qf=a):Qf=a}
function Rf(a,b){var c=a.indexOf("var(");if(-1===c)return b(a,"","","");a:{var d=0;var e=c+3;for(var f=a.length;e<f;e++)if("("===a[e])d++;else if(")"===a[e]&&0===--d)break a;e=-1}d=a.substring(c+4,e);c=a.substring(0,c);a=Rf(a.substring(e+1),b);e=d.indexOf(",");return-1===e?b(c,d.trim(),"",a):b(c,d.substring(0,e).trim(),d.substring(e+1).trim(),a)}function Sf(a,b){U?a.setAttribute("class",b):window.ShadyDOM.nativeMethods.setAttribute.call(a,"class",b)}
function Tf(a){var b=a.localName,c="";b?-1<b.indexOf("-")||(c=b,b=a.getAttribute&&a.getAttribute("is")||""):(b=a.is,c=a.extends);return{is:b,Y:c}};function Uf(){}function Vf(a,b,c){var d=W;a.__styleScoped?a.__styleScoped=null:Wf(d,a,b||"",c)}function Wf(a,b,c,d){b.nodeType===Node.ELEMENT_NODE&&Xf(b,c,d);if(b="template"===b.localName?(b.content||b.qb||b).childNodes:b.children||b.childNodes)for(var e=0;e<b.length;e++)Wf(a,b[e],c,d)}
function Xf(a,b,c){if(b)if(a.classList)c?(a.classList.remove("style-scope"),a.classList.remove(b)):(a.classList.add("style-scope"),a.classList.add(b));else if(a.getAttribute){var d=a.getAttribute(Yf);c?d&&(b=d.replace("style-scope","").replace(b,""),Sf(a,b)):Sf(a,(d?d+" ":"")+"style-scope "+b)}}function Zf(a,b,c){var d=W,e=a.__cssBuild;U||"shady"===e?b=Kf(b,c):(a=Tf(a),b=$f(d,b,a.is,a.Y,c)+"\n\n");return b.trim()}
function $f(a,b,c,d,e){var f=ag(c,d);c=c?bg+c:"";return Kf(b,function(b){b.c||(b.selector=b.G=cg(a,b,a.b,c,f),b.c=!0);e&&e(b,c,f)})}function ag(a,b){return b?"[is="+a+"]":a}function cg(a,b,c,d,e){var f=b.selector.split(dg);if(!Nf(b)){b=0;for(var g=f.length,h;b<g&&(h=f[b]);b++)f[b]=c.call(a,h,d,e)}return f.join(dg)}function eg(a){return a.replace(fg,function(a,c,d){-1<d.indexOf("+")?d=d.replace(/\+/g,"___"):-1<d.indexOf("___")&&(d=d.replace(/___/g,"+"));return":"+c+"("+d+")"})}
Uf.prototype.b=function(a,b,c){var d=!1;a=a.trim();var e=fg.test(a);e&&(a=a.replace(fg,function(a,b,c){return":"+b+"("+c.replace(/\s/g,"")+")"}),a=eg(a));a=a.replace(gg,hg+" $1");a=a.replace(ig,function(a,e,h){d||(a=jg(h,e,b,c),d=d||a.stop,e=a.Va,h=a.value);return e+h});e&&(a=eg(a));return a};
function jg(a,b,c,d){var e=a.indexOf(kg);0<=a.indexOf(hg)?a=lg(a,d):0!==e&&(a=c?mg(a,c):a);c=!1;0<=e&&(b="",c=!0);if(c){var f=!0;c&&(a=a.replace(ng,function(a,b){return" > "+b}))}a=a.replace(og,function(a,b,c){return'[dir="'+c+'"] '+b+", "+b+'[dir="'+c+'"]'});return{value:a,Va:b,stop:f}}function mg(a,b){a=a.split(pg);a[0]+=b;return a.join(pg)}
function lg(a,b){var c=a.match(qg);return(c=c&&c[2].trim()||"")?c[0].match(rg)?a.replace(qg,function(a,c,f){return b+f}):c.split(rg)[0]===b?c:sg:a.replace(hg,b)}function tg(a){a.selector===ug&&(a.selector="html")}Uf.prototype.c=function(a){return a.match(kg)?this.b(a,vg):mg(a.trim(),vg)};ba.Object.defineProperties(Uf.prototype,{a:{configurable:!0,enumerable:!0,get:function(){return"style-scope"}}});
var fg=/:(nth[-\w]+)\(([^)]+)\)/,vg=":not(.style-scope)",dg=",",ig=/(^|[\s>+~]+)((?:\[.+?\]|[^\s>+~=[])+)/g,rg=/[[.:#*]/,hg=":host",ug=":root",kg="::slotted",gg=new RegExp("^("+kg+")"),qg=/(:host)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/,ng=/(?:::slotted)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/,og=/(.*):dir\((?:(ltr|rtl))\)/,bg=".",pg=":",Yf="class",sg="should_not_match",W=new Uf;function wg(a,b,c,d){this.M=a||null;this.b=b||null;this.ua=c||[];this.U=null;this.Y=d||"";this.a=this.I=this.O=null}function X(a){return a?a.__styleInfo:null}function xg(a,b){return a.__styleInfo=b}wg.prototype.c=function(){return this.M};wg.prototype._getStyleRules=wg.prototype.c;function yg(a){var b=this.matches||this.matchesSelector||this.mozMatchesSelector||this.msMatchesSelector||this.oMatchesSelector||this.webkitMatchesSelector;return b&&b.call(this,a)}var zg=navigator.userAgent.match("Trident");function Ag(){}function Bg(a){var b={},c=[],d=0;Lf(a,function(a){Cg(a);a.index=d++;a=a.C.cssText;for(var c;c=Ff.exec(a);){var e=c[1];":"!==c[2]&&(b[e]=!0)}},function(a){c.push(a)});a.b=c;a=[];for(var e in b)a.push(e);return a}
function Cg(a){if(!a.C){var b={},c={};Dg(a,c)&&(b.L=c,a.rules=null);b.cssText=a.parsedCssText.replace(If,"").replace(Df,"");a.C=b}}function Dg(a,b){var c=a.C;if(c){if(c.L)return Object.assign(b,c.L),!0}else{c=a.parsedCssText;for(var d;a=Df.exec(c);){d=(a[2]||a[3]).trim();if("inherit"!==d||"unset"!==d)b[a[1].trim()]=d;d=!0}return d}}
function Eg(a,b,c){b&&(b=0<=b.indexOf(";")?Fg(a,b,c):Rf(b,function(b,e,f,g){if(!e)return b+g;(e=Eg(a,c[e],c))&&"initial"!==e?"apply-shim-inherit"===e&&(e="inherit"):e=Eg(a,c[f]||f,c)||f;return b+(e||"")+g}));return b&&b.trim()||""}
function Fg(a,b,c){b=b.split(";");for(var d=0,e,f;d<b.length;d++)if(e=b[d]){Ef.lastIndex=0;if(f=Ef.exec(e))e=Eg(a,c[f[1]],c);else if(f=e.indexOf(":"),-1!==f){var g=e.substring(f);g=g.trim();g=Eg(a,g,c)||g;e=e.substring(0,f)+g}b[d]=e&&e.lastIndexOf(";")===e.length-1?e.slice(0,-1):e||""}return b.join(";")}
function Gg(a,b){var c={},d=[];Lf(a,function(a){a.C||Cg(a);var e=a.G||a.parsedSelector;b&&a.C.L&&e&&yg.call(b,e)&&(Dg(a,c),a=a.index,e=parseInt(a/32,10),d[e]=(d[e]||0)|1<<a%32)},null,!0);return{L:c,key:d}}
function Hg(a,b,c,d){b.C||Cg(b);if(b.C.L){var e=Tf(a);a=e.is;e=e.Y;e=a?ag(a,e):"html";var f=b.parsedSelector,g=":host > *"===f||"html"===f,h=0===f.indexOf(":host")&&!g;"shady"===c&&(g=f===e+" > *."+e||-1!==f.indexOf("html"),h=!g&&0===f.indexOf(e));"shadow"===c&&(g=":host > *"===f||"html"===f,h=h&&!g);if(g||h)c=e,h&&(b.G||(b.G=cg(W,b,W.b,a?bg+a:"",e)),c=b.G||e),d({gb:c,ab:h,Db:g})}}
function Ig(a,b){var c={},d={},e=b&&b.__cssBuild;Lf(b,function(b){Hg(a,b,e,function(e){yg.call(a.rb||a,e.gb)&&(e.ab?Dg(b,c):Dg(b,d))})},null,!0);return{fb:d,Za:c}}
function Jg(a,b,c,d){var e=Tf(b),f=ag(e.is,e.Y),g=new RegExp("(?:^|[^.#[:])"+(b.extends?"\\"+f.slice(0,-1)+"\\]":f)+"($|[.:[\\s>+~])");e=X(b).M;var h=Kg(e,d);return Zf(b,e,function(b){var e="";b.C||Cg(b);b.C.cssText&&(e=Fg(a,b.C.cssText,c));b.cssText=e;if(!U&&!Nf(b)&&b.cssText){var k=e=b.cssText;null==b.Ca&&(b.Ca=Gf.test(e));if(b.Ca)if(null==b.ga){b.ga=[];for(var p in h)k=h[p],k=k(e),e!==k&&(e=k,b.ga.push(p))}else{for(p=0;p<b.ga.length;++p)k=h[b.ga[p]],e=k(e);k=e}b.cssText=k;b.G=b.G||b.selector;e=
"."+d;p=b.G.split(",");k=0;for(var G=p.length,B;k<G&&(B=p[k]);k++)p[k]=B.match(g)?B.replace(f,e):e+" "+B;b.selector=p.join(",")}})}function Kg(a,b){a=a.b;var c={};if(!U&&a)for(var d=0,e=a[d];d<a.length;e=a[++d]){var f=e,g=b;f.f=new RegExp("\\b"+f.keyframesName+"(?!\\B|-)","g");f.a=f.keyframesName+"-"+g;f.G=f.G||f.selector;f.selector=f.G.replace(f.keyframesName,f.a);c[e.keyframesName]=Lg(e)}return c}function Lg(a){return function(b){return b.replace(a.f,a.a)}}
function Mg(a,b){var c=Ng,d=Mf(a);a.textContent=Kf(d,function(a){var d=a.cssText=a.parsedCssText;a.C&&a.C.cssText&&(d=d.replace(xf,"").replace(yf,""),a.cssText=Fg(c,d,b))})}ba.Object.defineProperties(Ag.prototype,{a:{configurable:!0,enumerable:!0,get:function(){return"x-scope"}}});var Ng=new Ag;var Og={},Pg=window.customElements;if(Pg&&!U){var Qg=Pg.define;Pg.define=function(a,b,c){var d=document.createComment(" Shady DOM styles for "+a+" "),e=document.head;e.insertBefore(d,(Qf?Qf.nextSibling:null)||e.firstChild);Qf=d;Og[a]=d;Qg.call(Pg,a,b,c)}};function Rg(){this.cache={}}Rg.prototype.store=function(a,b,c,d){var e=this.cache[a]||[];e.push({L:b,styleElement:c,I:d});100<e.length&&e.shift();this.cache[a]=e};Rg.prototype.fetch=function(a,b,c){if(a=this.cache[a])for(var d=a.length-1;0<=d;d--){var e=a[d],f;a:{for(f=0;f<c.length;f++){var g=c[f];if(e.L[g]!==b[g]){f=!1;break a}}f=!0}if(f)return e}};function Sg(){}
function Tg(a){for(var b=0;b<a.length;b++){var c=a[b];if(c.target!==document.documentElement&&c.target!==document.head)for(var d=0;d<c.addedNodes.length;d++){var e=c.addedNodes[d];if(e.nodeType===Node.ELEMENT_NODE){var f=e.getRootNode();var g=e;var h=[];g.classList?h=Array.from(g.classList):g instanceof window.SVGElement&&g.hasAttribute("class")&&(h=g.getAttribute("class").split(/\s+/));g=h;h=g.indexOf(W.a);if((g=-1<h?g[h+1]:"")&&f===e.ownerDocument)Vf(e,g,!0);else if(f.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&
(f=f.host))if(f=Tf(f).is,g===f)for(e=window.ShadyDOM.nativeMethods.querySelectorAll.call(e,":not(."+W.a+")"),f=0;f<e.length;f++)Xf(e[f],g);else g&&Vf(e,g,!0),Vf(e,f)}}}}
if(!U){var Ug=new MutationObserver(Tg),Vg=function(a){Ug.observe(a,{childList:!0,subtree:!0})};if(window.customElements&&!window.customElements.polyfillWrapFlushCallback)Vg(document);else{var Wg=function(){Vg(document.body)};window.HTMLImports?window.HTMLImports.whenReady(Wg):requestAnimationFrame(function(){if("loading"===document.readyState){var a=function(){Wg();document.removeEventListener("readystatechange",a)};document.addEventListener("readystatechange",a)}else Wg()})}Sg=function(){Tg(Ug.takeRecords())}}
var Xg=Sg;var Yg={};var Zg=Promise.resolve();function $g(a){if(a=Yg[a])a._applyShimCurrentVersion=a._applyShimCurrentVersion||0,a._applyShimValidatingVersion=a._applyShimValidatingVersion||0,a._applyShimNextVersion=(a._applyShimNextVersion||0)+1}function ah(a){return a._applyShimCurrentVersion===a._applyShimNextVersion}function bh(a){a._applyShimValidatingVersion=a._applyShimNextVersion;a.b||(a.b=!0,Zg.then(function(){a._applyShimCurrentVersion=a._applyShimNextVersion;a.b=!1}))};var ch=new Rg;function Y(){this.S={};this.c=document.documentElement;var a=new af;a.rules=[];this.f=xg(this.c,new wg(a));this.B=!1;this.b=this.a=null}r=Y.prototype;r.flush=function(){Xg()};r.Xa=function(a){return Mf(a)};r.ib=function(a){return Kf(a)};r.prepareTemplate=function(a,b,c){this.prepareTemplateDom(a,b);this.prepareTemplateStyles(a,b,c)};
r.prepareTemplateStyles=function(a,b,c){if(!a.B){a.B=!0;a.name=b;a.extends=c;Yg[b]=a;var d=(d=a.content.querySelector("style"))?d.getAttribute("css-build")||"":"";var e=[];for(var f=a.content.querySelectorAll("style"),g=0;g<f.length;g++){var h=f[g];if(h.hasAttribute("shady-unscoped")){if(!U){var k=h.textContent;Jf.has(k)||(Jf.add(k),k=h.cloneNode(!0),document.head.appendChild(k));h.parentNode.removeChild(h)}}else e.push(h.textContent),h.parentNode.removeChild(h)}e=e.join("").trim();c={is:b,extends:c,
ob:d};dh(this);f=Ef.test(e)||Df.test(e);Ef.lastIndex=0;Df.lastIndex=0;e=bf(e);f&&V&&this.a&&this.a.transformRules(e,b);a._styleAst=e;a.S=d;d=[];V||(d=Bg(a._styleAst));if(!d.length||V)e=U?a.content:null,b=Og[b],f=Zf(c,a._styleAst),b=f.length?Of(f,c.is,e,b):void 0,a.a=b;a.f=d}};r.prepareTemplateDom=function(a,b){U||a.c||(a.c=!0,Vf(a.content,b))};
function eh(a){!a.b&&window.ShadyCSS&&window.ShadyCSS.CustomStyleInterface&&(a.b=window.ShadyCSS.CustomStyleInterface,a.b.transformCallback=function(b){a.Ga(b)},a.b.validateCallback=function(){requestAnimationFrame(function(){(a.b.enqueued||a.B)&&a.flushCustomStyles()})})}function dh(a){!a.a&&window.ShadyCSS&&window.ShadyCSS.ApplyShim&&(a.a=window.ShadyCSS.ApplyShim,a.a.invalidCallback=$g);eh(a)}
r.flushCustomStyles=function(){dh(this);if(this.b){var a=this.b.processStyles();if(this.b.enqueued){if(V)for(var b=0;b<a.length;b++){var c=this.b.getStyleForCustomStyle(a[b]);if(c&&V&&this.a){var d=Mf(c);dh(this);this.a.transformRules(d);c.textContent=Kf(d)}}else for(fh(this,this.c,this.f),b=0;b<a.length;b++)(c=this.b.getStyleForCustomStyle(a[b]))&&Mg(c,this.f.O);this.b.enqueued=!1;this.B&&!V&&this.styleDocument()}}};
r.styleElement=function(a,b){var c=Tf(a).is,d=X(a);if(!d){var e=Tf(a);d=e.is;e=e.Y;var f=Og[d];d=Yg[d];if(d){var g=d._styleAst;var h=d.f}d=xg(a,new wg(g,f,h,e))}a!==this.c&&(this.B=!0);b&&(d.U=d.U||{},Object.assign(d.U,b));if(V){if(d.U){b=d.U;for(var k in b)null===k?a.style.removeProperty(k):a.style.setProperty(k,b[k])}if(((k=Yg[c])||a===this.c)&&k&&k.a&&!ah(k)){if(ah(k)||k._applyShimValidatingVersion!==k._applyShimNextVersion)dh(this),this.a&&this.a.transformRules(k._styleAst,c),k.a.textContent=
Zf(a,d.M),bh(k);U&&(c=a.shadowRoot)&&(c.querySelector("style").textContent=Zf(a,d.M));d.M=k._styleAst}}else if(this.flush(),fh(this,a,d),d.ua&&d.ua.length){c=d;k=Tf(a).is;d=(b=ch.fetch(k,c.O,c.ua))?b.styleElement:null;g=c.I;(h=b&&b.I)||(h=this.S[k]=(this.S[k]||0)+1,h=k+"-"+h);c.I=h;h=c.I;e=Ng;e=d?d.textContent||"":Jg(e,a,c.O,h);f=X(a);var m=f.a;m&&!U&&m!==d&&(m._useCount--,0>=m._useCount&&m.parentNode&&m.parentNode.removeChild(m));U?f.a?(f.a.textContent=e,d=f.a):e&&(d=Of(e,h,a.shadowRoot,f.b)):d?
d.parentNode||(zg&&-1<e.indexOf("@media")&&(d.textContent=e),Pf(d,null,f.b)):e&&(d=Of(e,h,null,f.b));d&&(d._useCount=d._useCount||0,f.a!=d&&d._useCount++,f.a=d);h=d;U||(d=c.I,f=e=a.getAttribute("class")||"",g&&(f=e.replace(new RegExp("\\s*x-scope\\s*"+g+"\\s*","g")," ")),f+=(f?" ":"")+"x-scope "+d,e!==f&&Sf(a,f));b||ch.store(k,c.O,h,c.I)}};function gh(a,b){return(b=b.getRootNode().host)?X(b)?b:gh(a,b):a.c}
function fh(a,b,c){a=gh(a,b);var d=X(a);a=Object.create(d.O||null);var e=Ig(b,c.M);b=Gg(d.M,b).L;Object.assign(a,e.Za,b,e.fb);b=c.U;for(var f in b)if((e=b[f])||0===e)a[f]=e;f=Ng;b=Object.getOwnPropertyNames(a);for(e=0;e<b.length;e++)d=b[e],a[d]=Eg(f,a[d],a);c.O=a}r.styleDocument=function(a){this.styleSubtree(this.c,a)};
r.styleSubtree=function(a,b){var c=a.shadowRoot;(c||a===this.c)&&this.styleElement(a,b);if(b=c&&(c.children||c.childNodes))for(a=0;a<b.length;a++)this.styleSubtree(b[a]);else if(a=a.children||a.childNodes)for(b=0;b<a.length;b++)this.styleSubtree(a[b])};r.Ga=function(a){var b=this,c=Mf(a);Lf(c,function(a){if(U)tg(a);else{var c=W;a.selector=a.parsedSelector;tg(a);a.selector=a.G=cg(c,a,c.c,void 0,void 0)}V&&(dh(b),b.a&&b.a.transformRule(a))});V?a.textContent=Kf(c):this.f.M.rules.push(c)};
r.getComputedStyleValue=function(a,b){var c;V||(c=(X(a)||X(gh(this,a))).O[b]);return(c=c||window.getComputedStyle(a).getPropertyValue(b))?c.trim():""};r.hb=function(a,b){var c=a.getRootNode();b=b?b.split(/\s/):[];c=c.host&&c.host.localName;if(!c){var d=a.getAttribute("class");if(d){d=d.split(/\s/);for(var e=0;e<d.length;e++)if(d[e]===W.a){c=d[e+1];break}}}c&&b.push(W.a,c);V||(c=X(a))&&c.I&&b.push(Ng.a,c.I);Sf(a,b.join(" "))};r.Sa=function(a){return X(a)};Y.prototype.flush=Y.prototype.flush;
Y.prototype.prepareTemplate=Y.prototype.prepareTemplate;Y.prototype.styleElement=Y.prototype.styleElement;Y.prototype.styleDocument=Y.prototype.styleDocument;Y.prototype.styleSubtree=Y.prototype.styleSubtree;Y.prototype.getComputedStyleValue=Y.prototype.getComputedStyleValue;Y.prototype.setElementClass=Y.prototype.hb;Y.prototype._styleInfoForNode=Y.prototype.Sa;Y.prototype.transformCustomStyleForDocument=Y.prototype.Ga;Y.prototype.getStyleAst=Y.prototype.Xa;Y.prototype.styleAstToString=Y.prototype.ib;
Y.prototype.flushCustomStyles=Y.prototype.flushCustomStyles;Object.defineProperties(Y.prototype,{nativeShadow:{get:function(){return U}},nativeCss:{get:function(){return V}}});var Z=new Y,hh,ih;window.ShadyCSS&&(hh=window.ShadyCSS.ApplyShim,ih=window.ShadyCSS.CustomStyleInterface);
window.ShadyCSS={ScopingShim:Z,prepareTemplate:function(a,b,c){Z.flushCustomStyles();Z.prepareTemplate(a,b,c)},prepareTemplateDom:function(a,b){Z.prepareTemplateDom(a,b)},prepareTemplateStyles:function(a,b,c){Z.flushCustomStyles();Z.prepareTemplateStyles(a,b,c)},styleSubtree:function(a,b){Z.flushCustomStyles();Z.styleSubtree(a,b)},styleElement:function(a){Z.flushCustomStyles();Z.styleElement(a)},styleDocument:function(a){Z.flushCustomStyles();Z.styleDocument(a)},flushCustomStyles:function(){Z.flushCustomStyles()},
getComputedStyleValue:function(a,b){return Z.getComputedStyleValue(a,b)},nativeCss:V,nativeShadow:U};hh&&(window.ShadyCSS.ApplyShim=hh);ih&&(window.ShadyCSS.CustomStyleInterface=ih);(function(a){function b(a){""==a&&(f.call(this),this.i=!0);return a.toLowerCase()}function c(a){var b=a.charCodeAt(0);return 32<b&&127>b&&-1==[34,35,60,62,63,96].indexOf(b)?a:encodeURIComponent(a)}function d(a){var b=a.charCodeAt(0);return 32<b&&127>b&&-1==[34,35,60,62,96].indexOf(b)?a:encodeURIComponent(a)}function e(a,e,g){function h(a){ob.push(a)}var k=e||"scheme start",A=0,q="",B=!1,ua=!1,ob=[];a:for(;(void 0!=a[A-1]||0==A)&&!this.i;){var l=a[A];switch(k){case "scheme start":if(l&&p.test(l))q+=
l.toLowerCase(),k="scheme";else if(e){h("Invalid scheme.");break a}else{q="";k="no scheme";continue}break;case "scheme":if(l&&G.test(l))q+=l.toLowerCase();else if(":"==l){this.h=q;q="";if(e)break a;void 0!==m[this.h]&&(this.F=!0);k="file"==this.h?"relative":this.F&&g&&g.h==this.h?"relative or authority":this.F?"authority first slash":"scheme data"}else if(e){void 0!=l&&h("Code point not allowed in scheme: "+l);break a}else{q="";A=0;k="no scheme";continue}break;case "scheme data":"?"==l?(this.s="?",
k="query"):"#"==l?(this.D="#",k="fragment"):void 0!=l&&"\t"!=l&&"\n"!=l&&"\r"!=l&&(this.ra+=c(l));break;case "no scheme":if(g&&void 0!==m[g.h]){k="relative";continue}else h("Missing scheme."),f.call(this),this.i=!0;break;case "relative or authority":if("/"==l&&"/"==a[A+1])k="authority ignore slashes";else{h("Expected /, got: "+l);k="relative";continue}break;case "relative":this.F=!0;"file"!=this.h&&(this.h=g.h);if(void 0==l){this.j=g.j;this.o=g.o;this.l=g.l.slice();this.s=g.s;this.u=g.u;this.g=g.g;
break a}else if("/"==l||"\\"==l)"\\"==l&&h("\\ is an invalid code point."),k="relative slash";else if("?"==l)this.j=g.j,this.o=g.o,this.l=g.l.slice(),this.s="?",this.u=g.u,this.g=g.g,k="query";else if("#"==l)this.j=g.j,this.o=g.o,this.l=g.l.slice(),this.s=g.s,this.D="#",this.u=g.u,this.g=g.g,k="fragment";else{k=a[A+1];var D=a[A+2];if("file"!=this.h||!p.test(l)||":"!=k&&"|"!=k||void 0!=D&&"/"!=D&&"\\"!=D&&"?"!=D&&"#"!=D)this.j=g.j,this.o=g.o,this.u=g.u,this.g=g.g,this.l=g.l.slice(),this.l.pop();k=
"relative path";continue}break;case "relative slash":if("/"==l||"\\"==l)"\\"==l&&h("\\ is an invalid code point."),k="file"==this.h?"file host":"authority ignore slashes";else{"file"!=this.h&&(this.j=g.j,this.o=g.o,this.u=g.u,this.g=g.g);k="relative path";continue}break;case "authority first slash":if("/"==l)k="authority second slash";else{h("Expected '/', got: "+l);k="authority ignore slashes";continue}break;case "authority second slash":k="authority ignore slashes";if("/"!=l){h("Expected '/', got: "+
l);continue}break;case "authority ignore slashes":if("/"!=l&&"\\"!=l){k="authority";continue}else h("Expected authority, got: "+l);break;case "authority":if("@"==l){B&&(h("@ already seen."),q+="%40");B=!0;for(l=0;l<q.length;l++)D=q[l],"\t"==D||"\n"==D||"\r"==D?h("Invalid whitespace in authority."):":"==D&&null===this.g?this.g="":(D=c(D),null!==this.g?this.g+=D:this.u+=D);q=""}else if(void 0==l||"/"==l||"\\"==l||"?"==l||"#"==l){A-=q.length;q="";k="host";continue}else q+=l;break;case "file host":if(void 0==
l||"/"==l||"\\"==l||"?"==l||"#"==l){2!=q.length||!p.test(q[0])||":"!=q[1]&&"|"!=q[1]?(0!=q.length&&(this.j=b.call(this,q),q=""),k="relative path start"):k="relative path";continue}else"\t"==l||"\n"==l||"\r"==l?h("Invalid whitespace in file host."):q+=l;break;case "host":case "hostname":if(":"!=l||ua)if(void 0==l||"/"==l||"\\"==l||"?"==l||"#"==l){this.j=b.call(this,q);q="";k="relative path start";if(e)break a;continue}else"\t"!=l&&"\n"!=l&&"\r"!=l?("["==l?ua=!0:"]"==l&&(ua=!1),q+=l):h("Invalid code point in host/hostname: "+
l);else if(this.j=b.call(this,q),q="",k="port","hostname"==e)break a;break;case "port":if(/[0-9]/.test(l))q+=l;else if(void 0==l||"/"==l||"\\"==l||"?"==l||"#"==l||e){""!=q&&(q=parseInt(q,10),q!=m[this.h]&&(this.o=q+""),q="");if(e)break a;k="relative path start";continue}else"\t"==l||"\n"==l||"\r"==l?h("Invalid code point in port: "+l):(f.call(this),this.i=!0);break;case "relative path start":"\\"==l&&h("'\\' not allowed in path.");k="relative path";if("/"!=l&&"\\"!=l)continue;break;case "relative path":if(void 0!=
l&&"/"!=l&&"\\"!=l&&(e||"?"!=l&&"#"!=l))"\t"!=l&&"\n"!=l&&"\r"!=l&&(q+=c(l));else{"\\"==l&&h("\\ not allowed in relative path.");if(D=n[q.toLowerCase()])q=D;".."==q?(this.l.pop(),"/"!=l&&"\\"!=l&&this.l.push("")):"."==q&&"/"!=l&&"\\"!=l?this.l.push(""):"."!=q&&("file"==this.h&&0==this.l.length&&2==q.length&&p.test(q[0])&&"|"==q[1]&&(q=q[0]+":"),this.l.push(q));q="";"?"==l?(this.s="?",k="query"):"#"==l&&(this.D="#",k="fragment")}break;case "query":e||"#"!=l?void 0!=l&&"\t"!=l&&"\n"!=l&&"\r"!=l&&(this.s+=
d(l)):(this.D="#",k="fragment");break;case "fragment":void 0!=l&&"\t"!=l&&"\n"!=l&&"\r"!=l&&(this.D+=l)}A++}}function f(){this.u=this.ra=this.h="";this.g=null;this.o=this.j="";this.l=[];this.D=this.s="";this.F=this.i=!1}function g(a,b){void 0===b||b instanceof g||(b=new g(String(b)));this.Ta=a;f.call(this);a=a.replace(/^[ \t\r\n\f]+|[ \t\r\n\f]+$/g,"");e.call(this,a,null,b)}var h=!1;if(!a.xb)try{var k=new URL("b","http://a");k.pathname="c%20d";h="http://a/c%20d"===k.href}catch(A){}if(!h){var m=Object.create(null);
m.ftp=21;m.file=0;m.gopher=70;m.http=80;m.https=443;m.ws=80;m.wss=443;var n=Object.create(null);n["%2e"]=".";n[".%2e"]="..";n["%2e."]="..";n["%2e%2e"]="..";var p=/[a-zA-Z]/,G=/[a-zA-Z0-9\+\-\.]/;g.prototype={toString:function(){return this.href},get href(){if(this.i)return this.Ta;var a="";if(""!=this.u||null!=this.g)a=this.u+(null!=this.g?":"+this.g:"")+"@";return this.protocol+(this.F?"//"+a+this.host:"")+this.pathname+this.s+this.D},set href(a){f.call(this);e.call(this,a)},get protocol(){return this.h+
":"},set protocol(a){this.i||e.call(this,a+":","scheme start")},get host(){return this.i?"":this.o?this.j+":"+this.o:this.j},set host(a){!this.i&&this.F&&e.call(this,a,"host")},get hostname(){return this.j},set hostname(a){!this.i&&this.F&&e.call(this,a,"hostname")},get port(){return this.o},set port(a){!this.i&&this.F&&e.call(this,a,"port")},get pathname(){return this.i?"":this.F?"/"+this.l.join("/"):this.ra},set pathname(a){!this.i&&this.F&&(this.l=[],e.call(this,a,"relative path start"))},get search(){return this.i||
!this.s||"?"==this.s?"":this.s},set search(a){!this.i&&this.F&&(this.s="?","?"==a[0]&&(a=a.slice(1)),e.call(this,a,"query"))},get hash(){return this.i||!this.D||"#"==this.D?"":this.D},set hash(a){this.i||(this.D="#","#"==a[0]&&(a=a.slice(1)),e.call(this,a,"fragment"))},get origin(){var a;if(this.i||!this.h)return"";switch(this.h){case "data":case "file":case "javascript":case "mailto":return"null"}return(a=this.host)?this.h+"://"+a:""}};var B=a.URL;B&&(g.createObjectURL=function(a){return B.createObjectURL.apply(B,
arguments)},g.revokeObjectURL=function(a){B.revokeObjectURL(a)});a.URL=g}})(window);var jh=document.createElement("style");jh.textContent="body {transition: opacity ease-in 0.2s; } \nbody[unresolved] {opacity: 0; display: block; overflow: hidden; position: relative; } \n";var kh=document.querySelector("head");kh.insertBefore(jh,kh.firstChild);var lh=window.customElements,mh=!1,nh=null;lh.polyfillWrapFlushCallback&&lh.polyfillWrapFlushCallback(function(a){nh=a;mh&&a()});function oh(){window.HTMLTemplateElement.bootstrap&&window.HTMLTemplateElement.bootstrap(window.document);nh&&nh();mh=!0;window.WebComponents.ready=!0;document.dispatchEvent(new CustomEvent("WebComponentsReady",{bubbles:!0}))}
"complete"!==document.readyState?(window.addEventListener("load",oh),window.addEventListener("DOMContentLoaded",function(){window.removeEventListener("load",oh);oh()})):oh();}).call(this);

//# sourceMappingURL=webcomponents-bundle.js.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4).setImmediate))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(5);
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(6)))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 7 */
/***/ (function(module, exports) {

/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
(function () {
  'use strict';

  (()=>{if(!window.customElements)return;const a=window.HTMLElement,b=window.customElements.define,c=window.customElements.get,d=new Map,e=new Map;let f=!1,g=!1;window.HTMLElement=function(){if(!f){const a=d.get(this.constructor),b=c.call(window.customElements,a);g=!0;const e=new b;return e}f=!1;},window.HTMLElement.prototype=a.prototype;Object.defineProperty(window,'customElements',{value:window.customElements,configurable:!0,writable:!0}),Object.defineProperty(window.customElements,'define',{value:(c,h)=>{const i=h.prototype,j=class extends a{constructor(){super(),Object.setPrototypeOf(this,i),g||(f=!0,h.call(this)),g=!1;}},k=j.prototype;j.observedAttributes=h.observedAttributes,k.connectedCallback=i.connectedCallback,k.disconnectedCallback=i.disconnectedCallback,k.attributeChangedCallback=i.attributeChangedCallback,k.adoptedCallback=i.adoptedCallback,d.set(h,c),e.set(c,h),b.call(window.customElements,c,j);},configurable:!0,writable:!0}),Object.defineProperty(window.customElements,'get',{value:a=>e.get(a),configurable:!0,writable:!0});})();

}());


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(0);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AccordionComponent = function (_window$HTMLElement) {
    _inherits(AccordionComponent, _window$HTMLElement);

    function AccordionComponent() {
        _classCallCheck(this, AccordionComponent);

        return _possibleConstructorReturn(this, (AccordionComponent.__proto__ || Object.getPrototypeOf(AccordionComponent)).call(this));
    }

    _createClass(AccordionComponent, [{
        key: 'connectedCallback',
        value: function connectedCallback() {
            var _this2 = this;

            var sections = [].concat(_toConsumableArray(this.querySelectorAll('section')));
            sections.forEach(function (section, index) {
                section.classList.toggle('collapsed', index > 0);
                var header = section.querySelector('header');
                if (!header) {
                    console.error('Missing header for accordion. Skipping on click event', _this2);
                    return;
                }
                (0, _utils.onClick)(header, function () {
                    section.classList.toggle('collapsed');
                    if (_this2.multiple) {
                        return;
                    }
                    sections.filter(function (otherSection) {
                        return otherSection !== section;
                    }).forEach(function (otherSection) {
                        return otherSection.classList.add('collapsed');
                    });
                });
            });
        }
    }, {
        key: 'multiple',
        get: function get() {
            return this.hasAttribute('multiple');
        },
        set: function set(val) {
            if (val) {
                this.setAttribute('multiple', '');
            } else {
                this.removeAttribute('multiple');
            }
        }
    }]);

    return AccordionComponent;
}(window.HTMLElement);

exports.default = AccordionComponent;
;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DrawerComponent = function (_window$HTMLElement) {
    _inherits(DrawerComponent, _window$HTMLElement);

    function DrawerComponent() {
        _classCallCheck(this, DrawerComponent);

        return _possibleConstructorReturn(this, (DrawerComponent.__proto__ || Object.getPrototypeOf(DrawerComponent)).call(this));
    }

    _createClass(DrawerComponent, [{
        key: 'open',
        value: function open() {
            this.style.top = window.pageYOffset !== 0 ? window.pageYOffset + 'px' : '3.125em'; // hard-coded topbar height
            document.body.style.overflow = 'hidden';

            this.overlay = document.createElement('uniform-overlay');
            document.body.appendChild(uniform.overlay);
            this.overlay.style.top = window.pageYOffset + 'px';
            (0, _utils.onClick)(this.overlay, this.close.bind(this));

            this.classList.add('open');
        }
    }, {
        key: 'close',
        value: function close() {
            this.overlay.remove();
            document.body.style.overflow = undefined;
            this.classList.remove('open');
        }
    }]);

    return DrawerComponent;
}(window.HTMLElement);

exports.default = DrawerComponent;
;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ExampleComponent = function (_window$HTMLElement) {
    _inherits(ExampleComponent, _window$HTMLElement);

    function ExampleComponent() {
        _classCallCheck(this, ExampleComponent);

        var _this = _possibleConstructorReturn(this, (ExampleComponent.__proto__ || Object.getPrototypeOf(ExampleComponent)).call(this));

        _this.counter = 0;
        return _this;
    }

    _createClass(ExampleComponent, [{
        key: 'connectedCallback',
        value: function connectedCallback() {
            var _this2 = this;

            this.innerText = 'Spikes Example Component. Current counter: ' + this.counter;
            this.addEventListener('click', function () {
                _this2.counter++;
                _this2.innerText = 'Spikes Example Component. Current counter: ' + _this2.counter;
            });
        }
    }]);

    return ExampleComponent;
}(window.HTMLElement);

exports.default = ExampleComponent;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ModalComponent = function (_window$HTMLElement) {
    _inherits(ModalComponent, _window$HTMLElement);

    function ModalComponent() {
        _classCallCheck(this, ModalComponent);

        var _this = _possibleConstructorReturn(this, (ModalComponent.__proto__ || Object.getPrototypeOf(ModalComponent)).call(this));

        _this.closeCallbacks = [];
        _this.previousPage = 0;
        _this.currentPage = 0;
        _this.pages = [];
        // internal memory
        _this.previousParent = null;
        _this.container = null;
        _this.handleEscapeClick = _this.handleEscapeClick.bind(_this);
        return _this;
    }

    _createClass(ModalComponent, [{
        key: 'onClose',
        value: function onClose(closeCallback) {
            this.closeCallbacks.push(closeCallback);
        }
    }, {
        key: 'goToPage',
        value: function goToPage(index) {
            var _this2 = this;

            if (index === this.currentPage || index >= this.pages.length || index < 0) {
                return;
            }
            this.pages[index].classList.add('current');
            this.previousPage = this.currentPage;
            this.currentPage = index;

            requestAnimationFrame(function () {
                if (index > _this2.previousPageId) {
                    _this2.pages[_this2.previousPage].classList.add('past');
                } else {
                    _this2.pages[_this2.previousPage].classList.add('future');
                }
                _this2.pages[index].classList.remove('future');
                _this2.pages[index].classList.remove('past');

                _this2.addEventListener('transitionend', function () {
                    _this2.pages[_this2.previousPage].classList.remove('current');
                }, { once: true });
            });
        }
    }, {
        key: 'nextPage',
        value: function nextPage() {
            this.goToPage(this.currentPage + 1);
        }
    }, {
        key: 'previousPage',
        value: function previousPage() {
            this.goToPage(this.currentPage - 1);
        }

        // animate the dialog to target element

    }, {
        key: 'transformToTargetElement',
        value: function transformToTargetElement(onShow) {
            if (!this.targetElement) {
                return;
            }
            var clickRect = this.targetElement.getBoundingClientRect();
            var selfRect = this.getBoundingClientRect();

            var scaleX = Math.min(0.5, clickRect.width / selfRect.width);
            var scaleY = Math.min(0.5, clickRect.height / selfRect.height);
            var translateY = onShow ? -(window.pageYOffset + selfRect.top) + clickRect.top + clickRect.height / 2 - selfRect.height / 2 : -selfRect.top + clickRect.top + clickRect.height / 2 - selfRect.height / 2;

            this.style.webkitTransform = 'translate3d(' + (-selfRect.left + clickRect.left + clickRect.width / 2 - selfRect.width / 2) + 'px,' + translateY + 'px,' + '0) scale(' + scaleX + ',' + scaleY + ')';
            this.style.transform = 'translate3d(' + (-selfRect.left + clickRect.left + clickRect.width / 2 - selfRect.width / 2) + 'px,' + translateY + 'px,' + '0) scale(' + scaleX + ',' + scaleY + ')';
        }
    }, {
        key: 'show',
        value: function show(targetElement, removeOnHide) {
            var _this3 = this;

            this.removeOnHide = removeOnHide;
            this.pages = [].concat(_toConsumableArray(this.querySelectorAll('page')));

            if (this.pages.length) {
                this.pages[0].classList.add('current');
            }
            this.currentPage = 0;

            this.pages.forEach(function (page, index) {
                if (index > _this3.currentPage) {
                    page.classList.add('future');
                }
            });

            // move the modal object to be under container and move container to
            // be under body
            var scrollTop = window.pageYOffset;
            var container = document.createElement('uniform-overlay');
            this.container = container;
            document.body.appendChild(container);
            container.appendChild(this);

            // make the animation transition (translate) from the targetElement
            this.targetElement = targetElement;
            this.transformToTargetElement(true);

            // use `animationend` event to bind close event listener
            this.addEventListener('transitionend', handleTransitionEnd, { once: true });

            // listen to the scroll event to make modal stay in the view port
            container.style.top = scrollTop + 'px';

            // hack, use setTimeout to execute async animation
            requestAnimationFrame(function () {
                _this3.classList.add('transition-in');
                _this3.style.webkitTransform = '';
                _this3.style.transform = '';
                // disable scrolling behind the container
                document.body.style.overflow = 'hidden';
            });

            function handleTransitionEnd() {
                var _this4 = this;

                // listen to overlay window on click event to cancel the modal
                container.addEventListener('mousedown', function (event) {
                    _this4.hide();
                });
                this.addEventListener('mousedown', function (event) {
                    event.stopPropagation();
                });

                window.addEventListener('keydown', this.handleEscapeClick);
            }
        }
    }, {
        key: 'handleEscapeClick',
        value: function handleEscapeClick(event) {
            var handled = false;
            if (event.keyCode !== undefined && event.keyCode === 27) {
                this.hide();
                handled = true;
            }

            if (handled) {
                // Suppress "double action" if event handled
                event.preventDefault();
            }
        }
    }, {
        key: 'hide',
        value: function hide() {
            var _this5 = this;

            window.removeEventListener('keydown', this.handleEscapeClick);

            requestAnimationFrame(function () {
                _this5.classList.add('transition-out');
                _this5.classList.remove('transition-in');
                // make the animation transition (translate) from the targetElement
                _this5.transformToTargetElement();

                _this5.addEventListener('transitionend', handleTransitionEnd, { once: true });
            });

            function handleTransitionEnd() {
                this.previousParent.appendChild(this);
                this.classList.remove('transition-out');
                this.style.webkitTransform = '';
                this.style.transform = '';
                // reset scrolling event
                document.body.style.overflow = undefined;
                this.container.remove();

                if (this.removeOnHide) {
                    this.remove();
                }
                this.closeCallbacks.forEach(function (cb) {
                    return cb();
                });
            }
        }
    }, {
        key: 'connectedCallback',
        value: function connectedCallback() {
            console.log(this.parentNode);
            this.previousParent = this.parentNode;
        }
    }]);

    return ModalComponent;
}(window.HTMLElement);

exports.default = ModalComponent;
;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NotificationComponent = function (_window$HTMLElement) {
    _inherits(NotificationComponent, _window$HTMLElement);

    function NotificationComponent() {
        _classCallCheck(this, NotificationComponent);

        return _possibleConstructorReturn(this, (NotificationComponent.__proto__ || Object.getPrototypeOf(NotificationComponent)).call(this));
    }

    _createClass(NotificationComponent, [{
        key: 'connectedCallback',
        value: function connectedCallback() {
            var _this2 = this;

            var closeButton = this.querySelector('.close');
            if (!closeButton) {
                return;
            }
            (0, _utils.onClick)(closeButton, function () {
                return _this2.remove();
            });
        }
    }]);

    return NotificationComponent;
}(window.HTMLElement);

exports.default = NotificationComponent;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(0);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * # Uniform select menu
 *
 * A custom select menu that displays differently from the browser `<select>`
 * menu
 *
 * ## Usage
 *
 * ```
 * <uniform-select>
 *   <select-title>
 *     Current item
 *   </select-title>
 *   <select-menu>
 *     <select-item>
 *       item 1
 *     </select-item>
 *     <select-item>
 *       item 2
 *     </select-item>
 *     <select-item>
 *       item 3
 *     </select-item>
 *   </select-menu>
 * </uniform-select>
 * ```
 */
var SelectComponent = function (_window$HTMLElement) {
    _inherits(SelectComponent, _window$HTMLElement);

    function SelectComponent() {
        _classCallCheck(this, SelectComponent);

        return _possibleConstructorReturn(this, (SelectComponent.__proto__ || Object.getPrototypeOf(SelectComponent)).call(this));
    }

    _createClass(SelectComponent, [{
        key: 'toggle',
        value: function toggle() {
            this.classList.toggle('open');
        }
    }, {
        key: 'close',
        value: function close() {
            this.classList.remove('open');
        }
    }, {
        key: 'open',
        value: function open() {
            this.classList.add('open');
        }
    }, {
        key: 'connectedCallback',
        value: function connectedCallback() {
            var _this2 = this;

            // Observer for child node changes for framework that dynamically add
            // child node with their templating.  With each new node being added,
            // we want to close the select menu when this select menu does not
            // allow multiple
            var observer = new MutationObserver(function (mutations) {
                if (_this2.allowMultiple) {
                    return;
                }
                mutations.forEach(function (mutation) {
                    Array.prototype.slice.call(mutation.addedNodes).filter(function (n) {
                        return n.nodeName === 'SELECT-ITEM';
                    }).forEach(function (node) {
                        (0, _utils.onClick)(node, _this2.close.bind(_this2));
                        return;
                    });
                });
            });
            var config = { childList: true };
            observer.observe(this, config);
            // add event listener to existing select-items
            [].concat(_toConsumableArray(this.querySelectorAll('select-item'))).forEach(function (n) {
                (0, _utils.onClick)(n, _this2.close.bind(_this2));
            });

            // add event listener under body to close select menu
            (0, _utils.onClick)(document.querySelector('body'), this.close.bind(this));
            [].concat(_toConsumableArray(document.querySelectorAll('uniform-modal'))).forEach(function (modal) {
                (0, _utils.onClick)(modal, _this2.close.bind(_this2));
            });
            (0, _utils.onClick)(this.querySelector('select-title'), this.toggle.bind(this));
        }
    }, {
        key: 'multiple',
        get: function get() {
            return this.hasAttribute('multiple');
        },
        set: function set(val) {
            if (val) {
                this.setAttribute('multiple', '');
            } else {
                this.removeAttribute('multiple');
            }
        }
    }]);

    return SelectComponent;
}(window.HTMLElement);

exports.default = SelectComponent;
;

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map