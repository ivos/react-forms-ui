import React from 'react'
import Field from './field'
import BooleanControl from '../controls/boolean-control'
import FieldMixin from './field-mixin'

const BooleanField = React.createClass({

	mixins: [FieldMixin],

	render() {
		let {id, label, classes, readonly, placeholder, row, ...otherProps} = this.props
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
			       fieldMessages={this._getFieldMessages()} tableForm={tableForm} checkbox>
				<BooleanControl ref={el => this.control = el} id={id} placeholder={placeholder} label={label}
				                value={value} readonly={readonly} onChange={this.onChange} onBlur={this._onBlur}
				                formControl {...otherProps}/>
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

BooleanField.contextTypes = {
	form: React.PropTypes.object
}

BooleanField.propTypes = {
	id: React.PropTypes.string.isRequired,
	label: React.PropTypes.string.isRequired,
	placeholder: React.PropTypes.string,
	classes: React.PropTypes.string.isRequired,
	readonly: React.PropTypes.bool,
	row: React.PropTypes.number,
}

export default BooleanField
