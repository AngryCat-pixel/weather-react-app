/**
 * https://www.i18next.com/misc/creating-own-plugins
 */

const languageDetector = {
  type: "languageDetector",
  init: function (services, detectorOptions, i18nextOptions) {
    /* use services and options */
  },
  detect: function () {
    // You'll receive a callback if you passed async true
    /* return detected language */
    // callback('de'); if you used the async flag
    const storageLanguage = localStorage.getItem("language");
    if (storageLanguage) {
      return storageLanguage;
    } else {
      return "ua";
    }
  },
  cacheUserLanguage: function (lng) {
    /* cache language */
    localStorage.setItem("language", lng);
  },
};

export default languageDetector;
