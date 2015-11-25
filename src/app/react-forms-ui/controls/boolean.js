import React from 'react';
import ReactDOM from 'react-dom';
import ControlMixin from './control-mixin';

export default React.createClass({

	mixins: [ControlMixin],

	render() {
		var {id, readonly, placeholder, label, value, className='', formControl,
			onChange, onBlur, children, ...otherProps} = this.props;
		return (
			<input ref="input" id={id} name={id} type="checkbox" className={className}
			       autoComplete="off" placeholder={placeholder || label} checked={value}
			       disabled={readonly} {...otherProps} onChange={this._onChange} onBlur={this._onBlur}/>
		);
	},

	focus() {
		ReactDOM.findDOMNode(this.refs.input).focus();
	},

	_onChange() {
		var {onChange} = this.props;
		if (onChange) {
			var value = this.refs.input.checked;
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
