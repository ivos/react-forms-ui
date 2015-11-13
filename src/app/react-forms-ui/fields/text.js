import React from 'react';
import ReactDOM from 'react-dom';
import Label from '../label/label';
import Messages from '../messages/messages';
import FieldMixin from './field-mixin';

export default React.createClass({

	mixins: [FieldMixin],

	render() {
		var {id, label, classes, required, readonly, form, placeholder, children, ...otherProps} = this.props;
		var value = (form && form.state.values) ? form.state.values[id] : null;
		classes = classes ? classes.split(',') : [];
		var formGroupClassName = 'form-group ' + this.getFieldStatus();
		return (
			<div className={formGroupClassName}>
				<Label htmlFor={id} className={classes[0]} required={required ? 'required' : false}>{label}</Label>

				<div className={classes[1]}>
					{!readonly &&
					<input ref="input" id={id} name={id} type="text" className="form-control field"
					       autoComplete="off" placeholder={placeholder || label} value={value} {...otherProps}
					       onChange={this._onChange} onBlur={this._onBlur}/>
					}
					{this.props.children}
					{!readonly && this.getFeedback()}
					{readonly && <p className="form-control-static">{value}</p>}
				</div>
				{!readonly &&
				<Messages ref="messages" id={id} fieldMessages={this.getFieldMessages()}
				          showFeedback={this.state.showFeedback} className={classes[2]}/>
				}
			</div>
		);
	},

	focus() {
		ReactDOM.findDOMNode(this.refs.input).focus();
	},

	_onChange() {
		this.setState({showFeedback: 'positive'});
		var {id, form} = this.props;
		if (form) {
			var value = this.refs.input.value;
			form._onChange(id, value);
		}
	}

});
