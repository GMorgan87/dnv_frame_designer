class Calculator {

    constructor(frame, dimensions){
        this.baseSideRail = frame.baseSideRail
        this.baseEndRail = frame.baseEndRail
        this.forkliftPocket = frame.forkliftPocket
        this.cornerPost = frame.cornerPost
        this.topSideRail = frame.topSideRail
        this.topEndRail = frame.topEndRail
        this.padeye = frame.padeye
        this.height = parseInt(dimensions.height)
        this.length = parseInt(dimensions.length)
        this.width = parseInt(dimensions.width)
        this.flpCentres = dimensions.flpCentres
        this.mgw = parseInt(dimensions.mgw)
        this.grade = parseInt(dimensions.grade)
        this.slingAngle = parseInt(dimensions.slingAngle)
        this.design16 = parseInt(dimensions.mgw * 9.81 * 1.6)
        this.design25 = parseInt(dimensions.mgw * 9.81 * 2.5)
        this.plateFlp = frame.plateFlp
        this.getMemberLengths()
        this.tare = this.getFrameTare()
    }

    getMemberLengths(){
        const sideRailLength = this.length - (2 * this.cornerPost.x)
        this.baseSideRail.length = sideRailLength
        this.baseSideRail.span = sideRailLength
        this.topSideRail.length = sideRailLength
        this.topSideRail.span = sideRailLength
        const EndRailLength = this.width - (2 * this.baseSideRail.y)
        this.baseEndRail.length = EndRailLength
        this.baseEndRail.span = EndRailLength
        this.forkliftPocket.span = EndRailLength
        this.forkliftPocket.length = this.width + 10
        this.topEndRail.length = this.width - (2 * this.topSideRail.y)
        this.topEndRail.span = this.width - (2 * this.topSideRail.y)
        this.cornerPost.span = this.height - (this.baseSideRail.x + this.topSideRail.x)
        this.cornerPost.length = this.height
    }

    getFrameTare(){
        let tare = 0
        let beams = [this.baseSideRail, this.baseEndRail, this.cornerPost, this.cornerPost, this.topSideRail, this.forkliftPocket]
        beams.forEach(beam => {tare += 2 * this.getBeamWeight(beam)})
        return Math.ceil((tare * 1.05)/500)*500
    }

    getBeamWeight(beam){
        return beam.mass * (beam.length / 1000)
    }
}

export default Calculator

