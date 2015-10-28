import React from 'react';
import Header from './header';
import Footer from './footer';

export default React.createClass({

	getInitialState(){
		return {active: 'home'};
	},

	render() {
		var {pathname} = this.props.location;
		var active = pathname.split('/')[1] || 'home';
		return (
			<div>
				<Header active={active}/>

				<div>{this.props.children}</div>
				<Footer/>
			</div>
		);
	}

});
