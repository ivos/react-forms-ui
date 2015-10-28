import React from 'react';

export default React.createClass({

	render() {
		var {active} = this.props;
		return (
			<nav className="navbar navbar-default navbar-fixed-top" role="navigation">
				<div className="container-fluid">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle" data-toggle="collapse"
								data-target="#app-navbar-collapse">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<a className="navbar-brand" href="/app/#">React Forms UI</a>
					</div>

					<div id="app-navbar-collapse" className="collapse navbar-collapse">
						<ul className="nav navbar-nav">
							<li className={('home' === active)? 'active' : ''}>
								<a id="home-link" href="#home">Home</a>
							</li>
							<li className={('companies' === active)? 'active' : ''}>
								<a id="companies-link" href="#companies">Companies</a>
							</li>
							<li className={('partners' === active)? 'active' : ''}>
								<a id="partners-link" href="#partners">Partners</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}

});
