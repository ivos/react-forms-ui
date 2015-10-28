import React from 'react';
import Label from '../label/label';
import Messages from '../messages/messages';
import FieldMixin from './field-mixin';

export default React.createClass({

	mixins: [FieldMixin],

	render() {
		var {id, label, classes, required, form, ...otherProps} = this.props;
		var value = form.state.values[id];
		classes = classes ? classes.split(',') : [];
		var formGroupClassName = 'form-group ' + this.getFieldStatus();
		return (
			<div className={formGroupClassName}>
				<Label htmlFor={id} className={classes[0]} required={required ? 'required' : false}>{label}</Label>

				<div className={classes[1]}>
					<input ref="input" id={id} name={id} type="password" className="form-control field"
					       autoComplete="off" placeholder={label} value={value} {...otherProps}
					       onChange={this._onChange} onBlur={this._onBlur}/>
					{this.getFeedback()}
				</div>
				<Messages ref="messages" id={id} fieldMessages={this.getFieldMessages()}
				          showFeedback={this.state.showFeedback} className={classes[2]}/>
			</div>
		);
	},

	focus() {
		React.findDOMNode(this.refs.input).focus();
	},

	_onChange() {
		this.setState({showFeedback: 'positive'});
		var {id, form} = this.props;
		var value = this.refs.input.getDOMNode().value;
		form.onChange(id, value);
	}

});
