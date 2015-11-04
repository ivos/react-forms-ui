import React from 'react';
import Label from '../label/label';
import Messages from '../messages/messages';
import FieldMixin from './field-mixin';

export default React.createClass({

	mixins: [FieldMixin],

	render() {
		var {id, label, classes, required, readonly, form, placeholder, ...otherProps} = this.props;
		var value = form.state.values[id];
		classes = classes ? classes.split(',') : [];
		var formGroupClassName = 'form-group ' + this.getFieldStatus();
		return (
			<div className={formGroupClassName}>
				<Label htmlFor={id} className={classes[0]} required={required ? 'required' : false}>{label}</Label>

				<div className={classes[1]}>
					{!readonly ? (
						<div ref="group" className="input-group date">
							<input ref="input" id={id} name={id} type="text" className="form-control field datepicker"
							       autoComplete="off" placeholder={placeholder || label} value={value} {...otherProps}
							       onChange={this._onChange} onBlur={this._onBlur}/>
							<span className="input-group-addon"><span className="fa fa-calendar"></span></span>
						</div>
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
		$(React.findDOMNode(this.refs.group)).datetimepicker({
			locale: moment.locale(),
			showTodayButton: true,
			format: 'l'
		}).on('dp.change', this._onChange);
	},

	focus() {
		React.findDOMNode(this.refs.input).focus();
	},

	_onChange(event) {
		this.setState({showFeedback: 'positive'});
		var {id, form} = this.props;
		var value = (event.date ? event.date.format('l') : event.target.value) || null;
		form._onChange(id, value);
	}

});
