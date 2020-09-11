import React, { Component } from 'react'
import '../BeamSelector.css'
// import equal from 'fast-deep-equal'

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
  
  render() {
    return (
      <div>
        <form onSubmit={this.submit} className="beam-form">
          <h3>Suggested Design</h3>
          <div className="user-input">
          <label >Base Side Rail: </label>
            <select name="baseSideRail"  onChange={this.props.handleBeamChange}>
              {this.getBeamOptions(this.props.protoFrame.baseSideRail)}
            </select>
          </div>
          <div className="user-input">
          <label>Base End Rail: </label>
            <select name="baseEndRail" onChange={this.props.handleBeamChange}>
              {this.getBeamOptions(this.props.protoFrame.baseEndRail)}
            </select>
          </div>
          <div className="user-input">
          <label>Forklift Pocket: </label>
            <select name="forkliftPocket" onChange={this.props.handleBeamChange}>
              {this.getBeamOptions(this.props.protoFrame.forkliftPocket)}
            </select>
          </div>
          <div className="user-input">
          <label>Corner Post: </label>
            <select name="cornerPost" onChange={this.props.handleBeamChange}>
              {this.getBeamOptions(this.props.protoFrame.cornerPost)}
            </select>
          </div>
          <div className="user-input">
          <label>Top Side Rail: </label> 
            <select name="topSideRail" onChange={this.props.handleBeamChange}>
              {this.getBeamOptions(this.props.protoFrame.topSideRail)}
            </select>
          </div>
          <div className="user-input">
          <label>Top End Rail: </label>
            <select name="topEndRail" onChange={this.props.handleBeamChange}>
              {this.getBeamOptions(this.props.protoFrame.topEndRail)}
            </select>
          </div>
          <div className="user-input">
          <label>Padeye: </label>
            <select name="padeye" onChange={this.props.handleBeamChange}>
              {this.getPadeyeOptions(this.props.protoFrame.padeye)}
            </select>
          </div>
          <button className="confirm-button" type="submit">Confirm Selection</button>
        </form>
      </div>
    )
  }
}

export default BeamSelector

