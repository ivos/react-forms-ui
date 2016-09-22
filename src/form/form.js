import React from 'react'
import Validation from '../validation/validation'

const Form = React.createClass({

	getChildContext() {
		return {form: this}
	},

	registerField(field) {
		if (!this.fields) {
			this.fields = []
		}
		this.fields.push(field)
	},

	render() {
		let {className, ...otherProps} = this.props
		className = className || 'form-horizontal'
		delete otherProps.state
		delete otherProps.setState
		delete otherProps.validations
		delete otherProps.tableForm
		delete otherProps.onSubmit
		delete otherProps.onChange
		return (
			<form className={className} action="#" role="form" {...otherProps} onSubmit={this._onSubmit}/>
		)
	},

	componentDidMount() {
		this.focus()
	},

	componentDidUpdate(prevProps) {
		const {values} = this.props.state
		const prevState = prevProps.state
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
		let {values} = this.props.state
		if (this.props.tableForm) {
			values[row] = Object.assign({}, values[row])
			values[row][id] = value
		} else {
			values = Object.assign({}, values)
			values[id] = value
		}
		this.props.setState({values}, this.changed)
	},

	changed() {
		this.validate()
		if (this.props.onChange) {
			this.props.onChange()
		}
	},

	validate(values, afterMessagesSet) {
		values = values || this.props.state.values
		const validation = new Validation(values, this.props.tableForm)
		validation.autoValidate(this.props.validations)
		this.props.setState({
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
		const {tableForm, state} = this.props
		let values = {}
		if (tableForm) {
			values = []
			if (state.values) {
				state.values.forEach(function () {
					values.push({})
				})
			}
		}
		if (this.fields) {
			this.fields.forEach(function (field) {
				if (field._formField) {
					field._getValueKeys().forEach(function (valueKey) {
						if (tableForm) {
							values[field.props.row][valueKey] = null
						} else {
							values[valueKey] = null
						}
					}.bind(this))
				}
			}, this)
		}
		if (tableForm) {
			if (state.values) {
				state.values.forEach(function (valuesRow, row) {
					values[row] = Object.assign(values[row], state.values[row])
				}.bind(this))
			}
		} else {
			values = Object.assign(values, state.values)
		}
		this.props.setState({values})
		return values
	},

	_onSubmit(event) {
		if (event) {
			event.preventDefault()
		}
		this.showErrorOnAllFields()
		const values = this.setAllFieldValues()
		const validation = this.validate(values, this.focusError)
		if (!validation.hasError() && this.props.onSubmit) {
			this.props.onSubmit()
		}
	},

})

Form.propTypes = {
	state: React.PropTypes.any.isRequired,
	setState: React.PropTypes.func.isRequired,
	validations: React.PropTypes.object,
	tableForm: React.PropTypes.bool,
	onSubmit: React.PropTypes.func,
	onChange: React.PropTypes.func,
}

Form.childContextTypes = {
	form: React.PropTypes.object
}

export default Form
