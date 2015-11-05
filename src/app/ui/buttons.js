import React from 'react';
import i18n from '../i18n';
var t = i18n.t.bind(i18n);

export var ButtonSave = React.createClass({
	render() {
		return (
			<button type="submit" className="btn btn-primary" accessKey="S" title="Alt+S">
				<span className="fa fa-check"></span> {t('button.save')}
			</button>
		);
	}
});

export var LinkBack = React.createClass({
	render() {
		return (
			<a className="pull-right" style={{marginRight: 50}} {...this.props}><span
				className="fa fa-chevron-left"></span> Back
			</a>
		);
	}
});

export var LinkCreate = React.createClass({
	render() {
		return (
			<a className="btn btn-default" accessKey="C" {...this.props}>
				<span className="fa fa-plus"></span> <u>C</u>reate
			</a>
		);
	}
});

export var LinkEdit = React.createClass({
	render() {
		return (
			<a className="btn btn-default" accessKey="E" {...this.props}>
				<span className="fa fa-pencil-square-o"></span> <u>E</u>dit
			</a>
		);
	}
});
