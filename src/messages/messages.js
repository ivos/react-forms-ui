import React from 'react'
import Message from './message'

export default React.createClass({

	render() {
		var {id, fieldMessages, className, showFeedback, ...otherProps} = this.props
		if (!fieldMessages || 'none' === showFeedback) {
			return (
				<div className={className} {...otherProps}></div>
			)
		}
		return (
			<div className={className} {...otherProps}>
				{
					fieldMessages.map(function (message) {
						if ('all' === showFeedback || !this.isError(message)) {
							var text = (typeof message === 'string') ? message : message.text
							return <Message key={id + text} type={message.type} text={text}/>
						}
					}, this)
				}
			</div>
		)
	},

	isError(message) {
		return 'error' === message.type || !message.type
	},

})
