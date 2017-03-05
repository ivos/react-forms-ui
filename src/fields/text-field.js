import React from 'react'
import Field from './field'
import TextControl from '../controls/text-control'
import FieldMixin from './field-mixin'

const TextField = React.createClass({

	mixins: [FieldMixin],

	render() {
		let {id, label, classes, readonly, placeholder, row, children, ...otherProps} = this.props
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
				<TextControl ref={el => this.control = el} id={id} placeholder={placeholder} label={label} value={value}
				             readonly={readonly} onChange={this.onChange} onBlur={this._onBlur}
				             formControl {...otherProps}>
					{children}
				</TextControl>
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

TextField.contextTypes = {
	form: React.PropTypes.object
}

TextField.propTypes = {
	id: React.PropTypes.string.isRequired,
	label: React.PropTypes.string.isRequired,
	placeholder: React.PropTypes.string,
	classes: React.PropTypes.string.isRequired,
	readonly: React.PropTypes.bool,
	row: React.PropTypes.number,
}

export default TextField
