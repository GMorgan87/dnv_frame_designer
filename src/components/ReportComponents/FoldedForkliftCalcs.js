import React from 'react'
import './ForkliftCalcs.css'


const FoldedForkliftCalcs = (props) => {

    const w = props.frame.design25/2
    const z = props.frame.forkliftPocket.zyy*1000
    const i = props.frame.forkliftPocket.iyy*10000
    const maxStress = (w*props.frame.forkliftPocket.span)/(8*z)
    const maxDeflection = (w*(props.frame.forkliftPocket.span)**3)/(192*205000*i)
    const lT = "<"
    const b = props.frame.forkliftPocket.x
    const d = props.frame.forkliftPocket.y
    const h = props.frame.forkliftPocket.x-(2*props.frame.forkliftPocket.thk)
    const k = props.frame.forkliftPocket.y-(2*props.frame.forkliftPocket.thk)


  return (
    <>
      <p className="header">CHECK FORK POCKETS - LOAD SUPPORTING (ALSO DURING LIFTING BY FORK TRUCK):</p>
        <p>Assume payload is applied equally at centres of both FLP's.</p>
        
        <table>
            <tbody>
                <tr></tr>
                <tr>
                    <td>Section Modulus Z</td>
                    <td>=</td>
                    <td className="calc-top">bd<sup>3</sup>-hk<sup>3</sup></td>
                    <td>=</td>
                    <td className="calc-top">({b} x {d}<sup>3</sup>) - ({h} x {k}<sup>3</sup>)</td>
                    <td>=</td>
                    <td>{Math.round(((b*(d**3))-(h*(k**3)))/(6*d))}mm<sup>3</sup></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td className="calc-bottom">6d</td>
                    <td></td>
                    <td className="calc-bottom">6 x {d}</td>
                </tr>
                <tr></tr>
                <tr>
                    <td>Moment of Inertia I</td>
                    <td>=</td>
                    <td className="calc-top">bd<sup>3</sup>-hk<sup>3</sup></td>
                    <td>=</td>
                    <td className="calc-top">({b} x {d}<sup>3</sup>) - ({h} x {k}<sup>3</sup>)</td>
                    <td>=</td>
                    <td>{Math.round(((b*(d**3))-(h*(k**3)))/12)}mm<sup>4</sup></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td className="calc-bottom">12</td>
                    <td></td>
                    <td className="calc-bottom">12</td>
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
                    <td></td>
                    <p>{lT}0.85 x {props.frame.grade} = {props.frame.grade*0.85} Mpa</p>
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
                    <td></td>
                    <p>{lT}L/250 = {props.frame.forkliftPocket.span/250}mm</p>
                </tr>
            </tbody>
        </table>
    </>
  )
}

export default FoldedForkliftCalcs
