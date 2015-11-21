import React from 'react';
import ReactDOM from 'react-dom';
import ControlMixin from './control-mixin';
import Options from '../options/options';

export default React.createClass({

	mixins: [ControlMixin],

	render() {
		var {id, readonly, placeholder, label, value, className='', formControl,
			query, initSelection, onChange, onBlur, onSubmit, children, ...otherProps} = this.props;
		if (readonly) {
			return <div ref="readonly" className={className+(formControl?' form-control-static':'')}>{value}</div>;
		}
		return (
			<span>
				<input ref="input" id={id} name={id} type="hidden" className={className+' form-control'}
				       autoComplete="off" placeholder={placeholder || label} value={value} {...otherProps}
				       onChange={this._onChange} onBlur={this._onBlur}/>
				{children}
			</span>
		);
	},

	componentDidMount() {
		var {query, initSelection, onSubmit} = this.props;
		var $element = $(ReactDOM.findDOMNode(this.refs.input));
		$element.select2({
			allowClear: true,
			minimumInputLength: 0,
			query,
			initSelection,
			formatSearching: function () {
				return Options.translate ? Options.translate('select2:searching') : 'Searching...';
			},
			formatNoMatches: function () {
				return Options.translate ? Options.translate('select2:noMatches') : 'No matches found.';
			}
		}).on('change', this._onChange)
			.on('select2-blur', this._onBlur);
		// when select is first field on form, opening form by select immediately submits it
		//if (onSubmit) {
		//	var $container = $element.prev('.select2-container');
		//	$container.on('keyup', function (event) {
		//		if (13 === event.keyCode) {
		//			onSubmit();
		//		}
		//	});
		//}
	},

	initWidgetValue(value, prevValue) {
		var {id, initSelection, readonly} = this.props;
		if (initSelection) {
			if (readonly) {
				var mock$Element = [{id}];
				mock$Element.val = function () {
					return value;
				};
				initSelection(mock$Element, function (data) {
					$(ReactDOM.findDOMNode(this.refs.readonly)).html(data.text);
				}.bind(this));
			} else {
				var $element = $(ReactDOM.findDOMNode(this.refs.input));
				if (value && typeof value === 'object') {
					value = value.id;
				}
				$element.select2('val', value);
			}
		}
	},

	focus() {
		var $element = $(ReactDOM.findDOMNode(this.refs.input));
		$element.select2('focus');
	},

	_onChange(event) {
		var {onChange} = this.props;
		if (onChange) {
			var value = event.val;
			var numericValue = Number(value);
			if (!value) {
				value = null;
			} else if (!isNaN(numericValue)) {
				value = numericValue;
			}
			onChange(value);
		}
	},

	_onBlur(event) {
		var {onBlur} = this.props;
		if (onBlur) {
			onBlur(event);
		}
	}

});
