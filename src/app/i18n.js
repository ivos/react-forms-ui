import i18n from 'i18next/lib/index';
import en from './i18n/en';
import cs from './i18n/cs';

var resources = {
	en: en,
	cs: cs
};

console.log(resources);

i18n.init({
	defaultNS: 'translation',
	lngWhitelist: ['en', 'cs'],
	fallbackLng: 'en',
	resources: resources
});

export default i18n;
