import React from 'react'

const SideRailCalcs = (props) => {

    const zxx = props.frame.baseSideRail.zxx*1000
    const ixx = props.frame.baseSideRail.ixx*10000
    const w = Math.round(props.frame.design25/2)
    const w2 = Math.round(props.frame.design16/2)
    const length = props.frame.baseSideRail.span
    const maxStress = ((w*length)/(12*zxx)).toFixed(2)
    const maxDeflection = ((w*(length**3))/(384*205000*ixx)).toFixed(2)
    const lT = '<'
    const l = props.frame.flpCentres
    const c = (length-l)/2
    const allowableDef = (length/300).toFixed(2)
    const allowableStress = (props.frame.grade*0.85).toFixed(2)
    
    
    const stressSupports = ((w2 *(c**2))/(2*zxx*length)).toFixed(2)
    const stressCentres = ((w2 * (c**2-((l**2)/4)))/(2*zxx*length)).toFixed(2)
    const deflectionEnds = ((w2*c*(3*c**2*(c+(2*l))-l**3))/(24*205000*ixx*length)).toFixed(2)
    const deflectionCentre = ((w2*l**2*(5*l**2-24*c**2))/(385*205000*ixx*length)).toFixed(2)
    
    

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
                  <td className="calc-top">{w} x {length}</td>
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
                  <td colSpan='2'>{lT} 0.85 x {props.frame.grade} = {allowableStress} Mpa</td>
              </tr>
              <tr></tr>
              <tr>
                  <td>Max Deflection</td>
                  <td>=</td>
                  <td className="calc-top">W x L<sup>3</sup></td>
                  <td>=</td>
                  <td className="calc-top">{w} x {length}<sup>3</sup></td>
                  <td>=</td>
                  <td><strong>{maxDeflection}</strong> mm</td>
              </tr>
              <tr>
                  <td></td>
                  <td></td>
                  <td className="calc-bottom">384 x E x I</td>
                  <td></td>
                  <td className="calc-bottom"> 384 x 205000 x {ixx}</td>
                  <td></td>
                  <td colSpan='2'>{lT} L/300 = {allowableDef}mm</td>
              </tr>
          </tbody>
      </table>

      <p className="header">CHECK SIDE RAILS DURING LIFTING BY FORK TRUCK:</p>
      <table className='data'>
          <tbody>
              <tr>
                  <td className="left">Length L</td>
                  <td>=</td>
                  <td className="right">{length} mm</td>
              </tr>
              <tr>
                  <td className="left">Flp centres l</td>
                  <td>=</td>
                  <td className="right">{l} mm</td>
              </tr>
              <tr>
                  <td className="left">Overhang at ends C</td>
                  <td>=</td>
                  <td className="right">{c} mm</td>
              </tr>
              <tr>
                  <td className="left">Design load F<sub>L</sub></td>
                  <td>=</td>
                  <td><strong>{props.frame.design16}</strong> N</td>
              </tr>
          </tbody>
      </table>
      <table className='calcs'>
          <tbody>
              <tr>
                  <td>Stress at supports</td>
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
                  <td className="calc-bottom"> 2 x {zxx} x {length}</td>
                  <td></td>
                  <td colSpan='2'>{lT} 0.85 x {props.frame.grade} = {allowableStress} Mpa</td>
              </tr>
              <tr></tr>
              <tr>
                  <td>Stress at centre</td>
                  <td>=</td>
                  <td className="calc-top">(Fl/2) x (C<sup>2</sup>-l<sup>2</sup>/4)</td>
                  <td>=</td>
                  <td className="calc-top">{w2} x ({c}<sup>2</sup>-{l}<sup>2</sup>/4)</td>
                  <td>=</td>
                  <td><strong>{stressCentres}</strong> Mpa</td>
              </tr>
              <tr>
                  <td></td>
                  <td></td>
                  <td className="calc-bottom">2 x Z x L</td>
                  <td></td>
                  <td className="calc-bottom"> 2 x {zxx} x {length}</td>
                  <td></td>
                  <td colSpan='2'>{lT} 0.85 x {props.frame.grade} = {allowableStress} Mpa</td>
              </tr>
              <tr></tr>
              <tr>
                  <td>Deflection at ends</td>
                  <td>=</td>
                  <td className="calc-top" colSpan="3">(Fl/2) x C(3C<sup>2</sup>x (C + (2 x l)) - l<sup>3</sup>)</td>
              </tr>
              <tr>
                  <td></td>
                  <td></td>
                  <td className="calc-bottom" colSpan="3">24 x E x I x L</td>
              </tr>
              <tr>
                  <td></td>
                  <td>=</td>
                  <td className="calc-top" colSpan="3">{w2}x{c}x(3x{c}<sup>2</sup>x({c}+(2x{l}))-{l}<sup>3</sup>)</td>
                  <td>=</td>
                  <td><strong>{deflectionEnds}</strong> mm</td>
              </tr>
              <tr>
                  <td></td>
                  <td></td>
                  <td className="calc-bottom" colSpan="3">24 x 205000 x {ixx} x {length}</td>
                  <td></td>
                  <td colSpan='2'>{lT} L/300 = {allowableDef}mm</td>
              </tr>
              <tr></tr>
              <tr>
                  <td>Deflection at centre</td>
                  <td>=</td>
                  <td className="calc-top" colSpan="3">(Fl/2) x l<sup>2</sup> (5 x l<sup>2</sup> - 24 x C<sup>2</sup>)</td>
              </tr>
              <tr>
                  <td></td>
                  <td></td>
                  <td className="calc-bottom" colSpan="3">384 x E x I x L</td>
              </tr>
              <tr>
                  <td></td>
                  <td>=</td>
                  <td className="calc-top" colSpan="3">{w2} x {l}<sup>2</sup> (5 x {l}<sup>2</sup> - 24 x {c}<sup>2</sup>)</td>
                  <td>=</td>
                  <td><strong>{deflectionCentre}</strong> mm</td>
              </tr>
              <tr>
                  <td></td>
                  <td></td>
                  <td className="calc-bottom" colSpan="3">384 x 205000 x {ixx} x {length}</td>
                  <td></td>
                  <td colSpan='2'>{lT} L/300 = {allowableDef}mm</td>
              </tr>
          </tbody>
      </table>
                
    </>
  )
}

export default SideRailCalcs
