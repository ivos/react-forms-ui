export default {

	validations: {
		name: {
			required: true,
			maxLength: 100
		},
		phone: {
			maxLength: 20
		},
		email: {
			maxLength: 100,
			pattern: /\S+@\S+/
		},
		country: {
			maxLength: 100
		},
		city: {
			maxLength: 100
		},
		street: {
			maxLength: 100
		},
		zip: {
			maxLength: 20
		}
	}

};
