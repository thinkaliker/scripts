// ==UserScript==
// @name         data-lynx-uri remover
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Removes data-lynx-uri from FB Messenger links (original answer from https://superuser.com/a/1318222)
// @author       stachu (modified by thinkaliker)
// @match        https://www.messenger.com/*
// @match        https://www.facebook.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.addEventListener('mouseover', event => {
        let target = event.target;

        if (target.tagName.toLowerCase() === "a") {
            Array.from(target.attributes).filter(attribute => attribute.name.startsWith("data-lynx-uri")).forEach(attribute => target.removeAttribute(attribute.name));
            console.log('Removed tracker')
        }
    })

})();
