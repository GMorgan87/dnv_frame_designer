import React from 'react'
import './LandingPage.css'

const LandingPage = ({handleStart}) => {
  return (
    <div className='landing-page'>
        {/* <div className="img-block">
            <p>image</p>
        </div> */}

      <h3 className="question">What is the DNV Frame Designer?</h3>
      <p>This tool is to help in the design of offshore lifting frames and produces a calculation report
       that can then be used in the DNVGL certification process. It can help reduce the cost of manufacturing
       offshore frames by calculating the lightest, therefore cheapest, steel members that can pass the certification
       process. This frame designer takes user input for the overall dimensions and maximum weight of a frame and
       shows the user which structural steel members can be used for each part of the frame. Once the user has selected
       the beams they wish to use a report is produced with all of the necessary calculations for certification which can
       be downloaded as a PDF file.
      </p>
      <br/>
      <h3 className="question">What is a DNV frame?</h3>
      <p>A DNV frame is an offshore lifting frame that is certified to DNVGL standards 2.7-1 or 2.7-3.
        To be certified a calculation report needs to be produced to show that the frame is capable of taking
        the loads created duting lifting and from side impacts.
      </p>
      <br/>
      <h3 className="question">Question?</h3>
      <p>Answer</p>
      <br/>
      <h3 className="question">Question?</h3>
      <p>Answer</p>

      <h3 className="question">Question?</h3>
      <p>Answer</p>
      
      
      
      <button className='start-button' onClick={handleStart}>
        Launch Frame Designer
      </button>
    </div>
  )
}

export default LandingPage
