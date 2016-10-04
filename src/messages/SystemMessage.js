import React from "react";
import Message from "./message";

const SystemMessage = React.createClass({

	render() {
		const {message} = this.props
		if (message) {
			const {type, text} = message
			return (
				<div className="_rfu-system-message">
					<Message ref="msg" type={type} text={text} dismissible/>
				</div>
			)
		}
		return <div/>
	},

	restore() {
		const {msg} = this.refs
		if (msg) {
			msg.restore()
		}
	},
})

SystemMessage.propTypes = {
	message: React.PropTypes.object,
}

export default SystemMessage
