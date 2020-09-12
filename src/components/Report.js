import React, { Component } from 'react'
import ReportPage from './ReportComponents/ReportPage'
import ImpactLoads from './ReportComponents/ImpactLoads'
// import Calculator from '../Calculator'


class Report extends Component {

  impactLoadBeams = [
    [this.props.frame.baseSideRail, "Vertical", 2.5],
    [this.props.frame.baseSideRail, "Horizontal", 2.5],
    [this.props.frame.baseEndRail, "Vertical", 2.5],
    [this.props.frame.baseEndRail, "Horizontal", 2.5],
    [this.props.frame.cornerPost, "Longitudinal & Transverse", 2.5],
    [this.props.frame.topSideRail, "Longitudinal & Transverse", 1.5],
    [this.props.frame.topEndRail, "Longitudinal & Transverse", 1.5]
  ]

  impactReports = this.impactLoadBeams.map((beam, index) => <ReportPage project={this.props.project} key={index} elements={<ImpactLoads beam={beam[0]} orient={beam[1]} factor={beam[2]}/>}/>)

  render() {
    return (
      <div className="report">
        {this.impactReports}
      </div>
    )
  }
}

export default Report
