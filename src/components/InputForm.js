import React, { Component } from 'react'

class InputForm extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         frameInput: {
             l: 0,
             w: 0,
             h: 0,
             m: 0
         }
      }
      this.handleChange = this.handleChange.bind(this);
      this.submit = this.submit.bind(this);
    }

    handleChange(event){
        let propertyName = event.target.name;
        let frameInput = this.state.frameInput
        frameInput[propertyName] = event.target.value;
        this.setState({frameInput: frameInput})
      }

    submit(event){
        event.preventDefault()
        this.props.handleSubmit(this.state.frameInput)
    }
    
  render() {
    return (
      <div>
        <form onSubmit = {this.submit}>
            <label>Length:</label>
                <input name='l' type='number' min='0' onChange={this.handleChange}></input>
            <label>Width:</label>
                <input name='w' type='number' min='0' onChange={this.handleChange}></input>
            <label>Height:</label>
                <input name='h' type='number' min='0' onChange={this.handleChange}></input>
            <label>MGW:</label>
                <input name='m' type='number' min='0' onChange={this.handleChange}></input>
            <button>Submit</button>
        </form>
      </div>
    )
  }
}

export default InputForm
