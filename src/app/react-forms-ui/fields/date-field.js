import React from 'react';
import Field from './field';
import DateControl from '../controls/date-control';
import Label from '../label/label';
import Messages from '../messages/messages';
import FieldMixin from './field-mixin';
require('./date-field.css');

export default React.createClass({

	mixins: [FieldMixin],

	render() {
		var {id, label, classes, required, readonly, form, form: {tableForm}, placeholder,
			row, children, ...otherProps} = this.props;
		var {showFeedback} = this.state;
		var value = this._getValue();
		if (tableForm) {
			id = id + '-' + row;
		}
		return (
			<Field id={id} label={label} classes={classes} required={required} readonly={readonly}
			       showFeedback={showFeedback} fieldStatus={this._getFieldStatus()}
			       fieldMessages={this._getFieldMessages()} tableForm={tableForm}>
				<DateControl ref="control" id={id} placeholder={placeholder} label={label} value={value}
				             readonly={readonly} onChange={this.onChange} onBlur={this._onBlur}
				             onSubmit={form._onSubmit} formControl {...otherProps}>
					{children}
				</DateControl>
			</Field>
		);
	},

	focus() {
		this.refs.control.focus();
	},

	onChange(value) {
		this._setChanging();
		var {id, form, row} = this.props;
		if (form) {
			form._onChange(id, value, row);
		}
	},

	initWidgetValue(value, prevValue) {
		this.refs.control.initWidgetValue(value, prevValue);
	}

});
