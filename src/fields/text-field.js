import React from 'react'
import Field from './field'
import TextControl from '../controls/text-control'
import FieldMixin from './field-mixin'

const TextField = React.createClass({

	mixins: [FieldMixin],

	render() {
		let {id, label, classes, required, readonly, placeholder, row, children, ...otherProps} = this.props
		const {showFeedback} = this.state
		const {form: {props: {tableForm}}} = this.context
		const value = this._getValue()
		if (tableForm) {
			id = id + '-' + row
		}
		return (
			<Field id={id} label={label} classes={classes} required={required} readonly={readonly}
			       showFeedback={showFeedback} fieldStatus={this._getFieldStatus()} feedback={this._getFeedback()}
			       fieldMessages={this._getFieldMessages()} tableForm={tableForm}>
				<TextControl ref="control" id={id} placeholder={placeholder} label={label} value={value}
				             readonly={readonly} onChange={this.onChange} onBlur={this._onBlur}
				             formControl {...otherProps}>
					{children}
				</TextControl>
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

})

TextField.contextTypes = {
	form: React.PropTypes.object
}

export default TextField
