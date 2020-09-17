import React, { Component } from 'react'

class FlpInputs extends Component {
  render() {
    return (
      <div>
        <table className="input-table">
          <tbody>
            <tr>
              <td className="left"><label>FLP Internal Height:</label></td>
              <td className="right"><input name='flpH' type='number' min='90'defaultValue='90' onChange={this.props.handleChange}/><span>mm</span></td>
            </tr>
            <tr>
              <td className="left"><label>FLP Internal Width:</label></td>
              <td className="right"><input name='flpW' type='number' min='200' defaultValue='200' onChange={this.props.handleChange}/><span>mm</span></td>
            </tr>
            <tr>
              <td className="left"><label>FLP Plate Thickness:</label></td>
              <td className="right"><input name='flpT' type='number' min='6' defaultValue='6' onChange={this.props.handleChange}/><span>mm</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default FlpInputs


