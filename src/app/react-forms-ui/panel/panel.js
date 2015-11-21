import React from 'react';

export default React.createClass({

	render() {
		var {className='', header, title, footer, type='default', content, ...otherProps} = this.props;
		className = className + ' panel panel-' + type;
		return (
			<div className={className} {...otherProps}>
				{(header && !title) &&
				<div className="panel-heading">{header}</div>
				}
				{title &&
				<div className="panel-heading">
					<h3 className="panel-title">{title}</h3>
				</div>
				}
				{content ?
					<div className={content}>{this.props.children}</div>
					:
					this.props.children
				}
				{footer &&
				<div className="panel-footer">{footer}</div>
				}
			</div>
		);
	}

});
