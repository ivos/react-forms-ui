import i18n from 'i18next/lib/index';
import enForms from './react-forms-ui/i18n/en';
import csForms from './react-forms-ui/i18n/cs';
import enApp from './i18n/en';
import csApp from './i18n/cs';

var resources = {
	en: Object.assign(enForms, enApp),
	cs: Object.assign(csForms, csApp)
};

i18n.init({
	defaultNS: 'label',
	lngWhitelist: ['en', 'cs'],
	fallbackLng: 'en',
	resources: resources
});

export default i18n;
