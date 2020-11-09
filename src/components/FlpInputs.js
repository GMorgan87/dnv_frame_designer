import React, { Component } from 'react'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'

class FlpInputs extends Component {

  tippy = {
    height: "Min internal height: 90mm",
    width: "Min internl width: 200mm"
  }

  render() {
    return (
      <div>
        <table className="input-table">
          <tbody>
            <tr>
              <td className="left"><label>FLP Internal Height:</label></td>
              <td className="right"><input name='flpH' type='number' min='90'defaultValue='90' onChange={this.props.handleChange}/><span>mm</span>
                <Tippy content={this.tippy.height} placement='right'>
                  <span>
                    &#9432;
                  </span>
                </Tippy>
              </td>
            </tr>
            <tr>
              <td className="left"><label>FLP Internal Width:</label></td>
              <td className="right"><input name='flpW' type='number' min='200' defaultValue='200' onChange={this.props.handleChange}/><span>mm</span>
                <Tippy content={this.tippy.width} placement='right'>
                  <span>
                    &#9432;
                  </span>
                </Tippy>
              </td>
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


