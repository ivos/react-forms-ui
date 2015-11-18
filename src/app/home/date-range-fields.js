import React from 'react';
import ReactDOM from 'react-dom';
import {emptyToNull} from '../ui/utils';
import {FormMixin, Panel, Form, DateRangeField, FormMessages} from '../react-forms-ui/index';
import {ButtonSave} from '../ui/buttons';
import i18n from '../i18n';
var t = i18n.t.bind(i18n);

export default React.createClass({

	mixins: [FormMixin],

	validations: {
		drFreeFrom: {},
		drFreeTo: {},
		drReqFrom: {
			required: true
		},
		drReqTo: {
			required: true
		},
		drValueFrom: {},
		drValueTo: {},
		drFromReqFrom: {
			required: true
		},
		drFromReqTo: {},
		drToReqFrom: {},
		drToReqTo: {
			required: true
		}
	},

	render() {
		var fieldClasses = 'col-sm-2,col-sm-6,col-sm-4';
		var buttonsClass = 'col-sm-offset-2 col-sm-10';
		return (
			<Form onSubmit={this._onSubmit}>
				<Panel content="panel-body" title={t('home.daterange.title')}>
					<DateRangeField form={this} ref="drFree" id="drFree" label={t('home.daterange.drFree')}
					                classes={fieldClasses}/>
					<DateRangeField form={this} ref="drReq" id="drReq" label={t('home.daterange.drReq.label')}
					                placeholderFrom={t('home.daterange.drReq.placeholderFrom')}
					                placeholderTo={t('home.daterange.drReq.placeholderTo')} classes={fieldClasses}
					                required/>
					<DateRangeField form={this} ref="drValue" id="drValue" label={t('home.daterange.drValue')}
					                classes={fieldClasses}/>
					<DateRangeField form={this} ref="drFromReq" id="drFromReq" label={t('home.daterange.drFromReq')}
					                classes={fieldClasses} required/>
					<DateRangeField form={this} ref="drToReq" id="drToReq" label={t('home.daterange.drToReq')}
					                classes={fieldClasses} required/>
					<DateRangeField form={this} ref="drRO" id="drRO" label={t('home.daterange.drRO')}
					                classes={fieldClasses} readonly/>
					<DateRangeField form={this} ref="drROEmpty" id="drROEmpty" label={t('home.daterange.drROEmpty')}
					                classes={fieldClasses} readonly/>
					<DateRangeField form={this} ref="drROFromEmpty" id="drROFromEmpty"
					                label={t('home.daterange.drROFromEmpty')} classes={fieldClasses} readonly/>
					<DateRangeField form={this} ref="drROToEmpty" id="drROToEmpty"
					                label={t('home.daterange.drROToEmpty')} classes={fieldClasses} readonly/>

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
				drValueFrom: '2015-10-20',
				drValueTo: '2015-10-25',
				drROFrom: '2015-10-22',
				drROTo: '2015-10-23',
				drROEmptyFrom: null,
				drROEmptyTo: null,
				drROFromEmptyFrom: null,
				drROFromEmptyTo: '2015-10-24',
				drROToEmptyFrom: '2015-10-26',
				drROToEmptyTo: null
			}
		});
	},

	onSubmit() {
		var {values} = this.state;
		$(ReactDOM.findDOMNode(this.refs.output)).html(JSON.stringify(values, emptyToNull, 2));
		console.log(values);
	}

});
