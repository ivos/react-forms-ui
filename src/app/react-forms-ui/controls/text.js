import React from 'react';
import ReactDOM from 'react-dom';
import ControlMixin from './control-mixin';

export default React.createClass({

	mixins: [ControlMixin],

	render() {
		var {id, readonly, placeholder, label, value, className, onChange, onBlur, children, ...otherProps} = this.props;
		if (readonly) {
			return <p className={className+' form-control-static'}>{value}</p>;
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
	}

});
