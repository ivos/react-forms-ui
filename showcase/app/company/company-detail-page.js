import React from 'react';
import ReactDOM from 'react-dom';
import {setTitle, focusFirst} from '../ui/utils';
import {FormMixin, Panel, TextField, PlainField} from '../react-forms-ui/index';
import {LinkEdit, LinkBack} from '../ui/buttons';
import ContactDetail from '../contact/contact-detail';
import Nested from '../shared/nested'
import {getOne} from '../store';

export default React.createClass({

	mixins: [FormMixin],

	getInitialState() {
		var {id} = this.props.params;
		return {
			values: {}
		};
	},

	render() {
		var {id} = this.props.params;
		var {values} = this.state;
		var fieldClasses = 'col-sm-2,col-sm-10';
		var buttonsClass = 'col-sm-offset-2 col-sm-10';
		return (
			<Panel className="form-horizontal" content="panel-body"
			       title={<span><span className="text-muted">Company</span> <strong>{values.name}</strong></span>}>
				<div className="well well-sm well-white">

					<TextField form={this} id="name" label="Name" classes={fieldClasses} readonly/>

					<PlainField id="taxId" label="Tax id" classes={fieldClasses} readonly>
						<p className="form-control-static">{values.taxId ? <code>{values.taxId}</code> : ''}</p>
					</PlainField>

					<PlainField id="companyId" label="Company id" classes={fieldClasses} readonly>
						<p className="form-control-static">{values.companyId ? <code>{values.companyId}</code> : ''}</p>
					</PlainField>

				</div>

				<ContactDetail form={this} id="invoicingContact" label="Invoicing contact"/>

				<div ref="buttons" className={buttonsClass + 'form-group'}>
					<LinkEdit href={'#companies/' + id + '/edit'} title="Edit company data."/>
					<LinkBack href="#companies" title="Back to companies list."/>
				</div>
			</Panel>
		);
	},

	componentDidMount() {
		var {id} = this.props.params;
		getOne('companies', id, {
			success: function (data) {
				var values = Nested.expand(data, 'invoicingContact');
				this.setState({values}, function () {
					focusFirst(ReactDOM.findDOMNode(this.refs.buttons));
					setTitle('Company');
				});
			}.bind(this)
		})
	}

});
