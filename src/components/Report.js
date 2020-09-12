import React, { Component } from 'react'
import ReportPage from './ReportComponents/ReportPage'
import ImpactLoads from './ReportComponents/ImpactLoads'
// import Calculator from '../Calculator'


class Report extends Component {

  impactLoadBeams = [this.props.frame.baseSideRail, this.props.frame.baseEndRail, this.props.frame.cornerPost, this.props.frame.topSideRail, this.props.frame.topEndRail]

  impactReports = this.impactLoadBeams.map((beam, index) => <ReportPage project={this.props.project} key={index} elements={<ImpactLoads beam={beam}/>}/>)

  render() {
    return (
      <div className="report">
        {this.impactReports}
      </div>
    )
  }
}

export default Report
