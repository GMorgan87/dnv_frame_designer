import React, { Component } from 'react'
import InputForm from '../components/InputForm'
import ProtoFrame from '../ProtoFrame'
import BeamSelector from '../components/BeamSelector'

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
             length: 0,
             width: 0,
             height: 0,
             mgw: 0,
             grade: 355,
             slingAngle: 30
         }
      }
      this.handleSubmit = this.handleSubmit.bind(this)
    }

      handleSubmit(frame, project){
        const today = new Date();
        const date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        project.date = date
        this.setState({
            frameDims: frame,
            projectDetails: project
            },function(){
              let protoFrame = new ProtoFrame(this.state.frameDims)
              console.log('protoframe created: ', protoFrame)
               protoFrame.getProtoFrame().then(data=> this.setState({protoFrame: data}))
            }
           )
      } 

      renderBeamSelector(){
        if (this.state.protoFrame){
        return <BeamSelector protoFrame={this.state.protoFrame}/>
        }
      }
    
  render() {
    return (
      <div>
        <h2 className="page-header">DNV Frame Designer</h2>
        <InputForm  handleSubmit={this.handleSubmit}/>
        {this.renderBeamSelector()}
      </div>
    )
  }
}

export default AppContainer
