import React from 'react';
import ReactDOM from 'react-dom';
import Text from '../controls/text';
import Label from '../label/label';
import Messages from '../messages/messages';
import FieldMixin from './field-mixin';

export default React.createClass({

	mixins: [FieldMixin],

	render() {
		var {id, label, classes, required, readonly, form, placeholder, children, ...otherProps} = this.props;
		var value = (form && form.state.values) ? form.state.values[id] : null;
		classes = classes ? classes.split(',') : [];
		var formGroupClassName = 'form-group ' + this.getFieldStatus();
		return (
			<div className={formGroupClassName}>
				<Label htmlFor={id} className={classes[0]} required={required ? 'required' : false}>{label}</Label>

				<div className={classes[1]}>
					<Text ref="control" id={id} placeholder={placeholder} label={label} value={value} readonly={readonly}
					      onChange={this._onChange} onBlur={this._onBlur}>
						{this.props.children}
					</Text>
					{!readonly && this.getFeedback()}
				</div>
				{!readonly &&
				<Messages ref="messages" id={id} fieldMessages={this.getFieldMessages()}
				          showFeedback={this.state.showFeedback} className={classes[2]}/>
				}
			</div>
		);
	},

	focus() {
		this.refs.control.focus();
	},

	focusError() {
		this.focus();
	},

	_onChange(value) {
		this.setState({showFeedback: 'positive'});
		var {id, form} = this.props;
		if (form) {
			form._onChange(id, value);
		}
	}

});
