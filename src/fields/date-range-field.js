import React from 'react'
import DateControl from '../controls/date-control'
import Label from '../label/label'
import Messages from '../messages/messages'
import FieldMixin from './field-mixin'

const DateRangeField = React.createClass({

	mixins: [FieldMixin],

	render() {
		let {
			id, label, classes, readonly, placeholderFrom, placeholderTo, row, children, ...otherProps
		} = this.props
		const {showFeedback} = this.state
		const {form, form: {props: {tableForm, validations}}} = this.context
		classes = classes ? classes.split(',') : []
		let formGroupClassName = 'form-group ' + this._getFieldStatus()
		const valueFrom = this._getValue('From')
		const valueTo = this._getValue('To')
		const required = (validations && (
			(validations[id + 'From'] && validations[id + 'From'].required) ||
			(validations[id + 'To'] && validations[id + 'To'].required)
		))
		if (tableForm) {
			id = id + '-' + row
			formGroupClassName += ' _rfu-table-form-group'
		}
		return (
			<div className={formGroupClassName + ' _rfu-no-feedback-icon'}>
				{!tableForm &&
				<Label htmlFor={id + 'From'} className={classes[0]}
				       required={required ? 'required' : false}>{label}</Label>
				}

				<div className={tableForm ? 'col-xs-12' : classes[1]}>
					{readonly &&
					<div className="form-control-static">
						{DateControl.prototype.getLocalValue(valueFrom)}
						{(valueFrom || valueTo) && ' – '}
						{DateControl.prototype.getLocalValue(valueTo)}
					</div>
					}
					{!readonly &&
					<div className="row">
						<div className="col-xs-6 _rfu-date-range-date-wrapper">
							<DateControl ref={el => this.controlFrom = el} id={id + 'From'}
							             placeholder={placeholderFrom} label={label} value={valueFrom}
							             readonly={readonly} onChange={this.onChangeFrom} onBlur={this._onBlur}
							             onSubmit={form._onSubmit} max={this.getFromMaxDate}
							             formControl {...otherProps}/>
						</div>
						<div className="col-xs-6 _rfu-date-range-date-wrapper">
							<DateControl ref={el => this.controlTo = el} id={id + 'To'} placeholder={placeholderTo}
							             label={label} value={valueTo} readonly={readonly} onChange={this.onChangeTo}
							             onBlur={this._onBlur} onSubmit={form._onSubmit} min={this.getToMinDate}
							             formControl {...otherProps}/>
						</div>
					</div>
					}
				</div>
				{!readonly &&
				<div className={tableForm ? 'col-xs-12' : classes[2]}>
					<Messages ref="messages" id={id + 'From'} fieldMessages={this.getFromMessages()}
					          showFeedback={showFeedback} style={{display: 'inline'}}/>
					<Messages ref="messages" id={id + 'To'} fieldMessages={this.getToMessages()}
					          showFeedback={showFeedback} style={{display: 'inline'}}/>
				</div>}
			</div>
		)
	},

	getToMinDate() {
		return this._getValue('From')
	},

	getFromMaxDate() {
		return this._getValue('To')
	},

	getValueKeys() {
		const {id} = this.props
		return [id + 'From', id + 'To']
	},

	focus() {
		const {controlFrom} = this
		if (controlFrom) {
			controlFrom.focus()
		}
	},

	focusError() {
		const fromType = this._getMessagesStatusType(this.getFromMessages())
		if ('error' === fromType) {
			this.controlFrom.focus()
		} else {
			this.controlTo.focus()
		}
	},

	getFromMessages() {
		const {id, row} = this.props
		const {form: {props: {tableForm, state: {messages}}}} = this.context
		if (messages) {
			if (tableForm) {
				return messages[row] ? messages[row][id + 'From'] : null
			}
			return messages[id + 'From']
		}
	},

	getToMessages() {
		const {id, row} = this.props
		const {form: {props: {tableForm, state: {messages}}}} = this.context
		if (messages) {
			if (tableForm) {
				return messages[row] ? messages[row][id + 'To'] : null
			}
			return messages[id + 'To']
		}
	},

	getFieldMessages() {
		const messagesFrom = this.getFromMessages()
		const messagesTo = this.getToMessages()
		let result = []
		if (messagesFrom) {
			result = result.concat(messagesFrom)
		}
		if (messagesTo) {
			result = result.concat(messagesTo)
		}
		return (messagesFrom || messagesTo) ? result : null
	},

	getFieldStatusType() {
		const fromType = this._getMessagesStatusType(this.getFromMessages())
		const toType = this._getMessagesStatusType(this.getToMessages())
		if ('error' === fromType || 'error' === toType) {
			return 'error'
		}
		if ('success' === fromType && 'success' === toType) {
			return 'success'
		}
		return ''
	},

	onChangeFrom(value) {
		this._setChanging()
		const {id, row} = this.props
		const {form} = this.context
		if (form) {
			form._onChange(id + 'From', value, row)
		}
	},

	onChangeTo(value) {
		this._setChanging()
		const {id, row} = this.props
		const {form} = this.context
		if (form) {
			form._onChange(id + 'To', value, row)
		}
	},

	initWidgetValue(value, prevValue, valueKey) {
		const {id} = this.props
		if (id + 'From' === valueKey && this.controlFrom) {
			this.controlFrom.initWidgetValue(value, prevValue)
		}
		if (id + 'To' === valueKey && this.controlTo) {
			this.controlTo.initWidgetValue(value, prevValue)
		}
	},

})

DateRangeField.contextTypes = {
	form: React.PropTypes.object
}

DateRangeField.propTypes = {
	id: React.PropTypes.string.isRequired,
	label: React.PropTypes.string.isRequired,
	placeholderFrom: React.PropTypes.string,
	placeholderTo: React.PropTypes.string,
	classes: React.PropTypes.string.isRequired,
	readonly: React.PropTypes.bool,
	row: React.PropTypes.number,
}

export default DateRangeField
