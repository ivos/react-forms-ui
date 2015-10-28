export default {

	validateUnsupportedProp (props, propName, componentName) {
		if (props[propName]) {
			return new Error('Attribute ' + propName + ' not supported on ' + componentName + '.');
		}
	}

};
