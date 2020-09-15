import React from 'react'

const SideRailCalcs = (props) => {

    const lT = '<'

  return (
    <>
        <br/>
        <p>CHECK CORNER POSTS DURING LIFTING:</p>
        <table className="data">
            <tbody>
                <tr>
                    <td className="left">Section =</td>
                    <td>{props.frame.cornerPost.desc}</td>
                </tr>
                <tr>
                    <td className="left">C.S.A. =</td>
                    <td>{props.frame.cornerPost.csa*100} mm<sup>2</sup></td>
                </tr>
            </tbody>
        </table>
        <table className="calcs">
            <tbody>
                <tr>
                    <td>Tensile Stress</td>
                    <td>=</td>
                    <td className='calc-top'>F</td>
                    <td>=</td>
                    <td className='calc-top'>{props.frame.design25}</td>
                    <td>=</td>
                    <td><strong>{(props.frame.design25/(3*props.frame.cornerPost.csa*100)).toFixed(2)}</strong> Mpa</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td className='calc-bottom'>A</td>
                    <td></td>
                    <td className='calc-bottom'>(4-1) x {props.frame.cornerPost.csa*100}</td>
                    <td></td>
                    <td>{lT}0.85 x {props.frame.grade} = {0.85*props.frame.grade}</td>
                </tr>
            </tbody>
        </table>
    </>
  )
}

export default SideRailCalcs
