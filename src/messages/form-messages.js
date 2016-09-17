import React from 'react'
import Messages from './messages'

const FormMessages = React.createClass({

	getInitialState() {
		return {showFeedback: 'none'}
	},

	render() {
		const {className} = this.props
		const {showFeedback} = this.state
		const {form: {state: {messages: {_form: fieldMessages}}}} = this.context
		if (!fieldMessages) {
			return <div/>
		}
		return (
			<div className="form-group">
				<Messages id="_form" fieldMessages={fieldMessages} showFeedback={showFeedback} className={className}/>
			</div>
		)
	},

})

FormMessages.contextTypes = {
	form: React.PropTypes.object
}

export default FormMessages
