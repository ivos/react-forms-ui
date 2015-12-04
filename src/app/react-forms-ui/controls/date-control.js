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

	render() {
		var {id, readonly, placeholder, label, value, className='', formControl,
			onChange, onBlur, onSubmit, children, ...otherProps} = this.props;
		var localValue = this.state.localValue || this.getLocalValue(value);
		if (readonly) {
			return <div className={className+(formControl?' form-control-static':'')} {...otherProps}>
				{localValue}
			</div>;
		}
		return (
			<span>
				<div ref="group" className="input-group date">
					<input ref="input" id={id} name={id} type="text" className={className+' form-control datepicker'}
					       autoComplete="off" placeholder={placeholder || label} value={localValue} {...otherProps}
					       onChange={this._onChange} onBlur={this._onBlur}/>
					<span className="input-group-addon"><span className="fa fa-calendar"></span></span>
				</div>
				{children}
			</span>
		);
	},

	componentDidMount() {
		var {onSubmit} = this.props;
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
			}
		}).on('dp.change', this._onChange);
	},

	initWidgetValue(value, prevValue) {
		if (undefined === prevValue && value) { // only initially
			var picker = $(ReactDOM.findDOMNode(this.refs.group)).data("DateTimePicker");
			if (picker) {
				var localValue = this.getLocalValue(value);
				this._initWidgetValue = true;
				window.setTimeout(function () {
					picker.date(localValue);
				}, 0);
			}
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
		var {onChange} = this.props;
		if (!event.date) { // partial date being entered manually
			this.setState({localValue: event.target.value});
			if (onChange) {
				onChange(null);
			}
		}
		else { // full valid date selected or entered
			this.setState({localValue: null});
			if (onChange) {
				var value = event.date.format(this.isoFormat);
				onChange(value);
			}
		}
	},

	_onBlur(event) {
		var {onChange, onBlur} = this.props;
		var {localValue} = this.state;
		if (localValue) {
			localValue = event.target.value;
			this.setState({
				localValue
			});
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
