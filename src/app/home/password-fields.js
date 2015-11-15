import React from 'react';
import ReactDOM from 'react-dom';
import {emptyToNull} from '../ui/utils';
import {FormMixin, Panel, Form, PasswordField, FormMessages} from '../react-forms-ui/index';
import {ButtonSave} from '../ui/buttons';
import i18n from '../i18n';
var t = i18n.t.bind(i18n);

export default React.createClass({

	mixins: [FormMixin],

	validations: {
		passwordFree: {},
		passwordRequired: {
			required: true
		},
		passwordValue: {},
		passwordValueRequired: {
			required: true
		}
	},

	render() {
		var fieldClasses = 'col-sm-2,col-sm-6,col-sm-4';
		var buttonsClass = 'col-sm-offset-2 col-sm-10';
		return (
			<Form onSubmit={this._onSubmit}>
				<Panel content="panel-body" title={t('home.password.title')}>
					<PasswordField form={this} ref="passwordFree" id="passwordFree"
					               label={t('home.password.passwordFree')} classes={fieldClasses}/>
					<PasswordField form={this} ref="passwordRequired" id="passwordRequired"
					               label={t('home.password.passwordRequired')} classes={fieldClasses} required/>
					<PasswordField form={this} ref="passwordValue" id="passwordValue"
					               label={t('home.password.passwordValue')} classes={fieldClasses}/>
					<PasswordField form={this} ref="passwordValueRequired" id="passwordValueRequired"
					               label={t('home.password.passwordValueRequired')} classes={fieldClasses} required/>
					<PasswordField form={this} ref="passwordReadonly" id="passwordReadonly"
					               label={t('home.password.passwordReadonly')} classes={fieldClasses} readonly/>
					<PasswordField form={this} ref="passwordReadonlyEmpty" id="passwordReadonlyEmpty"
					               label={t('home.password.passwordReadonlyEmpty')} classes={fieldClasses} readonly/>

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
				passwordValue: 'secret',
				passwordValueRequired: 'secret required',
				passwordReadonly: 'readonly',
				passwordReadonlyEmpty: null
			}
		});
	},

	onSubmit() {
		var {values} = this.state;
		$(ReactDOM.findDOMNode(this.refs.output)).html(JSON.stringify(values, emptyToNull, 2));
		console.log(values);
	}

});
