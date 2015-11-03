import React from 'react';
import {setTitle, focusFirst} from '../ui/utils';
import {FormMixin, Panel, TextField, PlainField} from '../react-forms-ui/index';
import FetchMixin from '../ui/fetch-mixin';
import {LinkEdit, LinkBack} from '../ui/buttons';
import ContactDetail from '../contact/contact-detail';
import Nested from '../shared/nested'

export default React.createClass({

	mixins: [FetchMixin, FormMixin],

	getInitialState() {
		var {id} = this.props.params;
		return {
			model: {name: 'companies', id: id},
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
		setTitle('Company');
	},

	onSync() {
		var {model} = this.state;
		var values = Nested.expand(model.attributes, 'invoicingContact');
		this.setState({values: values});
	},

	onFetch() {
		focusFirst(React.findDOMNode(this.refs.buttons));
	}

});
