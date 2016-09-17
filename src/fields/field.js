import React from 'react'
import Label from '../label/label'
import Messages from '../messages/messages'

const Field = React.createClass({

	render() {
		const {
			id, classes, label, required, readonly, showFeedback, fieldStatus, feedback,
			fieldMessages, tableForm, checkbox, children
		} = this.props
		let classArray = classes ? classes.split(',') : []
		let formGroupClass = checkbox ? 'checkbox' : 'form-group'
		formGroupClass += ' ' + fieldStatus
		if (tableForm) {
			formGroupClass += ' _rfu-table-form-group'
		}
		return (
			<div className={formGroupClass}>
				{(!tableForm || checkbox) &&
				<Label htmlFor={id} className={classArray[0]} required={required ? 'required' : false}
				       checkbox={checkbox}>
					{checkbox && children}
					{!tableForm && label}
				</Label>
				}

				{!checkbox &&
				<div className={tableForm ? 'col-xs-12' : classArray[1]}>
					{children}
					{!readonly && feedback}
				</div>
				}
				{!readonly &&
				<Messages ref="messages" id={id} fieldMessages={fieldMessages} showFeedback={showFeedback}
				          className={tableForm ? 'col-xs-12' : classArray[2]}/>}
			</div>
		)
	},

})

export default Field
