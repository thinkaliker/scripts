// ==UserScript==
// @name        JetSetRadio.Live DL
// @namespace   jetsetradiolive
// @description Adds a download button for the currently playing song on JetSetRadio.live.
// @author      thinkaliker
// @include     http://jetsetradio.live/*
// @version     1.1
// @run-at      document-start
// @grant       none
// ==/UserScript==

var title;

window.addEventListener('load', function() {
  console.log("DL JS STARTED");
  
  menuAppender();
  fileTimer();
});

function menuAppender(){
  console.log("DL MENU");
  var menubar = document.getElementById("menu");
  var aBtn = document.createElement('a');
  var imgBtn = document.createElement('img');
  aBtn.setAttribute("id", "dlBtn");
  aBtn.setAttribute("alt", "download");
  imgBtn.setAttribute("style",'z-index: 400; height: 42px; width: 42px; left: 518px; top:13px; position: absoulte;');
  imgBtn.setAttribute("src", "http://i.imgur.com/BP9JFD5.png");
  imgBtn.setAttribute("class", "objectSettings touchableOn");
  
  menubar.appendChild(aBtn);
  aBtn.appendChild(imgBtn);
}
  
function dlTimer(){
  var imgBtn = document.getElementById("dlBtn");
  
  title = document.getElementById("programInformationText").innerHTML;
  var dltitle = document.getElementById("audioPlayerMP3").getAttribute("src");
  var dlstr = 'http://jetsetradio.live/' + dltitle ;
  dlBtn.setAttribute("href", dlstr);
  dlBtn.setAttribute("alt", "Click to download "+ title);
  dlBtn.setAttribute("download", title + '.mp3');
}

function fileTimer(){
  console.log("DL TIMER");
  
  window.setInterval(dlTimer, 1000);
}