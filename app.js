/**
 * User: nvucuong
 * Date: 8/31/2015
 * Time: 11:41 AM
 */

//https://github.com/eventualbuddha/keysim.js
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t(e.Keysim={})}(this,function(e){"use strict";function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var n=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),r=1,o=2,i=4,a=8,s={DOWN:1,PRESS:2,UP:4,INPUT:8};s.ALL=s.DOWN|s.PRESS|s.UP|s.INPUT;var w=function(){function e(n,s){t(this,e),this.modifiers=n,this.ctrlKey=!!(n&r),this.metaKey=!!(n&o),this.altKey=!!(n&i),this.shiftKey=!!(n&a),this.keyCode=s}return n(e,null,[{key:"CTRL",value:r,enumerable:!0},{key:"META",value:o,enumerable:!0},{key:"ALT",value:i,enumerable:!0},{key:"SHIFT",value:a,enumerable:!0}]),e}(),c=function(){function e(n,r){t(this,e),this._charCodeKeyCodeMap=n,this._actionKeyCodeMap=r}return e.prototype.charCodeForKeystroke=function(e){var t=this._charCodeKeyCodeMap;for(var n in t)if(Object.prototype.hasOwnProperty.call(t,n)){var r=t[n];if(e.keyCode===r.keyCode&&e.modifiers===r.modifiers)return parseInt(n,10)}return null},e.prototype.createEventFromKeystroke=function(e,t,n){var r=n.ownerDocument,o=r.defaultView,i=o.Event,a=void 0;try{a=new i(e)}catch(s){a=r.createEvent("UIEvents")}switch(a.initEvent(e,!0,!0),e){case"textInput":a.data=String.fromCharCode(this.charCodeForKeystroke(t));break;case"keydown":case"keypress":case"keyup":a.shiftKey=t.shiftKey,a.altKey=t.altKey,a.metaKey=t.metaKey,a.ctrlKey=t.ctrlKey,a.keyCode="keypress"===e?this.charCodeForKeystroke(t):t.keyCode,a.charCode="keypress"===e?a.keyCode:0,a.which=a.keyCode}return a},e.prototype.dispatchEventsForAction=function(e,t){var n=this.keystrokeForAction(e);this.dispatchEventsForKeystroke(n,t)},e.prototype.dispatchEventsForInput=function(e,t){for(var n=0,r=0,o=e.length;o>r;r++){var i=this.keystrokeForCharCode(e.charCodeAt(r));this.dispatchModifierStateTransition(t,n,i.modifiers),this.dispatchEventsForKeystroke(i,t,!1),n=i.modifiers}this.dispatchModifierStateTransition(t,n,0)},e.prototype.dispatchEventsForKeystroke=function(e,t){var n=arguments.length<=2||void 0===arguments[2]?!0:arguments[2],r=arguments.length<=3||void 0===arguments[3]?s.ALL:arguments[3];n&&this.dispatchModifierStateTransition(t,0,e.modifiers,r);var o=void 0;if(r&s.DOWN&&(o=this.createEventFromKeystroke("keydown",e,t)),o&&t.dispatchEvent(o)&&this.targetCanReceiveTextInput(t)){var i=void 0;if(r&s.PRESS&&(i=this.createEventFromKeystroke("keypress",e,t)),i&&i.charCode&&t.dispatchEvent(i)&&r&s.INPUT){var a=this.createEventFromKeystroke("textInput",e,t);t.dispatchEvent(a)}}if(r&s.UP){var w=this.createEventFromKeystroke("keyup",e,t);t.dispatchEvent(w)}n&&this.dispatchModifierStateTransition(t,e.modifiers,0)},e.prototype.dispatchModifierStateTransition=function(e,t,n){var c=arguments.length<=3||void 0===arguments[3]?s.ALL:arguments[3],d=t,h=(t&o)===o,y=(n&o)===o,p=(t&r)===r,u=(n&r)===r,v=(t&a)===a,f=(n&a)===a,k=(t&i)===i,E=(n&i)===i,C=c&s.UP,K=(c&s.PRESS,c&s.DOWN);if(C&&h===!0&&y===!1&&(d&=~o,e.dispatchEvent(this.createEventFromKeystroke("keyup",new w(d,this._actionKeyCodeMap.META),e))),C&&p===!0&&u===!1&&(d&=~r,e.dispatchEvent(this.createEventFromKeystroke("keyup",new w(d,this._actionKeyCodeMap.CTRL),e))),C&&v===!0&&f===!1&&(d&=~a,e.dispatchEvent(this.createEventFromKeystroke("keyup",new w(d,this._actionKeyCodeMap.SHIFT),e))),C&&k===!0&&E===!1&&(d&=~i,e.dispatchEvent(this.createEventFromKeystroke("keyup",new w(d,this._actionKeyCodeMap.ALT),e))),K&&h===!1&&y===!0&&(d|=o,e.dispatchEvent(this.createEventFromKeystroke("keydown",new w(d,this._actionKeyCodeMap.META),e))),K&&p===!1&&u===!0&&(d|=r,e.dispatchEvent(this.createEventFromKeystroke("keydown",new w(d,this._actionKeyCodeMap.CTRL),e))),K&&v===!1&&f===!0&&(d|=a,e.dispatchEvent(this.createEventFromKeystroke("keydown",new w(d,this._actionKeyCodeMap.SHIFT),e))),K&&k===!1&&E===!0&&(d|=i,e.dispatchEvent(this.createEventFromKeystroke("keydown",new w(d,this._actionKeyCodeMap.ALT),e))),d!==n)throw new Error("internal error, expected modifier state: "+n+(", got: "+d))},e.prototype.keystrokeForAction=function(e){var t=null,n=0,s=e.split("+"),c=s.pop();if(s.forEach(function(t){switch(t.toUpperCase()){case"CTRL":n|=r;break;case"META":n|=o;break;case"ALT":n|=i;break;case"SHIFT":n|=a;break;default:throw new Error('in "'+e+'", invalid modifier: '+t)}}),c.toUpperCase()in this._actionKeyCodeMap)t=this._actionKeyCodeMap[c.toUpperCase()];else{if(1!==c.length)throw new Error('in "'+e+'", invalid action: '+c);var d=this.keystrokeForCharCode(c.charCodeAt(0));n|=d.modifiers,t=d.keyCode}return new w(n,t)},e.prototype.keystrokeForCharCode=function(e){return this._charCodeKeyCodeMap[e]||null},e.prototype.targetCanReceiveTextInput=function(e){if(!e)return!1;switch(e.nodeName&&e.nodeName.toLowerCase()){case"input":var t=e.type;return!("hidden"===t||"radio"===t||"checkbox"===t);case"textarea":return!0;default:return!1}},e}(),d={32:new w(0,32),33:new w(a,49),34:new w(a,222),35:new w(a,51),36:new w(a,52),37:new w(a,53),38:new w(a,55),39:new w(0,222),40:new w(a,57),41:new w(a,48),42:new w(a,56),43:new w(a,187),44:new w(0,188),45:new w(0,189),46:new w(0,190),47:new w(0,191),48:new w(0,48),49:new w(0,49),50:new w(0,50),51:new w(0,51),52:new w(0,52),53:new w(0,53),54:new w(0,54),55:new w(0,55),56:new w(0,56),57:new w(0,57),58:new w(a,186),59:new w(0,186),60:new w(a,188),61:new w(0,187),62:new w(a,190),63:new w(a,191),64:new w(a,50),65:new w(a,65),66:new w(a,66),67:new w(a,67),68:new w(a,68),69:new w(a,69),70:new w(a,70),71:new w(a,71),72:new w(a,72),73:new w(a,73),74:new w(a,74),75:new w(a,75),76:new w(a,76),77:new w(a,77),78:new w(a,78),79:new w(a,79),80:new w(a,80),81:new w(a,81),82:new w(a,82),83:new w(a,83),84:new w(a,84),85:new w(a,85),86:new w(a,86),87:new w(a,87),88:new w(a,88),89:new w(a,89),90:new w(a,90),91:new w(0,219),92:new w(0,220),93:new w(0,221),96:new w(0,192),97:new w(0,65),98:new w(0,66),99:new w(0,67),100:new w(0,68),101:new w(0,69),102:new w(0,70),103:new w(0,71),104:new w(0,72),105:new w(0,73),106:new w(0,74),107:new w(0,75),108:new w(0,76),109:new w(0,77),110:new w(0,78),111:new w(0,79),112:new w(0,80),113:new w(0,81),114:new w(0,82),115:new w(0,83),116:new w(0,84),117:new w(0,85),118:new w(0,86),119:new w(0,87),120:new w(0,88),121:new w(0,89),122:new w(0,90),123:new w(a,219),124:new w(a,220),125:new w(a,221),126:new w(a,192)},h={BACKSPACE:8,TAB:9,ENTER:13,SHIFT:16,CTRL:17,ALT:18,PAUSE:19,CAPSLOCK:20,ESCAPE:27,PAGEUP:33,PAGEDOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,INSERT:45,DELETE:46,META:91,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123};c.US_ENGLISH=new c(d,h),e.KeyEvents=s,e.Keystroke=w,e.Keyboard=c});

