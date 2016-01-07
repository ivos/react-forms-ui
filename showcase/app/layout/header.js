import React from 'react';

export default React.createClass({

	render() {
		var {active, locale} = this.props;
		var localeLabels = {
			en: <span><img src="img/flag-en.jpg" height="14" width="23"/>&nbsp;English</span>,
			cs: <span><img src="img/flag-cs.jpg" height="14" width="21"/>&nbsp;Česky</span>
		};
		var currentLocaleLabel = localeLabels[locale];
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

						<ul className="nav navbar-nav navbar-right">
							<li className="dropdown">
								<a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
								   aria-haspopup="true" aria-expanded="false">
									{currentLocaleLabel}
									&nbsp;<span className="caret"></span></a>
								<ul className="dropdown-menu">
									{'en' !== locale &&
									<li>
										<a href="#" onClick={this.setLocaleEn}>{localeLabels.en}</a>
									</li>
									}
									{'cs' !== locale &&
									<li>
										<a href="#" onClick={this.setLocaleCs}>{localeLabels.cs}</a>
									</li>
									}
								</ul>
							</li>
						</ul>

					</div>

				</div>
			</nav>
		);
	},

	setLocaleEn(event){
		event.preventDefault();
		var {onLocaleChange} = this.props;
		onLocaleChange('en');
	},

	setLocaleCs(event){
		event.preventDefault();
		var {onLocaleChange} = this.props;
		onLocaleChange('cs');
	}

});
