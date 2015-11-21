import React from 'react';
import Field from './field';
import Date from '../controls/date';
import Label from '../label/label';
import Messages from '../messages/messages';
import FieldMixin from './field-mixin';

export default React.createClass({

	mixins: [FieldMixin],

	render() {
		var {id, label, classes, required, readonly, form,
			placeholderFrom, placeholderTo, children, ...otherProps} = this.props;
		var {showFeedback} = this.state;
		classes = classes ? classes.split(',') : [];
		return (
			<div className={'form-group '+this._getFieldStatus()}>
				<Label htmlFor={id+'From'} className={classes[0]}
				       required={required ? 'required' : false}>{label}</Label>

				<div className={classes[1]}>
					{readonly &&
					<p className="form-control-static">
						{Date.prototype.getLocalValue(this._getValue('From'))}
						{(this._getValue('From') || this._getValue('To')) && ' – '}
						{Date.prototype.getLocalValue(this._getValue('To'))}
					</p>
					}
					{!readonly &&
					<div className="row">
						<div className={'col-xs-6'}>
							<Date ref="controlFrom" id={id+'From'} placeholder={placeholderFrom} label={label}
							      value={this._getValue('From')} readonly={readonly} onChange={this.onChangeFrom}
							      onBlur={this._onBlur} onSubmit={form._onSubmit} {...otherProps}/>
						</div>
						<div className={'col-xs-6'}>
							<Date ref="controlTo" id={id+'To'} placeholder={placeholderTo} label={label}
							      value={this._getValue('To')} readonly={readonly} onChange={this.onChangeTo}
							      onBlur={this._onBlur} onSubmit={form._onSubmit} {...otherProps}/>
						</div>
					</div>
					}
				</div>
				{!readonly &&
				<div className={classes[2]}>
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
		var {id, form: {state: {messages}}} = this.props;
		return messages[id + 'From'];
	},

	getToMessages() {
		var {id, form: {state: {messages}}} = this.props;
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
		var {id, form} = this.props;
		if (form) {
			form._onChange(id + 'From', value);
		}
	},

	onChangeTo(value) {
		this._setChanging();
		var {id, form} = this.props;
		if (form) {
			form._onChange(id + 'To', value);
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
