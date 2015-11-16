import ReactHelper from '../support/react-helper';

export default {

	_formField: true,

	propTypes: {
		className: ReactHelper.validateUnsupportedProp
	},

	getInitialState() {
		return {showFeedback: 'none'};
	},

	getValue() {
		var {id, form} = this.props;
		return (form && form.state.values) ? form.state.values[id] : null;
	},

	setChanging() {
		this.setState({showFeedback: 'positive'});
	},

	getFieldMessages() {
		var {id, form: {state: {messages}}} = this.props;
		return messages[id];
	},

	getFieldStatusType() {
		var {showFeedback} = this.state;
		var fieldMessages = this.getFieldMessages();
		var type = '';
		if ('none' !== showFeedback && fieldMessages) {
			var first = fieldMessages[0];
			type = first.type ? first.type : 'error';
			if ('error' === type && 'all' !== showFeedback) {
				type = '';
			}
		}
		return type;
	},

	getFieldStatus() {
		var fieldStatusType = this.getFieldStatusType();
		if (fieldStatusType) {
			return 'has-feedback has-' + fieldStatusType;
		}
		return '';
	},

	getFeedbackType() {
		var fieldStatusType = this.getFieldStatusType();
		if (fieldStatusType) {
			switch (fieldStatusType) {
				case 'error':
					return 'remove';
				case 'success':
					return 'ok';
				case 'warning':
					return 'question-sign';
				case 'info':
					return 'info-sign';
			}
		}
		return '';
	},

	getFeedback() {
		var feedbackType = this.getFeedbackType();
		if (feedbackType) {
			var className = 'form-control-feedback glyphicon glyphicon-' + feedbackType;
			return <span className={className}></span>;
		}
	},

	hasError() {
		var fieldMessages = this.getFieldMessages();
		if (fieldMessages) {
			return fieldMessages.find(function (message) {
				return 'error' === message.type || !message.type;
			}, this);
		}
	},

	_onBlur(event) {
		var {showFeedback} = this.state;
		if ('positive' === showFeedback) {
			this.setState({showFeedback: 'all'});
		}
		if (this.onBlur) {
			this.onBlur(event);
		}
	}

};
