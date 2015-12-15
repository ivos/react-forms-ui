import Options from '../options/options';

var Validation = function (values, tableForm) {
	this.values = values;
	this.tableForm = tableForm;
	this.messages = this.tableForm ? [] : {};
};

Object.assign(Validation.prototype, {

	hasError() {
		if (this.tableForm) {
			return this.messages.find(function (messagesRow, row) {
				return this.hasRowError(messagesRow, row);
			}, this);
		} else {
			return this.hasRowError(this.messages);
		}
	},

	hasRowError(messagesRow, row) {
		return !!Object.keys(messagesRow).find(function (field) {
			return this.hasFieldError(field, row);
		}, this);
	},

	hasFieldError(field, row) {
		var messages = this.tableForm ? (this.messages[row] || {}) : this.messages;
		var fieldMessages = messages[field];
		return fieldMessages && fieldMessages.find(function (message) {
				return 'error' === message.type || !message.type;
			});
	},

	add(field, text, type, row) {
		var messages = this.tableForm ? this.messages[row] : this.messages;
		if (this.tableForm && !messages) {
			messages = this.messages[row] = {};
		}
		if (!messages[field]) {
			messages[field] = [];
		}
		if (!type) {
			messages[field].push(text);
		} else {
			messages[field].push({
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
			if (null != validation.minLength) {
				this.minLength(field, validation.minLength);
			}
			if (null != validation.maxLength) {
				this.maxLength(field, validation.maxLength);
			}
			if (null != validation.min) {
				this.min(field, validation.min);
			}
			if (null != validation.max) {
				this.max(field, validation.max);
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
		if (this.tableForm) {
			this.values.forEach(function (valuesRow, row) {
				this._requiredRow(field, valuesRow[field], row);
			}, this);
		} else {
			this._requiredRow(field, this.values[field]);
		}
	},

	_requiredRow(field, value, row) {
		if (typeof value !== 'undefined' && null === value || '' === value) {
			var label = Options.translate ? Options.translate('validation:required') : 'Required.';
			this.add(field, label, undefined, row);
		}
	},

	minLength(field, minLength) {
		if (this.tableForm) {
			this.values.forEach(function (valuesRow, row) {
				this._minLengthRow(field, minLength, valuesRow[field], row);
			}, this);
		} else {
			this._minLengthRow(field, minLength, this.values[field]);
		}
	},

	_minLengthRow(field, minLength, value, row) {
		if (value && (null != minLength) && value.length < minLength) {
			var label = Options.translate ?
				Options.translate('validation:minLength', {count: minLength})
				: 'Must have at least ' + minLength + ' characters.';
			this.add(field, label, undefined, row);
		}
	},

	maxLength(field, maxLength) {
		if (this.tableForm) {
			this.values.forEach(function (valuesRow, row) {
				this._maxLengthRow(field, maxLength, valuesRow[field], row);
			}, this);
		} else {
			this._maxLengthRow(field, maxLength, this.values[field]);
		}
	},

	_maxLengthRow(field, maxLength, value, row) {
		if (value && (null != maxLength) && value.length > maxLength) {
			var label = Options.translate ?
				Options.translate('validation:maxLength', {count: maxLength})
				: 'Must have at most ' + maxLength + ' characters.';
			this.add(field, label, undefined, row);
		}
	},

	min(field, min) {
		if (this.tableForm) {
			this.values.forEach(function (valuesRow, row) {
				this._min(field, min, valuesRow[field], row);
			}, this);
		} else {
			this._min(field, min, this.values[field]);
		}
	},

	_min(field, min, value, row) {
		if ((null != value) && (null != min) && (typeof value === 'number') && value < min) {
			var label = Options.translate ?
				Options.translate('validation:min', {count: min})
				: 'Must be at least ' + min + '.';
			this.add(field, label, undefined, row);
		}
	},

	max(field, max) {
		if (this.tableForm) {
			this.values.forEach(function (valuesRow, row) {
				this._max(field, max, valuesRow[field], row);
			}, this);
		} else {
			this._max(field, max, this.values[field]);
		}
	},

	_max(field, max, value, row) {
		if ((null != value) && (null != max) && (typeof value === 'number') && value > max) {
			var label = Options.translate ?
				Options.translate('validation:max', {count: max})
				: 'Must be at most ' + max + '.';
			this.add(field, label, undefined, row);
		}
	},

	pattern(field, pattern) {
		if (this.tableForm) {
			this.values.forEach(function (valuesRow, row) {
				this._patternRow(field, pattern, valuesRow[field], row);
			}, this);
		} else {
			this._patternRow(field, pattern, this.values[field]);
		}
	},

	_patternRow(field, pattern, value, row) {
		if (value && pattern && !pattern.test(value)) {
			var label = Options.translate ? Options.translate('validation:invalidFormat') : 'Invalid format.';
			this.add(field, label, undefined, row);
		}
	},

	autoSuccess(field) {
		if (this.tableForm) {
			this.values.forEach(function (valuesRow, row) {
				this._autoSuccessRow(field, valuesRow[field], row);
			}, this);
		} else {
			this._autoSuccessRow(field, this.values[field]);
		}
	},

	_autoSuccessRow(field, value, row) {
		if (!this.hasFieldError(field, row) && (typeof value !== 'undefined')) {
			this.add(field, null, 'success', row);
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
