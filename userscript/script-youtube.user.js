// ==UserScript==
// @name        Remove Playlist from YouTube
// @namespace   youtube
// @description Removes playlist URL ending from YouTube channel "videos" page
// @include     http://*.youtube.com/user/*/videos
// @include     https://*.youtube.com/user/*/videos
// @version     1
// @grant       none
// ==/UserScript==

var links = document.getElementsByTagName("a");
for (var i = 0, imax=links.length; i < imax; i++)
  {
    var regex = /&list=\w+/;
    links[i].href = links[i].href.replace(regex, " ");
  }
