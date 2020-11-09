import ImpactLoads from './ImpactLoads'
import Padeye from './Padeye'
import BeamFinder from './BeamFinder'

class ProtoFrame{

    constructor(frameDims, checkboxes){
        this.length = parseInt(frameDims.length)
        this.width = parseInt(frameDims.width)
        this.height = parseInt(frameDims.height)
        this.flpCentres = parseInt(frameDims.flpCentres)
        this.mgw = parseInt(frameDims.mgw)
        this.grade = parseInt(frameDims.grade)
        this.slingAngle = parseInt(frameDims.slingAngle)
        this.flpH = parseInt(frameDims.flpH)
        this.flpT = parseInt(frameDims.flpT)
        this.flpEh = () => this.flpH + 2 * this.flpT
        this.flpW = parseInt(frameDims.flpW)
        this.flpEw = () => this.flpW  + 2 * this.flpT
        this.overhang = (frameDims.length-frameDims.flpCentres)/2
        this.Rsl = Math.round((3*this.mgw*9.81)/(3*Math.cos((this.slingAngle*(Math.PI/180)))))
        this.HRsl = Math.round(this.Rsl*Math.sin((this.slingAngle*(Math.PI/180))))
        this.padeyeAngle = Math.atan2(this.width,this.length)
        this.longForce = Math.round(this.HRsl*Math.cos(this.padeyeAngle))
        this.matchEndRail = checkboxes.endRail
        this.matchCornerPost = checkboxes.cornerPost
        this.plateFlp = checkboxes.flp
    }

    async getProtoFrame(){
        let frame = {plateFlp: this.plateFlp}
        if (this.plateFlp) {
            frame.forkliftPocket = this.getFoldedFlp()
        } else {
            frame.forkliftPocket = this.getForkLiftPocket()
        }
        frame.topSideRail = this.getTopSideRail()
        frame.baseSideRail = this.getBaseSideRail(frame.forkliftPocket[0].y)
        if (this.matchEndRail) {
            frame.topEndRail = this.getTopSideRail()
            frame.baseEndRail = this.getBaseSideRail(frame.forkliftPocket[0].y)
        } else {
            frame.baseEndRail = this.getBaseEndRail()
            frame.topEndRail = this.getTopEndRail()
        }
        this.checkStressAtFlp(frame.baseSideRail[0].x, frame.forkliftPocket[0].y, frame.baseSideRail[0].thk)
        await this.getCornerPost().then(data => frame.cornerPost = data)
        frame.padeye = Padeye.getPadeye(this.mgw, this.slingAngle)
        return frame
    }

    async fetchMemberY(minI, minZ, desc){
        let result = {}
        await fetch(`https://resteel.herokuapp.com/sections/${desc}/${minI}/${minZ}`)
        .then(res => res.json())
        .then(data => {result = data})
        return result
    }

    async fetchMember(minIx, minZx, minIy, minZy, minY){
        let result = {}
        console.log("BeamFinder BaseRails", BeamFinder.baseRailBeams(minIx, minZx, minIy, minZy, minY))
        await fetch(`https://resteel.herokuapp.com/sections/rhs/${minIx}/${minZx}/${minIy}/${minZy}/${minY}`)
        .then(res => res.json())
        .then(data => {result = data})
        return result
    }

    async fetchMemberCornerAndTopPost(minI, minZ, desc, csa){
        let result = {}
        await fetch(`https://resteel.herokuapp.com/sections/${desc}/${minI}/${minZ}/${csa}`)
        .then(res => res.json())
        .then(data => {result = data})
        return result
    }

    // async fetchMemberForkliftPocket(minI, minZ){
    //     let result = {}
    //     await fetch(`https://resteel.herokuapp.com/sections/flp/${minI}/${minZ}`)
    //     .then(res => res.json())
    //     .then(data => {result = data})
    //     return result
    // }

    baseSideRailDuringSlingLiftMinI(){
        return Math.ceil(((981 * this.length**2 * this.mgw)/20992000)/10000)
    }

    baseSideRailDuringSlingLiftMinZ(){
        return Math.ceil(((327 * this.length * this.mgw)/(272 * this.grade))/1000)
    }

    baseSideRailDuringFLPLiftEndsMinI(){
        return Math.ceil(((981*this.mgw*this.overhang*((-this.flpCentres)**3+(6*this.flpCentres*this.overhang**2)+(3*this.overhang**3)))/(4100000*this.length**2))/10000)
    }

    baseSideRailDuringFLPLiftEndsMinZ(){
        return Math.ceil((981*this.mgw*this.overhang**2)/(425*this.grade*this.length)/1000)
    }

    baseSideRailDuringFLPLiftCentreMinI(){
        return Math.ceil(-(((0.0000747713*this.flpCentres**4*this.mgw)-(0.000358902*this.flpCentres**2*this.mgw*this.overhang**2))/(this.length**2))/10000)
    }

