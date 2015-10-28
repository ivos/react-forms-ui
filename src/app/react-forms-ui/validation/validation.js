var Validation = function (values) {
	this.messages = {};
	this.values = values;
};

Object.assign(Validation.prototype, {

	hasError() {
		return !!Object.keys(this.messages).find(function (field) {
			return this.hasFieldError(field);
		}, this);
	},

	hasFieldError(field) {
		var fieldMessages = this.messages[field];
		return fieldMessages && fieldMessages.find(function (message) {
				return 'error' === message.type || !message.type;
			});
	},

	add(field, text, type) {
		if (!this.messages[field]) {
			this.messages[field] = [];
		}
		if (!type) {
			this.messages[field].push(text);
		} else {
			this.messages[field].push({
				text: text,
				type: type
			});
		}
	},

	autoValidate(validations) {
		if (!validations) {
			return;
		}
		Object.keys(validations).forEach(function (field) {
			var validation = validations[field];
			if (validation.required) {
				this.required(field);
			}
			if (validation.minLength) {
				this.minLength(field, validation.minLength);
			}
			if (validation.maxLength) {
				this.maxLength(field, validation.maxLength);
			}
			if (validation.pattern) {
				this.pattern(field, validation.pattern);
			}
			if (false !== validation.autoSuccess) {
				this.autoSuccess(field);
			}
		}, this);
	},

	required(field) {
		var value = this.values[field];
		if (typeof value !== 'undefined' && null === value || '' === value) {
			this.add(field, 'Required.');
		}
	},

	minLength(field, minLength) {
		var value = this.values[field];
		if (value && minLength && value.length < minLength) {
			this.add(field, 'Must have at least ' + minLength + ' character' + this.suffix(minLength) + '.');
		}
	},

	maxLength(field, maxLength) {
		var value = this.values[field];
		if (value && maxLength && value.length > maxLength) {
			this.add(field, 'Must have at most ' + maxLength + ' character' + this.suffix(maxLength) + '.');
		}
	},

	pattern(field, pattern) {
		var value = this.values[field];
		if (value && pattern && !pattern.test(value)) {
			this.add(field, 'Invalid format.');
		}
	},

	autoSuccess(field){
		var value = this.values[field];
		if (!this.hasFieldError(field) && (typeof value !== 'undefined')) {
			this.add(field, null, 'success');
		}
	},

	suffix(number) {
		if (number == 1) {
			return '';
		}
		if (number < 5) {
			return 's';
		}
		return 's';
	}

});

export default Validation;
