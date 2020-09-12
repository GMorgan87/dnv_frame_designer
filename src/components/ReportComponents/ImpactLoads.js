import React from 'react'
import './ImpactLoads.css'

const ImpactLoads = (props) => {
    console.log('ImpactLoad comp. props: ', props)
  return (
    <div className='impact-load-calcs'>
        <p>Impact Load - Horizontal</p>
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
            </tbody>
        </table>
        {/* <p>Section Length</p>
        <p>Elastic Modulus Z</p>
        <p>Moment Of Inertia I</p>
        <p>Max Gross</p>
        <p>Horizontal Impact W = (0.25 x MGW x 9.81</p> */}
    </div>
  )
}

export default ImpactLoads
