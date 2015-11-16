import React from 'react';
import Label from '../label/label';
import Messages from '../messages/messages';

export default React.createClass({

	render() {
		var {id, label, classes, required, readonly,
			showFeedback, fieldStatus, feedback, fieldMessages, children} = this.props;
		classes = classes ? classes.split(',') : [];
		var formGroupClassName = 'form-group ' + fieldStatus;
		return (
			<div className={formGroupClassName}>
				<Label htmlFor={id} className={classes[0]} required={required ? 'required' : false}>{label}</Label>

				<div className={classes[1]}>
					{children}
					{!readonly && feedback}
				</div>
				{!readonly &&
				<Messages ref="messages" id={id} fieldMessages={fieldMessages} showFeedback={showFeedback}
				          className={classes[2]}/>}
			</div>
		);
	}

});
