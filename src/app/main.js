import 'babel-core/polyfill';
import $ from 'jquery';
import AppRouter from './router';
import React from 'react';
import createHistory from 'history/lib/createHashHistory';
import i18n from './i18n';

moment.locale('en');

// Opt-out of persistent state
let history = createHistory({
	queryKey: false
});

i18n.changeLanguage(navigator.language, function () {
	React.render(<AppRouter history={history}/>, document.getElementById('app-content'));
});
