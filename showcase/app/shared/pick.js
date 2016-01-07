export default function (obj, ...keys) {
	let res = {};
	if (typeof obj === 'object') {
		let i = 0;
		let len = keys.length;
		while (len--) {
			let key = keys[i++];
			if (key in obj) {
				res[key] = obj[key];
			}
		}
	}
	return res;
};
