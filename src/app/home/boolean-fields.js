import React from 'react';
import ReactDOM from 'react-dom';
import {emptyToNull} from '../ui/utils';
import {FormMixin, Panel, Form, BooleanField, FormMessages} from '../react-forms-ui/index';
import {ButtonSave} from '../ui/buttons';
import i18n from '../i18n';
var t = i18n.t.bind(i18n);

export default React.createClass({

	mixins: [FormMixin],

	validations: {},

	render() {
		var fieldClasses = 'col-sm-offset-2 col-sm-10,,col-sm-4';
		var buttonsClass = 'col-sm-offset-2 col-sm-10';
		return (
			<Form onSubmit={this._onSubmit}>
				<Panel content="panel-body" title={t('home.boolean.title')}>
					<BooleanField form={this} ref="bool" id="bool" label={t('home.boolean.bool')}
					              classes={fieldClasses}/>
					<BooleanField form={this} ref="boolChecked" id="boolChecked" label={t('home.boolean.boolChecked')}
					              classes={fieldClasses}/>
					<BooleanField form={this} ref="boolRO" id="boolRO" label={t('home.boolean.boolRO')}
					              classes={fieldClasses} readonly/>

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
				boolChecked: true,
				boolRO: true
			}
		});
	},

	onSubmit() {
		var {values} = this.state;
		$(ReactDOM.findDOMNode(this.refs.output)).html(JSON.stringify(values, emptyToNull, 2));
		console.log(values);
	}

});
