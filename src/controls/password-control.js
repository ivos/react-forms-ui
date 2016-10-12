import React from 'react'
import ReactDOM from 'react-dom'
import ControlMixin from './control-mixin'

export default React.createClass({

	mixins: [ControlMixin],

	render() {
		var {
			id, readonly, placeholder, label, value, className = '', formControl,
			onChange, onBlur, children, ...otherProps
		} = this.props
		if (readonly) {
			value = value ? '********' : ''
			if (formControl) {
				return <div className={className + ' form-control-static'} {...otherProps}>
					{value}
				</div>
			}
			return <span className={className} {...otherProps}>
				{value}
			</span>
		}
		return (
			<span>
				<input ref="input" id={id} name={id} type="password" className={className + ' form-control'}
				       autoComplete="off" placeholder={placeholder || label} value={value || ''} {...otherProps}
				       onChange={this._onChange} onBlur={this._onBlur}/>
				{children}
			</span>
		)
	},

	focus() {
		var {input} = this.refs
		if (input) {
			var el = ReactDOM.findDOMNode(input)
			el.focus()
			el.select()
		}
	},

	_onChange() {
		var {onChange} = this.props
		if (onChange) {
			var value = this.refs.input.value
			onChange(value)
		}
	},

	_onBlur(event) {
		var {onBlur} = this.props
		if (onBlur) {
			onBlur(event)
		}
	},

})
