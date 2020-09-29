import React from 'react'
import Enhancement from '../../Helpers/Enhancement'

const PadeyeCalcs = (props) => {
    const enhancement = Enhancement[props.frame.mgw-(props.frame.mgw%500)]
    const length = props.frame.length - (props.frame.cornerPost.x*2)
    const width = props.frame.width - (props.frame.cornerPost.x*2)
    const diagonal = Math.sqrt(length**2 + width**2)
    const slingLength = props.frame.slingAngle === 30 ? diagonal : Math.SQRT2*(diagonal/2)
    const angleRad = props.frame.slingAngle * (Math.PI / 180)
    const rsl = Math.round((3 * props.frame.mgw * 9.81)/(3 * Math.cos(angleRad)))
    const vRsl = Math.round(rsl * Math.cos(angleRad))
    const hRsl = Math.round(rsl * Math.sin(angleRad))
  return (
    <>
      <p className="header">SLING ASSEMBLY SELECTION:</p>
      <table>
          <tbody>
              <tr>
                  <td className="left">Sling Angle =</td>
                  <td className="right">{props.frame.slingAngle}&#176; from vertical</td>
              </tr>
              <tr>
                  <td className="left">From DNVGL-ST-E271 Table 8.1 -</td>
                  <td className="right"> Enhancement Factor: {enhancement}</td>
              </tr>
              <tr>
                  <td className="left">WLL<sub>min</sub> =</td>
                  <td className="right">{(props.frame.mgw*enhancement).toFixed(0)} kg</td>
              </tr>
              <tr></tr>
              <tr>
                  <td>Use {props.frame.padeye.swl} T shackle</td>
                  <td>Min sling leg length {slingLength.toFixed(2)} mm</td>
              </tr>
          </tbody>
      </table>
      <p className="header">PADEYE DESIGN:</p>
      <table>
          <tbody>
              <tr>
                  <td>RSL</td>
                  <td>=</td>
                  <td className="calc-top">3 x R x g</td>
                  <td>=</td>
                  <td className="calc-top">3 x {props.frame.mgw} x 9.81</td>
                  <td>=</td>
                  <td><strong>{rsl}</strong> N</td>
              </tr>
              <tr>
                  <td></td>
                  <td></td>
                  <td className="calc-bottom">(n-1) x cos {props.frame.slingAngle}</td>
                  <td></td>
                  <td className="calc-bottom">(3-1) x cos {props.frame.slingAngle}</td>
              </tr>
          </tbody>
      </table>
      <table>
          <tbody>
              <tr>
                  <td>Vertical component of RSL</td>
                  <td>=</td>
                  <td>{rsl} x Cos {props.frame.slingAngle}</td>
                  <td>=</td>
                  <td><strong>{vRsl}</strong> N</td>
              </tr>
              <tr>
                  <td>Horizontal component of RSL</td>
                  <td>=</td>
                  <td>{rsl} x Sin {props.frame.slingAngle}</td>
                  <td>=</td>
                  <td><strong>{hRsl}</strong> N</td>
              </tr>
              <tr>
                  <td>5% out of plane</td>
                  <td>=</td>
                  <td>{rsl} x 0.05</td>
                  <td>=</td>
                  <td><strong>{Math.round(rsl * 0.05)}</strong> N</td>
              </tr>
          </tbody>
      </table>
      <p className="header">CHECK STRESS AT PADEYE:</p>
      <table>
          <tbody>
              <tr>
                  <td>Tear out stress</td>
                  <td>=</td>
                  <td>3 x RSL</td>
                  <td>=</td>
                  <td></td>
              </tr>
          </tbody>
      </table>
      
    </>
  )
}

export default PadeyeCalcs
