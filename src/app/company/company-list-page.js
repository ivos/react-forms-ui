import React from 'react';
import {setTitle, focusFirst} from '../ui/utils';
import {Panel} from '../react-forms-ui/index';
import FetchMixin from '../ui/fetch-mixin';
import {LinkCreate} from '../ui/buttons';

export default React.createClass({

	mixins: [FetchMixin],

	getInitialState() {
		return {
			collection: {name: 'companies', data: []}
		};
	},

	render() {
		var collection = this.state.collection.data;
		return (
			<div ref="wrapper">
				{!collection.length ?
					<div className="alert alert-info">
						<p><strong>You have no company defined now.</strong></p>

						<p>Create your first company to start working with it.</p>
					</div>
					:
					<Panel content="list-group"
					       title={<span>Companies <span className="badge pull-right">{collection.length}</span></span>}>
						{collection.map(function (model, index) {
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
		setTitle('Companies');
	},

	onFetch() {
		focusFirst(React.findDOMNode(this.refs.wrapper));
	}

});
