import React from 'react'
import './Details.css'

const Details = (props) => {
  return (
    <>
      <p className="header">WEIGHTS:</p>
      <table>
          <tbody>
              <tr>
                  <td className="left">Tare Mass =</td>
                  <td className="right">{props.frame.tare} kg</td>
              </tr>
              <tr>
                  <td className="left">Payload =</td>
                  <td className="right">{props.frame.mgw - props.frame.tare} kg</td>
              </tr>
              <tr>
                  <td className="left">Maximum Gross Rating =</td>
                  <td className="right">{props.frame.mgw} kg</td>
              </tr>
          </tbody>
      </table>
      <br/>
        <p className="header">OVERALL DIMENSIONS:</p>
        <table>
            <tbody>
                <tr>
                    <td className="left">Length L =</td>
                    <td className="right">{props.frame.length} mm</td>
                </tr>
                <tr>
                    <td className="left">Width W =</td>
                    <td className="right">{props.frame.width} mm</td>
                </tr>
                <tr>
                    <td className="left">Height H =</td>
                    <td className="right">{props.frame.height} mm</td>
                </tr>
            </tbody>
        </table>
        <p className="header">DESIGN TEMPERATURE:</p>
        <table>
            <tbody>
                <tr>
                    <td className="left">Design Temperature T<sub>D</sub> =</td>
                    <td className="right">(-) 20<sup>o</sup>C</td>
                </tr>
            </tbody>
        </table>
        <p className="header">DESIGN LOAD:</p>
        <table>
            <tbody>
                <tr>
                    <td>Design Load F<sub>L</sub> =</td>
                    <td>2.5 x R x g</td><td>=</td>
                    <td>2.5 x {props.frame.mgw} x 9.81</td><td>=</td>
                    <td>{props.frame.design25} N</td>
                </tr>
            </tbody>
        </table>
        <p className="header">MATERIAL SPECIFICATIONS:</p>
            <p>Primary Structure Material:</p>
            <table>
                <tbody>
                    <tr>
                        <td>Square Hollow Section/Rectangular Hollow Section:</td>
                        <td>BS EN10210-1 S{props.frame.grade} J2H</td>
                    </tr>
                    <tr>
                        <td>Padeye Plate:</td>
                        <td>BS EN10025-2 S{props.frame.grade} J2G3</td>
                    </tr>
                </tbody>
            </table>
        <p className="header">ALLOWABLE DESIGN STRESS:</p>
            <p>For the design loads defined, unless otherwise specified, stress level shall not exceed 0.85 x Re</p>
            <table>
                <tbody>
                    <tr>
                        <td>Max. permissible stress =</td>
                        <td>0.85 x R<sub>e</sub></td><td>=</td>
                        <td>S{props.frame.grade}</td><td>=</td>
                        <td>{(props.frame.grade*0.85).toFixed(2)} Mpa</td>
                    </tr>
                </tbody>
            </table>
        <p className="header">ALLOWABLE DEFLECTION:</p>
            <p>Maximum calculated deflections for all point lifting and lifting by fork lift shall not exceed: L/300</p>
            <p>Maximum calculated deflections for impact loads shall not exceed: L/250</p>
        <p className="header">CONSTANTS:</p>
        <table>
            <tbody>
                <tr>
                    <td>Gravity</td>
                    <td>g</td>
                    <td>=</td>
                    <td>9.81 m/s<sub>2</sub></td>
                </tr>
                <tr>
                    <td>Young's Modulus</td>
                    <td>E</td>
                    <td>=</td>
                    <td>205000 Mpa</td>
                </tr>
            </tbody>
        </table>
    </>
  )
}

export default Details
