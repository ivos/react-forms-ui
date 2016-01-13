import React from 'react';
import ReactDOM from 'react-dom';
import ControlMixin from './control-mixin';

export default React.createClass({

	mixins: [ControlMixin],

	isoFormat: 'YYYY-MM-DD',
	localFormat: 'l',

	getInitialState() {
		return {localValue: null};
	},

	getLocalValue(value) {
		return value ? moment(value).format(this.localFormat) : null;
	},

	getIsoValue(localValue) {
		var iso = moment(localValue, this.localFormat).format(this.isoFormat);
		if ('Invalid date' === iso) {
			return null;
		}
		return iso;
	},

	getPropDate(date) {
		if (typeof date === 'function') {
			date = date();
		}
		if (typeof date === 'string') {
			date = moment(date);
		}
		return date || false;
	},

	getMinDate() {
		var {minDate} = this.props;
		return this.getPropDate(minDate);
	},

	getMaxDate() {
		var {maxDate} = this.props;
		return this.getPropDate(maxDate);
	},

	render() {
		var {id, readonly, placeholder, label, value, className='', formControl, minDate, maxDate,
			onChange, onBlur, onSubmit, children, ...otherProps} = this.props;
		var localValue = this.state.localValue || this.getLocalValue(value);
		if (readonly) {
			if (formControl) {
				return <div className={className+' form-control-static'} {...otherProps}>
					{localValue}
				</div>;
			}
			return <span className={className} {...otherProps}>
				{localValue}
			</span>;
		}
		return (
			<span>
				<div ref="group" className="input-group _rfu-date">
					<input ref="input" id={id} name={id} type="text" className={className+' form-control datepicker'}
					       autoComplete="off" placeholder={placeholder || label} value={localValue} {...otherProps}
					       onChange={this._onChange} onBlur={this._onBlur}/>
					<span className="input-group-addon"><span className="fa fa-calendar"> </span></span>
				</div>
				{children}
			</span>
		);
	},

	componentDidMount() {
		var {onSubmit} = this.props;
		var minDate = this.getMinDate();
		var maxDate = this.getMaxDate();
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
					} else if (onSubmit) {
						onSubmit();
					}
				}
			},
			minDate,
			maxDate
		}).on('dp.change', this._onWidgetChange).on('dp.show', this._onWidgetShow);
	},

	_onWidgetShow() {
		var minDate = this.getMinDate();
		var maxDate = this.getMaxDate();
		var picker = $(ReactDOM.findDOMNode(this.refs.group)).data("DateTimePicker");
		picker.minDate(minDate);
		picker.maxDate(maxDate);
	},

	initWidgetValue(value, prevValue) {
		if (!this.state.localValue) { // only when not manually editing
			var picker = $(ReactDOM.findDOMNode(this.refs.group)).data("DateTimePicker");
			if (picker) {
				var localValue = this.getLocalValue(value);
				var pickerValue = picker.date();
				if ((!localValue && !pickerValue) ||
					(pickerValue && localValue === pickerValue.format(this.localFormat))) {
					return;
				}
				this._initWidgetValue = true;
				window.setTimeout(function () {
					picker.date(localValue);
				}, 0);
			}
		}
	},

	focus() {
		var {input} = this.refs;
		if (input) {
			var el = ReactDOM.findDOMNode(input);
			el.focus();
			el.select();
		}
	},

	_onWidgetChange(event) {
		if (this._initWidgetValue) {
			this._initWidgetValue = undefined;
			return;
		}
		var {onChange} = this.props;
		if (this.state.localValue) {
			this.setState({localValue: null});
		}
		if (onChange) {
			var value = event.date;
			if (value) {
				var localValue = value.format(this.localFormat);
				localValue = this.coerceLocalValue(localValue);
				value = this.getIsoValue(localValue);
			}
			onChange(value);
		}
	},

	_onChange(event) {
		var {onChange} = this.props;
		var localValue = event.target.value;
		if (this.state.localValue !== localValue) {
			this.setState({localValue});
		}
		if (onChange) {
			localValue = this.coerceLocalValue(localValue);
			var value = this.getIsoValue(localValue);
			onChange(value);
		}
	},

	coerceLocalValue(localValue) {
		var minDate = this.getMinDate();
		var maxDate = this.getMaxDate();
		var result = localValue;
		if (minDate) {
			result = moment.max(moment(result, this.localFormat), minDate).format(this.localFormat);
		}
		if (maxDate) {
			result = moment.min(moment(result, this.localFormat), maxDate).format(this.localFormat);
		}
		return result;
	},

	_onBlur(event) {
		var {onChange, onBlur} = this.props;
		var {localValue} = this.state;
		if (localValue) {
			localValue = this.coerceLocalValue(localValue);
			if (this.state.localValue) {
				this.setState({localValue: null}, function () {
					this.initWidgetValue(this.getIsoValue(localValue));
				});
			}
			if (onChange) {
				var value = this.getIsoValue(localValue);
				onChange(value);
			}
		}
		if (onBlur) {
			onBlur(event);
		}
	}

});
