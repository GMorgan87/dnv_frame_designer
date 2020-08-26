import React, { Component } from 'react'

class BeamSelector extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  
  render() {
    return (
      <div>
        <h2>Beam Selector</h2>
        <p>Base Side Rail: {this.props.protoFrame.baseSideRail.desc}</p>
        <p>Base End Rail: {this.props.protoFrame.baseEndRail.desc}</p>
        <p>Top End Rail: {this.props.protoFrame.topEndRail.desc}</p>
        <p>Corner Post: {this.props.protoFrame.cornerPost.desc}</p>
      </div>
    )
  }
}

export default BeamSelector

