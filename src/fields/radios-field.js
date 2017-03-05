import React from 'react'
import Field from './field'
import RadiosControl from '../controls/radios-control'
import FieldMixin from './field-mixin'

const RadiosField = React.createClass({

	mixins: [FieldMixin],

	render() {
		let {id, label, classes, data, readonly, row, children, ...otherProps} = this.props
		const {showFeedback} = this.state
		const {form: {props: {tableForm, validations}}} = this.context
		const value = this._getValue()
		const required = (validations && validations[id]) ? validations[id].required : false
		if (tableForm) {
			id = id + '-' + row
		}
		return (
			<Field id={id} label={label} classes={classes} required={required} readonly={readonly}
			       showFeedback={showFeedback} fieldStatus={this._getFieldStatus()} feedback={this._getFeedback()}
			       fieldMessages={this._getFieldMessages()} tableForm={tableForm}>
				<RadiosControl ref={el => this.control = el} id={id} value={value} readonly={readonly} data={data}
				               onChange={this.onChange} onBlur={this._onBlur} formControl {...otherProps}>
					{children}
				</RadiosControl>
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
})

RadiosField.contextTypes = {
	form: React.PropTypes.object
}

RadiosField.propTypes = {
	id: React.PropTypes.string.isRequired,
	label: React.PropTypes.string.isRequired,
	classes: React.PropTypes.string.isRequired,
	data: React.PropTypes.object.isRequired,
	readonly: React.PropTypes.bool,
	row: React.PropTypes.number,
}

export default RadiosField
