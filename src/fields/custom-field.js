import React from 'react'
import Label from '../label/label'
import Messages from '../messages/messages'
import FieldMixin from './field-mixin'

const CustomField = React.createClass({

	mixins: [FieldMixin],

	render() {
		const {id, label, required, readonly} = this.props
		let {classes} = this.props
		classes = classes ? classes.split(',') : []
		return (
			<div className="form-group">
				<Label htmlFor={id} className={classes[0]} required={required ? 'required' : false}>{label}</Label>

				<div className={classes[1]}>
					{readonly && <div className="form-control-static">{this.props.children}</div>}
					{!readonly && this.props.children}
				</div>
				{!readonly &&
				<Messages ref="messages" id={id} fieldMessages={this._getFieldMessages()}
				          showFeedback={this.state.showFeedback} className={classes[2]}/>
				}
			</div>
		)
	},

})

CustomField.contextTypes = {
	form: React.PropTypes.object
}

CustomField.propTypes = {
	id: React.PropTypes.string.isRequired,
	label: React.PropTypes.string.isRequired,
	required: React.PropTypes.bool,
	readonly: React.PropTypes.bool,
}

export default CustomField
