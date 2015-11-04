import React from 'react';
import {Panel, Text, Plain, Label} from '../react-forms-ui/index';

export default React.createClass({

	render() {
		var {id, form, label} = this.props;
		var values = form.state.values;
		var labelClass = 'col-sm-2';
		var fieldClass = 'col-sm-10';
		var fieldClasses = labelClass + ',' + fieldClass;
		return (
			<Panel title={label} content="panel-body">
				<Text form={form} id={id + '.name'} label="Name" classes={fieldClasses} readonly/>
				<Text form={form} id={id + '.phone'} label="Phone" classes={fieldClasses} readonly/>
				<Plain id={id + '.email'} label="E-mail" classes={fieldClasses} readonly>
					<p className="form-control-static">
						<a href={'mailto:' + values.email} target="_blank">{values[id + '.email']}</a>
					</p>
				</Plain>

				<div className="form-group">
					<Label className={labelClass}>Address</Label>

					<div className={fieldClass}>
						<p className="form-control-static">
							{values[id + '.street']}<br/>
							{values[id + '.zip']} {' '}
							{values[id + '.city']}<br/>
							{values[id + '.country']}
						</p>
					</div>
				</div>
			</Panel>
		);
	}

});
