import React, { Component } from 'react'
import './InputForm.css'
import FlpInputs from './FlpInputs'

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
             length: 0,
             width: 0,
             height: 0,
             mgw: 0,
             flpCentres: 2050,
             grade: 355,
             slingAngle: 30,
             flpH: 90,
             flpW: 200,
             flpT: 6
         },
         checkboxes: {
           endRail: false,
           cornerPost: false,
           flp: false
         }
      }
      this.handleChangeFrame = this.handleChangeFrame.bind(this);
      this.handleChangeProject = this.handleChangeProject.bind(this);
      this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
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

      handleChangeCheckbox(event){
        let propertyName = event.target.name
        let checkboxes = this.state.checkboxes
        checkboxes[propertyName] = !checkboxes[propertyName]
        this.setState({checkboxes: checkboxes})
      }

    submit(event){
        event.preventDefault()
        this.props.handleSubmit(this.state.frameDims, this.state.projectDetails, this.state.checkboxes)
    }
    
  render() {
    return (
      <div>
        <form onSubmit = {this.submit} className='inputform'>
          <div className='subform'>
            <h3>Project Details</h3>
            <div className='user-input'>
            <label>Company:</label>
                <input className='title-input' name='company' type='text' onChange={this.handleChangeProject} />
            </div>
            <div className='user-input'>
            <label>Designer:</label>
                <input className='title-input' name='designer' type='text' onChange={this.handleChangeProject} />
            </div>
            <div className='user-input'>
            <label>Project Title:</label>
                <input className='title-input' name='title' type='text' onChange={this.handleChangeProject} />
            </div>
            <div className='user-input'>
            <label>Document No.:</label>
                <input name='docNo' type='text' onChange={this.handleChangeProject} />
            <label>Revision:</label>
                <input className='rev-input' name='rev' type='text' onChange={this.handleChangeProject} />
            </div>
          </div>
          <div className='subform'>
            <h3>Frame Details</h3>
            <div className='frame-form'>
              <div className='frame-input'>
                <label>Length:</label>
                  <input name='length' type='number' min='0' onChange={this.handleChangeFrame} required/>
              </div>
              <div className='frame-input'>
                <label>Width:</label>
                  <input name='width' type='number' min='0' onChange={this.handleChangeFrame} required/>
              </div>
              <div className='frame-input'>
                <label>Height:</label>
                    <input name='height' type='number' min='0' onChange={this.handleChangeFrame} required/>
              </div>
              <div className='frame-input'>
                <label>Fork Lift Pocket Centres:</label>
                  <input name='flpCentres' type='number' min='0' onChange={this.handleChangeFrame} required/>
              </div>
              <div className='frame-input'>
                <label>MGW:</label>
                  <input name='mgw' type='number' min='0' max='25000' onChange={this.handleChangeFrame} required/>
              </div>
              <div className='frame-input'>
                <label>Steel Grade (SXXX):</label>
                  <input name="grade" type='number' defaultValue='355' onChange={this.handleChangeFrame} required/>
              </div>
              <div className='frame-input'>
                <label>Sling Angle:</label>
                  <select name='slingAngle' onChange={this.handleChangeFrame}>
                    <option value='30'>30</option>
                    <option value='45'>45</option>
                  </select>
              </div>
              <div className='frame-input'>
                <input type="checkbox" id="endRail" name="endRail" value="endRail" onChange={this.handleChangeCheckbox}/>
                <label htmlFor="endRail">Match end rails with side rails</label>
              </div>
              <div className='frame-input'>
                <input type="checkbox" id="flp" name="flp" value="flp" onChange={this.handleChangeCheckbox}/>
                <label htmlFor="flp">Use folded plate for fork lift pockets</label>
              </div>
              {this.state.checkboxes.flp
              ?
              <FlpInputs handleChange={this.handleChangeFrame}/>
              :
              <div></div>
              }
              </div>
            </div>
            <button className='calc-button' type='submit'>Calculate</button>
        </form>
      </div>
    )
  }
}

export default InputForm
