import React, { Component } from 'react'

class FlpInputs extends Component {
  render() {
    return (
      <div>
        <div className='frame-input'>
            <label>FLP internal Height:</label>
                <input name='flph' type='number' min='90'/>
        </div>
        <div className='frame-input'>
            <label>FLP Internal Width:</label>
                <input name='flpw' type='number' min='200'/>
        </div>
        <div className='frame-input'>
            <label>FLP Plate Thickness:</label>
                <input name='mgw' type='number' min='6'/>
        </div>
      </div>
    )
  }
}

export default FlpInputs
