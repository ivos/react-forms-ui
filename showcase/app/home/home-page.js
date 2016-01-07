import React from 'react';
import ReactDOM from 'react-dom';
import {focusFirst, setTitle} from '../ui/utils';
import TextFields from './text-fields';
import PasswordFields from './password-fields';
import NumberFields from './number-fields';
import SelectFields from './select-fields';
import DateFields from './date-fields';
import DateRangeFields from './date-range-fields';
import BooleanFields from './boolean-fields';
import TableForm from './table-form';
import i18n from '../i18n';
var t = i18n.t.bind(i18n);

export default React.createClass({

	render() {
		return (
			<div ref="wrapper">
				<h2>React Forms UI</h2>

				<TextFields/>
				<PasswordFields/>
				<NumberFields/>
				<SelectFields/>
				<DateFields/>
				<DateRangeFields/>
				<BooleanFields/>
				<TableForm/>

			</div>
		);
	},

	componentDidMount() {
		setTitle(t('home.title'));
		focusFirst(ReactDOM.findDOMNode(this.refs.wrapper));
	}

});
