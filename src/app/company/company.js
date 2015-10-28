export default {

	validations: {
		name: {
			required: true,
			maxLength: 100
		},
		taxId: {
			minLength: 4,
			maxLength: 14,
			pattern: /^[A-Z]{2}[A-Z0-9]{2,12}$/
		},
		companyId: {
			minLength: 8,
			maxLength: 8,
			pattern: /^[0-9]*$/
		}
	}

};
