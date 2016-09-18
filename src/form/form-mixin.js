import Validation from '../validation/validation'

export default {

	getChildContext() {
		return {form: this}
	},

	getInitialState() {
		return {
			messages: this.tableForm ? [] : {}
		}
	},

	registerField(field) {
		if (!this.fields) {
			this.fields = []
		}
		this.fields.push(field)
	},

	componentDidMount() {
		this.focus()
	},

	componentDidUpdate(prevProps, prevState) {
		const {values} = this.state
		if (this.fields) {
			this.fields.forEach(function (field) {
				if (field.initWidgetValue && field._getValueKeys) {
					field._getValueKeys().forEach(function (valueKey) {
						const prevValue = prevState.values && prevState.values[valueKey]
						const nextValue = values && values[valueKey]
						if (nextValue !== prevValue) {
							field.initWidgetValue(nextValue, prevValue, valueKey)
						}
					})
				}
			}, this)
		}
	},

	_onChange(id, value, row) {
		let {values} = this.state
		if (this.tableForm) {
			values[row] = Object.assign({}, values[row])
			values[row][id] = value
		} else {
			values = Object.assign({}, values)
			values[id] = value
		}
		this.setState({values}, this.changed)
	},

	changed() {
		this.validate()
		if (this.onChange) {
			this.onChange()
		}
	},

	validate(values, afterMessagesSet) {
		values = values || this.state.values
		const validation = new Validation(values, this.tableForm)
		validation.autoValidate(this.validations)
		this.setState({
			messages: validation.messages
		}, afterMessagesSet)
		return validation
	},

	focus() {
		if (this.fields) {
			this.fields.find(function (field) {
				if (field.focus) {
					field.focus()
					return true
				}
			}, this)
		}
	},

	focusError() {
		if (this.fields) {
			this.fields.find(function (field) {
				if (field._focusError && field._hasError && field._hasError()) {
					field._focusError()
					return true
				}
			}, this)
		}
	},

	showErrorOnAllFields() {
		if (this.fields) {
			this.fields.forEach(function (field) {
				if (field.state && typeof field.state.showFeedback !== 'undefined') {
					field.setState({showFeedback: 'all'})
				}
			})
		}
	},

	setAllFieldValues() {
		let values = {}
		if (this.tableForm) {
			values = []
			if (this.state.values) {
				this.state.values.forEach(function () {
					values.push({})
				})
			}
		}
		if (this.fields) {
			this.fields.forEach(function (field) {
				if (field._formField) {
					field._getValueKeys().forEach(function (valueKey) {
						if (this.tableForm) {
							values[field.props.row][valueKey] = null
						} else {
							values[valueKey] = null
						}
					}.bind(this))
				}
			}, this)
		}
		if (this.tableForm) {
			if (this.state.values) {
				this.state.values.forEach(function (valuesRow, row) {
					values[row] = Object.assign(values[row], this.state.values[row])
				}.bind(this))
			}
		} else {
			values = Object.assign(values, this.state.values)
		}
		this.setState({values})
		return values
	},

	_onSubmit(event) {
		if (event) {
			event.preventDefault()
		}
		this.showErrorOnAllFields()
		const values = this.setAllFieldValues()
		const validation = this.validate(values, this.focusError)
		if (!validation.hasError()) {
			this.onSubmit()
		}
	},

}
