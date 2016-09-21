import React from 'react'
import ReactDOM from 'react-dom'
import ControlMixin from './control-mixin'
import Options from '../options/options'
import $ from 'jquery'

export default React.createClass({

	mixins: [ControlMixin],

	render() {
		let {
			id, readonly, placeholder, label, value, className = '', formControl,
			load, formatItem, onChange, onBlur, onSubmit, children, ...otherProps
		} = this.props
		if (readonly) {
			value = (value && formatItem) ? formatItem(value) : ''
			if (formControl) {
				return <div className={className + ' form-control-static'} {...otherProps}>
					{value}
				</div>
			}
			return <span className={className} {...otherProps}>
				{value}
			</span>
		}
		return (
			<span>
				<input ref="input" id={id} name={id} type="hidden" className={className + ' form-control'}
				       autoComplete="off" placeholder={placeholder || label} value={value ? value.id : ''}
				       onChange={this._onChange} onBlur={this._onBlur} {...otherProps}/>
				{children}
			</span>
		)
	},

	componentDidMount() {
		const {onSubmit} = this.props
		const $element = $(ReactDOM.findDOMNode(this.refs.input))
		$element.select2({
			allowClear: true,
			minimumInputLength: 0,
			query: this.query,
			initSelection: this.initSelection,
			formatSearching: function () {
				return Options.translate ? Options.translate('select2:searching') : 'Searching...'
			},
			formatNoMatches: function () {
				return Options.translate ? Options.translate('select2:noMatches') : 'No matches found.'
			}
		}).on('change', this._onChange)
			.on('select2-blur', this._onBlur)
		// when select is first field on form, opening form by select immediately submits it
		//if (onSubmit) {
		//	const $container = $element.prev('.select2-container')
		//	$container.on('keyup', function (event) {
		//		if (13 === event.keyCode) {
		//			onSubmit()
		//		}
		//	})
		//}
	},

	query(query) {
		const {load, formatItem} = this.props
		if (load && formatItem) {
			load(query.term).then(function (list) {
				this._list = list
				const results = list.map(function (item) {
					return {id: item.id, text: formatItem(item)}
				})
				query.callback({results})
			}.bind(this))
		}
	},

	initSelection($element, callback) {
		const {value, formatItem} = this.props
		callback({id: value.id, text: formatItem(value)})
	},

	initWidgetValue(value, prevValue) {
		//if (undefined === prevValue && value) { // only initially
		const {readonly} = this.props
		if (!readonly) {
			const $element = $(ReactDOM.findDOMNode(this.refs.input))
			$element.select2('val', value ? value.id : null)
		}
		//}
	},

	focus() {
		const {input} = this.refs
		if (input) {
			const $element = $(ReactDOM.findDOMNode(this.refs.input))
			$element.select2('focus')
		}
	},

	_onChange(event) {
		const {onChange} = this.props
		if (onChange) {
			const value = event.val
			let item = null
			if (value) {
				item = this._list.find(function (item) {
					return value === '' + item.id
				})
			}
			onChange(item)
		}
	},

	_onBlur(event) {
		const {onBlur} = this.props
		if (onBlur) {
			onBlur(event)
		}
	},

})
