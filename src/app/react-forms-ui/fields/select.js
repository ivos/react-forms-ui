import React from 'react';
import ReactDOM from 'react-dom';
import Label from '../label/label';
import Messages from '../messages/messages';
import FieldMixin from './field-mixin';
import Select from 'react-select';

export default React.createClass({

	mixins: [FieldMixin],

	getInitialState() {
		return {data: []};
	},

	render() {
		var {id, label, classes, required, readonly, form, placeholder, loadData, ...otherProps} = this.props;
		var value = (form && form.state.values) ? form.state.values[id] : null;
		var {data} = this.state;
		classes = classes ? classes.split(',') : [];
		var formGroupClassName = 'form-group ' + this.getFieldStatus();
		return (
			<div className={formGroupClassName}>
				<Label htmlFor={id} className={classes[0]} required={required ? 'required' : false}>{label}</Label>

				<div className={classes[1]}>
					<Select ref="select" id={id} name={id} className="form-control field"
					        placeholder={placeholder || label} value={value} {...otherProps} options={data}
					        onChange={this._onChange}/>
				</div>
				{!readonly &&
				<Messages ref="messages" id={id} fieldMessages={this.getFieldMessages()}
				          showFeedback={this.state.showFeedback} className={classes[2]}/>
				}
			</div>
		);
	},

	componentDidMount() {
		var {loadData} = this.props;
		loadData(null, this.setData);
	},

	setData(data) {
		this.setState({data})
	},

	focus() {
		this.refs.select.focus();
	},

	_onChange(value) {
		this.setState({showFeedback: 'positive'});
		var {id, form} = this.props;
		if (form) {
			form._onChange(id, value);
		}
	}

});
