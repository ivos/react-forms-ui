import React from 'react';
import ReactDOM from 'react-dom';
import {emptyToNull} from '../ui/utils';
import {FormMixin, Panel, Form, NumberField, FormMessages} from '../react-forms-ui/index';
import {ButtonSave} from '../ui/buttons';
import i18n from '../i18n';
var t = i18n.t.bind(i18n);

export default React.createClass({

	mixins: [FormMixin],

	validations: {
		numberFree: {},
		numberRequired: {
			required: true
		},
		numberValue: {},
		numberValueRequired: {
			required: true
		},
		numberCustomFormat: {
			required: true,
			min: 0
		},
		numberMinMax: {
			required: true,
			min: 3,
			max: 30
		}
	},

	render() {
		var fieldClasses = 'col-sm-2,col-sm-6,col-sm-4';
		var buttonsClass = 'col-sm-offset-2 col-sm-10';
		return (
			<Form onSubmit={this._onSubmit}>
				<Panel content="panel-body" title={t('home.number.title')}>
					<NumberField form={this} ref="numberFree" id="numberFree"
					             label={t('home.number.numberFree')} classes={fieldClasses}/>
					<NumberField form={this} ref="numberRequired" id="numberRequired"
					             label={t('home.number.numberRequired')} classes={fieldClasses} required/>
					<NumberField form={this} ref="numberValue" id="numberValue"
					             label={t('home.number.numberValue.label')} classes={fieldClasses}>
						<span className="help-block">{t('home.number.numberValue.help')}</span>
					</NumberField>
					<NumberField form={this} ref="numberValueRequired" id="numberValueRequired"
					             label={t('home.number.numberValueRequired.label')} classes={fieldClasses} required>
						<span className="help-block">{t('home.number.numberValueRequired.help')}</span>
					</NumberField>
					<NumberField form={this} ref="numberCustomFormat" id="numberCustomFormat"
					             label={t('home.number.numberCustomFormat.label')} classes={fieldClasses} required
					             format="0.000">
						<span className="help-block">{t('home.number.numberCustomFormat.help')}</span>
					</NumberField>
					<NumberField form={this} ref="numberMinMax" id="numberMinMax"
					             label={t('home.number.numberMinMax.label')} classes={fieldClasses} required>
						<span className="help-block">{t('home.number.numberMinMax.help')}</span>
					</NumberField>
					<NumberField form={this} ref="numberReadonly" id="numberReadonly"
					             label={t('home.number.numberReadonly')} classes={fieldClasses} readonly/>
					<NumberField form={this} ref="numberReadonlyEmpty" id="numberReadonlyEmpty"
					             label={t('home.number.numberReadonlyEmpty')} classes={fieldClasses} readonly/>

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
				numberValue: 123000456.123456,
				numberValueRequired: 1000,
				numberReadonly: 23456.78901,
				numberReadonlyEmpty: null
			}
		});
	},

	onSubmit() {
		var {values} = this.state;
		$(ReactDOM.findDOMNode(this.refs.output)).html(JSON.stringify(values, emptyToNull, 2));
		console.log(values);
	}

});
