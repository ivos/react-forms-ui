import React from 'react';
import Label from '../label/label';
import Messages from '../messages/messages';
import FieldMixin from './field-mixin';

export default React.createClass({

	mixins: [FieldMixin],

	render() {
		var {id, label, classes, required, readonly, form, placeholder, query, ...otherProps} = this.props;
		var value = form.state.values[id];
		classes = classes ? classes.split(',') : [];
		var formGroupClassName = 'form-group ' + this.getFieldStatus();
		return (
			<div className={formGroupClassName}>
				<Label htmlFor={id} className={classes[0]} required={required ? 'required' : false}>{label}</Label>

				<div className={classes[1]}>
					{!readonly ? (
						<input ref="input" id={id} name={id} type="hidden" className="form-control field"
						       autoComplete="off" placeholder={placeholder || label} value={value} {...otherProps}/>
					) : (
						<p className="form-control-static">{value}</p>
					)}
				</div>
				{!readonly && (
					<Messages ref="messages" id={id} fieldMessages={this.getFieldMessages()}
					          showFeedback={this.state.showFeedback} className={classes[2]}/>
				)}
			</div>
		);
	},

	componentDidMount() {
		var {query} = this.props;
		$(React.findDOMNode(this.refs.input)).select2({
			allowClear: true,
			minimumInputLength: 0,
			query
		}).on('change', this._onChange).on('select2-blur', this._onBlur);
	},

	focus() {
		$(React.findDOMNode(this.refs.input)).select2('focus');
	},

	_onChange(event) {
		this.setState({showFeedback: 'positive'});
		var {id, form} = this.props;
		var value = event.val;
		form._onChange(id, value);
	}

});
