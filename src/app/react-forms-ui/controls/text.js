import React from 'react';
import ReactDOM from 'react-dom';
import ControlMixin from './control-mixin';

export default React.createClass({

	mixins: [ControlMixin],

	render() {
		var {id, readonly, placeholder, label, value, className='', formControl,
			onChange, onBlur, children, ...otherProps} = this.props;
		if (readonly) {
			return <div className={className+(formControl?' form-control-static':'')}>{value}</div>;
		}
		return (
			<span>
				<input ref="input" id={id} name={id} type="text" className={className+' form-control'}
				       autoComplete="off" placeholder={placeholder || label} value={value} {...otherProps}
				       onChange={this._onChange} onBlur={this._onBlur}/>
				{children}
			</span>
		);
	},

	focus() {
		ReactDOM.findDOMNode(this.refs.input).focus();
	},

	_onChange() {
		var {onChange} = this.props;
		if (onChange) {
			var value = this.refs.input.value;
			onChange(value);
		}
	},

	_onBlur(event) {
		var {onBlur} = this.props;
		if (onBlur) {
			onBlur(event);
		}
	}

});
