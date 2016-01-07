import React from 'react';
import ReactDOM from 'react-dom';
import {setTitle, focusFirst} from '../ui/utils';
import {FormMixin, Form, Panel, TextField} from '../react-forms-ui/index';
import {LinkCreate} from '../ui/buttons';
import {getList} from '../store';

export default React.createClass({

	mixins: [FormMixin],

	getInitialState() {
		return {
			changed: false,
			data: [],
			values: {}
		};
	},

	render() {
		var {data, changed} = this.state;
		var fieldClasses = 'col-sm-2,col-sm-6,col-sm-4';
		return (
			<Form ref="form" onSubmit={this._onSubmit}>
				{this._reloaded && !changed && !data.length &&
				<div className="alert alert-info">
					<p><strong>You have no company defined now.</strong></p>

					<p>Create your first company to start working with it.</p>
				</div>
				}
				{this._reloaded && (changed || data.length > 0) &&
				<Panel title={<span>Companies <span className="badge pull-right">{data.length}</span></span>}>

					<div className="panel-body">
						<TextField form={this} ref="name" id="name" label="Name" classes={fieldClasses}/>
					</div>

					<div className="list-group">
						{data.map(function (model, index) {
							return (
								<a ref={'row' + index} key={model.id} href={'#companies/' + model.id}
								   className="list-group-item">{model.name}</a>
							);
						})}
					</div>
				</Panel>
				}
				{<LinkCreate href="#companies/new" title="Create new company."/>}
			</Form>
		);
	},

	reload(changed) {
		var {values} = this.state;
		changed = changed || false;
		getList('companies', {
			data: values,
			success: function (data) {
				this._reloaded = true;
				this.setState({data, changed}, function () {
					focusFirst(ReactDOM.findDOMNode(this.refs.form));
				});
			}.bind(this)
		});
	},

	componentDidMount() {
		setTitle('Companies');
		this.reload();
	},

	onChange() {
		this.reload(true);
	},

	onSubmit() {
		var {history} = this.props;
		var {data} = this.state;
		history.pushState(null, '/companies/' + data[0].id);
	}

});
