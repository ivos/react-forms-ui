import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'

const Message = React.createClass({

	render() {
		const {text, dismissible} = this.props
		if (!text) {
			return <span/>
		}
		const outerClass = '_rfu-inline-message alert alert-' + this.getAlertType()
			+ (dismissible ? ' alert-dismissible' : '')
		const innerClass = '_rfu-inline-message-icon glyphicon glyphicon-' + this.getGlyphicon()
		return (
			<span ref="el" className={outerClass}>
				{dismissible && <button type="button" className="close" data-dismiss="alert">&times</button>}
				<span className={innerClass}></span>&nbsp{text}
			</span>
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

	componentDidMount() {
		const {type, dismissible} = this.props
		if (dismissible && 'success' === type) {
			$(ReactDOM.findDOMNode(this.refs.el)).delay(1000).fadeOut(500)
		}
	},

})

Message.propTypes = {
	type: React.PropTypes.string.isRequired,
	text: React.PropTypes.string.isRequired,
	dismissible: React.PropTypes.bool,
}

export default Message
