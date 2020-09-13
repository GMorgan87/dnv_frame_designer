import React, { Component } from 'react'
import ReportPage from './ReportComponents/ReportPage'
import ImpactLoads from './ReportComponents/ImpactLoads'
// import Calculator from '../Calculator'


class Report extends Component {

  impactLoadBeams = [
    [this.props.frame.baseSideRail, "Vertical", 0.25, "Base Side Rail"],
    [this.props.frame.baseSideRail, "Horizontal", 0.25, "Base Side Rail"],
    [this.props.frame.baseEndRail, "Vertical", 0.25, "Base End Rail"],
    [this.props.frame.baseEndRail, "Horizontal", 0.25, "Base End Rail"],
    [this.props.frame.cornerPost, "Longitudinal & Transverse", 0.25, "Corner Post"],
    [this.props.frame.topSideRail, "Longitudinal & Transverse", 0.15, "Top Side Rail"],
    [this.props.frame.topEndRail, "Longitudinal & Transverse", 0.15, "Top End Rail"]
  ]

  impactReports = this.impactLoadBeams.map((beam, index) => <ReportPage project={this.props.project}
                                                                        key={index}
                                                                        elements={<ImpactLoads beam={beam[0]}
                                                                                                orient={beam[1]}
                                                                                                factor={beam[2]}
                                                                                                title={beam[3]}
                                                                                                mgw={this.props.dims.mgw}
                                                                                                grade={this.props.dims.grade}/>}/>)

  render() {
    return (
      <div className="report">
        {this.impactReports}
      </div>
    )
  }
}

export default Report
