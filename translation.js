import i18next from 'i18next';
import XHR from 'i18next-xhr-backend';

import enLocale from './locales/en/translation.json';
import frLocale from './locales/fr/translation.json';
import devLocale from './locales/develop/translation.json';

import debug from './debug';

let i18n = {};
i18n['t'] = (key) => {
    console.error('translations is not yet loaded! Translate after app detect lang! Key: ', key);
};


export function initI18n(lang = 'en', debugMode = false) {
    debug('init i18n with locale', lang);
    const isDevelopLocale = (debugMode && lang === 'uk');
    let locale = isDevelopLocale ? 'develop' : lang;

    const i18nInited = i18next
        .use(XHR)
        .init({
            lng: locale,
//            lng: 'develop',
            fallbackLng: 'en',

            react: {
                // wait: true, // globally set to wait for loaded translations in translate hoc
                // exposeNamespace: true // exposes namespace on data-i18next-options to be used in eg. locize-editor
            },

            // have a common namespace used around the full app
            ns: ['translation'],
            defaultNS: 'translation',
            fallbackNS: 'translation',

            appendNamespaceToCIMode: true,
            appendNamespaceToMissingKey: true,

            nsSeparator: '??',
            keySeparator: '### not used ###', // we use content as keys

            resources: { // could be used as replace for xhr
                en: {
                    translation: enLocale,
                },
                fr: {
                    translation: frLocale,
                },
                develop: {
                    translation: devLocale,
                },
            },

            debug: (process.env.DEBUG === 'true'),

            // cache: {
            //   enabled: true
            // },

            interpolation: {
                escapeValue: false, // not needed for react!!
                formatSeparator: ',',
                format: function (value, format, lng) {
                    if (format === 'uppercase') return value.toUpperCase();
                    return value;
                },
            },
        });

    i18n.t = i18nInited.t;
    i18n.t.bind(i18nInited);

    return i18nInited;
}

export function getI18n() {
    return i18next;
}
