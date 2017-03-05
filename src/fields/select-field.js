import React from 'react'
import Field from './field'
import SelectControl from '../controls/select-control'
import FieldMixin from './field-mixin'

const SelectField = React.createClass({

	mixins: [FieldMixin],

	render() {
		let {
			id, label, classes, readonly, placeholder, load, formatItem, row, children, ...otherProps
		} = this.props
		const {showFeedback} = this.state
		const {form, form: {props: {tableForm, validations}}} = this.context
		const value = this._getValue()
		const required = (validations && validations[id]) ? validations[id].required : false
		if (tableForm) {
			id = id + '-' + row
		}
		return (
			<Field id={id} label={label} classes={classes} required={required} readonly={readonly}
			       showFeedback={showFeedback} fieldStatus={this._getFieldStatus()}
			       fieldMessages={this._getFieldMessages()} tableForm={tableForm}>
				<SelectControl ref={el => this.control = el} id={id} placeholder={placeholder} label={label}
				               value={value} readonly={readonly} onChange={this.onChange} onBlur={this._onBlur}
				               onSubmit={form._onSubmit} load={load} formatItem={formatItem}
				               formControl {...otherProps}>
					{children}
				</SelectControl>
			</Field>
		)
	},

	focus() {
		const {control} = this
		if (control) {
			control.focus()
		} else {
			console.error('No control on the field.',
				'Have you reset form\'s fields and forgot to call form.resetFields()?')
		}
	},

	onChange(value) {
		this._setChanging()
		const {id, row} = this.props
		const {form} = this.context
		if (form) {
			form._onChange(id, value, row)
		}
	},

	initWidgetValue(value, prevValue) {
		const {control} = this
		if (control) {
			control.initWidgetValue(value, prevValue)
		} else {
			console.error('No control on the field.',
				'Have you reset form\'s fields and forgot to call form.resetFields()?')
		}
	},

})

SelectField.contextTypes = {
	form: React.PropTypes.object
}

SelectField.propTypes = {
	id: React.PropTypes.string.isRequired,
	label: React.PropTypes.string.isRequired,
	placeholder: React.PropTypes.string,
	classes: React.PropTypes.string.isRequired,
	readonly: React.PropTypes.bool,
	row: React.PropTypes.number,
	load: function (props, propName, componentName) {
		if (!props.readonly && (typeof props[propName] !== 'function')) {
			return new Error(`Required prop '${propName}' was not specified in non-read-only '${componentName}'.`)
		}
	},
	formatItem: React.PropTypes.func.isRequired,
}

export default SelectField
