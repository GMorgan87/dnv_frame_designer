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
        this.getMemberLengths()
    }

    getMemberLengths(){
        const sideRailLength = this.length - (2 * this.cornerPost.x)
        this.baseSideRail.length = sideRailLength
        this.topSideRail.length = sideRailLength
        const baseEndRailLength = this.width - (2 * this.baseSideRail.y)
        this.baseEndRail.length = baseEndRailLength
        this.forkliftPocket.span = baseEndRailLength
        this.topEndRail.length = this.width - (2 * this.topSideRail.y)
        this.cornerPost.length = this.heigth - (this.baseSideRail.x + this.topSideRail.x)
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

