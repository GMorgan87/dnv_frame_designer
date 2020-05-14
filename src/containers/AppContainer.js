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
             m: 0,
             grade: 355,
             slingAngle: 30
         }
      }
      this.handleSubmit = this.handleSubmit.bind(this)
      this.impactLoadMinI = this.impactLoadMinI.bind(this)
      this.impactLoadMinZ = this.impactLoadMinZ.bind(this)
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

      impactLoadMinZ(length, mass, grade){
        return ((5 * length * mass) / (136 * grade))/100
      }

      impactLoadMinI(length, mass, grade){
        return (((length ** 3) * mass) / (133824000 * grade))/1000
      }

      impactLoadMinZTop(length, mass, grade){
        return (3 * length * mass) / (136 * grade)
      }

      impactLoadMinITop(length, mass, grade){
        return ((length ** 3) * mass) / (223040000 * grade)
      }
      

      checkBaseSideRailImpactLoads(){
        const minI = Math.ceil(this.impactLoadMinI(this.state.frameDims.l, this.state.frameDims.m, this.state.frameDims.grade))
        const minZ = Math.ceil(this.impactLoadMinZ(this.state.frameDims.l, this.state.frameDims.m, this.state.frameDims.grade))
        console.log("minI", minI)
        console.log("minZ", minZ)
        fetch(`http://resteel.herokuapp.com/api/sections/rhs/${minI}/${minZ}`)
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
