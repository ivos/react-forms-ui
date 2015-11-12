import React from 'react';
import ReactDOM from 'react-dom';
import Label from '../label/label';
import Messages from '../messages/messages';
import FieldMixin from './field-mixin';

export default React.createClass({

	isoFormat: 'YYYY-MM-DD',
	localFormat: 'l',

	mixins: [FieldMixin],

	getInitialState (){
		return {localValue: null};
	},

	render() {
		var {id, label, classes, required, readonly, form, placeholder, ...otherProps} = this.props;
		var {localValue} = this.state;
		if (!localValue) {
			var value = (form && form.state.values) ? form.state.values[id] : null;
			localValue = value ? moment(value).format(this.localFormat) : null;
		}
		classes = classes ? classes.split(',') : [];
		var formGroupClassName = 'form-group ' + this.getFieldStatus();
		return (
			<div className={formGroupClassName}>
				<Label htmlFor={id} className={classes[0]} required={required ? 'required' : false}>{label}</Label>

				<div className={classes[1]}>
					{!readonly &&
					<div ref="group" className="input-group date">
						<input ref="input" id={id} name={id} type="text" className="form-control field datepicker"
						       autoComplete="off" placeholder={placeholder || label}
						       value={localValue} {...otherProps} onChange={this._onChange} onBlur={this._onBlur}/>
						<span className="input-group-addon"><span className="fa fa-calendar"></span></span>
					</div>}
					{readonly && <p className="form-control-static">{localValue}</p>}
				</div>
				{!readonly &&
				<Messages ref="messages" id={id} fieldMessages={this.getFieldMessages()}
				          showFeedback={this.state.showFeedback} className={classes[2]}/>
				}
			</div>
		);
	},

	componentDidMount() {
		var {form} = this.props;
		$(ReactDOM.findDOMNode(this.refs.group)).datetimepicker({
			locale: moment.locale(),
			showTodayButton: true,
			showClear: true,
			format: this.localFormat,
			keyBinds: {
				enter: function (element) {
					var open = !!element;
					if (open) {
						this.hide();
					} else if (form) {
						form._onSubmit();
					}
				}
			}
		}).on('dp.change', this._onChange);
	},

	initWidgetValue(value) {
		var picker = $(ReactDOM.findDOMNode(this.refs.group)).data("DateTimePicker");
		if (picker) {
			var localValue = value ? moment(value).format(this.localFormat) : null;
			this._initWidgetValue = true;
			window.setTimeout(function () {
				picker.date(localValue);
			}, 0);
		}
	},

	focus() {
		ReactDOM.findDOMNode(this.refs.input).focus();
	},

	_onChange(event) {
		if (this._initWidgetValue) {
			this._initWidgetValue = undefined;
			return;
		}
		var {id, form} = this.props;
		if (!event.date) { // partial date being entered manually
			this.setState({
				showFeedback: 'positive',
				localValue: event.target.value
			});
			if (form) {
				form._onChange(id, null);
			}
		}
		else { // full valid date selected or entered
			this.setState({
				showFeedback: 'positive',
				localValue: null
			});
			if (form) {
				var value = event.date.format(this.isoFormat);
				form._onChange(id, value);
			}
		}
	},

	onBlur(event) {
		var {localValue} = this.state;
		if (localValue) {
			var {id, form} = this.props;
			localValue = event.target.value;
			this.setState({
				localValue
			});
			if (form) {
				var value = moment(localValue, this.localFormat).format(this.isoFormat);
				form._onChange(id, value);
			}
		}
	}

});
