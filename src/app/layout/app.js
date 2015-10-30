import React from 'react';
import AppRouter from '../router';
import Header from './header';
import Footer from './footer';
import i18n from '../i18n';

export default React.createClass({

	render() {
		var {location: {pathname}, locale} = this.props;
		var active = pathname.split('/')[1] || 'home';
		return (
			<div>
				<Header active={active} locale={locale} onLocaleChange={this.setLocale}/>

				<div>{this.props.children}</div>
				<Footer/>
			</div>
		);
	},

	setLocale(locale){
		i18n.changeLanguage(locale, function () {
			var {history} = this.props;
			React.render(<AppRouter history={history} locale={locale}/>, document.getElementById('app-content'));
		}.bind(this));
	}

});
