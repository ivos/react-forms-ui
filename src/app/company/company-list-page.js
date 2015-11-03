import React from 'react';
import {setTitle, focusFirst} from '../ui/utils';
import {Panel} from '../react-forms-ui/index';
import {LinkCreate} from '../ui/buttons';
import {getList} from '../store';

export default React.createClass({

	getInitialState() {
		return {
			data: []
		};
	},

	render() {
		var {data} = this.state;
		return (
			<div ref="wrapper">
				{!data.length ?
					<div className="alert alert-info">
						<p><strong>You have no company defined now.</strong></p>

						<p>Create your first company to start working with it.</p>
					</div>
					:
					<Panel content="list-group"
					       title={<span>Companies <span className="badge pull-right">{data.length}</span></span>}>
						{data.map(function (model, index) {
							return (
								<a ref={'row' + index} key={model.id} href={'#companies/' + model.id}
								   className="list-group-item">{model.name}</a>
							);
						})}
					</Panel>
				}
				{<LinkCreate href="#companies/new" title="Create new company."/>}
			</div>
		);
	},

	componentDidMount() {
		var self = this;
		getList('companies', {
			success(data) {
				self.setState({data}, function () {
					focusFirst(React.findDOMNode(self.refs.wrapper));
					setTitle('Companies');
				});
			}
		});
	}

});
