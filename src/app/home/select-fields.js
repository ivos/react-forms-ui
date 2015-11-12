import React from 'react';
import ReactDOM from 'react-dom';
import {emptyToNull} from '../ui/utils';
import {FormMixin, Panel, Form, Select, FormMessages} from '../react-forms-ui/index';
import {ButtonSave} from '../ui/buttons';
import {getList, getOne} from '../store';
import i18n from '../i18n';
var t = i18n.t.bind(i18n);
import Select2 from 'react-select';

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
		selectValPreloaded: {}
	},

	getInitialState: function () {
		return {
			fields: ['selectFree', 'selectRequired', 'selectValue', 'selectValueRequired',
				'selectReadonly', 'selectReadonlyEmpty', 'selectValPreloaded']
		};
	},

	render() {
		var fieldClasses = 'col-sm-2,col-sm-6,col-sm-4';
		var buttonsClass = 'col-sm-offset-2 col-sm-10';
		return (
			<Form onSubmit={this._onSubmit}>
				<Panel content="panel-body" title={t('home.select.title')}>
					<Select2 name="form-field-name" value="one" options={[{value:'one',label:'One'},{value:'two',label:'Two'}]}/>

					<Select form={this} ref="selectFree" id="selectFree" label={t('home.select.selectFree')}
					        classes={fieldClasses} loadData={this.loadCompanies}/>
					<Select form={this} ref="selectRequired" id="selectRequired" label={t('home.select.selectRequired')}
					        classes={fieldClasses} loadData={this.loadCompanies} required/>
					<Select form={this} ref="selectValue" id="selectValue" label={t('home.select.selectValue')}
					        classes={fieldClasses} loadData={this.loadCompanies}/>
					<Select form={this} ref="selectValueRequired" id="selectValueRequired"
					        label={t('home.select.selectValueRequired')} classes={fieldClasses}
					        loadData={this.loadCompanies} required/>
					<Select form={this} ref="selectReadonly" id="selectReadonly" label={t('home.select.selectReadonly')}
					        classes={fieldClasses} loadData={this.loadCompanies} readonly/>
					<Select form={this} ref="selectReadonlyEmpty" id="selectReadonlyEmpty"
					        label={t('home.select.selectReadonlyEmpty')} classes={fieldClasses}
					        loadData={this.loadCompanies} readonly/>
					<Select form={this} ref="selectValPreloaded" id="selectValPreloaded"
					        label={t('home.select.selectValPreloaded')} classes={fieldClasses}
					        loadData={this.loadCompanies}/>

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
				selectValue: '1',
				selectValueRequired: '2',
				selectReadonly: '0',
				selectReadonlyEmpty: null,
				selectValPreloaded: 2
			}
		});
	},

	loadCompanies(query, callback) {
		getList('companies', {
			data: {name: query},
			success: function (data) {
				var formatted = data.map(function (item) {
					return {value: item.id, label: item.name};
				});
				callback(formatted);
			}
		});
	},

	//initSelectionCompany($element, callback) {
	//	var preloaded = this._selectPreloaded[$element[0].id];
	//	if (preloaded) {
	//		callback({id: preloaded.id, text: preloaded.name});
	//	} else {
	//		getOne('companies', $element.val(), {
	//			success(data) {
	//				callback({id: data.id, text: data.name});
	//			}
	//		});
	//	}
	//},

	onSubmit() {
		var {values} = this.state;
		$(ReactDOM.findDOMNode(this.refs.output)).html(JSON.stringify(values, emptyToNull, 2));
		console.log(values);
	}

});
