import React from 'react'
import Label from '../label/label'
import Messages from '../messages/messages'
import FieldMixin from './field-mixin'

const PlainField = React.createClass({

	mixins: [FieldMixin],

	render() {
		const {id, label, required, readonly} = this.props
		let {classes} = this.props
		classes = classes ? classes.split(',') : []
		return (
			<div className="form-group">
				<Label htmlFor={id} className={classes[0]} required={required ? 'required' : false}>{label}</Label>

				<div className={classes[1]}>
					{this.props.children}
				</div>
				{!readonly &&
				<Messages ref="messages" id={id} fieldMessages={this._getFieldMessages()}
				          showFeedback={this.state.showFeedback} className={classes[2]}/>
				}
			</div>
		)
	},

})

export default PlainField
