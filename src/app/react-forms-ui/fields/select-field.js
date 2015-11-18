import React from 'react';
import Field from './field';
import Select from '../controls/select';
import Label from '../label/label';
import Messages from '../messages/messages';
import FieldMixin from './field-mixin';

export default React.createClass({

	mixins: [FieldMixin],

	render() {
		var {id, label, classes, required, readonly, form, placeholder,
			query, initSelection, children, ...otherProps} = this.props;
		var {showFeedback} = this.state;
		var value = this._getValue();
		return (
			<Field id={id} label={label} classes={classes} required={required} readonly={readonly}
			       showFeedback={showFeedback} fieldStatus={this._getFieldStatus()}
			       fieldMessages={this._getFieldMessages()}>
				<Select ref="control" id={id} placeholder={placeholder} label={label} value={value} readonly={readonly}
				        onChange={this.onChange} onBlur={this._onBlur} onSubmit={form._onSubmit}
				        query={query} initSelection={initSelection} {...otherProps}>
					{children}
				</Select>
			</Field>
		);
	},

	focus() {
		this.refs.control.focus();
	},

	onChange(value) {
		this._setChanging();
		var {id, form} = this.props;
		if (form) {
			form._onChange(id, value);
		}
	},

	initWidgetValue(value, prevValue) {
		this.refs.control.initWidgetValue(value, prevValue);
	}

});
