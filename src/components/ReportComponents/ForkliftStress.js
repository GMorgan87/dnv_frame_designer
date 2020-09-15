import React from 'react'

const ForkliftStress = (props) => {

    
    const railH = props.frame.baseSideRail.x
    const flpH = props.frame.forkliftPocket.y
    const railT = props.frame.baseSideRail.thk
    const a = (railH-flpH)*railT
    const padStress = ((props.frame.design25/4)/a).toFixed(2)
    const forkStress = ((props.frame.design16/2)/a).toFixed(2)
    const lT = '<'

  return (
    <>
        <br/>
        <p>CHECK STRESS AT FLPs DURING LIFTING:</p>
        <table className="data">
            <tbody>
                <tr>
                    <td className="left">Base Side Rail =</td>
                    <td>{props.frame.baseSideRail.desc}</td>
                </tr>
                <tr>
                    <td className="left">Forklift Pocket =</td>
                    <td>{props.frame.forkliftPocket.desc}</td>
                </tr>
            </tbody>
        </table>
        <p>Lifting from padeyes:</p>
        <table>
            <tbody>
                <tr>
                    <td>Max Stress</td>
                    <td>=</td>
                    <td className="calc-top">F<sub>L</sub>/4</td>
                    <td>=</td>
                    <td className="calc-top">{props.frame.design25}/4</td>
                    <td>=</td>
                    <td><strong>{padStress}</strong> Mpa</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td className="calc-bottom">A</td>
                    <td></td>
                    <td className="calc-bottom">({railH} - {flpH}) x {railT}</td>
                    <td></td>
                    <td>{lT} 0.85 x {props.frame.grade} = {props.frame.grade*0.85} Mpa</td>
                </tr>
            </tbody>
        </table>
        <p>Lifting from pockets:</p>
        <table>
            <tbody>
                <tr>
                    <td>Max Stress</td>
                    <td>=</td>
                    <td className="calc-top">F/2</td>
                    <td>=</td>
                    <td className="calc-top">{props.frame.design16}/2</td>
                    <td>=</td>
                    <td><strong>{forkStress}</strong> Mpa</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td className="calc-bottom">A</td>
                    <td></td>
                    <td className="calc-bottom">({railH} - {flpH}) x {railT}</td>
                    <td></td>
                    <td>{lT} 0.85 x {props.frame.grade} = {props.frame.grade*0.85} Mpa</td>
                </tr>
            </tbody>
        </table>
    </>
  )
}

export default ForkliftStress
