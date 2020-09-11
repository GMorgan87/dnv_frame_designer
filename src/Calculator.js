class Calculator {

    constructor(frame, dimensions){
        this.baseSideRail = frame.baseSideRail
        this.baseEndRail = frame.baseEndRail
        this.forkliftPocket = frame.forkliftPocket
        this.cornerPost = frame.cornerPost
        this.topSideRail = frame.topSideRail
        this.topEndRail = frame.topEndRail
        this.padeye = frame.padeye
        this.height = dimensions.height
        this.length = dimensions.length
        this.width = dimensions.width
        this.mgw = dimensions.mgw
        this.grade = dimensions.grade
        this.slingAngle = dimensions.slingAngle
    }

    getReportValues(){
        const reportValues = {}
        reportValues.designLoad = this.designLoad()
        return reportValues       
    }

    designLoad(){
        return this.mgw * 2.5 * 9.81
    }
    


}

export default Calculator

