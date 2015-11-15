import React from 'react';
import ReactDOM from 'react-dom';
import {emptyToNull} from '../ui/utils';
import {FormMixin, Panel, Form, SelectField, FormMessages} from '../react-forms-ui/index';
import {ButtonSave} from '../ui/buttons';
import {getList, getOne} from '../store';
import i18n from '../i18n';
var t = i18n.t.bind(i18n);

export default React.createClass({

	mixins: [FormMixin],

	validations: {
		selectFree: {},
		selectRequired: {
			required: true
		},
		selectValue: {},
		selectValueRequired: {
			required: true
		},
		selectValPreloaded: {},
		selectGroup: {
			required: true
		},
		selectProduct: {}
	},

	getInitialState: function () {
		return {
			values: {}
		};
	},

	render() {
		var {values} = this.state;
		var groupEmpty = (!values.selectGroup && 0 !== values.selectGroup);
		var fieldClasses = 'col-sm-2,col-sm-6,col-sm-4';
		var buttonsClass = 'col-sm-offset-2 col-sm-10';
		return (
			<Form onSubmit={this._onSubmit}>
				<Panel content="panel-body" title={t('home.select.title')}>
					<SelectField form={this} ref="selectFree" id="selectFree" label={t('home.select.selectFree')}
					             classes={fieldClasses} query={this.loadCompanies}/>
					<SelectField form={this} ref="selectRequired" id="selectRequired"
					             label={t('home.select.selectRequired')} classes={fieldClasses}
					             query={this.loadCompanies} required/>
					<SelectField form={this} ref="selectValue" id="selectValue" label={t('home.select.selectValue')}
					             classes={fieldClasses} query={this.loadCompanies}
					             initSelection={this.initSelectionCompany}/>
					<SelectField form={this} ref="selectValueRequired" id="selectValueRequired"
					             label={t('home.select.selectValueRequired')} classes={fieldClasses}
					             query={this.loadCompanies} initSelection={this.initSelectionCompany} required/>
					<SelectField form={this} ref="selectReadonly" id="selectReadonly"
					             label={t('home.select.selectReadonly')} classes={fieldClasses}
					             query={this.loadCompanies} initSelection={this.initSelectionCompany} readonly/>
					<SelectField form={this} ref="selectReadonlyEmpty" id="selectReadonlyEmpty"
					             label={t('home.select.selectReadonlyEmpty')} classes={fieldClasses}
					             query={this.loadCompanies} readonly/>
					<SelectField form={this} ref="selectValPreloaded" id="selectValPreloaded"
					             label={t('home.select.selectValPreloaded')} classes={fieldClasses}
					             query={this.loadCompanies} initSelection={this.initSelectionCompany}/>
					<SelectField form={this} ref="selectGroup" id="selectGroup" label={t('home.select.selectGroup')}
					             classes={fieldClasses} query={this.loadGroups} initSelection={this.initSelectionGroup}
					             required/>
					<SelectField form={this} ref="selectProduct" id="selectProduct"
					             label={t('home.select.selectProduct')} classes={fieldClasses} query={this.loadProducts}
					             initSelection={this.initSelectionProduct} disabled={groupEmpty}/>

					<div className="form-group">
						<div className={buttonsClass}>
							<ButtonSave />
						</div>
					</div>

					<FormMessages form={this} ref="_form" className={buttonsClass}/>

					{t('home.sent')}
					<pre ref="output"/>
				</Panel>
			</Form>
		);
	},

	componentDidMount() {
		this._selectPreloaded = {
			selectValPreloaded: {id: 2, name: 'First sales'}
		};
		this.setState({
			values: {
				selectValue: 1,
				selectValueRequired: 2,
				selectReadonly: 0,
				selectReadonlyEmpty: null,
				selectValPreloaded: 2,
				selectGroup: 0,
				selectProduct: 0
			}
		});
	},

	loadCompanies(query) {
		getList('companies', {
			data: {name: query.term},
			success: function (data) {
				var formatted = data.map(function (item) {
					return {id: item.id, text: item.name};
				});
				query.callback({results: formatted});
			}
		});
	},

	initSelectionCompany($element, callback) {
		var preloaded = this._selectPreloaded[$element[0].id];
		if (preloaded && String(preloaded.id) === $element.val()) {
			callback({id: preloaded.id, text: preloaded.name});
		} else {
			var value = $element.val();
			value && getOne('companies', value, {
				success(data) {
					callback({id: data.id, text: data.name});
				}
			});
		}
	},

	loadGroups(query) {
		getList('groups', {
			data: {name: query.term},
			success: function (data) {
				var formatted = data.map(function (item) {
					return {id: item.id, text: item.name};
				});
				query.callback({results: formatted});
			}
		});
	},

	initSelectionGroup($element, callback) {
		var value = $element.val();
		value && getOne('groups', $element.val(), {
			success(data) {
				callback({id: data.id, text: data.name});
			}
		});
	},

	loadProducts(query) {
		var {values} = this.state;
		var group = values.selectGroup;
		getList('products', {
			data: {group, name: query.term},
			success: function (data) {
				var formatted = data.map(function (item) {
					return {id: item.id, text: item.name};
				});
				query.callback({results: formatted});
			}
		});
	},

	initSelectionProduct($element, callback) {
		var value = $element.val();
		value && getOne('products', $element.val(), {
			success(data) {
				callback({id: data.id, text: data.name});
			}
		});
	},

	componentDidUpdate(prevProps, prevState) {
		var {values} = this.state;
		var group = values.selectGroup;
		var prevGroup = prevState.values.selectGroup;
		if (prevGroup !== undefined && group !== prevGroup) {
			//TODO
			this.refs.selectProduct.initWidgetValue(null);
			values = Object.assign(values, {
				selectProduct: null
			});
			this.setState({values});
		}
	},

	onSubmit() {
		var {values} = this.state;
		$(ReactDOM.findDOMNode(this.refs.output)).html(JSON.stringify(values, emptyToNull, 2));
		console.log(values);
	}

});
