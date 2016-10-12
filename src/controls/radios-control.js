import React from 'react'
import ReactDOM from 'react-dom'
import ControlMixin from './control-mixin'

export default React.createClass({

	mixins: [ControlMixin],

	render() {
		const {
			id, readonly, value, className = '', formControl,
			data, onChange, onBlur, children, ...otherProps
		} = this.props
		if (readonly) {
			if (formControl) {
				return <div className={className + ' form-control-static'} {...otherProps}>
					{data[value]}
				</div>
			}
			return <span className={className} {...otherProps}>
				{data[value]}
			</span>
		}
		return (
			<div>
				{Object.keys(data).map((key, index) => (
					<div key={id + '-' + key} className="radio">
						<label>
							<input ref={'radio' + index} type="radio" name={id} id={id + '-' + key} value={key}
							       className={className} checked={key === value} {...otherProps}
							       onChange={this._onChange} onBlur={this._onBlur}/>
							{data[key]}
						</label>
					</div>
				))}
				{children}
			</div>
		)
	},

	focus() {
		const {radio0} = this.refs
		if (radio0) {
			const el = ReactDOM.findDOMNode(radio0)
			el.focus()
		}
	},

	_onChange(event) {
		const {onChange} = this.props
		if (onChange) {
			var split = event.target.id.split('-');
			const value = split[split.length - 1]
			onChange(value)
		}
	},

	_onBlur(event) {
		const {onBlur} = this.props
		if (onBlur) {
			onBlur(event)
		}
	},
})
