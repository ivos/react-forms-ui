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
		var value = this.getValue();
		var formGroupClassName = 'form-group ' + this.getFieldStatus();
		return (
			<Field id={id} label={label} classes={classes} required={required} readonly={readonly}
			       showFeedback={showFeedback} fieldStatus={this.getFieldStatus()}
			       fieldMessages={this.getFieldMessages()}>
				<Select ref="control" id={id} placeholder={placeholder} label={label} value={value} readonly={readonly}
				        onChange={this._onChange} onBlur={this._onBlur} onSubmit={form._onSubmit}
				        query={query} initSelection={initSelection} {...otherProps}>
					{children}
				</Select>
			</Field>
		);
	},

	focus() {
		this.refs.control.focus();
	},

	focusError() {
		this.focus();
	},

	_onChange(value) {
		this.setChanging();
		var {id, form} = this.props;
		if (form) {
			form._onChange(id, value);
		}
	},

	initWidgetValue(value, prevValue) {
		this.refs.control.initWidgetValue(value, prevValue);
	}

});
