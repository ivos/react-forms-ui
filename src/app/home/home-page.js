import React from 'react';
import {setTitle, emptyToNull} from '../ui/utils';
import {FormMixin, Panel, Form, Text, Password, Select, Plain, FormMessages} from '../react-forms-ui/index';
import {ButtonSave} from '../ui/buttons';
import {getList} from '../store';
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
		passwordFree: {},
		passwordRequired: {
			required: true
		},
		selectFree: {},
		selectRequired: {
			required: true
		}
	},

	getInitialState: function () {
		return {
			fields: ['textNotValidated', 'textFree', 'textRequired', 'textMinMax', 'textMinMaxReq',
				'textNumbers', 'textBackend', 'passwordFree', 'passwordRequired', 'selectFree', 'selectRequired'],
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
					<Panel content="panel-body" title={t('home.example.title')}>
						<Text form={this} ref="textNotValidated" id="textNotValidated" label="Text not validated"
						      classes={fieldClasses}/>
						<Text form={this} ref="textFree" id="textFree" label="Text free" classes={fieldClasses}/>
						<Text form={this} ref="textRequired" id="textRequired" label="Text required"
						      classes={fieldClasses} required/>
						<Text form={this} ref="textMinMax" id="textMinMax" label="Text min max"
						      placeholder="Text with min and max" classes={fieldClasses}/>
						<Text form={this} ref="textMinMaxReq" id="textMinMaxReq" label="Text min max req"
						      placeholder="Text with min and max required" classes={fieldClasses} required/>
						<Text form={this} ref="textNumbers" id="textNumbers" label="Text numbers only"
						      classes={fieldClasses}/>
						<Text form={this} ref="textBackend" id="textBackend" label="Text backend"
						      placeholder="Text validated on backend" classes={fieldClasses} required/>
						<Password form={this} ref="passwordFree" id="passwordFree" label="Password free"
						          classes={fieldClasses}/>
						<Password form={this} ref="passwordRequired" id="passwordRequired" label="Password required"
						          classes={fieldClasses} required/>
						<Select form={this} ref="selectFree" id="selectFree" label="Select free" classes={fieldClasses}
						        query={this.loadCompanies}/>
						<Select form={this} ref="selectRequired" id="selectRequired" label="Select required"
						        classes={fieldClasses} query={this.loadCompanies} required/>

						<div className="form-group">
							<div className={buttonsClass}>
								<ButtonSave />
							</div>
						</div>

						<FormMessages form={this} ref="_form" className={buttonsClass}/>
					</Panel>
				</Form>
				Submitted:
				<pre ref="formExampleOutput"/>
			</div>
		);
	},

	componentDidMount() {
		setTitle(t('home.title'));
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
		$(React.findDOMNode(this.refs.formExampleOutput)).html(JSON.stringify(values, emptyToNull, 2));
		console.log(values);
	}

});
