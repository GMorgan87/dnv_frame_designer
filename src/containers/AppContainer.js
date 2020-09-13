import React, { Component } from 'react'
import InputForm from '../components/InputForm'
import ProtoFrame from '../ProtoFrame'
import BeamSelector from '../components/BeamSelector'
import Report from '../components/Report'
import '../AppContainer.css'
import Calculator from '../Calculator'

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
         },
         checkboxes: {
          endRail: false,
          cornerPost: false,
          flp: false
         },
         submitted: false
      }
    }

      handleSubmit = (frame, project, checkboxes) => {
        this.setState({submitted: false})
        const today = new Date();
        const date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        project.date = date
        this.setState({
            frameDims: frame,
            projectDetails: project,
            checkboxes: checkboxes
            },function(){
              let protoFrame = new ProtoFrame(this.state.frameDims, this.state.checkboxes)
              console.log('protoframe created: ', protoFrame)
               protoFrame.getProtoFrame().then(data => {
                let finalFrame = {
                  baseSideRail: data.baseSideRail[0],
                  baseEndRail: data.baseEndRail[0],
                  forkliftPocket: data.forkliftPocket[0],
                  cornerPost: data.cornerPost[0],
                  topSideRail: data.topSideRail[0],
                  topEndRail: data.topEndRail[0],
                  padeye: data.padeye[0]
                } 
                this.setState({protoFrame: data,
                                    frame: finalFrame})})
            }
           )
      }

      getCalcReport = () => {
        console.log("Calcs incoming: ", this.state.frame)
        const calculator = new Calculator(this.state.frame, this.state.frameDims)
        console.log('calculator :>> ', calculator);
        this.setState({submitted: true})
        const report = calculator.getReportValues()
        console.log('report values :>> ', report)
      }

      handleFrameSubmit = (frame) => {
        this.setState({frame: frame})
      }

      handleBeamChange = (event) => {
        let propertyName = event.target.name;
        let frame = this.state.frame
        frame[propertyName] = this.state.protoFrame[propertyName][event.target.value];
        this.setState({frame: frame})
      }
    
  render() {
    return (
      <div>
        <h2 className="page-header">DNV Frame Designer</h2>
        <InputForm  handleSubmit={this.handleSubmit}/>
        {(this.state.protoFrame && !this.state.submitted)
        ?
        <BeamSelector protoFrame={this.state.protoFrame} frame={this.state.frame} handleBeamChange={this.handleBeamChange} getCalcReport={this.getCalcReport}/>
        :
        <div></div>
      }
      {this.state.submitted
      ?
      <Report project={this.state.projectDetails} dims={this.state.frameDims} frame={this.state.frame}/>
      :
      <div></div>
      }
      {/* <Report project={this.state.projectDetails} frame={this.state.frame}></Report> */}
      </div>
    )
  }
}

export default AppContainer
