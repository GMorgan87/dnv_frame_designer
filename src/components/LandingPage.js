import React from 'react'
import './LandingPage.css'
import calcs from '../assets/frame-designer-planning.png'

const LandingPage = ({handleStart}) => {
  return (
    <div className='landing-page'>
        {/* <div className="img-block">
            <p>image</p>
        </div> */}

      <button className='start-button' onClick={handleStart}>
        Launch Frame Designer
      </button>

      <h3 className="question">What is the DNV Frame Designer?</h3>
      <p>This tool is to help in the design of offshore lifting frames and produces a calculation report
       that can then be used in the DNVGL certification process. It can help reduce the cost of manufacturing
       offshore frames by calculating the lightest, therefore cheapest, steel members that can pass the certification
       process. This frame designer takes user input for the overall dimensions and maximum weight of a frame and
       shows the user which structural steel members can be used for each part of the frame. Once the user has selected
       the members they wish to use a report is produced with all of the necessary calculations for certification which can
       be downloaded as a PDF file.
      </p>
      <br/>
      <h3 className="question">What is a DNV frame?</h3>
      <p>A DNV frame is an offshore lifting frame that is certified to DNVGL standards 2.7-1 or 2.7-3.
        To be certified a calculation report needs to be produced to show that the frame is capable of taking
        the loads created duting lifting and from side impacts.
      </p>
      <br/>
      <h3 className="question">What is a structural steel member/beam?</h3>
      <p>A structural member/beam is a length of steel tubing formed in a range of industry-standard cross-sectional
        shapes. These standard sizes have known strength properties. This frame designer uses Rectangular Hollow Section
        (RHS) and Square Hollow Section (SHS) 
      </p>
      <br/>
      <h3 className="question">How Are the suggested members selected?</h3>
      <p>I have refactored the formulas from the calculation report to calculate the minimum elastic modulus (Z) 
        and secondary moment (I) that the members need to have for each section of the frame. These value are then
        used to filter the available strutural member sizes to just those that are suitable for the frame loads.
      </p>
      
      <br/>
      <br/>
      <p>Below is a process flow diagram showing some of the calculations used at different stages of the process</p>
      <img src={calcs} alt=""></img>
      <button className='start-button' onClick={handleStart}>
        Launch Frame Designer
      </button>
    </div>
  )
}

export default LandingPage
