import React, { Component } from 'react'

class CheckBoxes extends Component {
  render() {
    return (
      <div>
        <input type="checkbox" id="endRail" name="endRail" value="endRail"/>
            <label for="endRail">Match end rails with side rails</label><br></br>
        <input type="checkbox" id="cornerPost" name="cornerPost" value="cornerPost"/>
            <label for="endRail">Match corner post width with side rail width</label><br></br>
        <input type="checkbox" id="flp" name="flp" value="flp"/>
            <label for="endRail">Use folded plate for fork lift pockets</label><br></br>
      </div>
    )
  }
}

export default CheckBoxes