    baseSideRailDuringFLPLiftCentreMinZ(){
        return Math.ceil(-(981*this.mgw*(this.flpCentres**2-(4*this.overhang**2)))/(1700*this.grade*this.length)/1000)
    }

    pocketLoadSupportingMinZ(){
        return Math.ceil(((981*this.width*this.mgw)/(544*this.grade))/1000)
    }

    pocketLoadSupportingMinI(){
        return Math.ceil(((981*this.mgw*this.width**2)/(10496000))/10000)
    }

    getBaseSideRailMinI(){
        const results = [this.baseSideRailDuringSlingLiftMinI(),
                       this.baseSideRailDuringFLPLiftEndsMinI(),
                       this.baseSideRailDuringFLPLiftCentreMinI()]
        const minI = results.reduce((a,b) => Math.max(a,b))
        return minI
    }

    getBaseSideRailMinZ(){
        const results = [this.baseSideRailDuringSlingLiftMinZ(),
                       this.baseSideRailDuringFLPLiftCentreMinZ(),
                       this.baseSideRailDuringFLPLiftEndsMinZ()]
        const minZ = results.reduce((a,b) => Math.max(a,b))
        return minZ
    }

    getBaseSideRail(minY){
        const minIy = ImpactLoads.minI(this.length, this.mgw)
        const minZy = ImpactLoads.minZ(this.length, this.mgw, this.grade)
        const minIx = this.getBaseSideRailMinI()
        const minZx = this.getBaseSideRailMinZ()
        return BeamFinder.baseRailBeams(minIx, minZx, minIy, minZy, minY)
        // return this.fetchMember(minIx, minZx, minIy, minZy, minY)
    }

    getBaseEndRail(){
        const minI =  ImpactLoads.minI(this.width, this.mgw)
        const minZ = ImpactLoads.minZ(this.width, this.mgw, this.grade)
        return BeamFinder.baseEndRailBeams(minI, minZ)
        // return this.fetchMemberY(minI, minZ, 'rhs')
    }

    getForkLiftPocket(){
        const minI = this.pocketLoadSupportingMinI()
        const minZ = this.pocketLoadSupportingMinZ()
        return BeamFinder.flpBeams(minI, minZ)
    }

    checkStressAtFlp(sideRailH, flpH, sideRailT){
        const area = (sideRailH - flpH) * sideRailT
        const minArea = (5*(this.mgw*7.848))/(17*this.grade)
        return area > minArea
    }

    getFoldedFlp(){
        while (!this.checkFoldedFlp()) {
            this.flpT += 1
            }
        return [{ desc: `${this.flpEw()}x${this.flpEh()}x${this.flpT} Fabricated RHS`,
            iyy: this.getFlpI(),
            zyy: this.getFlpZ(),
            thk: this.flpT,
            csa: ((this.flpEw() * this.flpEh())-(this.flpW * this.flpH))/100,
            mass: this.getFlpMass(),
            x: this.flpEw(),
            y: this.flpEh()
            }]         
    }

    checkFoldedFlp(){
        const minI = this.pocketLoadSupportingMinI()
        const minZ = this.pocketLoadSupportingMinZ()
        const flpI = this.getFlpI()
        const flpZ = this.getFlpZ()
        return (minZ<flpZ && minI<flpI)
    }

    getFlpI(){
        return Math.round((((this.flpEw() * this.flpEh()**3)-(this.flpW*this.flpH**3))/12)/10000) 
    }

    getFlpZ(){
        return Math.round((((this.flpEw() * this.flpEh()**3)-(this.flpW*this.flpH**3))/(6*this.flpEh()))/1000)
    }

    getFlpMass(){
        return Math.round(((this.flpEw() * this.flpEh())-(this.flpW * this.flpH))*0.785)/100
    }

    cornerPostMinArea(){
        return Math.ceil((327*this.mgw)/(34*this.grade)/100)
    }

    getCornerPost(){
        const minI = ImpactLoads.minI(this.height, this.mgw)
        const minZ = ImpactLoads.minZ(this.height, this.mgw, this.grade)
        const minA = this.cornerPostMinArea()
        return this.fetchMemberCornerAndTopPost(minI, minZ, 'shs', minA)
    }

    topSideRailMinArea(){
        return Math.ceil((40*this.longForce)/(17*this.grade)/100)
    }

    getTopSideRail(){
        const minI = ImpactLoads.minITop(this.length, this.mgw)
        const minZ = ImpactLoads.minZTop(this.length, this.mgw, this.grade)
        const minA = this.topSideRailMinArea()
        return BeamFinder.topSideRailBeams(minI, minZ, minA)
    }

    getTopEndRail(){
        const minI = ImpactLoads.minITop(this.width, this.mgw)
        const minZ = ImpactLoads.minZTop(this.width, this.mgw, this.grade)
        return BeamFinder.topEndRailBeams(minI, minZ)
    }

}

export default ProtoFrame