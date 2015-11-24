import React from 'react';
import Label from '../label/label';
import Messages from '../messages/messages';
require('./field.css');

export default React.createClass({

	render() {
		var {id, label, classes, required, readonly, showFeedback,
			fieldStatus, feedback, fieldMessages, tableForm, children} = this.props;
		classes = classes ? classes.split(',') : [];
		var formGroupClassName = 'form-group ' + fieldStatus;
		if (tableForm) {
			formGroupClassName += ' table-form-group';
		}
		return (
			<div className={formGroupClassName}>
				{!tableForm &&
				<Label htmlFor={id} className={classes[0]} required={required ? 'required' : false}>{label}</Label>
				}

				<div className={tableForm ? 'col-xs-12' : classes[1]}>
					{children}
					{!readonly && feedback}
				</div>
				{!readonly &&
				<Messages ref="messages" id={id} fieldMessages={fieldMessages} showFeedback={showFeedback}
				          className={tableForm ? 'col-xs-12' : classes[2]}/>}
			</div>
		);
	}

});
