import React from 'react';
import {Router, Route, IndexRoute, Redirect} from 'react-router';

import App from './layout/app';

import Home from './home/home-page';

import CompanyList from './company/company-list-page';
import CompanyDetail from './company/company-detail-page';
import CompanyEdit from './company/company-edit-page';

import Partners from './partner/partners-page';

export default React.createClass({

	render() {
		var {history} = this.props;
		return (
			<Router history={history}>
				<Route path="/" component={App}>
					<IndexRoute component={Home}/>
					<Route path="companies" component={CompanyList}/>
					<Route path="companies/new" component={CompanyEdit}/>
					<Route path="companies/:id" component={CompanyDetail}/>
					<Route path="companies/:id/edit" component={CompanyEdit}/>
					<Route path="partners" component={Partners}/>
					<Redirect from="*" to="/" />
				</Route>
			</Router>
		);
	}

});
