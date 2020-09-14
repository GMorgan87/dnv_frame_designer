import React, { Component } from 'react'
import ReportPage from './ReportComponents/ReportPage'
import ImpactLoads from './ReportComponents/ImpactLoads'
import Details from './ReportComponents/Details'
import FoldedForkliftCalcs from './ReportComponents/FoldedForkliftCalcs'
import ForkliftCalcs from './ReportComponents/ForkliftCalcs'
import SideRailCalcs from './ReportComponents/SideRailCalcs'
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf"
import './Report.css'

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
                                                                                                mgw={this.props.frame.mgw}
                                                                                                grade={this.props.frame.grade}/>}/>)

  forkliftCalcs = () =>  {if (this.props.frame.plateFlp) {
    return <ReportPage project={this.props.project} elements={<FoldedForkliftCalcs frame={this.props.frame}/>}/>
    } else {
    return <ReportPage project={this.props.project} elements={<ForkliftCalcs frame={this.props.frame}/>}/>
    }
  }

  printDocument() {
    const input = document.getElementById('capture');
    console.log('input :>> ', input);
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        console.log('imgData :>> ', imgData);
        const pdf = new jsPDF('p', 'mm', [210, 2970]);
        console.log('pdf :>> ', pdf);
        pdf.addImage(imgData, 'PNG', 0, 0, 210, 2970, 'image', 'FAST', 0);
        console.log('image added')
        // pdf.output('dataurlnewwindow');
        pdf.save("download.pdf");
        console.log('download')
      })
    ;
  }

  render() {
    return (
      <div>
        <button onClick={this.printDocument}>Save as PDF</button>
      <div className="report" id="capture">
        <ReportPage project={this.props.project} elements={<Details frame={this.props.frame}/>} />
        {this.forkliftCalcs()}
        <ReportPage project={this.props.project} elements={<SideRailCalcs frame={this.props.frame}/>} />
        {this.impactReports}
      </div>
      </div>
    )
  }
}

export default Report
