import React from 'react'
import Field from './field'
import SelectControl from '../controls/select-control'
import FieldMixin from './field-mixin'

const SelectField = React.createClass({

	mixins: [FieldMixin],

	render() {
		let {
			id, label, classes, required, readonly, placeholder, getList, formatItem, row, children, ...otherProps
		} = this.props
		const {showFeedback} = this.state
		const {form, form: {props: {tableForm}}} = this.context
		const value = this._getValue()
		if (tableForm) {
			id = id + '-' + row
		}
		return (
			<Field id={id} label={label} classes={classes} required={required} readonly={readonly}
			       showFeedback={showFeedback} fieldStatus={this._getFieldStatus()}
			       fieldMessages={this._getFieldMessages()} tableForm={tableForm}>
				<SelectControl ref="control" id={id} placeholder={placeholder} label={label} value={value}
				               readonly={readonly} onChange={this.onChange} onBlur={this._onBlur}
				               onSubmit={form._onSubmit} getList={getList} formatItem={formatItem}
				               formControl {...otherProps}>
					{children}
				</SelectControl>
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

SelectField.contextTypes = {
	form: React.PropTypes.object
}

export default SelectField
