import React from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

import './TextBlock.css';

class TextBlock extends React.Component {
    render() {
        return(
            <div>
                <form>
                    <FormGroup>
                        <ControlLabel>Type code below. Balanced parentheses validation in place.</ControlLabel><br />
                        <FormControl 
                            componentClass="textarea"
                            placeholder="console.log('hello Fractal Industries')"
                        />
                        <FormControl.Feedback />
                        <br /><HelpBlock>Errors on following lines</HelpBlock>
                    </FormGroup>
                </form>
            </div>
        );
    }
}
export default TextBlock;
