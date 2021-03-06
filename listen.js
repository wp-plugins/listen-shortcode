// listen.js
// Copyright (c) 2014 Konforti
// https://github.com/konforti/listen

(function () {
  "use strict";

  var name = "listen-node";
  
  function _play( aud, icn ) {
    aud.play();
    aud.setAttribute( "data-playing", "true" );
    icn.classList.add("playing");
  }

  function _pause( aud, icn ) {
    aud.pause();
    aud.setAttribute( "data-playing", "false" );
    icn.classList.remove("playing");
  }
  
  window.onload = function() {
    var aud, elm, icn;
    var elements = document.getElementsByClassName( name );

    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".listen-node {display: inline-block; background:rgba(0, 0, 0, 0.05); padding: 1px 5px; border-radius:4px; cursor: pointer;} .listen-node i {font-size: 0.7em; border: 0.5em solid transparent; border-left: 0.75em solid; display: inline-block; margin-left: 5px;} .listen-node .playing { border: 0; border-left: 0.75em double; border-right: 0.5em solid transparent; height: 1em;}";
    document.getElementsByTagName("head")[0].appendChild(css);

    for ( var i = 0; elm = elements[i]; ++i ) {
      aud = document.createElement( 'audio' );
      icn = document.createElement( 'i' );

      aud.src = elm.getAttribute( "data-src" );
      aud.setAttribute( "data-playing", "false" );

      elm.id = name + "-" + i;
      elm.insertBefore( icn, elm.firstChild );
      elm.appendChild( aud );
    }
  }

  document.addEventListener( 'click', function ( e ) {
    var aud, elm, icn;
    if ( e.target.className === name ) {
      aud = e.target.children[1];
      elm = e.target;
      icn = e.target.children[0];
    }
    else if ( e.target.parentElement && e.target.parentElement.className === name ) {
      aud = e.target.parentElement.children[1];
      elm = e.target.parentElement;
      icn = e.target;
    }

    if (aud && elm && icn) {
      aud.srt = parseInt( elm.getAttribute( 'data-start' ) ) || 0;
      aud.end = parseInt( elm.getAttribute( 'data-end' ) ) || aud.duration;

      if ( aud && aud.getAttribute( "data-playing" ) === "false" ) {
        if ( aud.srt > aud.currentTime || aud.end < aud.currentTime ) {
          aud.currentTime = aud.srt;
        }
        _play( aud, icn );
      }
      else {
        _pause( aud, icn );
      }

      (function loop() {
        var d = requestAnimationFrame( loop );
        var percent = (((aud.currentTime - aud.srt) * 100) / (aud.end - aud.srt));
        percent = percent < 100 ? percent : 100;
        elm.style.background = "linear-gradient(to right, rgba(0, 0, 0, 0.1)" + percent + "%, rgba(0, 0, 0, 0.05)" + percent + "%)";

        if ( aud.end < aud.currentTime ) {
          _pause( aud, icn );
          cancelAnimationFrame( d );
        }
      })();
    }
  } );
})();
 
