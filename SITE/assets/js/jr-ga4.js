/*
 * Japão Relativo — GA4 loader
 * Loads the shared GA4 tag once per page and avoids duplicate config calls.
 */
(function () {
  "use strict";

  var GA_ID = "G-HXLGFZ5H4Q";
  var SCRIPT_SELECTOR = 'script[src*="googletagmanager.com/gtag/js?id=' + GA_ID + '"]';

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };
  window.__jrGa4Configured = window.__jrGa4Configured || {};

  if (!document.querySelector(SCRIPT_SELECTOR)) {
    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(script);
  }

  if (!window.__jrGa4Configured[GA_ID]) {
    window.gtag("js", new Date());
    window.gtag("config", GA_ID);
    window.__jrGa4Configured[GA_ID] = true;
  }
})();
