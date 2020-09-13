import React from 'react'
import './ForkliftCalcs.css'

const ForkliftCalcs = (props) => {

    const w = props.frame.design25/2
    const z = props.frame.forkliftPocket.zyy*1000
    const i = props.frame.forkliftPocket.iyy*10000
    const maxStress = (w*props.frame.forkliftPocket.span)/(8*z)
    const maxDeflection = (w*(props.frame.forkliftPocket.span)**3)/(192*205000*i)
    const lT = "<"


  return (
    <>
      <p className="header">CHECK FORK POCKETS - LOAD SUPPORTING (ALSO DURING LIFTING BY FORK TRUCK):</p>
        <p>Assume payload is applied equally at centres of both FLP's.</p>
        <table className="data">
            <tbody>
                <tr>
                    <td className="left">Section =</td>
                    <td>{props.frame.forkliftPocket.desc}</td>
                </tr>
                <tr>
                    <td className="left">Z<sub>yy</sub> =</td>
                    <td>{z} mm<sup>3</sup></td>
                </tr>
                <tr>
                    <td className="left">I<sub>yy</sub> =</td>
                    <td>{i} mm<sup>4</sup></td>
                </tr>
            </tbody>
        </table>
        <table className="data">
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
        <table className="calcs">
            <tbody>
                <tr>
                    <td className="">W</td>
                    <td>=</td>
                    <td className="calc-top">F<sub>L</sub></td>
                    <td>=</td>
                    <td className="calc-top">{props.frame.design25}</td>
                    <td>=</td>
                    <td><strong>{w}</strong> N</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td className="calc-bottom">2</td>
                    <td></td>
                    <td className="calc-bottom">2</td>
                    
                </tr>
                <tr></tr>
                <tr>
                    <td className="">Max Stress</td>
                    <td>=</td>
                    <td className="calc-top">W x L</td>
                    <td>=</td>
                    <td className="calc-top">{w} x {props.frame.forkliftPocket.span}</td>
                    <td>=</td>
                    <td><strong>{maxStress.toFixed(2)}</strong> Mpa</td>
                    
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td className="calc-bottom">8 x Z</td>
                    <td></td>
                    <td className="calc-bottom">8 x {z}</td>
                    <td></td>
                    <td colspan='2'>{lT} 0.85 x {props.frame.grade} = {props.frame.grade*0.85} Mpa</td>
                </tr>
                <tr></tr>
                <tr>
                    <td className="">Max Deflection</td>
                    <td>=</td>
                    <td className="calc-top">W x L<sup>3</sup></td>
                    <td>=</td>
                    <td className="calc-top">{w} x {props.frame.forkliftPocket.span}<sup>3</sup></td>
                    <td>=</td>
                    <td><strong>{maxDeflection.toFixed(2)}</strong> mm</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td className="calc-bottom">192 x E x I</td>
                    <td></td>
                    <td className="calc-bottom">192 x 205000 x {i}</td>
                    <td></td>
                    <td colspan='2'>{lT} L/250 = {props.frame.forkliftPocket.span/250}mm</td>
                </tr>
            </tbody>
        </table>
    </>
  )
}

export default ForkliftCalcs
