import React from 'react'
import './ImpactLoads.css'

const ImpactLoads = (props) => {
     const z = () => {if (props.orient==="Vertical") {
        return props.beam.zxx * 1000
     } else {
        return props.beam.zyy * 1000
     }}

     const i = () => {if (props.orient==="Vertical") {
        return props.beam.ixx * 10000
     } else {
        return props.beam.iyy * 10000
     }
    }

    const w = () => Math.round(props.mgw * props.factor * 9.81)


  return (
    <div className='impact-load-calcs'>
        <p className="beam-title">{props.title}</p>
        <p><strong>Impact Load - {props.orient}</strong></p>
        <table>
            <tbody>
                <tr>
                    <td className="left">Section Description:</td>
                    <td className="right">{props.beam.desc.substring(0,3)}</td>
                </tr>
                <tr>
                    <td className="left">Material Specified Min. Yield Stress:</td>
                    <td className="right">{props.grade} Mpa</td>
                </tr>
                <tr>
                    <td className="left">Section Size:</td>
                    <td className="right">{props.beam.desc.substring(4)} mm</td>
                </tr>
                <tr>
                    <td className="left">Section Length:</td>
                    <td className="right">{props.beam.length} mm</td>
                </tr>
                <tr>
                    <td className="left">Elastic Modulus Z:</td>
                    <td className="right">{z()} mm<sup>3</sup></td>
                </tr>
                <tr>
                    <td className="left">Moment of Inertia I:</td>
                    <td className="right">{i()} mm<sup>4</sup></td>
                </tr>
                <tr>
                    <td className="left">Max Gross:</td>
                    <td className="right">{props.mgw} kg</td>
                </tr>
                <tr>
                    <td className="left">Horizontal Impact W = ({props.factor}xMGWxg):</td>
                    <td className="right">{w()} N</td>
                </tr>
                <tr>
                    <td className="left">Young's Modulus E:</td>
                    <td className="right">205000 Mpa</td>
                </tr>
                <tr></tr>
                <tr>
                    <td className="left">Maximum Stress (WL/8Z):</td>
                    <td className="right">{((w()*props.beam.length)/(8*z())).toFixed(2)} Mpa</td>
                </tr>
                <tr>
                    <td className="left">Allowable Stress (0.85 x R<sub>e</sub>):</td>
                    <td className="right">{(props.grade*0.85).toFixed(2)} Mpa</td>
                </tr>
                <tr>
                    <td className="left">Maximum Stress Accept/Fail:</td>
                    <td>ACCEPT</td>
                </tr>
                <tr>
                    <td className="left">Maximum Deflection (WL^3/192EI):</td>
                    <td className="right">{((w()*(props.beam.length**3))/(39360000*i())).toFixed(2)} mm</td>
                </tr>
                <tr>
                    <td className="left">Allowable Deflection (L/250):</td>
                    <td className="right">{(props.beam.length / 250).toFixed(2)} mm</td>
                </tr>
                <tr>
                    <td className="left">Maximum Deflection Accept/Fail:</td>
                    <td>ACCEPT</td>
                </tr>
            </tbody>
        </table>
        
    </div>
  )
}



export default ImpactLoads
