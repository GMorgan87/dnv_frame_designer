import ImpactLoads from './ImpactLoads'

class ProtoFrame{

    constructor(frameDims){
        this.length = parseInt(frameDims.length)
        this.width = parseInt(frameDims.width)
        this.height = parseInt(frameDims.height)
        this.flpCentres = parseInt(frameDims.flpCentres)
        this.mgw = parseInt(frameDims.mgw)
        this.grade = parseInt(frameDims.grade)
        this.slingAngle = parseInt(frameDims.slingAngle)
        this.overhang = (frameDims.length-frameDims.flpCentres)/2
        this.Rsl = Math.round((3*this.mgw*9.81)/(3*Math.cos((this.slingAngle*(Math.PI/180)))))
        this.VRsl = Math.round(this.Rsl*Math.cos((this.slingAngle*(Math.PI/180))))
        this.HRsl = Math.round(this.Rsl*Math.sin((this.slingAngle*(Math.PI/180))))
        this.padeyeAngle = Math.atan2(this.width,this.length)
        this.longForce = Math.round(this.HRsl*Math.cos(this.padeyeAngle))
    }

    async getProtoFrame(){
        let frame = {}
        await this.getBaseSideRail().then(data => frame.baseSideRail = data)
        await this.getBaseEndRail().then(data => frame.baseEndRail = data)
        await this.getTopSideRail().then(data => frame.topSideRail = data)
        await this.getTopEndRail().then(data => frame.topEndRail = data)
        await this.getCornerPost().then(data => frame.cornerPost = data)
        await this.getForkLiftPocket().then(data => frame.forkliftPocket = data)
        return frame
    }

    async fetchMemberY(minI, minZ, desc){
        let result = {}
        await fetch(`http://resteel.herokuapp.com/sections/${desc}/${minI}/${minZ}`)
        .then(res => res.json())
        .then(data => {result = data})
        return result
    }

    async fetchMember(minIx, minZx, minIy, minZy){
        let result = {}
        await fetch(`http://resteel.herokuapp.com/sections/rhs/${minIx}/${minZx}/${minIy}/${minZy}`)
        .then(res => res.json())
        .then(data => {result = data})
        return result
    }

    async fetchMemberCornerAndTopPost(minI, minZ, desc, csa){
        let result = {}
        await fetch(`http://resteel.herokuapp.com/sections/${desc}/${minI}/${minZ}/${csa}`)
        .then(res => res.json())
        .then(data => {result = data})
        return result
    }

    async fetchMemberForkloftPocket(minI, minZ){
        let result = {}
        await fetch(`http://resteel.herokuapp.com/sections/flp/${minI}/${minZ}`)
        .then(res => res.json())
        .then(data => {result = data})
        return result
    }

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
        let results = [this.baseSideRailDuringSlingLiftMinI(),
                       this.baseSideRailDuringFLPLiftEndsMinI(),
                       this.baseSideRailDuringFLPLiftCentreMinI()]
        const minI = results.reduce((a,b) => Math.max(a,b))
        return minI
    }

    getBaseSideRailMinZ(){
        let results = [this.baseSideRailDuringSlingLiftMinZ(),
                       this.baseSideRailDuringFLPLiftCentreMinZ(),
                       this.baseSideRailDuringFLPLiftEndsMinZ()]
        const minZ = results.reduce((a,b) => Math.max(a,b))
        return minZ
    }

    getBaseSideRail(){
        let minIy = ImpactLoads.minI(this.length, this.mgw)
        let minZy = ImpactLoads.minZ(this.length, this.mgw, this.grade)
        let minIx = this.getBaseSideRailMinI()
        let minZx = this.getBaseSideRailMinZ()
        return this.fetchMember(minIx, minZx, minIy, minZy)
    }

    getBaseEndRail(){
        let minI =  ImpactLoads.minI(this.width, this.mgw)
        let minZ = ImpactLoads.minZ(this.width, this.mgw, this.grade)
        return this.fetchMemberY(minI, minZ, 'rhs')
    }

    getForkLiftPocket(){
        let minI = this.pocketLoadSupportingMinI()
        let minZ = this.pocketLoadSupportingMinZ()
        return this.fetchMemberForkloftPocket(minI, minZ)
    }

    cornerPostMinArea(){
        return Math.ceil((327*this.mgw)/(34*this.grade)/100)
    }

    getCornerPost(){
        let minI = ImpactLoads.minI(this.height, this.mgw)
        let minZ = ImpactLoads.minZ(this.height, this.mgw, this.grade)
        let minA = this.cornerPostMinArea()
        return this.fetchMemberCornerAndTopPost(minI, minZ, 'shs', minA)
    }

    topSideRailMinArea(){
        return Math.ceil((40*this.longForce)/(17*this.grade)/100)
    }

    getTopSideRail(){
        let minI = ImpactLoads.minITop(this.length, this.mgw)
        let minZ = ImpactLoads.minZTop(this.length, this.mgw, this.grade)
        let minA = this.topSideRailMinArea()
        return this.fetchMemberCornerAndTopPost(minI, minZ, 'shs', minA)
    }

    getTopEndRail(){
        let minI = ImpactLoads.minITop(this.width, this.mgw)
        let minZ = ImpactLoads.minZTop(this.width, this.mgw, this.grade)
        return this.fetchMemberY(minI, minZ, 'shs')
    }
}

export default ProtoFrame