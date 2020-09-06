import React, { Component } from 'react'
import '../BeamSelector.css'

class BeamSelector extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  getBeamOptions(arr){
    // console.log('getbeamoptions: ', arr)
    return arr.map(beam => <option value={beam} key={beam.id}>{beam.desc}</option>)
    }
  
  
  render() {
    return (
      <div>
        <form className="beam-form">
          <h3>Beam Selector</h3>
          <div className="user-input">
          <label >Base Side Rail: </label>
            <select name="bsr" id="bsr">
              {this.getBeamOptions(this.props.protoFrame.baseSideRail)}
            </select>
          </div>
          <div className="user-input">
          <label>Base End Rail: </label>
            <select>
              {this.getBeamOptions(this.props.protoFrame.baseEndRail)}
            </select>
          </div>
          <div className="user-input">
          <label>Forklift Pocket: </label>
            <select>
              {this.getBeamOptions(this.props.protoFrame.forkliftPocket)}
            </select>
          </div>
          <div className="user-input">
          <label>Corner Post: </label>
            <select>
              {this.getBeamOptions(this.props.protoFrame.cornerPost)}
            </select>
          </div>
          <div className="user-input">
          <label>Top Side Rail: </label> 
            <select>
              {this.getBeamOptions(this.props.protoFrame.topSideRail)}
            </select>
          </div>
          <div className="user-input">
          <label>Top End Rail: </label>
            <select>
              {this.getBeamOptions(this.props.protoFrame.topEndRail)}
            </select>
          </div>
          <button type="submit">Confirm Selection</button>
        </form>
      </div>
    )
  }
}

export default BeamSelector

