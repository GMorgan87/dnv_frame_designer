import React, { Component } from 'react'
import InputForm from '../components/InputForm'
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
             l: 0,
             w: 0,
             h: 0,
             m: 0,
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
            },function(){this.checkBaseSideRailImpactLoads()}
           )
      } 


      checkBaseSideRailImpactLoads(){
        const minI = Math.ceil(Calculator.impactLoadMinI(this.state.frameDims.l, this.state.frameDims.m)/10000)
        const minZ = Math.ceil(Calculator.impactLoadMinZ(this.state.frameDims.l, this.state.frameDims.m, this.state.frameDims.grade)/1000)
        console.log("minI", minI)
        console.log("minZ", minZ)
        fetch(`http://resteel.herokuapp.com/sections/rhs/${minI}/${minZ}`)
        .then(res => res.json())
        .then(data => console.log(data))
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
