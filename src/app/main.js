import 'babel-core/polyfill';
import $ from 'jquery';
import AppRouter from './router';
import React from 'react';
import createHistory from 'history/lib/createHashHistory';

moment.locale('en');

// Opt-out of persistent state
let history = createHistory({
	queryKey: false
});

React.render(<AppRouter history={history}/>, document.getElementById('app-content'));
