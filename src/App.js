import React, { Component } from 'react';
import { PageHeader, Modal } from 'react-bootstrap';
// import TextBlock  from './components/TextBlock/TextBlock';
// import ReviewText from './components/ReviewText/ReviewText'
import CodeEditor from './components/CodeEditor/CodeEditor';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // stores improper pairs
      errors: [],
      success: false
    };
  }

  /*  Traverses code to find parantheses
    When open parantheses found: 
     -add to validate stack and update state
    When closed parantheses found:
     - call balancedMatch with appropriate opening and closing tag to match
  */
  balancedParantheses(code) {
    var validate = [],
        errors = [];
    var holder = code.split("\n");
    // iterate over each line of code and associated line number
    holder.forEach((string, line) => {
      // iterate over each character in string looking
      for(var i = 0; i <= string.length; i++) {
        // check for open parantheses
        if(string[i] === '(' || string[i] === '{' || string[i] === '[') {
          // if found, add to validate to check for a matching closing brace
          // FORMAT: line-opener        EX:  3-(
          validate.push(line + '-' + string[i]);
          // check for close parantheses
        } else if(string[i] === ')') {
          this.balancedMatch(line + '-' + string[i],  '(', validate, errors);
        } else if(string[i] === '}') {
          this.balancedMatch(line + '-' + string[i], '{', validate, errors);
        } else if(string[i] === ']') {
          this.balancedMatch(line + '-' + string[i], '[', validate, errors);
        }
      }
    });

    errors = [...validate, ...errors];

    if(errors.length > 0){
      this.setState({
        errors: errors
      });
    } else {
      this.setState({
        success: true
      });
    }
  }

  // Called when a close parantheses is found
  // Check for a matching pair:
  // If true -> Removes last element from array and updates state with new array
  // If false -> add closing bracket to error list
  //  -FORMAT: line-closer        EX: 3-)
  balancedMatch(closer, opener, validate, errors) {
    if(validate.length > 0 && validate[validate.length - 1].includes(opener)) {
      validate.pop();
    } else {
        errors.push(closer);
    }
  }

  resetErrors() {
    this.setState({
      errors: []
    }, () => console.log(this.state.errors.length));
  }

  handleClose() {
    this.setState({ success: false });
  }

  render() {
    return (
      <div>
        <div className="font-center">
          <PageHeader className="header">
            Fractal Industries Assessment - Balanced Parentheses
            <br /><small className="subhead">Alex House</small>
          </PageHeader>
        </div>
        {/* <TextBlock />
        <ReviewText /> */}
        <CodeEditor validator={this.balancedParantheses.bind(this)} errors={this.state.errors} resetErrors={this.resetErrors.bind(this)}/>
        <Modal show={this.state.success} onHide={this.handleClose.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Successful validation!</Modal.Title>
          </Modal.Header>
        </Modal>
      </div>
    );
  }
}
export default App;
