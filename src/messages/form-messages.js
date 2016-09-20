import React from 'react'
import Messages from './messages'

const FormMessages = React.createClass({

	getInitialState() {
		return {showFeedback: 'none'}
	},

	componentWillMount() {
		const {form} = this.context
		if (form) {
			form.registerField(this)
		}
	},

	render() {
		const {className} = this.props
		const {showFeedback} = this.state
		const {form: {props: {state}}} = this.context
		if (!state || !state.messages || !state.messages._form) {
			return <div/>
		}
		return (
			<div className="form-group">
				<Messages id="_form" fieldMessages={state.messages._form} showFeedback={showFeedback}
				          className={className}/>
			</div>
		)
	},

})

FormMessages.contextTypes = {
	form: React.PropTypes.object.isRequired,
}

export default FormMessages
