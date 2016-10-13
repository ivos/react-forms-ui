import React from 'react'
import ReactDOM from 'react-dom'
import ControlMixin from './control-mixin'

export default React.createClass({

	mixins: [ControlMixin],

	render() {
		var {
			id, readonly, placeholder, label, value, className = '', formControl, rows = 3,
			onChange, onBlur, children, ...otherProps
		} = this.props
		if (readonly) {
			const displayValue = value ? value.split('\n').map((line, index) => <div key={index}>{line}</div>) : value
			if (formControl) {
				return <div className={className + ' form-control-static'} {...otherProps}>
					{displayValue}
				</div>
			}
			return <span className={className} {...otherProps}>
				{displayValue}
			</span>
		}
		return (
			<span>
				<textarea ref="input" id={id} name={id} className={className + ' form-control'} rows={rows}
				          placeholder={placeholder || label} value={value || ''} {...otherProps}
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
