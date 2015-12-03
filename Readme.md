# React Forms UI

A comprehensive UI toolbox for React.

## 1. Demo

[Demo showcase](http://react-forms-ui.s3-website-us-east-1.amazonaws.com/app).

## 2. Usage

	validations: {
		myText: {
			required: true
		},
		myPassword: {
			required: true
		},
		myNumber: {
			required: true
		},
		myDate: {
			required: true
		}
	},
	
	render() {
		var fieldClasses = 'col-sm-2,col-sm-6,col-sm-4';
		return (
			<Form onSubmit={this._onSubmit}>
				<Panel content="panel-body" title="My form">
					<TextField form={this} ref="myText" id="myText" label="My text" placeholder="Enter some text"
					           classes={fieldClasses} required/>
					<PasswordField form={this} ref="myPassword" id="myPassword" label="My password"
					               classes={fieldClasses} required/>
					<NumberField form={this} ref="myNumber" id="myNumber" label="My number" format="0,0.[00]"
					             classes={fieldClasses} required/>
					<DateField form={this} ref="myDate" id="myDate" label="My date" classes={fieldClasses} required/>
				</Panel>
			</Form>
		);
	},
	
	onSubmit() {
		var {values} = this.state;
		console.log(values);
	}

## 3. Development

[Development](Development.md).
