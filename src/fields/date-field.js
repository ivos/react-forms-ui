import React from 'react'
import Field from './field'
import DateControl from '../controls/date-control'
import FieldMixin from './field-mixin'

const DateField = React.createClass({

	mixins: [FieldMixin],

	render() {
		let {id, label, classes, required, readonly, placeholder, min, max, row, children, ...otherProps} = this.props
		const {showFeedback} = this.state
		const {form, form: {tableForm}} = this.context
		const value = this._getValue()
		if (tableForm) {
			id = id + '-' + row
		}
		return (
			<Field id={id} label={label} classes={classes} required={required} readonly={readonly}
			       showFeedback={showFeedback} fieldStatus={this._getFieldStatus() + ' _rfu-no-feedback-icon'}
			       fieldMessages={this._getFieldMessages()} tableForm={tableForm}>
				<DateControl ref="control" id={id} placeholder={placeholder} label={label} value={value}
				             min={min} max={max} readonly={readonly} onChange={this.onChange} onBlur={this._onBlur}
				             onSubmit={form._onSubmit} formControl {...otherProps}>
					{children}
				</DateControl>
			</Field>
		)
	},

	focus() {
		this.refs.control.focus()
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
		this.refs.control.initWidgetValue(value, prevValue)
	},

})

DateField.contextTypes = {
	form: React.PropTypes.object
}

export default DateField
