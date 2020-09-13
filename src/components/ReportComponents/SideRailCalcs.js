import React from 'react'

const SideRailCalcs = (props) => {

    const zxx = props.frame.baseSideRail.zxx*1000
    const ixx = props.frame.baseSideRail.ixx*10000
    const w = Math.round(props.frame.design25/2)
    const w2 = Math.round(props.frame.design16/2)
    const maxStress = ((w*props.frame.baseSideRail.span)/(12*zxx)).toFixed(2)
    const maxDeflection = ((w*(props.frame.baseSideRail.span**3))/(384*205000*ixx)).toFixed(2)
    const lT = '<'
    const c = (props.frame.baseSideRail.length-props.frame.flpCentres)/2
    const stressSupports = (w*(c**2)/(2*zxx*props.frame.baseSideRail.length))

  return (
    <>
      <p className="header">CHECK SIDE RAILS DURING LIFTING:</p>
      <table className="data">
          <tbody>
                <tr>
                    <td className="left">Section =</td>
                    <td>{props.frame.baseSideRail.desc}</td>
                </tr>
                <tr>
                    <td className="left">Z<sub>xx</sub> =</td>
                    <td>{zxx} mm<sup>3</sup></td>
                </tr>
                <tr>
                    <td className="left">I<sub>xx</sub> =</td>
                    <td>{ixx} mm<sup>4</sup></td>
                </tr>
          </tbody>
      </table>

      <table className="calcs">
          <tbody>
              <tr>
                  <td>Design Load F<sub>L</sub></td>
                  <td>=</td>
                  <td><strong>{props.frame.design25}</strong> N</td>
              </tr>
              <tr></tr>
              <tr>
                  <td>Load on side rail W</td>
                  <td>=</td>
                  <td className="calc-top">{props.frame.design25}</td>
                  <td>=</td>
                  <td><strong>{props.frame.design25/2}</strong> N</td>
              </tr>
              <tr>
                  <td></td>
                  <td></td>
                  <td className="calc-bottom">2</td>
                  <td></td>
                  <td></td>
              </tr>
              <tr></tr>
              <tr>
                  <td>Max Stress</td>
                  <td>=</td>
                  <td className="calc-top">W x L</td>
                  <td>=</td>
                  <td className="calc-top">{w} x {props.frame.baseSideRail.span}</td>
                  <td>=</td>
                  <td><strong>{maxStress}</strong> Mpa</td>
              </tr>
              <tr>
                  <td></td>
                  <td></td>
                  <td className="calc-bottom">12Z</td>
                  <td></td>
                  <td className="calc-bottom"> 12 x {zxx}</td>
                  <td></td>
                  <td colspan='2'>{lT} 0.85 x {props.frame.grade} = {props.frame.grade*0.85} Mpa</td>
              </tr>
              <tr></tr>
              <tr>
                  <td>Max Deflection</td>
                  <td>=</td>
                  <td className="calc-top">W x L<sup>3</sup></td>
                  <td>=</td>
                  <td className="calc-top">{w} x {props.frame.baseSideRail.span}<sup>3</sup></td>
                  <td>=</td>
                  <td><strong>{maxDeflection}</strong> mm</td>
              </tr>
              <tr>
                  <td></td>
                  <td></td>
                  <td className="calc-bottom">384 x E x I</td>
                  <td></td>
                  <td className="calc-bottom"> 385 x 205000 x {ixx}</td>
                  <td></td>
                  <td colspan='2'>{lT} L/250 = {props.frame.baseSideRail.span/250}mm</td>
              </tr>
          </tbody>
      </table>

      <p className="header">CHECK SIDE RAILS DURING LIFTING BY FORK TRUCK:</p>
      <table className='data'>
          <tbody>
              <tr>
                  <td>Length</td>
                  <td>=</td>
                  <td>{props.frame.baseSideRail.length} mm</td>
              </tr>
              <tr>
                  <td>Flp Centres</td>
                  <td>=</td>
                  <td>l</td>
                  <td>=</td>
                  <td>{props.frame.flpCentres} mm</td>
              </tr>
              <tr>
                  <td>Overhang at ends</td>
                  <td>=</td>
                  <td>C</td>
                  <td>=</td>
                  <td>{c} mm</td>
              </tr>
          </tbody>
      </table>
      <table className='calcs'>
          <tbody>
          <tr>
                  <td>Design Load F<sub>L</sub></td>
                  <td>=</td>
                  <td><strong>{props.frame.design16}</strong> N</td>
              </tr>
          <tr>
                  <td>Stress at Supports</td>
                  <td>=</td>
                  <td className="calc-top">(Fl/2) x C<sup>2</sup></td>
                  <td>=</td>
                  <td className="calc-top">{w2} x {c}<sup>2</sup></td>
                  <td>=</td>
                  <td><strong>{stressSupports}</strong> Mpa</td>
              </tr>
              <tr>
                  <td></td>
                  <td></td>
                  <td className="calc-bottom">2 x Z x L</td>
                  <td></td>
                  <td className="calc-bottom"> 2 x {zxx} x {props.frame.baseSideRail.length}</td>
                  <td></td>
                  <td colspan='2'>{lT} 0.85 x {props.frame.grade} = {props.frame.grade*0.85} Mpa</td>
              </tr>
          </tbody>
      </table>
                
    </>
  )
}

export default SideRailCalcs
