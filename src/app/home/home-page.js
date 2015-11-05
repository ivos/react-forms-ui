import React from 'react';
import {focusFirst, setTitle} from '../ui/utils';
import TextFields from './text-fields';
import PasswordFields from './password-fields';
import SelectFields from './select-fields';
import DateFields from './date-fields';
import i18n from '../i18n';
var t = i18n.t.bind(i18n);

export default React.createClass({

	render() {
		return (
			<div ref="wrapper">
				<h2>React Forms UI</h2>

				<TextFields/>
				<PasswordFields/>
				<SelectFields/>
				<DateFields/>

			</div>
		);
	},

	componentDidMount() {
		setTitle(t('home.title'));
		focusFirst(React.findDOMNode(this.refs.wrapper));
	}

});
