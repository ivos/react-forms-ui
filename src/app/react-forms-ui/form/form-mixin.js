import Validation from '../validation/validation';

export default {

	getInitialState: function () {
		return {
			messages: {}
		};
	},

	componentDidMount() {
		this.focusFirstField();
	},

	componentDidUpdate(prevProps, prevState) {
		var {fields, values} = this.state;
		if (fields) {
			fields.forEach(function (field) {
				var ref = this.refs[field];
				if (ref && ref.initWidgetValue) {
					var prevValue = prevState.values && prevState.values[field];
					var nextValue = values && values[field];
					if (nextValue !== prevValue) {
						ref.initWidgetValue(nextValue, prevValue);
					}
				}
			}, this);
		}
	},

	_onChange(id, value) {
		var {values} = this.state;
		values = Object.assign({}, values);
		values[id] = value;
		this.setState({values}, this.changed);
	},

	changed() {
		this.validate();
		if (this.onChange) {
			this.onChange();
		}
	},

	validate(values, afterMessagesSet) {
		values = values || this.state.values;
		var validation = new Validation(values);
		validation.autoValidate(this.validations);
		this.setState({
			messages: validation.messages
		}, afterMessagesSet);
		return validation;
	},

	focusFirstField() {
		var {fields} = this.state;
		if (fields) {
			fields.find(function (field) {
				var ref = this.refs[field];
				if (ref && ref.focus) {
					ref.focus();
					return true;
				}
			}, this);
		}
	},

	focusFirstErrorField() {
		var {fields} = this.state;
		if (fields) {
			fields.find(function (field) {
				var ref = this.refs[field];
				if (ref.focus && ref.hasError && ref.hasError()) {
					ref.focus();
					return true;
				}
			}, this);
		}
	},

	showErrorOnAllFields() {
		var {fields} = this.state;
		['_form', ...fields].forEach(function (field) {
			var ref = this.refs[field];
			if (ref && typeof ref.state.showFeedback !== 'undefined') {
				ref.setState({showFeedback: 'all'});
			}
		}, this);
	},

	setAllFieldValues() {
		var {fields} = this.state;
		var values = {};
		if (fields) {
			fields.forEach(function (field) {
				values[field] = '';
			});
		}
		values = Object.assign(values, this.state.values);
		this.setState({values});
		return values;
	},

	_onSubmit(event) {
		if (event) {
			event.preventDefault();
		}
		this.showErrorOnAllFields();
		var values = this.setAllFieldValues();
		var validation = this.validate(values, this.focusFirstErrorField);
		if (!validation.hasError()) {
			this.onSubmit();
		}
	}

};
