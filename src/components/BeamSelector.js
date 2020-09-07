import React, { Component } from 'react'
import '../BeamSelector.css'

class BeamSelector extends Component {

  // constructor(props) {
  //   super(props)
    // this.state = {
    //   frame:{
    //     baseSideRail: props.protoFrame.baseSideRail[0],
    //     baseEndRail: props.protoFrame.baseEndRail[0],
    //     forkliftPocket: props.protoFrame.forkliftPocket[0],
    //     cornerPost: props.protoFrame.cornerPost[0],
    //     topSideRail: props.protoFrame.topSideRail[0],
    //     topEndRail: props.protoFrame.topEndRail[0],
    //     padeye: props.protoFrame.padeye[0]
    //   }
    // }
    // this.handleChange = this.handleChange.bind(this)
  // }

  // componentDidUpdate(prevProps){
  //   for (let key of Object.keys(this.state.frame)){
  //     if (prevProps.protoFrame[key] !== this.props.protoFrame[key]){
  //       let frame = this.state.frame
  //       frame[key] = this.props.protoFrame[key][0];
  //       this.setState({frame: frame})
  //     }
  //   }
  // }

  getBeamOptions(arr){
    return arr.map((beam, index) => <option value={index} key={beam.id}>{beam.desc}</option>)
    }

  getPadeyeOptions(arr){
    return arr.map((padeye, index) => <option value={index} key={padeye.swl}>{padeye.swl}</option>)
    }

  // handleChange(event){
  //   let propertyName = event.target.name;
  //   let frame = this.state.frame
  //   frame[propertyName] = this.props.protoFrame[propertyName][event.target.value];
  //   this.setState({frame: frame})
  // }

  submit(event){
    event.preventDefault()
    this.props.handleSubmit(this.state.frame)
  }
  
  render() {
    return (
      <div>
        <form onSubmit={this.submit} className="beam-form">
          <h3>Suggested Design</h3>
          <div className="user-input">
          <label >Base Side Rail: </label>
            <select name="baseSideRail" defaultValue={this.props.protoFrame.baseSideRail[0]} onChange={this.props.handleFrameChange}>
              {this.getBeamOptions(this.props.protoFrame.baseSideRail)}
            </select>
          </div>
          <div className="user-input">
          <label>Base End Rail: </label>
            <select name="baseEndRail" onChange={this.props.handleFrameChange}>
              {this.getBeamOptions(this.props.protoFrame.baseEndRail)}
            </select>
          </div>
          <div className="user-input">
          <label>Forklift Pocket: </label>
            <select name="forkliftPocket" onChange={this.props.handleFrameChange}>
              {this.getBeamOptions(this.props.protoFrame.forkliftPocket)}
            </select>
          </div>
          <div className="user-input">
          <label>Corner Post: </label>
            <select name="cornerPost" onChange={this.props.handleFrameChange}>
              {this.getBeamOptions(this.props.protoFrame.cornerPost)}
            </select>
          </div>
          <div className="user-input">
          <label>Top Side Rail: </label> 
            <select name="topSideRail" onChange={this.props.handleFrameChange}>
              {this.getBeamOptions(this.props.protoFrame.topSideRail)}
            </select>
          </div>
          <div className="user-input">
          <label>Top End Rail: </label>
            <select name="topEndRail" onChange={this.props.handleFrameChange}>
              {this.getBeamOptions(this.props.protoFrame.topEndRail)}
            </select>
          </div>
          <div className="user-input">
          <label>Padeye: </label>
            <select name="padeye" onChange={this.props.handleFrameChange}>
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

