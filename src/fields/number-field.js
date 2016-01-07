import React from 'react';
import Field from './field';
import NumberControl from '../controls/number-control';
import Label from '../label/label';
import Messages from '../messages/messages';
import FieldMixin from './field-mixin';

export default React.createClass({

	mixins: [FieldMixin],

	render() {
		var {id, label, classes, required, readonly, form, form: {tableForm}, placeholder, format,
			row, children, ...otherProps} = this.props;
		var {showFeedback} = this.state;
		var value = this._getValue();
		if (tableForm) {
			id = id + '-' + row;
		}
		return (
			<Field id={id} label={label} classes={classes} required={required} readonly={readonly}
			       showFeedback={showFeedback} fieldStatus={this._getFieldStatus() + ' no-feedback-icon'}
			       fieldMessages={this._getFieldMessages()} tableForm={tableForm}>
				<NumberControl ref="control" id={id} placeholder={placeholder} label={label} value={value}
				               readonly={readonly} onChange={this.onChange} onBlur={this._onBlur} format={format}
				               formControl {...otherProps}>
					{children}
				</NumberControl>
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
	}

});
