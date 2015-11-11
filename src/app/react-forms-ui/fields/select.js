import React from 'react';
import ReactDOM from 'react-dom';
import Label from '../label/label';
import Messages from '../messages/messages';
import FieldMixin from './field-mixin';

export default React.createClass({

	mixins: [FieldMixin],

	render() {
		var {id, label, classes, required, readonly, form, placeholder, options, ...otherProps} = this.props;
		var value = (form && form.state.values) ? form.state.values[id] : null;
		classes = classes ? classes.split(',') : [];
		var formGroupClassName = 'form-group ' + this.getFieldStatus();
		return (
			<div className={formGroupClassName}>
				<Label htmlFor={id} className={classes[0]} required={required ? 'required' : false}>{label}</Label>

				<div className={classes[1]}>
					{!readonly &&
					<select ref="select" id={id} name={id} className="form-control field"
					        placeholder={placeholder || label} {...otherProps}>
						{options && options.map(function (option) {
							<option value={option.id}>{option.text}</option>
						})}
					</select>
					}
					{readonly && <p className="form-control-static">{
						options && options.map(function (option) {
							if ('selected' === option.selected) {
								return option.text;
							}
						})
					}</p>}
				</div>
				{!readonly &&
				<Messages ref="messages" id={id} fieldMessages={this.getFieldMessages()}
				          showFeedback={this.state.showFeedback} className={classes[2]}/>
				}
			</div>
		);
	},

	componentDidMount() {
		this._initSelect2();
	},

	_initSelect2() {
		var $element = $(React.findDOMNode(this.refs.select));
		$element.select2({
			//theme: 'bootstrap',
			allowClear: true,
			//minimumInputLength: 0,
		}).on('change', this._onChange)
			.on('select2-blur', this._onBlur);
			//.select2('readonly', typeof readonly !== 'undefined');
	},

	//initWidgetValue(value) {
	//	var {initSelection} = this.props;
	//	if (initSelection) {
	//		var $element = $(React.findDOMNode(this.refs.input));
	//		if (value && typeof value === 'object') {
	//			value = value.id;
	//		}
	//		$element.select2('val', value);
	//	}
	//},

	focus() {
		var $element = $(React.findDOMNode(this.refs.select));
		$element.focus();
	},

	_onChange(event) {
		this.setState({showFeedback: 'positive'});
		var {id, form} = this.props;
		if (form) {
			var value = event.val;
			form._onChange(id, value);
		}
	}

});
