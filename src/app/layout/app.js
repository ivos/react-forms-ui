import React from 'react';
import Header from './header';
import Footer from './footer';
import i18n from '../i18n';

export default React.createClass({

	getInitialState(){
		return {locale: 'en'};
	},

	render() {
		var {pathname} = this.props.location;
		var active = pathname.split('/')[1] || 'home';
		var {locale} = this.state;
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
			this.setState({locale: locale});
		}.bind(this));
	}

});
