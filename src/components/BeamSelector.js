import React, { Component } from 'react'
import './BeamSelector.css'

class BeamSelector extends Component {

  getBeamOptions(arr){
    return arr.map((beam, index) => {
      if (index === 0) {
        return <option selected value={index} key={beam.id}>{beam.desc}</option>
      }
    return <option value={index} key={beam.id}>{beam.desc}</option>
    })}

  getPadeyeOptions(arr){
  return arr.map((padeye, index) => {
    if (index === 0) {
      return <option selected value={index} key={padeye.swl}>{padeye.swl}</option>
    }
    return<option value={index} key={padeye.swl}>{padeye.swl}</option>})
    }

  submit = (event) => {
    event.preventDefault()
    this.props.getCalcReport()
  }

  baseRails(){
    if (this.props.endRail) {
      return  <tr>
                <td><label>Base Rails:</label></td>
                <td><select name="baseSideRail"  onChange={this.props.handleBeamChange}>
                  {this.getBeamOptions(this.props.protoFrame.baseSideRail)}
                </select> </td>
              </tr>
    } else {
      return <>
              <tr>
                <td><label>Base Side Rail:</label></td>
                <td><select name="baseSideRail"  onChange={this.props.handleBeamChange}>
                  {this.getBeamOptions(this.props.protoFrame.baseSideRail)}
                </select> </td>
              </tr>
              <tr>
                <td><label>Base End Rail: </label></td>
                <td><select name="baseEndRail" onChange={this.props.handleBeamChange}>
                  {this.getBeamOptions(this.props.protoFrame.baseEndRail)}
                </select> </td>
              </tr>
             </>
    }
  }

  topRails(){
    if (this.props.endRail){
      return <tr>
              <td><label>Top Rails: </label></td>
              <td><select name="topSideRail" onChange={this.props.handleBeamChange}>
                {this.getBeamOptions(this.props.protoFrame.topSideRail)}
                </select>  </td>
            </tr>
     
    } else {
      return <>
                <tr>
                  <td><label>Top Side Rail: </label></td>
                  <td><select name="topSideRail" onChange={this.props.handleBeamChange}>
                    {this.getBeamOptions(this.props.protoFrame.topSideRail)}
                    </select>  </td>
                </tr>
                <tr>
                  <td><label>Top End Rail: </label></td>
                  <td><select name="topEndRail" onChange={this.props.handleBeamChange}>
                    {this.getBeamOptions(this.props.protoFrame.topEndRail)}
                    </select>  </td>
                </tr>
              </>
    }
  }
  
  render() {
    return (
      <div>
        <form onSubmit={this.submit} className="beam-form">
          <div className="subform">
          <h3>Suggested Design</h3>
          <table>
            <tbody>
              {this.baseRails()}
              {this.props.noFlp?
              <></>
              :
              <tr>
                <td><label>Forklift Pocket: </label></td>
                <td><select name="forkliftPocket" onChange={this.props.handleBeamChange}>
                  {this.getBeamOptions(this.props.protoFrame.forkliftPocket)}
                  </select>  </td>
              </tr>
              }
              <tr>
                <td><label>Corner Post: </label></td>
                <td><select name="cornerPost" onChange={this.props.handleBeamChange}>
                  {this.getBeamOptions(this.props.protoFrame.cornerPost)}
                  </select>  </td>
              </tr>
              {this.topRails()}
              <tr>
                <td><label>Padeye: </label></td>
                <td><select name="padeye" onChange={this.props.handleBeamChange}>
                {this.getPadeyeOptions(this.props.protoFrame.padeye)}
                </select>  </td>
              </tr>
            </tbody>
          </table>
            
          </div>
          <button className="confirm-button" type="submit">Confirm Selection</button>
        </form>
      </div>
    )
  }
}

export default BeamSelector

