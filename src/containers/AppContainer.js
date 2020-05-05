import React, { Component } from 'react'
import InputForm from '../components/InputForm'

class AppContainer extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         frameDims: {
             l: 0,
             w: 0,
             h: 0,
             m: 0
         }
      }
      this.handleSubmit = this.handleSubmit.bind(this)
    }

        handleSubmit(frame){
            this.setState({
                frameDims: {
                    l: frame.l,
                    w: frame.w,
                    h: frame.h,
                    m: frame.m
                }
            }
            )
        } 
    
  render() {
    return (
      <div>
          <h2>DNV Frame Designer</h2>
        <InputForm  handleSubmit={this.handleSubmit}/>
      </div>
    )
  }
}

export default AppContainer
