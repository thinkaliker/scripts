// ==UserScript==
// @name         TweetDeck Username Manager
// @namespace    TweetDeck
// @version      1.0
// @description  Highlights usernames and more in TweetDeck
// @author       thinkaliker
// @match        https://tweetdeck.twitter.com/
// @grant        none
// @run-at       document-start
// ==/UserScript==

var modalVisible = document.getElementsByClassName("js-modals-container");
var profileModal = document.getElementsByClassName("mdl");
var profileMutex = true;
var styleTagMutex = true;
var storage = {};

function setCookie(cname, cvalue) {
    var d = new Date();
    d.setTime(d.getTime() + (2147483647*24*60*60));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1);
        if (c.indexOf(name) == 0)
            return c.substring(name.length, c.length);
    }
    return "";
}

window.addEventListener('load', function() {
    if (getCookie("___tdumStorage") == "") {
        setCookie("___tdumStorage", JSON.stringify(storage));
        console.log("setting up storage");
    } else {
        storage = JSON.parse(getCookie("___tdumStorage"));
        generateStyleTag();
        console.log("storage parsed " + JSON.stringify(storage));
    }
    
    addTimer();
});

function addEvents() {
  if(modalVisible[0].hasChildNodes()){
      if (profileMutex) {
          //console.log("profile clicked");
          profileAppender();
          profileMutex = false;
      }
  } else {
      profileMutex = true;
  }
}
function profileAppender(){
    var aBtn = document.createElement('a');
    var imgBtn = document.createElement('img');
    var handle = document.getElementsByClassName("mdl-drag-handle");
    aBtn.setAttribute("class", "tagBtn");
    aBtn.setAttribute("href", "#");
    imgBtn.setAttribute("style",'z-index: 400; height: 30px; width: 30px; left: 40px; top: 7px; position: absolute;');
    imgBtn.setAttribute("src", "data:image/png;base64,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");
    
    profileModal[0].insertBefore(aBtn, handle[0]);
    aBtn.appendChild(imgBtn);
    aBtn.addEventListener('click', function(){
        tagManager();
    });
    //console.log("added button");
}

function tagManager() {
    //console.log("tag");

    var username = getUsername();
    addUser(username, "#E21D1D", "solid 1px");
    generateStyleTag();
    //TODO: config panel for selecting style, generates css string of result and applies
}

function getUsername(){
    var usernameP = profileModal[0].querySelectorAll(".username");
    var find = "<span";
    var usernameHTML = usernameP[0].innerHTML;
    var usernameF = usernameHTML.indexOf(find);
    var username = usernameHTML.substring(1, usernameF);
    
    return username;
}

function addUser(username, color, border) {
    updateStorage(username, color, border);
    
    //console.log("added " + username + " to highlight list");
}

function generateStyleTag (){
    var style = document.createElement("style");
    if (styleTagMutex){
        style.type = "text/css";
        style.setAttribute("id", "usernameTagStyles");
        document.getElementsByTagName('head')[0].appendChild(style);
        styleTagMutex = false;
    }
    var styleCss = document.getElementById("usernameTagStyles");
    styleCss.innerHTML = "";
    
    for (var key in storage){
        if (storage.hasOwnProperty(key)){
            styleCss.innerHTML = styleCss.innerHTML + generateCss(key, storage[key].color, storage[key].border);
        }
    }
    
}

function updateStorage(username, color, border) {
    storage = JSON.parse(getCookie("___tdumStorage"));   
    storage[username] = {color: color, border: border};
    setCookie("___tdumStorage", JSON.stringify(storage));
    console.log("storage " + username + ":" + storage[username]);
}

function generateCss(username, color, border) {
    var timelineCss1 = 'p > a[data-user-name="';
    var timelineCss2 = '"]{color:';
    var timelineCss3 = ';border:';
    var timelineCss4 = ' white;}';
    var timelineCssResult = timelineCss1 + username + timelineCss2 + color + timelineCss3 + border + timelineCss4;
    var profileCss1 = '.is-inverted-dark a[data-user-name="';
    var profileCss2 = '"]{color:';
    var profileCss3 = ';border:';
    var profileCss4 = ' black;}';
    var profileCssResult = profileCss1 + username + profileCss2 + color + profileCss3 + border + profileCss4;
    return timelineCssResult + profileCssResult;
}


function addTimer(){
  window.setInterval(addEvents, 500);
}