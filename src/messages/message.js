import React from 'react'
import {Alert} from 'react-bootstrap'

const Message = React.createClass({

	getInitialState() {
		return {}
	},

	render() {
		const {text, dismissible} = this.props
		const {dismissed} = this.state
		if (!text || dismissed) {
			return <span/>
		}
		const outerClass = '_rfu-inline-message' + (dismissible ? ' alert-dismissible' : '')
		const innerClass = '_rfu-inline-message-icon glyphicon glyphicon-' + this.getGlyphicon()
		const onDismiss = dismissible ? this.handleDismiss : null
		return (
			<Alert ref="el" bsStyle={this.getAlertType()} className={outerClass} onDismiss={onDismiss}>
				<span className={innerClass}/> {' '} {text}
			</Alert>
		)
	},

	getAlertType() {
		const {type} = this.props
		if ('error' === type || !type) {
			return 'danger'
		}
		return type
	},

	getGlyphicon() {
		const {type} = this.props
		switch (type) {
			case 'success':
				return 'ok-sign'
			case 'info':
				return 'info-sign'
			case 'warning':
				return 'warning-sign'
			default:
				return 'exclamation-sign'
		}
	},

	setupAutoDismiss() {
		const {type, dismissible} = this.props
		if (dismissible && 'success' === type) {
			setTimeout(() => this.handleDismiss(), 1500)
		}
	},

	componentDidMount() {
		this.setupAutoDismiss()
	},

	handleDismiss() {
		this.setState({dismissed: true})
	},

	restore() {
		this.setState({dismissed: false})
		this.setupAutoDismiss()
	},
})

Message.propTypes = {
	type: React.PropTypes.string,
	text: React.PropTypes.string,
	dismissible: React.PropTypes.bool,
}

export default Message
