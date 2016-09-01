# React Forms UI

A comprehensive UI toolbox for React.

## 1. Demo

The [live demo](http://react-forms-ui.s3-website-us-east-1.amazonaws.com/app).

## 2. Install

Install the node package:

    npm i --save react react-dom numeral react-forms-ui

Import the .css file in your main .js file:

    import 'react-forms-ui/lib/react-forms-ui.css'

## 2. Usage

    import {FormMixin, Form, Panel, TextField, PasswordField, NumberField, DateField} from 'react-forms-ui';

    export default React.createClass({
    	mixins: [FormMixin],
        validations: {
            myText: {
                required: true
            },
            myNumber: {
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
                                       classes={fieldClasses}/>
                        <NumberField form={this} ref="myNumber" id="myNumber" label="My number" format="0,0.[00]"
                                     classes={fieldClasses} required/>
                        <DateField form={this} ref="myDate" id="myDate" label="My date" classes={fieldClasses}/>
                    </Panel>
                </Form>
            );
        },
        onSubmit() {
            var {values} = this.state;
            console.log(values);
        }
    }

See [the source files of the demo](https://github.com/ivos/react-forms-ui-demo) for a comprehensive working usage example.

## 3. Development

[Development](Development.md).
