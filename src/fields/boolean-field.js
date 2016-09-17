import React from 'react'
import Field from './field'
import BooleanControl from '../controls/boolean-control'
import FieldMixin from './field-mixin'

const BooleanField = React.createClass({

	mixins: [FieldMixin],

	render() {
		let {id, label, classes, required, readonly, placeholder, row, ...otherProps} = this.props
		const {showFeedback} = this.state
		const {form: {tableForm}} = this.context
		const value = this._getValue()
		if (tableForm) {
			id = id + '-' + row
		}
		return (
			<Field id={id} label={label} classes={classes} required={required} readonly={readonly}
			       showFeedback={showFeedback} fieldStatus={this._getFieldStatus()} feedback={this._getFeedback()}
			       fieldMessages={this._getFieldMessages()} tableForm={tableForm} checkbox>
				<BooleanControl ref="control" id={id} placeholder={placeholder} label={label} value={value}
				                readonly={readonly} onChange={this.onChange} onBlur={this._onBlur}
				                formControl {...otherProps}/>
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

BooleanField.contextTypes = {
	form: React.PropTypes.object
}

export default BooleanField
