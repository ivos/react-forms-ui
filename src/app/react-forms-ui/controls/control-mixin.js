import React from 'react';
import ReactHelper from '../support/react-helper';

export default {

	propTypes: {
		id: React.PropTypes.string.isRequired,
		placeholder: React.PropTypes.string,
		label: React.PropTypes.string,
		onChange: React.PropTypes.func,
		onBlur: React.PropTypes.func,
		type: ReactHelper.validateUnsupportedProp,
		name: ReactHelper.validateUnsupportedProp,
		autoComplete: ReactHelper.validateUnsupportedProp
	}

};
