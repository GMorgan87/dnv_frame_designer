import React, { Component } from 'react'
import './InputForm.css'
import FlpInputs from './FlpInputs'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'


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
           flpFolded: false,
           noFlp: false
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

    tippy = {
      length: <p>Max length: 20,000mm</p>,
      width: <p>Max width: 5000mm</p>,
      height: <p>Max height: 5000mm</p>,
      weight: <p>Max Weight: 25,000kgs</p>,
      flpCentres: <div><p>Min: 900mm</p><p>Max: 2050mm</p></div>,
      grade: <p></p>
    }
    
  render() {
    return (
      <div>
        <form onSubmit = {this.submit} className='inputform'>
          <div className='subform'>
            <h3>Project Details</h3>
            <table className='input-table'>
              <tbody>
                <tr>
                  <td className="input-left"><label>Project Title:</label></td>
                  <td className="input-right"><input className='title-input' name='title' type='text' onChange={this.handleChangeProject} /></td>
                </tr>
                <tr>
                  <td className="input-left"><label>Client:</label></td>
                  <td className="input-right"><input className='title-input' name='client' type='text' onChange={this.handleChangeProject} /></td>
                </tr>
                <tr>
                  <td className="input-left"><label>Designer:</label></td>
                  <td className="input-right"><input className='title-input' name='designer' type='text' onChange={this.handleChangeProject} /></td>
                </tr>
                <tr>
                  <td className="input-left"><label>Document No.:</label></td>
                  <td className="input-right"><input className='title-input' name='docNo' type='text' onChange={this.handleChangeProject} /></td>
                </tr>
                <tr>
                  <td className="input-left"><label>Revision:</label></td>
                  <td className="input-right"><input className='rev-input' name='rev' type='text' onChange={this.handleChangeProject} /></td>
                </tr>
                <tr>
                  <td className="input-left">Email Address:</td>
                  <td className="input-right"><input className='title-input' name='email' type='text' onChange={this.handleChangeProject} /></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='subform'>
            <h3>Frame Details</h3>
            <div className='frame-form'>
            <table className='input-table'>
              <tbody>
                <tr>
                  <td className="input-left"><label>Length:</label></td>
                  <td className="input-right"><input name='length' type='number' min='0' onChange={this.handleChangeFrame} required/><span>mm</span>
                    <Tippy content={this.tippy.length} placement='right'>
                      <span>
                        &#9432;
                      </span>
                    </Tippy>
                    </td>
                </tr>
                <tr>
                  <td className="input-left"><label>Width:</label></td>
                  <td className="input-right"><input name='width' type='number' min='0' onChange={this.handleChangeFrame} required/><span>mm</span>
                    <Tippy content={this.tippy.width} placement='right'>
                      <span>
                        &#9432;
                      </span>
                    </Tippy>
                    </td>
                </tr>
                <tr>
                  <td className="input-left"><label>Height:</label></td>
                  <td className="input-right"><input name='height' type='number' min='0' onChange={this.handleChangeFrame} required/><span>mm</span> 
                    <Tippy content={this.tippy.height} placement='right'>
                      <span>
                        &#9432;
                      </span>
                    </Tippy>
                  </td>
                </tr>
                <tr>
                  <td className="input-left"><label>Maximum Gross Weight (MGW):</label></td>
                  <td className="input-right"><input name='mgw' type='number' min='0' max='25000' onChange={this.handleChangeFrame} required/><span>kg</span>
                    <Tippy content={this.tippy.weight} placement='right'>
                      <span>
                        &#9432;
                      </span>
                    </Tippy>
                  </td>
                </tr>
                <tr>
                  <td className="input-left"><label>Material Grade (SXXX):</label></td>
                  <td className="input-right"><input name="grade" type='number' defaultValue='355' onChange={this.handleChangeFrame} required/></td>
                </tr>
                <tr>
                  <td className="input-left"><label>Sling Angle:</label></td>
                  <td className="input-right"><select name='slingAngle' onChange={this.handleChangeFrame}>
                    <option value='30'>30</option>
                    <option value='45'>45</option>
                  </select></td>
                </tr>
                <tr>
                  <td className="input-left"><label htmlFor="noFlp">No Fork LIft Pockets</label></td>
                  <td className="input-right"><input type="checkbox" id="noFlp" name="noFlp" value="noFlp" onChange={this.handleChangeCheckbox}/></td>
                </tr>
                <tr>
                  <td className="input-left"><label>Fork Lift Pocket Centres:</label></td>
                  <td className="input-right"><input name='flpCentres' type='number' min='900' max='2050' disabled={this.state.checkboxes.noFlp} onChange={this.handleChangeFrame} required/><span>mm</span>
                    <Tippy content={this.tippy.flpCentres} placement='right'>
                      <span>
                        &#9432;
                      </span>
                    </Tippy>
                    </td>
                </tr>
                <tr>
                  <td className="input-left"><label htmlFor="flpFolded">Use folded plate for fork lift pockets</label></td>
                  <td className="input-right"><input type="checkbox" id="flpFolded" name="flpFolded" value="flpFolded" disabled={this.state.checkboxes.noFlp} onChange={this.handleChangeCheckbox}/></td>
                </tr>
                <tr>
                  <td className="input-left"><label htmlFor="endRail">Match end rails with side rails</label></td>
                  <td className="input-right"><input type="checkbox" id="endRail" name="endRail" value="endRail" onChange={this.handleChangeCheckbox}/></td>
                </tr>
              </tbody>
            </table>
              {this.state.checkboxes.flpFolded
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
