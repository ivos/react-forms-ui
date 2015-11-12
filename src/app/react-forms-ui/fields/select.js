import React from 'react';
import ReactDOM from 'react-dom';
import Label from '../label/label';
import Messages from '../messages/messages';
import FieldMixin from './field-mixin';

export default React.createClass({

	mixins: [FieldMixin],

	getInitialState() {
		return {data: []};
	},

	render() {
		var {id, label, classes, required, readonly, form, placeholder, loadData, ...otherProps} = this.props;
		var value = (form && form.state.values) ? form.state.values[id] : null;
		var {data} = this.state;
		classes = classes ? classes.split(',') : [];
		var formGroupClassName = 'form-group ' + this.getFieldStatus();
		return (
			<div className={formGroupClassName}>
				<Label htmlFor={id} className={classes[0]} required={required ? 'required' : false}>{label}</Label>

				<div className={classes[1]}>
					{!readonly &&
					<select ref="select" id={id} name={id} className="form-control field"
					        placeholder={placeholder || label} value={value} {...otherProps}>
						{data.map(function (option) {
							return <option key={id + '.' + option.id} value={option.id}>{option.text}</option>
						})}
					</select>
					}
					{readonly && <p className="form-control-static">{
						data.map(function (option) {
							if (value === option.id) {
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
		var {loadData} = this.props;
		loadData(null, this.setData);
	},

	_initSelect2() {
		var {label, placeholder} = this.props;
		var $element = $(React.findDOMNode(this.refs.select));
		$element.select2({
			theme: 'bootstrap',
			placeholder: placeholder || label,
			allowClear: true,
			//minimumInputLength: 0,
		}).on('change', this._onChange)
			.on('blur', this._onBlur);
		//.select2('readonly', typeof readonly !== 'undefined');
	},

	setData(data) {
		this.setState({data}, this.refreshSelect2);
	},

	refreshSelect2() {
		var $element = $(React.findDOMNode(this.refs.select));
		$element.trigger('change');
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
			var $element = $(React.findDOMNode(this.refs.select));
			var value = $element.val();
			form._onChange(id, value);
		}
	}

});
