import React, { Component } from 'react'
import ReportPage from './ReportComponents/ReportPage'
import ImpactLoads from './ReportComponents/ImpactLoads'
import Details from './ReportComponents/Details'
import FoldedForkliftCalcs from './ReportComponents/FoldedForkliftCalcs'
import ForkliftCalcs from './ReportComponents/ForkliftCalcs'
import SideRailCalcs from './ReportComponents/SideRailCalcs'
import CornerPostCalcs from './ReportComponents/CornerPostCalcs'
import ForkliftStress from './ReportComponents/ForkliftStress'
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf"
import './Report.css'

class Report extends Component {

  pdf = new jsPDF('p', 'mm', 'a4');

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
    return <ReportPage project={this.props.project} elements={[<FoldedForkliftCalcs frame={this.props.frame}/>,
                                                               <ForkliftStress frame={this.props.frame} />,
                                                               <CornerPostCalcs frame={this.props.frame}/>]}/>
    } else {
    return <ReportPage project={this.props.project} elements={[<ForkliftCalcs frame={this.props.frame}/>,
                                                               <ForkliftStress frame={this.props.frame} />,
                                                               <CornerPostCalcs frame={this.props.frame}/>]}/>
    }
  }

  getImages = (pages) => {
    let images = []
    for (let i = 0; i < pages.length; i++){
      // console.log(`pages[${i}] :>> `, pages[i]);
      html2canvas(pages[i])
      .then((canvas) => {
        let img = canvas.toDataURL('image/png')
        images.push(img)
      })
      if (i===pages.length-1){
        console.log('add images')
        console.log('images :>> ', images);
      }
    }
    this.addPages(images)
    return images
  }


  addPages = (imgs) => {
    imgs.forEach((img,index) => {
      console.log('images for each')
      this.pdf.addImage(img, 'PNG', 0, 0, 210, 297, 'image', 'FAST', 0);
      console.log('image added')
      this.pdf.addPage('a4', 'p')
      console.log(`page${index}  added`)
      if(index===imgs.length-1){
          this.pdf.deletePage(11)
          console.log('output')
      }
    })
  }

  printDocument = () => {
    const pages = document.getElementsByClassName('a4-page')
    this.getImages(pages)
    // console.log('pages :>> ', pages);
    // console.log('pdf :>> ', this.pdf);
  }

    // html2canvas(pages[0])
    // .then((canvas) => {
    //     const imgData = canvas.toDataURL('image/png');
    //     pdf.addImage(imgData, 'PNG', 0, 0, 210, 297, 'image', 'FAST', 0);
    //   })

    

    

    // for (let i = 0; i < pages.length; i++){
    //   console.log(`pages[${i}] :>> `, pages[i]);
    //   html2canvas(pages[i])
    //   .then((canvas) => {
    //     let img = canvas.toDataURL('image/png');
    //     pdf.addImage(img, 'PNG', 0, 0, 210, 297, 'image', 'FAST', 0);
    //     // console.log('image added')
    //     pdf.addPage('a4', 'p')
    //     // console.log(`page ${i} added`)
    //     if(i===pages.length-1){
    //       pdf.deletePage(11)
    //       // console.log('output')
    //       pdf.output('dataurlnewwindow')
    //     }
    //   })
    // }

    // pdf.save("download.pdf");
  

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
