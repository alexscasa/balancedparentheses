import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import { ButtonToolbar, Button, Table } from 'react-bootstrap';

import './CodeEditor.css';

class CodeEditor extends React.Component {
  
    constructor(props) {
    super(props);
    this.state = {
      code: '// type code here ...'
    }
  }
  
  editorDidMount(editor, monaco) {
    editor.focus();
  }
  
  onChange(newValue, e) {
    this.setState({
        code: newValue
    })
  }

  clearCode() {
      this.setState({
          code: '// type code here ...'
      })
      this.props.resetErrors();
  }
  
  render() {
    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true
    };
    
    return (
        <div>
            <MonacoEditor
                height="400"
                language="javascript"
                theme="vs-dark"
                value={code}
                options={options}
                onChange={this.onChange.bind(this)}
                editorDidMount={this.editorDidMount.bind(this)}
            />
            <Table responsive bordered className="results">
                <tbody>
                    {
                    this.props.errors.map((str, i) => {
                        var holder = str.split('-');
                        return(
                            <tr key={i}>
                                <td key={str}>
                                Line {parseInt(holder[0], 10) + 1}: Missing matching pair for '{holder[1]}'                       
                                </td>
                            </tr>
                        )})
                    }
                </tbody>
            </Table>
            <ButtonToolbar className="center">
                <Button bsStyle="danger" bsSize="large" onClick={this.clearCode.bind(this)}>
                    Clear
                </Button>
                <Button bsStyle="success" bsSize="large" onClick={this.props.validator.bind(this, this.state.code)}>
                    Validate
                </Button>
            </ButtonToolbar>
        </div>
    );
  }
}
export default CodeEditor;