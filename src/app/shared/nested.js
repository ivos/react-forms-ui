export default {

	expand(data, property) {
		var copy = Object.assign({}, data);
		Object.keys(copy[property]).forEach(function (key) {
			copy[property + '.' + key] = copy[property][key];
		});
		delete copy[property];
		return copy;
	},

	collapse(data, property) {
		var copy = Object.assign({}, data);
		copy[property] = {};
		Object.keys(copy).forEach(function (key) {
			if (key.indexOf(property + '.') === 0) {
				var subProperty = key.substr(property.length + 1);
				copy[property][subProperty] = copy[key];
				delete copy[key];
			}
		});
		return copy;
	}

};
