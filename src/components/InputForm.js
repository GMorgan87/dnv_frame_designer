import React, { Component } from 'react'

class InputForm extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
          projectDetails: {
            title: '',
            docNo: '',
            rev: '',
            date: ''
          },
         frameDims: {
             l: 0,
             w: 0,
             h: 0,
             m: 0
         }
      }
      this.handleChangeFrame = this.handleChangeFrame.bind(this);
      this.handleChangeProject = this.handleChangeProject.bind(this);
      this.submit = this.submit.bind(this);
    }

    handleChangeFrame(event){
        let propertyName = event.target.name;
        let frameDims = this.state.frameDims
        frameDims[propertyName] = event.target.value;
        this.setState({frameDims: frameDims})
      }

    handleChangeProject(event){
        let propertyName = event.target.name;
        let projectDetails = this.state.projectDetails
        projectDetails[propertyName] = event.target.value;
        this.setState({projectDetails: projectDetails})
      }

    submit(event){
        event.preventDefault()
        this.props.handleSubmit(this.state.frameDims, this.state.projectDetails)
    }
    
  render() {
    return (
      <div>
        <form onSubmit = {this.submit}>
            <p>Input Project Details</p>
            <label>Project Title:</label>
                <input name='title' type='text' onChange={this.handleChangeProject}/>
            <label>Document No.:</label>
                <input name='docNo' type='text' onChange={this.handleChangeProject}/>
            <label>Revision</label>
                <input name='rev' type='text' onChange={this.handleChangeProject}/>
            <p>Input Frame Details</p>
            <label>Length:</label>
                <input name='l' type='number' min='0' onChange={this.handleChangeFrame}/>
            <label>Width:</label>
                <input name='w' type='number' min='0' onChange={this.handleChangeFrame}/>
            <label>Height:</label>
                <input name='h' type='number' min='0' onChange={this.handleChangeFrame}/>
            <label>MGW:</label>
                <input name='m' type='number' min='0' onChange={this.handleChangeFrame}/>
                <br/>
            <button>Submit</button>
        </form>
      </div>
    )
  }
}

export default InputForm
