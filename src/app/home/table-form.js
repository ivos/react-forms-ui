import React from 'react';
import ReactDOM from 'react-dom';
import {emptyToNull} from '../ui/utils';
import {FormMixin, Panel, Form, Label, TextField, PasswordField,
	DateField, DateRangeField, FormMessages} from '../react-forms-ui/index';
import {ButtonSave} from '../ui/buttons';
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
		date: {
			required: true
		},
		drFrom: {
			required: true
		},
		drTo: {
			required: true
		}
	},

	render() {
		var values = this.state.values || [];
		var fieldClasses = 'col-sm-2,col-sm-6,col-sm-4';
		var buttonsClass = 'col-sm-offset-2 col-sm-10';
		return (
			<Form onSubmit={this._onSubmit}>
				<Panel content="panel-body" title={t('home.text.title')}>

					<Panel title={t('activityItems.title')}>
						<table className="table table-bordered table-condensed">
							<thead>
							<tr>
								<th><Label required>{t('home.table.text')}</Label></th>
								<th><Label required>{t('home.table.password')}</Label></th>
								<th><Label required>{t('home.table.date')}</Label></th>
								<th><Label required>{t('home.table.dr')}</Label></th>
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
											<DateField form={this} ref={'date-'+index} id="date" row={index}
											           label={t('home.table.date')} classes={fieldClasses} required/>
										</td>
										<td>
											<DateRangeField form={this} ref={'dr-'+index} id="dr" row={index}
											                label={t('home.table.dr')} classes={fieldClasses}
											                required/>
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
					date: '2015-05-10',
					drFrom: '2015-06-20',
					drTo: '2015-06-21'
				},
				{
					id: 1,
					text: 'TEXT B',
					password: 'Password B',
					date: '2015-05-11',
					drFrom: '2015-06-22',
					drTo: '2015-06-23'
				},
				{
					id: 2,
					text: 'TEXT C',
					password: 'Password C',
					date: '2015-05-12',
					drFrom: '2015-06-24',
					drTo: '2015-06-25'
				},
				{
					id: 3
				}
			]
		});
	},

	onSubmit() {
		var {values} = this.state;
		$(ReactDOM.findDOMNode(this.refs.output)).html(JSON.stringify(values, emptyToNull, 2));
		console.log(values);
	}

});
