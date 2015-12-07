import React from 'react';
import ReactDOM from 'react-dom';
import ControlMixin from './control-mixin';
import numeral from 'numeral';

export default React.createClass({

	mixins: [ControlMixin],

	defaultFormat: '0,0.[00]',

	getInitialState() {
		return {localValue: null};
	},

	render() {
		var {id, readonly, placeholder, label, value, className='', formControl,
			onChange, onBlur, format = this.defaultFormat, children, ...otherProps} = this.props;
		var localValue = this.state.localValue || (null != value ? numeral(value).format(format) : '');
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
				<input ref="input" id={id} name={id} type="text" className={className+' form-control text-right'}
				       autoComplete="off" placeholder={placeholder || label} value={localValue} {...otherProps}
				       onChange={this._onChange} onBlur={this._onBlur}/>
				{children}
			</span>
		);
	},

	focus() {
		var {input} = this.refs;
		if (input) {
			ReactDOM.findDOMNode(input).focus();
		}
	},

	_onChange() {
		var {onChange} = this.props;
		if (onChange) {
			var value = this.refs.input.value;
			this.setState({localValue: value});
			value = value ? this.parseValue(value) : null;
			onChange(value);
		}
	},

	parseValue(value) {
		var {format = this.defaultFormat} = this.props;
		var number = numeral().unformat(value);
		var reformatted = numeral(number).format(format);
		number = numeral().unformat(reformatted);
		return number;
	},

	_onBlur(event) {
		var {onBlur} = this.props;
		this.setState({localValue: null});
		if (onBlur) {
			onBlur(event);
		}
	}

});
