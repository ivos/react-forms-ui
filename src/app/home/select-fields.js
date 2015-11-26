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
					             classes={fieldClasses} getList={this.getListCompanies}
					             formatItem={this.formatItemCompany}/>
					<SelectField form={this} ref="selectRequired" id="selectRequired"
					             label={t('home.select.selectRequired')} classes={fieldClasses}
					             getList={this.getListCompanies}
					             formatItem={this.formatItemCompany} required/>
					<SelectField form={this} ref="selectValue" id="selectValue" label={t('home.select.selectValue')}
					             classes={fieldClasses} getList={this.getListCompanies}
					             formatItem={this.formatItemCompany}/>
					<SelectField form={this} ref="selectValueRequired" id="selectValueRequired"
					             label={t('home.select.selectValueRequired')} classes={fieldClasses}
					             getList={this.getListCompanies} formatItem={this.formatItemCompany} required/>
					<SelectField form={this} ref="selectReadonly" id="selectReadonly"
					             label={t('home.select.selectReadonly')} classes={fieldClasses}
					             formatItem={this.formatItemCompany} readonly/>
					<SelectField form={this} ref="selectReadonlyEmpty" id="selectReadonlyEmpty"
					             label={t('home.select.selectReadonlyEmpty')} classes={fieldClasses}
					             formatItem={this.formatItemCompany} readonly/>
					<SelectField form={this} ref="selectGroup" id="selectGroup" label={t('home.select.selectGroup')}
					             classes={fieldClasses} getList={this.getListGroups}
					             formatItem={this.formatItemGroup} required/>
					<SelectField form={this} ref="selectProduct" id="selectProduct"
					             label={t('home.select.selectProduct')} classes={fieldClasses}
					             getList={this.getListProducts} formatItem={this.formatItemProduct}
					             disabled={groupEmpty}/>

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
		window.setTimeout(function () {
			this.setState({
				values: {
					selectValue: {id: 1, name: 'Acme'},
					selectValueRequired: {id: 2, name: 'First sales'},
					selectReadonly: {id: 3, name: 'Big wig'},
					selectReadonlyEmpty: null,
					selectGroup: {id: 0, name: 'Tea'},
					selectProduct: {id: 0, name: 'Earl grey tea'}
				}
			});
		}.bind(this), 100);
	},

	getListCompanies(query, callback) {
		getList('companies', {
			data: {name: query},
			success: callback
		});
	},

	formatItemCompany(item) {
		return item.name;
	},

	getListGroups(query, callback) {
		getList('groups', {
			data: {name: query},
			success: callback
		});
	},

	formatItemGroup(item) {
		return item.name;
	},

	getListProducts(query, callback) {
		var group = this.state.values.selectGroup.id;
		getList('products', {
			data: {group, name: query},
			success: callback
		});
	},

	formatItemProduct(item) {
		return item.name;
	},

	componentDidUpdate(prevProps, prevState) {
		var {values} = this.state;
		var group = values.selectGroup;
		var prevGroup = prevState.values.selectGroup;
		if (prevGroup !== undefined && group !== prevGroup) {
			//TODO
			this.refs.selectProduct.initWidgetValue(null);
			values = Object.assign({}, values, {
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
