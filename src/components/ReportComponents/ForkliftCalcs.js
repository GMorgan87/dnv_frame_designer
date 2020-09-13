import React from 'react'
import './ForkliftCalcs.css'

const ForkliftCalcs = (props) => {
  return (
    <>
      <p className="header">CHECK FORK POCKETS - LOAD SUPPORTING (ALSO DURING LIFTING BY FORK TRUCK):</p>
        <p>Assume payload is applied equally at centres of both FLP's.</p>
        <table>
            <tbody>
                <tr>
                    <td className="left">Section =</td>
                    <td>{props.frame.forkliftPocket.desc}</td>
                </tr>
                <tr>
                    <td className="left">Z<sub>yy</sub> =</td>
                    <td>{props.frame.forkliftPocket.zyy*1000} mm<sup>3</sup></td>
                </tr>
                <tr>
                    <td className="left">I<sub>yy</sub> =</td>
                    <td>{props.frame.forkliftPocket.iyy*10000} mm<sup>4</sup></td>
                </tr>
            </tbody>
        </table>
        <table>
            <tbody>
                <tr>
                    <td className="left">Design Load = </td>
                    <td>2.5 x R<sub>e</sub> x g</td>
                </tr>
                <tr>
                    <td className="left">F<sub>L</sub> = </td>
                    <td>2.5 x {props.frame.mgw} x g</td>
                </tr>
                <tr>
                    <td className="left">F<sub>L</sub> = </td>
                    <td><strong>{props.frame.design25}</strong> N</td>
                </tr>
            </tbody>
        </table>
    </>
  )
}

export default ForkliftCalcs
