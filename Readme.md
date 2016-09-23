# React Forms UI

A comprehensive UI toolbox for React.

## 1. Demo

The [live demo](http://react-forms-ui.s3-website-us-east-1.amazonaws.com/app).

## 2. Install

Install the node package:

    npm i -S react-forms-ui

Optionally install react-bootstrap:

    npm i -S react-bootstrap

Import .css files and initialize React Forms UI in your index.js file:

    import 'bootstrap/dist/css/bootstrap.css'
    import 'select2/select2.css'
    import 'react-forms-ui/lib/react-forms-ui.css'
    import {initialize} from 'react-forms-ui'
    initialize()

## 2. Usage

    import {Form, Panel, TextField, PasswordField, NumberField, DateField} from 'react-forms-ui'
    import {Panel} from 'react-bootstrap'

    const validations = {
      myText: {
        required: true,
        minLength: 4,
        maxLength: 10,
      },
      myNumber: {
        required: true,
      },
    }

    export default React.createClass({
      getInitialState() {
        return {}
      },
      render() {
        const fieldClasses = 'col-sm-2,col-sm-6,col-sm-4' // label,input,error
        return (
          <Form state={this.state} setState={this.setState.bind(this)} validations={validations}
                onSubmit={this.onSubmit}>
            <Panel header={<h3>My form</h3>}>
              <TextField id="myText" label="My text" placeholder="Enter some text" classes={fieldClasses}/>
              <PasswordField id="myPassword" label="My password" classes={fieldClasses}/>
              <NumberField id="myNumber" label="My number" format="0,0.[00]" classes={fieldClasses}/>
              <DateField id="myDate" label="My date" classes={fieldClasses}/>
            </Panel>
          </Form>
        )
      },
      onSubmit() {
        const {values} = this.state
        console.log(values)
      }
    }

See [the source files of the demo](https://github.com/ivos/react-forms-ui-demo) for a comprehensive working usage example.

## 3. Development

[Development](Development.md).
