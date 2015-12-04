import React from 'react';
import Field from './field';
import DateControl from '../controls/date-control';
import Label from '../label/label';
import Messages from '../messages/messages';
import FieldMixin from './field-mixin';
require('./date-range-field.css');

export default React.createClass({

	mixins: [FieldMixin],

	render() {
		var {id, label, classes, required, readonly, form, form: {tableForm}, placeholderFrom, placeholderTo,
			row, children, ...otherProps} = this.props;
		var {showFeedback} = this.state;
		classes = classes ? classes.split(',') : [];
		var formGroupClassName = 'form-group ' + this._getFieldStatus();
		var valueFrom = this._getValue('From');
		var valueTo = this._getValue('To');
		if (tableForm) {
			id = id + '-' + row;
			formGroupClassName += ' table-form-group';
		}
		return (
			<div className={formGroupClassName}>
				{!tableForm &&
				<Label htmlFor={id+'From'} className={classes[0]}
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
						<div className="col-xs-6 date-range-date-wrapper">
							<DateControl ref="controlFrom" id={id+'From'} placeholder={placeholderFrom} label={label}
							             value={valueFrom} readonly={readonly} onChange={this.onChangeFrom}
							             onBlur={this._onBlur} onSubmit={form._onSubmit} formControl {...otherProps}/>
						</div>
						<div className="col-xs-6 date-range-date-wrapper">
							<DateControl ref="controlTo" id={id+'To'} placeholder={placeholderTo} label={label}
							             value={valueTo} readonly={readonly} onChange={this.onChangeTo}
							             onBlur={this._onBlur} onSubmit={form._onSubmit} formControl {...otherProps}/>
						</div>
					</div>
					}
				</div>
				{!readonly &&
				<div className={tableForm ? 'col-xs-12' : classes[2]}>
					<Messages ref="messages" id={id+'From'} fieldMessages={this.getFromMessages()}
					          showFeedback={showFeedback} style={{display: 'inline'}}/>
					<Messages ref="messages" id={id+'To'} fieldMessages={this.getToMessages()}
					          showFeedback={showFeedback} style={{display: 'inline'}}/>
				</div>}
			</div>
		);
	},

	getValueKeys() {
		var {id} = this.props;
		return [id + 'From', id + 'To'];
	},

	focus() {
		this.refs.controlFrom && this.refs.controlFrom.focus();
	},

	focusError() {
		var fromType = this._getMessagesStatusType(this.getFromMessages());
		var toType = this._getMessagesStatusType(this.getToMessages());
		if ('error' === fromType) {
			this.refs.controlFrom.focus();
		} else {
			this.refs.controlTo.focus();
		}
	},

	getFromMessages() {
		var {id, form: {tableForm, state: {messages}}, row} = this.props;
		if (tableForm) {
			return messages[row] ? messages[row][id + 'From'] : null;
		}
		return messages[id + 'From'];
	},

	getToMessages() {
		var {id, form: {tableForm, state: {messages}}, row} = this.props;
		if (tableForm) {
			return messages[row] ? messages[row][id + 'To'] : null;
		}
		return messages[id + 'To'];
	},

	getFieldMessages() {
		var messagesFrom = this.getFromMessages();
		var messagesTo = this.getToMessages();
		var result = [];
		if (messagesFrom) {
			result = result.concat(messagesFrom);
		}
		if (messagesTo) {
			result = result.concat(messagesTo);
		}
		return (messagesFrom || messagesTo) ? result : null;
	},

	getFieldStatusType() {
		var {showFeedback} = this.state;
		var fromType = this._getMessagesStatusType(this.getFromMessages());
		var toType = this._getMessagesStatusType(this.getToMessages());
		if ('error' === fromType || 'error' === toType) {
			return 'error';
		}
		if ('success' === fromType && 'success' === toType) {
			return 'success';
		}
		return '';
	},

	onChangeFrom(value) {
		this._setChanging();
		var {id, form, row} = this.props;
		if (form) {
			form._onChange(id + 'From', value, row);
		}
	},

	onChangeTo(value) {
		this._setChanging();
		var {id, form, row} = this.props;
		if (form) {
			form._onChange(id + 'To', value, row);
		}
	},

	initWidgetValue(value, prevValue, valueKey) {
		var {id} = this.props;
		if (id + 'From' === valueKey && this.refs.controlFrom) {
			this.refs.controlFrom.initWidgetValue(value, prevValue);
		}
		if (id + 'To' === valueKey && this.refs.controlTo) {
			this.refs.controlTo.initWidgetValue(value, prevValue);
		}
	}

});
