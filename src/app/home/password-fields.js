import React from 'react';
import {emptyToNull} from '../ui/utils';
import {FormMixin, Panel, Form, Password, FormMessages} from '../react-forms-ui/index';
import {ButtonSave} from '../ui/buttons';
import i18n from '../i18n';
var t = i18n.t.bind(i18n);

export default React.createClass({

	mixins: [FormMixin],

	validations: {
		passwordFree: {},
		passwordRequired: {
			required: true
		}
	},

	getInitialState: function () {
		return {
			fields: ['passwordFree', 'passwordRequired'],
			values: {}
		};
	},

	render() {
		var fieldClasses = 'col-sm-2,col-sm-6,col-sm-4';
		var buttonsClass = 'col-sm-offset-2 col-sm-10';
		return (
			<Form onSubmit={this._onSubmit}>
				<Panel content="panel-body" title={t('home.password.title')}>
					<Password form={this} ref="passwordFree" id="passwordFree" label={t('home.password.passwordFree')}
					          classes={fieldClasses}/>
					<Password form={this} ref="passwordRequired" id="passwordRequired"
					          label={t('home.password.passwordRequired')} classes={fieldClasses} required/>

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

	onSubmit() {
		var {values} = this.state;
		$(React.findDOMNode(this.refs.output)).html(JSON.stringify(values, emptyToNull, 2));
		console.log(values);
	}

});