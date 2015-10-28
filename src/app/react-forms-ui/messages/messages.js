import React from 'react';
import Message from './message';

export default React.createClass({

	render() {
		var {id, fieldMessages, className, showFeedback} = this.props;
		if (!fieldMessages || 'none' === showFeedback) {
			return (
				<div className={className}/>
			);
		}
		return (
			<div className={className}>
				{
					fieldMessages.map(function (message) {
						if ('all' === showFeedback || !this.isError(message)) {
							var text = (typeof message === 'string') ? message : message.text;
							return <Message key={id + text} type={message.type} text={text}/>;
						}
					}, this)}
			</div>
		);
	},

	isError(message) {
		return 'error' === message.type || !message.type;
	},

	hasError() {
		var {fieldMessages} = this.props;
		if (fieldMessages) {
			return fieldMessages.find(function (message) {
				return this.isError(message);
			}, this);
		}
	}

});
