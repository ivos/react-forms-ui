import React from 'react'

export default React.createClass({

	render() {
		let {className, ...otherProps} = this.props
		className = className || 'form-horizontal'
		return (
			<form className={className} action="#" role="form" {...otherProps}>
				{this.props.children}
			</form>
		)
	},

})
