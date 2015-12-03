import React from 'react';
import ReactDOM from 'react-dom';
import {emptyToNull} from '../ui/utils';
import {FormMixin, Panel, Form, Label, TextField, PasswordField, NumberField,
	DateField, DateRangeField, SelectField, BooleanField, FormMessages} from '../react-forms-ui/index';
import {ButtonSave} from '../ui/buttons';
import {getList, getOne} from '../store';
import i18n from '../i18n';
var t = i18n.t.bind(i18n);

export default React.createClass({

	mixins: [FormMixin],
	tableForm: true,

	validations: {
		text: {
			required: true,
			minLength: 4,
			maxLength: 10,
			pattern: /^[0-9A-Z ]*$/
		},
		password: {
			required: true
		},
		number: {
			required: true
		},
		date: {
			required: true
		},
		drFrom: {
			required: true
		},
		drTo: {
			required: true
		},
		select: {
			required: true
		}
	},

	render() {
		var values = this.state.values || [];
		var fieldClasses = 'col-sm-2,col-sm-6,col-sm-4';
		var buttonsClass = 'col-sm-offset-2 col-sm-10';
		return (
			<Form onSubmit={this._onSubmit}>
				<Panel content="panel-body" title={t('home.table.title')}>

					<Panel title={t('activityItems.title')}>
						<table className="table table-bordered table-condensed">
							<thead>
							<tr>
								<th><Label required>{t('home.table.text')}</Label></th>
								<th><Label required>{t('home.table.password')}</Label></th>
								<th><Label required>{t('home.table.number')}</Label></th>
								<th><Label required>{t('home.table.date')}</Label></th>
								<th><Label required>{t('home.table.dr')}</Label></th>
								<th><Label required>{t('home.table.select')}</Label></th>
								<th>{t('home.table.boolean')}</th>
							</tr>
							</thead>
							<tbody>
							{values.map(function (item, index) {
								return (
									<tr ref={'row-' + index} key={item.id}>
										<td>
											<TextField form={this} ref={'text-'+index} id="text" row={index}
											           label={t('home.table.text')} classes={fieldClasses} required/>
										</td>
										<td>
											<PasswordField form={this} ref={'password-'+index} id="password" row={index}
											               label={t('home.table.password')} classes={fieldClasses}
											               required/>
										</td>
										<td>
											<NumberField form={this} ref={'number-'+index} id="number" row={index}
											             label={t('home.table.number')} classes={fieldClasses}
											             required/>
										</td>
										<td>
											<DateField form={this} ref={'date-'+index} id="date" row={index}
											           label={t('home.table.date')} classes={fieldClasses} required/>
										</td>
										<td>
											<DateRangeField form={this} ref={'dr-'+index} id="dr" row={index}
											                label={t('home.table.dr')} classes={fieldClasses}
											                required/>
										</td>
										<td>
											<SelectField form={this} ref={'select-'+index} id="select" row={index}
											             label={t('home.table.select')} classes={fieldClasses}
											             getList={this.getListCompanies}
											             formatItem={this.formatItemCompany}/>
										</td>
										<td>
											<BooleanField form={this} ref={'boolean-'+index} id="boolean" row={index}
											              label={t('home.table.boolean')} classes={fieldClasses}/>
										</td>
									</tr>
								);
							}.bind(this))}
							</tbody>
						</table>
					</Panel>

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
		this.setState({
			values: [
				{
					id: 0,
					text: 'TEXT A',
					password: 'Password A',
					number: 23,
					date: '2015-05-10',
					drFrom: '2015-06-20',
					drTo: '2015-06-21',
					select: {id: 1, name: 'Acme'},
					boolean: true
				},
				{
					id: 1,
					text: 'TEXT B',
					password: 'Password B',
					number: 24,
					date: '2015-05-11',
					drFrom: '2015-06-22',
					drTo: '2015-06-23',
					select: {id: 2, name: 'First sales'},
					boolean: false
				},
				{
					id: 2,
					text: 'TEXT C',
					password: 'Password C',
					number: 25,
					date: '2015-05-12',
					drFrom: '2015-06-24',
					drTo: '2015-06-25',
					select: {id: 3, name: 'Big wig'},
					boolean: true
				},
				{
					id: 3
				}
			]
		});
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

	onSubmit() {
		var {values} = this.state;
		$(ReactDOM.findDOMNode(this.refs.output)).html(JSON.stringify(values, emptyToNull, 2));
		console.log(values);
	}

});
