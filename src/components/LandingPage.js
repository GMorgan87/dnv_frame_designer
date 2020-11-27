import React from 'react'
import './LandingPage.css'

const LandingPage = ({handleStart}) => {
  return (
    <div className='landing-page'>
        <div className="img-block">
            <p>image</p>
        </div>
      <button className='start-button' onClick={handleStart}>
        Launch Frame Designer
      </button>
    </div>
  )
}

export default LandingPage
