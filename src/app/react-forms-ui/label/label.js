import React from 'react';
require('./label.css');
import Options from '../options/options';

export default React.createClass({

	render() {
		var {required, className='', checkbox, children, ...otherProps} = this.props;
		if (!checkbox) {
			className = className + ' control-label';
		}
		var label = Options.translate ? Options.translate('validation:required') : 'Required.';
		return (
			<label className={className} {...otherProps}>
				{children}
				{required ? <span className="required" title={label}>&nbsp;*</span> : ''}
			</label>
		);
	}

});
