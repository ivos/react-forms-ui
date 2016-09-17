import Validation from '../validation/validation'

export default {

	getChildContext() {
		return {form: this}
	},

	getInitialState: function () {
		return {
			messages: this.tableForm ? [] : {}
		}
	},

	componentDidMount() {
		this.focus()
	},

	componentDidUpdate(prevProps, prevState) {
		const {values} = this.state
		Object.keys(this.refs).forEach(function (field) {
			const ref = this.refs[field]
			if (ref.initWidgetValue && ref._getValueKeys) {
				ref._getValueKeys().forEach(function (valueKey) {
					const prevValue = prevState.values && prevState.values[valueKey]
					const nextValue = values && values[valueKey]
					if (nextValue !== prevValue) {
						ref.initWidgetValue(nextValue, prevValue, valueKey)
					}
				})
			}
		}, this)
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
		Object.keys(this.refs).find(function (field) {
			const ref = this.refs[field]
			if (ref.focus) {
				ref.focus()
				return true
			}
		}, this)
	},

	focusError() {
		Object.keys(this.refs).find(function (field) {
			const ref = this.refs[field]
			if (ref._focusError && ref._hasError && ref._hasError()) {
				ref._focusError()
				return true
			}
		}, this)
	},

	showErrorOnAllFields() {
		Object.keys(this.refs).forEach(function (field) {
			const ref = this.refs[field]
			if (ref.state && typeof ref.state.showFeedback !== 'undefined') {
				ref.setState({showFeedback: 'all'})
			}
		}, this)
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
		Object.keys(this.refs).forEach(function (field) {
			const ref = this.refs[field]
			if (ref._formField) {
				ref._getValueKeys().forEach(function (valueKey) {
					if (this.tableForm) {
						values[ref.props.row][valueKey] = null
					} else {
						values[valueKey] = null
					}
				}.bind(this))
			}
		}, this)
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
