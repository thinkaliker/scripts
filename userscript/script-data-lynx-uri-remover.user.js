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

(function () {
    var originalLink = "";

    window.trustedTypes.createPolicy('default', {
        createHTML: (string, sink) => string
    })

    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.type === "attributes") {
                console.log(mutation.target);
                if (originalLink.includes('l.messenger.com') || originalLink.includes('l.facebook.com') || originalLink.includes('l.threads.net')) {
                    mutation.target.insertAdjacentHTML('beforebegin', '<a href="' + mutation.target.attributes.href.value + '" target="_blank" style="font-weight:bold;span:hover\{\}">[FIXED LINK]</a>&nbsp;');
                    mutation.target.setAttribute('href', '#');
                    mutation.target.setAttribute('role', '');
                    originalLink = "";
                    mutation.target.textContent = `[TRACKED] ${mutation.target.textContent}`;
                }
            }
        });
    });


    'use strict';
    document.addEventListener('mouseover', event => {
        let target = event.target;

        if (target.hasAttribute('role') && !target.hasAttribute('aria-label')) {
            if (target.tagName.toLowerCase() === "a" && target.getAttribute('role') === "link") {
                //console.log(target.attributes.href.value)
                originalLink = target.attributes.href.value;
                console.log(originalLink)
                observer.observe(target, {
                    attributes: true //configure it to listen to attribute changes
                  });
                Array.from(target.attributes).filter(attribute => attribute.name.startsWith("data-lynx-")).forEach(attribute => target.removeAttribute(attribute.name));
                target.onClick = function () {
                    return false;
                };
            }
        }
    });


})();
