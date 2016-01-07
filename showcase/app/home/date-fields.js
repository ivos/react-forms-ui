import React from 'react';
import ReactDOM from 'react-dom';
import {emptyToNull} from '../ui/utils';
import {FormMixin, Panel, Form, DateField, FormMessages} from '../react-forms-ui/index';
import {ButtonSave} from '../ui/buttons';
import i18n from '../i18n';
var t = i18n.t.bind(i18n);

export default React.createClass({

	mixins: [FormMixin],

	validations: {
		dateFree: {},
		dateRequired: {
			required: true
		},
		dateValue: {},
		dateValueRequired: {
			required: true
		},
		dateMinMax: {
			required: true
		}
	},

	render() {
		var fieldClasses = 'col-sm-2,col-sm-6,col-sm-4';
		var buttonsClass = 'col-sm-offset-2 col-sm-10';
		return (
			<Form onSubmit={this._onSubmit}>
				<Panel content="panel-body" title={t('home.date.title')}>
					<DateField form={this} ref="dateFree" id="dateFree" label={t('home.date.dateFree')}
					           classes={fieldClasses}/>
					<DateField form={this} ref="dateRequired" id="dateRequired" label={t('home.date.dateRequired')}
					           classes={fieldClasses} required/>
					<DateField form={this} ref="dateValue" id="dateValue" label={t('home.date.dateValue')}
					           classes={fieldClasses}/>
					<DateField form={this} ref="dateValueRequired" id="dateValueRequired"
					           label={t('home.date.dateValueRequired.label')} classes={fieldClasses} required>
						<span className="help-block">{t('home.date.dateValueRequired.help')}</span>
					</DateField>
					<DateField form={this} ref="dateMinMax" id="dateMinMax" label={t('home.date.dateMinMax.label')}
					           classes={fieldClasses} required
					           minDate={moment().startOf('day').subtract(7, 'days')}
					           maxDate={moment().startOf('day').add(7, 'days')}>
						<span className="help-block">{t('home.date.dateMinMax.help')}</span>
					</DateField>
					<DateField form={this} ref="dateReadonly" id="dateReadonly" label={t('home.date.dateReadonly')}
					           classes={fieldClasses} readonly/>
					<DateField form={this} ref="dateReadonlyEmpty" id="dateReadonlyEmpty"
					           label={t('home.date.dateReadonlyEmpty')} classes={fieldClasses} readonly/>

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
			values: {
				dateValue: '2015-10-20',
				dateValueRequired: '2015-10-21',
				dateReadonly: '2015-10-22',
				dateReadonlyEmpty: null
			}
		});
	},

	onSubmit() {
		var {values} = this.state;
		$(ReactDOM.findDOMNode(this.refs.output)).html(JSON.stringify(values, emptyToNull, 2));
		console.log(values);
	}

});
