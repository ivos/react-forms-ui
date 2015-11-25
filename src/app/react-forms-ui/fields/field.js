import React from 'react';
import Label from '../label/label';
import Messages from '../messages/messages';
require('./field.css');

export default React.createClass({

	render() {
		var {id, label, classes, required, readonly, showFeedback,
			fieldStatus, feedback, fieldMessages, tableForm, checkbox, children} = this.props;
		classes = classes ? classes.split(',') : [];
		var formGroupClass = checkbox ? 'checkbox' : 'form-group';
		formGroupClass += ' ' + fieldStatus;
		if (tableForm) {
			formGroupClass += ' table-form-group';
		}
		return (
			<div className={formGroupClass}>
				{(!tableForm || checkbox) &&
				<Label htmlFor={id} className={classes[0]} required={required ? 'required' : false} checkbox={checkbox}>
					{checkbox && children}
					{!tableForm && label}
				</Label>
				}

				{!checkbox &&
				<div className={tableForm ? 'col-xs-12' : classes[1]}>
					{children}
					{!readonly && feedback}
				</div>
				}
				{!readonly &&
				<Messages ref="messages" id={id} fieldMessages={fieldMessages} showFeedback={showFeedback}
				          className={tableForm ? 'col-xs-12' : classes[2]}/>}
			</div>
		);
	}

});