(function (window) {
  'use strict';

  var SLASH_REGEX = /-/igm;
  var SLASH_CHAR = '-';
  var SPACE_CHAR = ' ';
  var SPACE_REGEX = /\s/igm;
  var EMPTY = '';
  var NEWLINES_TAB = /[\n\r\t]/igm;
  var BLACKLIST_CHARS = /[^1234567890qwertyuiopasdfghjkl;zxcvbnm,\.\/\s]/igm;

  var document = window.document;

  function getQueryVariable(variable) {
    var i,
      url = window.location.search;

    for (i = 0; i < url.length; ++i) {
      if (url[i] !== '/' && url[i] !== '?') {
        break;
      }
    }
    var query = url.substring(i);
    var vars = query.split('&');
    for (i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (pair[0] === variable) {
        return pair[1];
      }
    }
    return(false);
  }

  document.getElementById('gg-guitar-frame').onload = function onIframeLoaded() {
    var iframeElm = this;
    var playBtnElm = document.getElementById('gg-btn-play');
    var songContentElm = document.getElementById('gg-song-content');
    var copyUrlElm = document.getElementById('gg-copy-url');
    var fbShareElm = document.getElementById('gg-share-fb');
    var delayElm = document.getElementById('gg-delay');
    var keyboard = Keysim.Keyboard.US_ENGLISH;
    var canvasElm = iframeElm.contentWindow.document.querySelector('canvas');
    var song, delay;

    function checkDelay() {
      delay = +delay;
      if (typeof delay !== 'number' || isNaN(delay)) {
        delay = 58;
      }
      delayElm.value = delay;
    }

    function getSong() {
      return songContentElm.value.replace(BLACKLIST_CHARS, SPACE_CHAR).replace(NEWLINES_TAB, EMPTY);
    }

    function getDelay() {
      delay = delayElm.value;
      checkDelay();
      return delay;
    }

    function playHandler() {
      song = getSong();
      delay = getDelay();

      if (song && song !== '') {
        window.playSong(song, delay);
      }
    }

    function getShareUrl() {
      var songQuery = getSong();
      songQuery = window.encodeURI(songQuery.replace(SPACE_REGEX, SLASH_CHAR));
      songQuery = 'song=' + songQuery;

      var delayQuery = getDelay();
      delayQuery = 'delay=' + delayQuery;

      return window.location.href.replace(window.location.hash,'') + '?' + songQuery + '&' + delayQuery;
    }

    function copyUrlHandler() {
      window.prompt("Copy to clipboard: Ctrl+C, Enter", getShareUrl());
    }

    function shareOnFb() {
      window.open('https://www.facebook.com/sharer/sharer.php?u=' + window.encodeURI(getShareUrl()), 'fbShareWindow', 'height=450, width=550, top=' + (window.innerHeight / 2 - 275) + ', left=' + (window.innerWidth / 2 - 225) + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
    }

    playBtnElm.addEventListener('click', playHandler, false);
    playBtnElm.addEventListener('touchstart', playHandler, false);

    copyUrlElm.addEventListener('click', copyUrlHandler, false);
    copyUrlElm.addEventListener('touchstart', copyUrlHandler, false);

    fbShareElm.addEventListener('click', shareOnFb, false);
    fbShareElm.addEventListener('touchstart', shareOnFb, false);

    window.sendKey = function (char){
      keyboard.dispatchEventsForAction(char, canvasElm);
    };

    window.playSong = function (song, pauseDuration) {
      window.focus();
      iframeElm.focus();
      var arrNotes = song.split('');
      window.playANote(arrNotes, 0, pauseDuration);
    };

    window.playANote = function(arrNotes, idx, pauseDuration) {
      if (arrNotes[idx] !== ' ') {
        window.sendKey(arrNotes[idx]);
      }

      if (idx < arrNotes.length - 1) {
        setTimeout(function () {
          window.playANote(arrNotes, idx + 1, pauseDuration);
        }, pauseDuration);
      } else {
        console.log('finish!');
      }
    };

    if (delay = getQueryVariable('delay')) {
      checkDelay();
    }

    if (song = getQueryVariable('song')) {
      song = window.decodeURI(song).replace(SLASH_REGEX, SPACE_CHAR);
      songContentElm.parentElement.classList.add('is-dirty');
      songContentElm.value = song;
      playHandler();
    }
  };
})(this);
