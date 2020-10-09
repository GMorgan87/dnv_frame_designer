import React, { Component } from 'react'
import ReportPage from './ReportComponents/ReportPage'
import ImpactLoads from './ReportComponents/ImpactLoads'
import Details from './ReportComponents/Details'
import FoldedForkliftCalcs from './ReportComponents/FoldedForkliftCalcs'
import ForkliftCalcs from './ReportComponents/ForkliftCalcs'
import SideRailCalcs from './ReportComponents/SideRailCalcs'
import CornerPostCalcs from './ReportComponents/CornerPostCalcs'
import ForkliftStress from './ReportComponents/ForkliftStress'
import { jsPDF } from "jspdf"
import './Report.css'
import html2canvas from 'html2canvas'
import PadeyeCalcs from './ReportComponents/PadeyeCalcs'

require('dotenv').config()

const APIKEY = process.env.REACT_APP_EMAIL_KEY
const DOMAIN = process.env.REACT_APP_EMAIL_DOM

var mailgun = require('mailgun-js')({apiKey: APIKEY, domain: DOMAIN});

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
    return <ReportPage project={this.props.project}  elements={[<FoldedForkliftCalcs frame={this.props.frame}/>,
                                                               <ForkliftStress frame={this.props.frame} />,
                                                               <CornerPostCalcs frame={this.props.frame}/>]}/>
    } else {
    return <ReportPage project={this.props.project} elements={[<ForkliftCalcs frame={this.props.frame}/>,
                                                               <ForkliftStress frame={this.props.frame} />,
                                                               <CornerPostCalcs frame={this.props.frame}/>]}/>
    }
  }

  createPDF = async () => {
    const pdf = new jsPDF('p', 'mm', 'a4')
    const page1 = document.getElementById('capture')
    await html2canvas(page1)
    .then((canvas) => {
        let img = canvas.toDataURL('image/png')
        let position = 0
        const pageHeight = 297;
        const imgHeight = 3267;
        let heightLeft = imgHeight;
        pdf.addImage(img, 'PNG', 0, position, 210, 3267, 'image', 'FAST', 0);
        heightLeft -= pageHeight

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          console.log('adding page')
          pdf.addPage();
          pdf.addImage(img, 'PNG', 0, position, 210, 3267, 'image', 'FAST', 0);
          heightLeft -= pageHeight
        }
    })
      pdf.deletePage(12)
      return pdf
  }

  saveDocument = async () => {
    const pdf = await this.createPDF()
    pdf.save(`${this.props.project.docNo} - ${this.props.project.rev}.pdf`);
  }

  emailDocument = async () => {
    const pdf = await this.createPDF()
    var pdfBase64 = pdf.output('datauristring', {filename: `${this.props.project.docNo} - ${this.props.project.rev}.pdf`});
    const data = {
        from: "Mailgun Sandbox <postmaster@sandboxa24450ce489046949e01cd4586eebfc2.mailgun.org>",
        to: "dnvframedesigner@gmail.com",
        subject: "Hello",
        text: "Testing some Mailgun awesomness!",
        // attachment: [pdfBase64]
      };
    console.log('data :>> ', data);
    mailgun.messages().send(data, function (error, body) {
    console.log(body);
    });
  }

  render() {
    return (
      <div className="report-display">
        <div className="report-header">
          <button className="report-button" onClick={this.saveDocument}>SAVE AS PDF</button>
          <button className="email-button" onClick={this.emailDocument}>EMAIL PDF</button>
          <button className="exit-button" onClick={this.props.exitReport}>EXIT</button>
        </div>
      <div className="report" id="capture">
        <ReportPage project={this.props.project} elements={<Details frame={this.props.frame}/>}/>
        {this.forkliftCalcs()}
        <ReportPage project={this.props.project} elements={<SideRailCalcs frame={this.props.frame}/>} />
        <ReportPage project={this.props.project} elements={<PadeyeCalcs frame={this.props.frame}/>} />
        {this.impactReports}
      </div>
      </div>
    )
  }
}

export default Report
