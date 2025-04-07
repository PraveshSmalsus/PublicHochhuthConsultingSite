
// export {}; // Ensure this file is treated as a module
// window.klaroConfig = {
//     version: 1,
//     elementID: 'klaro',
//     storageMethod: 'cookie',
//     cookieName: 'klaro-consent',
//     cookieExpiresAfterDays: 180,
//     privacyPolicy: {
//       en: '/privacy-policy',
//       de: '/datenschutz',
//     },
//     default: true,
//     mustConsent: false,
//     acceptAll: true,
//     services: [
//         {
//             name: 'matomo',
//             title: 'Matomo Analytics',
//             purposes: ['analytics'],
//             cookies: [/^pk.*$/, /^mtm.*$/, /^MATOMO.*$/],
//             required: false,
//             optOut: false, // Ensures Matomo doesn't load before consent
//             onlyOnce: true, // Prevents multiple Matomo script loads
//             callback: function(consent) {
//                 console.log("Matomo Consent Status:", consent);
//                 if (consent) {
//                   window._paq.push(['trackPageView']);
//                 }
//                 // else {
//                 //   window._paq.push(['forgetUserOptIn']);
//                 // }
//                 // Load Matomo script only if consent is given
//             }
//         },
//     ],
//     translations: {
//       en: {
//         consentModal: {
//           title: 'Privacy Settings',
//           description: 'We use cookies to improve your experience. Manage your preferences below.',
//           acceptAll: 'Accept all',
//           acceptSelected: 'Let Me Choose',
//           decline: 'Decline',
//         },
//         matomo: {
//           description: 'Collects anonymous usage data to help us improve our website.',
//         },
//         purposes: {
//           analytics: 'Analytics',
//         },
//         privacyPolicyUrl: '/privacy-policy',
//       },
//       de: {
//         consentModal: {
//           title: 'Datenschutzeinstellungen',
//           description: 'Wir verwenden Cookies, um Ihr Erlebnis zu verbessern. Verwalten Sie unten Ihre Präferenzen.',
//           acceptAll: 'Alle akzeptieren',
//           acceptSelected: 'Auswahl bestätigen',
//           decline: 'Ablehnen',
//         },
//         matomo: {
//           description: 'Sammelt anonyme Nutzungsdaten, um unsere Website zu verbessern.',
//         },
//         purposes: {
//           analytics: 'Analyse',
//         },
//         privacyPolicyUrl: '/datenschutz',
//       },
//     },
//     styling: {
//       theme: ['dark', 'bottom'],
//     },
//     additionalClass: 'klaro-short-bottom-right',
//   };


window.klaroConfig = {
    version: 1,
    elementID: 'klaro',
    storageMethod: 'cookie',
    cookieName: 'klaro-consent',
    cookieExpiresAfterDays: 180,
    privacyPolicy: {
      en: '/privacy-policy',
      de: '/datenschutz',
    },
    default: true,
    mustConsent: false,
    acceptAll: true,
    services: [
    //   {
    //     name: "youtube",
    //     title: "YouTube Videos",
    //     purposes: ["media"],
    //     cookies: ["CONSENT"],
    //     required: false,
    //     // default: lang !== "de", // ✅ Disabled in Germany by default
    //   },
      {
        name: "matomo",
        title: "Matomo Analytics",
        purposes: ["analytics"],
        cookies: ["_pk_id*", "_pk_ses*"],
        required: false,
        optOut: false,
        // default: lang !== "de", // ✅ Enable by default outside Germany
        callback: (consent) => {
          if (consent) {
            window._paq = window._paq || [];
            window._paq.push(["trackPageView"]);
            window._paq.push(["enableLinkTracking"]);
            window._paq.push(["setConsentGiven"]);
          } else {
            window._paq = window._paq || [];
            window._paq.push(["forgetConsentGiven"]); // ✅ Disable tracking
          }
        },
      },
    ],
    translations: {
      en: {
        consentModal: {
          title: 'Privacy Settings',
          description: 'We use cookies to improve your experience. Manage your preferences below.',
          acceptAll: 'Accept all',
          acceptSelected: 'Let Me Choose',
          decline: 'Decline',
        },
        matomo: {
          description: 'Collects anonymous usage data to help us improve our website.',
        },
        purposes: {
          analytics: 'Analytics',
        },
        privacyPolicyUrl: '/privacy-policy',
      },
      de: {
        consentModal: {
          title: 'Datenschutzeinstellungen',
          description: 'Wir verwenden Cookies, um Ihr Erlebnis zu verbessern. Verwalten Sie unten Ihre Präferenzen.',
          acceptAll: 'Alle akzeptieren',
          acceptSelected: 'Auswahl bestätigen',
          decline: 'Ablehnen',
        },
        matomo: {
          description: 'Sammelt anonyme Nutzungsdaten, um unsere Website zu verbessern.',
        },
        purposes: {
          analytics: 'Analyse',
        },
        privacyPolicyUrl: '/datenschutz',
      },
    },
    styling: {
      theme: ['dark', 'bottom'],
    },
    additionalClass: 'klaro-short-bottom-right',
  };