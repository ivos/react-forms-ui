import State from './state';

export function getList(urlBase, options) {
	var result = State[urlBase].filter(function (item) {
		var matches = true;
		if (options.data) {
			Object.keys(options.data).forEach(function (key) {
				if (typeof item[key] === 'string' && !item[key].toLowerCase().startsWith(options.data[key].toLowerCase())) {
					matches = false;
				}
			});
		}
		return matches;
	});
	options.success(result);
}

export function getOne(urlBase, id, options) {
	options.success(State[urlBase][id]);
}

export function put(urlBase, id, options) {
	State[urlBase][id] = options.data;
	options.success(State[urlBase][id]);
}
