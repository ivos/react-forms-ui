import React from 'react'
import ReactHelper from '../support/react-helper'

export default {

	_formField: true,

	propTypes: {
		className: ReactHelper.validateUnsupportedProp
	},

	getInitialState() {
		return {showFeedback: 'none'}
	},

	componentWillMount() {
		const {form} = this.context
		if (form) {
			form.registerField(this)
		}
	},

	_getValue(suffix) {
		const {id, row} = this.props
		const {form, form: {tableForm}} = this.context
		const valueKey = id + (suffix || '')
		if (!form || !form.state.values) {
			return null
		}
		return (tableForm) ? form.state.values[row][valueKey] : form.state.values[valueKey]
	},

	_getValueKeys() {
		if (this.getValueKeys) {
			return this.getValueKeys()
		}
		const {id} = this.props
		return [id]
	},

	_focusError() {
		if (this.focusError) {
			this.focusError()
		} else {
			this.focus()
		}
	},

	_setChanging() {
		this.setState({showFeedback: 'positive'})
	},

	_getFieldMessages() {
		if (this.getFieldMessages) {
			return this.getFieldMessages()
		}
		const {id, row} = this.props
		const {form: {tableForm, state: {messages}}} = this.context
		if (tableForm) {
			return messages[row] ? messages[row][id] : null
		}
		return (tableForm) ? messages[row][id] : messages[id]
	},

	_getFieldStatusType() {
		if (this.getFieldStatusType) {
			return this.getFieldStatusType()
		}
		const fieldMessages = this._getFieldMessages()
		return this._getMessagesStatusType(fieldMessages)
	},

	_getMessagesStatusType(messages) {
		const {showFeedback} = this.state
		if ('none' !== showFeedback && messages) {
			if (this._hasError(messages) && 'all' === showFeedback) {
				return 'error'
			}
			return messages[0].type
		}
		return ''
	},

	_getFieldStatus() {
		const fieldStatusType = this._getFieldStatusType()
		if (fieldStatusType) {
			return 'has-feedback has-' + fieldStatusType
		}
		return ''
	},

	_getFeedbackType() {
		const fieldStatusType = this._getFieldStatusType()
		if (fieldStatusType) {
			switch (fieldStatusType) {
				case 'error':
					return 'remove'
				case 'success':
					return 'ok'
				case 'warning':
					return 'question-sign'
				case 'info':
					return 'info-sign'
			}
		}
		return ''
	},

	_getFeedback() {
		const feedbackType = this._getFeedbackType()
		if (feedbackType) {
			const className = 'form-control-feedback glyphicon glyphicon-' + feedbackType
			return <span className={className}> </span>
		}
	},

	_hasError(messages) {
		messages = messages || this._getFieldMessages()
		if (messages) {
			return messages.find(function (message) {
				return 'error' === message.type || !message.type
			}, this)
		}
	},

	_onBlur() {
		const {showFeedback} = this.state
		if ('positive' === showFeedback) {
			this.setState({showFeedback: 'all'})
		}
	},

}
