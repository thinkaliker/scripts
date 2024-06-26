// ==UserScript==
// @name         data-lynx-uri remover
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Removes FB tracking from FB/Messenger links (original answer from https://superuser.com/a/1318222)
// @author       stachu (modified by thinkaliker)
// @match        https://www.messenger.com/*
// @match        https://www.facebook.com/messages/*
// @match        https://www.threads.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.addEventListener('mouseover', event => {
        let target = event.target;

        if (target.hasAttribute('role') && !target.hasAttribute('aria-label')){
            if (target.tagName.toLowerCase() === "a" && target.getAttribute('role') === "link") {
                Array.from(target.attributes).filter(attribute => attribute.name.startsWith("data-lynx-")).forEach(attribute => target.removeAttribute(attribute.name));
                target.onClick = function() {return false;};
                if (!target.href.includes('l.messenger.com') && !target.href.includes('l.facebook.com') && !target.href.includes('l.threads.net')) {
                    target.insertAdjacentHTML('afterend', '&nbsp;&nbsp;<span onClick="window.open(\'' + target.href + '\', \'_blank\'\)" style="font-weight:bold;font-style:italic;text-decoration:underline double;span:hover\{\}">FIXED LINK</span>' );
                    target.setAttribute('href', '#');
                    target.setAttribute('role', '');
                    console.log('Removed tracker here');
                }
            }
        }
    });


})();
