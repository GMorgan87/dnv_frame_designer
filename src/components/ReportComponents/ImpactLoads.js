import React from 'react'
import './ImpactLoads.css'

const ImpactLoads = (props) => {
    console.log('ImpactLoad comp. props: ', props)
  return (
    <div className='impact-load-calcs'>
        <p>Impact Load - {props.orient}</p>
        <table>
            <tbody>
                <tr>
                    <td>Section Description:</td>
                    <td>{props.beam.desc.substring(0,3)}</td>
                </tr>
                <tr>
                    <td>Material Specified Min. Yield Stress</td>
                    <td>355</td>
                </tr>
                <tr>
                    <td>Section Size</td>
                    <td>{props.beam.desc.substring(4)}</td>
                </tr>
                <tr>
                    <td>Section Length</td>
                    <td>{props.beam.length}</td>
                </tr>
                <tr>
                    <td>Elastic Modulus Z</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Moment of Inertia I</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Max Gross</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Horizontal Impact W = ({props.factor} x MGW x 9.81</td>
                    <td></td>
                </tr>
            </tbody>
        </table>
        
    </div>
  )
}

export default ImpactLoads
