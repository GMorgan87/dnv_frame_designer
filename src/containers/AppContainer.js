import React, { Component } from 'react'
import InputForm from '../components/InputForm'

class AppContainer extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
        projectDetails: {
            title: '',
            docNo: '',
            rev: '',
            date: ''
          },
         frameDims: {
             l: 0,
             w: 0,
             h: 0,
             m: 0
         }
      }
      this.handleSubmit = this.handleSubmit.bind(this)
    }

        handleSubmit(frame, project){
            this.setState({
                frameDims: frame,
                projectDetails: project
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
