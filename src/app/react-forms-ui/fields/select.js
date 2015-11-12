import React from 'react';
import ReactDOM from 'react-dom';
import Label from '../label/label';
import Messages from '../messages/messages';
import FieldMixin from './field-mixin';

export default React.createClass({

	mixins: [FieldMixin],

	render() {
		var {id, label, classes, required, readonly, form, placeholder, query, initSelection, ...otherProps} = this.props;
		var value = (form && form.state.values) ? form.state.values[id] : null;
		classes = classes ? classes.split(',') : [];
		var formGroupClassName = 'form-group ' + this.getFieldStatus();
		return (
			<div className={formGroupClassName}>
				<Label htmlFor={id} className={classes[0]} required={required ? 'required' : false}>{label}</Label>

				<div className={classes[1]}>
					<input ref="input" id={id} name={id} type="hidden" className="form-control field"
					       autoComplete="off" placeholder={placeholder || label} value={value} {...otherProps}/>
				</div>
				{!readonly &&
				<Messages ref="messages" id={id} fieldMessages={this.getFieldMessages()}
				          showFeedback={this.state.showFeedback} className={classes[2]}/>
				}
			</div>
		);
	},

	componentDidMount() {
		var {query, initSelection, readonly, form} = this.props;
		var $element = $(ReactDOM.findDOMNode(this.refs.input));
		$element.select2({
			allowClear: true,
			minimumInputLength: 0,
			query,
			initSelection
		}).on('change', this._onChange)
			.on('select2-blur', this._onBlur)
			.select2('readonly', typeof readonly !== 'undefined');
		// when select is first field on form, opening form by select immediately submits it
		//if (form) {
		//	var $container = $element.prev('.select2-container');
		//	$container.on('keyup', function (event) {
		//		if (13 === event.keyCode) {
		//			form._onSubmit();
		//		}
		//	});
		//}
	},

	initWidgetValue(value) {
		var {initSelection} = this.props;
		if (initSelection) {
			var $element = $(ReactDOM.findDOMNode(this.refs.input));
			if (value && typeof value === 'object') {
				value = value.id;
			}
			$element.select2('val', value);
		}
	},

	focus() {
		var $element = $(ReactDOM.findDOMNode(this.refs.input));
		$element.select2('focus');
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
