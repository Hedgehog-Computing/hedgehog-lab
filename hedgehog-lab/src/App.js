import React from 'react';
import './App.css';
import SplitPane from 'react-split-pane';
import { UnControlled as CodeMirror } from 'react-codemirror2';


import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';


class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      
      <form onSubmit={this.handleSubmit}>
        <input type="submit" value="Submit" />
        <label>
          Essay:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        
      </form>
    );
  }
}

function App() {
  return (
    <div className="App">
      <SplitPane defaultSize="50%">
        <div>
          <CodeMirror
            value={"hello\n\nwoo"}
            options={{
              mode: 'javascript',
              theme: 'material',
              lineNumbers: true
            }}
            onBeforeChange={(editor, data, value) => {
              //this.setState({value});
            }}
            onChange={(editor, data, value) => {
            }}
          />

        </div>

        <div className = {EssayForm}>
           <EssayForm/>
        </div>
      </SplitPane>



    </div>

  );
}

export default App;
