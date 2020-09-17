import React from 'react'
import './ReportPage.css'

const ReportPage = (props) => {

      // const mmToPx = (mm) => {
      //   return document.getElementById('myMm').offsetHeight*mm;
      // };

  return (
    <div className="a4-page" id={props.pageNum}>
      <div className="border">
      <table className ="page-header"><tbody>
        <tr>
          <td className="page-title">CALCULATION SHEET</td>
        </tr>
      </tbody></table>
      <table className ="page-header"><tbody>
        <tr>
          <td className='header-proj'>Project: {props.project.title}</td>
        </tr>
      </tbody></table>
      <table className ="page-header">
        <tbody>
          <tr>
            <td className="header-client">Client: {props.project.client}</td>
            <td>Designer: {props.project.designer}</td>
          </tr>
        </tbody>
      </table>
      <table className ="page-header"><tbody>
        <tr>
          <td className='header-doc'>Doc No: {props.project.docNo}</td>
          <td className='header-data-mid'>Rev: {props.project.rev}</td>
          <td className='header-data'>Date: {props.project.date}</td>
        </tr>
      </tbody></table>
      
      {props.elements}

      </div>
    </div>
  )
}

export default ReportPage
