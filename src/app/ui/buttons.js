import React from 'react';

export var ButtonSave = React.createClass({
	render() {
		return (
			<button type="submit" className="btn btn-primary" accessKey="S">
				<span className="fa fa-check"></span> <u>S</u>ave
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
