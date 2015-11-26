import React from 'react';
import ReactDOM from 'react-dom';
import ControlMixin from './control-mixin';
import Options from '../options/options';

export default React.createClass({

	mixins: [ControlMixin],

	render() {
		var {id, readonly, placeholder, label, value, className='', formControl,
			getList, formatItem, onChange, onBlur, onSubmit, children, ...otherProps} = this.props;
		if (readonly) {
			return <div ref="readonly" className={className+(formControl?' form-control-static':'')} {...otherProps}>
				{(value && formatItem) ? formatItem(value) : ''}
			</div>;
		}
		return (
			<span>
				<input ref="input" id={id} name={id} type="hidden" className={className+' form-control'}
				       autoComplete="off" placeholder={placeholder || label} value={value ? value.id : null}
				       onChange={this._onChange} onBlur={this._onBlur} {...otherProps}/>
				{children}
			</span>
		);
	},

	componentDidMount() {
		var {onSubmit} = this.props;
		var $element = $(ReactDOM.findDOMNode(this.refs.input));
		$element.select2({
			allowClear: true,
			minimumInputLength: 0,
			query: this.query,
			initSelection: this.initSelection,
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

	query(query) {
		var {getList, formatItem} = this.props;
		if (getList && formatItem) {
			getList(query.term, function (list) {
				this._list = list;
				var results = list.map(function (item) {
					return {id: item.id, text: formatItem(item)};
				});
				query.callback({results});
			}.bind(this));
		}
	},

	initSelection($element, callback) {
		var {value, formatItem} = this.props;
		callback({id: value.id, text: formatItem(value)});
	},

	initWidgetValue(value, prevValue) {
		//if (undefined === prevValue && value) { // only initially
		var {readonly} = this.props;
		if (!readonly) {
			var $element = $(ReactDOM.findDOMNode(this.refs.input));
			$element.select2('val', value ? value.id : null);
		}
		//}
	},

	focus() {
		var $element = $(ReactDOM.findDOMNode(this.refs.input));
		$element.select2('focus');
	},

	_onChange(event) {
		var {onChange} = this.props;
		if (onChange) {
			var value = event.val, item = null;
			if (value) {
				item = this._list.find(function (item) {
					return value === '' + item.id;
				});
			}
			onChange(item);
		}
	},

	_onBlur(event) {
		var {onBlur} = this.props;
		if (onBlur) {
			onBlur(event);
		}
	}

});
