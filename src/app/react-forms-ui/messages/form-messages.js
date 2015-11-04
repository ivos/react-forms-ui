import React from 'react';
import Messages from './messages';

export default React.createClass({

	getInitialState() {
		return {showFeedback: 'none'};
	},

	render() {
		var {className, form: {state: {messages: {_form: fieldMessages}}}} = this.props;
		var {showFeedback} = this.state;
		if (!fieldMessages) {
			return <div/>;
		}
		return (
			<div className="form-group">
				<Messages id="_form" fieldMessages={fieldMessages} showFeedback={showFeedback} className={className}/>
			</div>
		);
	}

});
