import React from 'react';
import Field from './field';
import Text from '../controls/text';
import Label from '../label/label';
import Messages from '../messages/messages';
import FieldMixin from './field-mixin';

export default React.createClass({

	mixins: [FieldMixin],

	render() {
		var {id, label, classes, required, readonly, form, placeholder, children, ...otherProps} = this.props;
		var {showFeedback} = this.state;
		var value = this.getValue();
		var formGroupClassName = 'form-group ' + this.getFieldStatus();
		return (
			<Field id={id} label={label} classes={classes} required={required} readonly={readonly}
			       showFeedback={showFeedback} fieldStatus={this.getFieldStatus()} feedback={this.getFeedback()}
			       fieldMessages={this.getFieldMessages()}>
				<Text ref="control" id={id} placeholder={placeholder} label={label} value={value} readonly={readonly}
				      onChange={this._onChange} onBlur={this._onBlur} {...otherProps}>
					{children}
				</Text>
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
	}

});
