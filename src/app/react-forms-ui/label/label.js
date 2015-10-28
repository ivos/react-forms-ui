import React from 'react';
require('./label.css');

export default React.createClass({

	render() {
		var {required, className, ...otherProps} = this.props;
		className = className + ' control-label';
		return (
			<label className={className} {...otherProps}>
				{this.props.children}
				{required ? <span className="required" title="Required">&nbsp;*</span> : ''}
			</label>
		);
	}

});
