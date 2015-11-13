import State from './state';

var delay = 300;

export function getList(urlBase, options) {
	console.log('STORE GET /' + urlBase + '/', options);
	var result = State[urlBase].filter(function (item) {
		var matches = true;
		if (options.data) {
			Object.keys(options.data).forEach(function (key) {
				if (typeof options.data[key] === 'string'
					&& !item[key].toLowerCase().startsWith(options.data[key].toLowerCase())) {
					matches = false;
				}
				if (typeof options.data[key] === 'number'
					&& item[key] !== Number(options.data[key])) {
					matches = false;
				}
			});
		}
		return matches;
	});
	setTimeout(function () {
		options.success(result);
	}, delay);
}

export function getOne(urlBase, id, options) {
	if (!id) {
		throw 'Id required, but was: [' + id + ']';
	}
	console.log('STORE GET /' + urlBase + '/' + id, options);
	setTimeout(function () {
		options.success(State[urlBase][id]);
	}, delay);
}

export function put(urlBase, id, options) {
	if (!id) {
		throw 'Id required, but was: [' + id + ']';
	}
	console.log('STORE PUT /' + urlBase + '/' + id, options);
	State[urlBase][id] = options.data;
	setTimeout(function () {
		options.success(State[urlBase][id]);
	}, delay);
}

export function post(urlBase, options) {
	if (!id) {
		throw 'Id required, but was: [' + id + ']';
	}
	console.log('STORE POST /' + urlBase + '/', options);
	var array = State[urlBase];
	var id = array[array.length - 1].id + 1;
	options.data.id = id;
	array.push(options.data);
	setTimeout(function () {
		options.success(State[urlBase][id]);
	}, delay);
}
