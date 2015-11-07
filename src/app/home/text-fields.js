import React from 'react';
import {emptyToNull} from '../ui/utils';
import {FormMixin, Panel, Form, Text, FormMessages} from '../react-forms-ui/index';
import {ButtonSave} from '../ui/buttons';
import i18n from '../i18n';
var t = i18n.t.bind(i18n);

export default React.createClass({

	mixins: [FormMixin],

	validations: {
		textFree: {},
		textRequired: {
			required: true
		},
		textMinMax: {
			minLength: 4,
			maxLength: 10
		},
		textMinMaxReq: {
			required: true,
			minLength: 4,
			maxLength: 10
		},
		textNumbers: {
			pattern: /^[0-9]*$/
		},
		textBackend: {
			required: true,
			autoSuccess: false
		},
		textValue: {},
		textValueRequired: {
			required: true
		},
		textReadonly: {}
	},

	getInitialState: function () {
		return {
			fields: ['textNotValidated', 'textFree', 'textRequired', 'textMinMax', 'textMinMaxReq',
				'textNumbers', 'textBackend', 'textValue', 'textValueRequired', 'textReadonly']
		};
	},

	render() {
		var fieldClasses = 'col-sm-2,col-sm-6,col-sm-4';
		var buttonsClass = 'col-sm-offset-2 col-sm-10';
		return (
			<Form onSubmit={this._onSubmit}>
				<Panel content="panel-body" title={t('home.text.title')}>
					<Text form={this} ref="textNotValidated" id="textNotValidated"
					      label={t('home.text.textNotValidated.label')} classes={fieldClasses}>
						<span className="help-block">{t('home.text.textNotValidated.help')}</span>
					</Text>
					<Text form={this} ref="textFree" id="textFree" label={t('home.text.textFree')}
					      classes={fieldClasses}/>
					<Text form={this} ref="textRequired" id="textRequired" label={t('home.text.textRequired')}
					      classes={fieldClasses} required/>
					<Text form={this} ref="textMinMax" id="textMinMax" label={t('home.text.textMinMax.label')}
					      placeholder={t('home.text.textMinMax.placeholder')} classes={fieldClasses}/>
					<Text form={this} ref="textMinMaxReq" id="textMinMaxReq" label={t('home.text.textMinMaxReq.label')}
					      placeholder={t('home.text.textMinMaxReq.placeholder')} classes={fieldClasses} required>
						<span className="help-block">{t('home.text.textMinMaxReq.help')}</span>
					</Text>
					<Text form={this} ref="textNumbers" id="textNumbers" label={t('home.text.textNumbers')}
					      classes={fieldClasses}/>
					<Text form={this} ref="textBackend" id="textBackend" label={t('home.text.textBackend.label')}
					      placeholder={t('home.text.textBackend.placeholder')} classes={fieldClasses} required>
						<span className="help-block">{t('home.text.textBackend.help')}</span>
					</Text>
					<Text form={this} ref="textValue" id="textValue" label={t('home.text.textValue')}
					      classes={fieldClasses}/>
					<Text form={this} ref="textValueRequired" id="textValueRequired"
					      label={t('home.text.textValueRequired')} classes={fieldClasses} required/>
					<Text form={this} ref="textReadonly" id="textReadonly" label={t('home.text.textReadonly')}
					      classes={fieldClasses} readonly/>
					<Text form={this} ref="textReadonlyEmpty" id="textReadonlyEmpty"
					      label={t('home.text.textReadonlyEmpty')} classes={fieldClasses} readonly/>

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
				textValue: 'Initial value',
				textValueRequired: 'Initial value in required',
				textReadonly: 'Read-only value',
				textReadonlyEmpty: null
			}
		});
	},

	onSubmit() {
		var {values} = this.state;
		$(React.findDOMNode(this.refs.output)).html(JSON.stringify(values, emptyToNull, 2));
		console.log(values);
	}

});
