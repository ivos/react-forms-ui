import State from './state';

export function getList(entitiesName, options) {
	options.success(State[entitiesName]);
}

export function getOne(entitiesName, id, options) {
	options.success(State[entitiesName][id]);
}

export function put(entitiesName, id, options) {
	State[entitiesName][id] = options.data;
	options.success(State[entitiesName][id]);
}
