import { initI18n, getI18n } from './translation';


describe('i18n', function () {
    describe('has initI18n function', () => {
        afterEach(() => {
            initI18n('en');
        });
        it('which init and return localization object', function () {
            const i18n = initI18n('fr');

            const translation = i18n.t('When');

            expect(i18n.t).toBeInstanceOf(Function);
            expect(translation).toBe('Quand');
        });
        it('set develop mode when debug mode is switched on and locale is uk', () => {
            const debugMode = true;
            const i18n = initI18n('uk', debugMode);

            const translation = i18n.t('Done');

            expect(i18n.t).toBeInstanceOf(Function);
            expect(translation).toBe('enoD');
        });
    });
    describe('has getI18n function', () => {
        it('which return inited localization object', function () {
            initI18n('fr');
            const i18n = getI18n();
            const translation = i18n.t('Tomorrow');

            expect(translation).toBe('Demain');
        });
    });
});
