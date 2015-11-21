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
		var value = this._getValue();
		return (
			<Field id={id} label={label} classes={classes} required={required} readonly={readonly}
			       showFeedback={showFeedback} fieldStatus={this._getFieldStatus()} feedback={this._getFeedback()}
			       fieldMessages={this._getFieldMessages()}>
				<Text ref="control" id={id} placeholder={placeholder} label={label} value={value} readonly={readonly}
				      onChange={this.onChange} onBlur={this._onBlur} formControl {...otherProps}>
					{children}
				</Text>
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
	}

});
