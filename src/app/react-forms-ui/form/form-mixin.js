import Validation from '../validation/validation';

export default {

	getInitialState: function () {
		return {
			messages: {}
		};
	},

	componentDidMount() {
		this.focus();
	},

	componentDidUpdate(prevProps, prevState) {
		var {values} = this.state;
		Object.keys(this.refs).forEach(function (field) {
			var ref = this.refs[field];
			if (ref.initWidgetValue) {
				var prevValue = prevState.values && prevState.values[field];
				var nextValue = values && values[field];
				if (nextValue !== prevValue) {
					ref.initWidgetValue(nextValue, prevValue);
				}
			}
		}, this);
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


	focus() {
		Object.keys(this.refs).find(function (field) {
			var ref = this.refs[field];
			if (ref.focus) {
				ref.focus();
				return true;
			}
		}, this);
	},

	focusError() {
		Object.keys(this.refs).find(function (field) {
			var ref = this.refs[field];
			if (ref.focusError && ref.hasError && ref.hasError()) {
				ref.focusError();
				return true;
			}
		}, this);
	},

	showErrorOnAllFields() {
		Object.keys(this.refs).forEach(function (field) {
			var ref = this.refs[field];
			if (ref.state && typeof ref.state.showFeedback !== 'undefined') {
				ref.setState({showFeedback: 'all'});
			}
		}, this);
	},

	setAllFieldValues() {
		var values = {};
		Object.keys(this.refs).forEach(function (field) {
			var ref = this.refs[field];
			if (ref._formField) {
				values[field] = '';
			}
		}, this);
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
		var validation = this.validate(values, this.focusError);
		if (!validation.hasError()) {
			this.onSubmit();
		}
	}

};
