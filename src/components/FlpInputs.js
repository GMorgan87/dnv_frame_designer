import React, { Component } from 'react'

class FlpInputs extends Component {
  render() {
    return (
      <div>
        <div className='frame-input'>
            <label>FLP Internal Height:</label>
                <input name='flpH' type='number' min='90'defaultValue='90' onChange={this.props.handleChange}/><span>mm</span>
        </div>
        <div className='frame-input'>
            <label>FLP Internal Width:</label>
                <input name='flpW' type='number' min='200' defaultValue='200' onChange={this.props.handleChange}/><span>mm</span>
        </div>
        <div className='frame-input'>
            <label>FLP Plate Thickness:</label>
                <input name='flpT' type='number' min='6' defaultValue='6' onChange={this.props.handleChange}/><span>mm</span>
        </div>
      </div>
    )
  }
}

export default FlpInputs


