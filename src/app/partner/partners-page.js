import React from 'react';
import {setTitle} from '../ui/utils';

export default React.createClass({

	render() {
		return (
			<div>
				<p>Partners page</p>

				<p>Nothing here, just a test of navigation.</p>
			</div>
		);
	},

	componentDidMount() {
		setTitle('Partners');
	}

});
