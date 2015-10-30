import React from 'react';
import {setTitle, emptyToNull} from '../ui/utils';
import {FormMixin, Panel, Form, TextField, PasswordField, PlainField, FormMessagesField} from '../react-forms-ui/index';
import {ButtonSave} from '../ui/buttons';
import i18n from '../i18n';

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
		passwordFree: {},
		passwordRequired: {
			required: true
		}
	},

	getInitialState: function () {
		return {
			fields: ['textNotValidated', 'textFree', 'textRequired', 'textMinMax', 'textMinMaxReq',
				'textNumbers', 'textBackend', 'passwordFree', 'passwordRequired'],
			values: {}
		};
	},

	render() {
		var fieldClasses = 'col-sm-2,col-sm-6,col-sm-4';
		var buttonsClass = 'col-sm-offset-2 col-sm-10';
		return (
			<div>
				<h2>React Forms UI</h2>

				<Form id="form-example" onSubmit={this._onSubmit}>
					<Panel content="panel-body" title={i18n.t('home.example.title')}>
						<TextField form={this} ref="textNotValidated" id="textNotValidated"
						           label="Text not validated" classes={fieldClasses}/>
						<TextField form={this} ref="textFree" id="textFree" label="Text free" classes={fieldClasses}/>
						<TextField form={this} ref="textRequired" id="textRequired" label="Text required"
						           classes={fieldClasses} required/>
						<TextField form={this} ref="textMinMax" id="textMinMax" label="Text min max"
						           placeholder="Text with min and max" classes={fieldClasses}/>
						<TextField form={this} ref="textMinMaxReq" id="textMinMaxReq" label="Text min max req"
						           placeholder="Text with min and max required" classes={fieldClasses} required/>
						<TextField form={this} ref="textNumbers" id="textNumbers" label="Text numbers only"
						           classes={fieldClasses}/>
						<TextField form={this} ref="textBackend" id="textBackend" label="Text backend"
						           placeholder="Text validated on backend" classes={fieldClasses} required/>
						<PasswordField form={this} ref="passwordFree" id="passwordFree" label="Password free"
						               classes={fieldClasses}/>
						<PasswordField form={this} ref="passwordRequired" id="passwordRequired"
						               label="Password required"
						               classes={fieldClasses} required/>

						<div className="form-group">
							<div className={buttonsClass}>
								<ButtonSave />
							</div>
						</div>

						<FormMessagesField form={this} ref="_form" className={buttonsClass}/>
					</Panel>
				</Form>
				Submitted:
				<pre ref="formExampleOutput"/>
			</div>
		);
	},

	componentDidMount() {
		setTitle(i18n.t('home.title'));
	},


	onSubmit() {
		var {values} = this.state;
		$(React.findDOMNode(this.refs.formExampleOutput)).html(JSON.stringify(values, emptyToNull, 2));
		console.log(values);
	}

});
