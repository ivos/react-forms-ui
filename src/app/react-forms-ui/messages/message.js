import React from 'react';
require('./message.css');

export default React.createClass({

	render() {
		var {text, dismissible} = this.props;
		if (!text) {
			return <span/>;
		}
		var outerClass = 'inline-message alert alert-' + this.getAlertType()
			+ (dismissible ? ' alert-dismissible' : '');
		var innerClass = 'inline-message-icon glyphicon glyphicon-' + this.getGlyphicon();
		return (
			<span ref="el" className={outerClass}>
				{dismissible && <button type="button" className="close" data-dismiss="alert">&times;</button>}
				<span className={innerClass}></span>&nbsp;{text}
			</span>
		);
	},

	getAlertType() {
		var {type} = this.props;
		if ('error' === type || !type) {
			return 'danger';
		}
		return type;
	},

	getGlyphicon() {
		var {type} = this.props;
		switch (type) {
			case 'success':
				return 'ok-sign';
			case 'info':
				return 'info-sign';
			case 'warning':
				return 'warning-sign';
			default:
				return 'exclamation-sign';
		}
	},

	componentDidMount() {
		var {type, dismissible} = this.props;
		if (dismissible && 'success' === type) {
			$(React.findDOMNode(this.refs.el)).delay(1000).fadeOut(500);
		}
	}

});
