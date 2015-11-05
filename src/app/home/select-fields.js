import React from 'react';
import {emptyToNull} from '../ui/utils';
import {FormMixin, Panel, Form, Select, FormMessages} from '../react-forms-ui/index';
import {ButtonSave} from '../ui/buttons';
import {getList} from '../store';
import i18n from '../i18n';
var t = i18n.t.bind(i18n);

export default React.createClass({

	mixins: [FormMixin],

	validations: {
		selectFree: {},
		selectRequired: {
			required: true
		}
	},

	getInitialState: function () {
		return {
			fields: ['selectFree', 'selectRequired'],
			values: {}
		};
	},

	render() {
		var fieldClasses = 'col-sm-2,col-sm-6,col-sm-4';
		var buttonsClass = 'col-sm-offset-2 col-sm-10';
		return (
			<Form onSubmit={this._onSubmit}>
				<Panel content="panel-body" title={t('home.select.title')}>
					<Select form={this} ref="selectFree" id="selectFree" label={t('home.select.selectFree')} classes={fieldClasses}
					        query={this.loadCompanies}/>
					<Select form={this} ref="selectRequired" id="selectRequired" label={t('home.select.selectRequired')}
					        classes={fieldClasses} query={this.loadCompanies} required/>

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

	loadCompanies(query) {
		getList('companies', {
			data: {name: query.term},
			success: function (data) {
				var formatted = data.map(function (item) {
					return {id: item.id, text: item.name};
				});
				query.callback({results: formatted});
			}.bind(this)
		});
	},

	onSubmit() {
		var {values} = this.state;
		$(React.findDOMNode(this.refs.output)).html(JSON.stringify(values, emptyToNull, 2));
		console.log(values);
	}

});