import ImpactLoads from './ImpactLoads'

class ProtoFrame{

    constructor(frameDims){
        this.length = frameDims.length
        this.width = frameDims.width
        this.height = frameDims.height
        this.flpCentres = frameDims.flpCentres
        this.mgw = frameDims.mgw
        this.grade = frameDims.grade
        this.slingAngle = frameDims.slingAngle
        this.overhang = (frameDims.length-frameDims.flpCentres)/2
    }

    async getProtoFrame(){
        let frame = {}
        await this.getBaseSideRail(this.length, this.mgw, this.grade, this.overhang, this.flpCentres).then(data => frame.baseSideRail = data)
        await this.getBaseEndRail(this.width, this.mgw, this.grade).then(data => frame.baseEndRail = data)
        await this.getTopEndRail(this.width, this.mgw, this.grade).then(data => frame.topEndRail = data)
        await this.getCornerPost(this.height, this.mgw, this.grade).then(data => frame.cornerPost = data)
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

    async fetchMemberCornerPost(minI, minZ, desc, csa){
        let result = {}
        await fetch(`http://resteel.herokuapp.com/sections/${desc}/${minI}/${minZ}/${csa}`)
        .then(res => res.json())
        .then(data => {result = data})
        return result
    }

    baseSideRailDuringSlingLiftMinI(length, mgw){
        console.log('sling lift minI: ',Math.ceil(((981 * length**2 * mgw)/20992000)/10000))
        return Math.ceil(((981 * length**2 * mgw)/20992000)/10000)
    }

    baseSideRailDuringSlingLiftMinZ(length, mgw, grade){
        console.log('sling lift minZ:' ,Math.ceil(((327 * length * mgw)/(272 * grade))/1000))
        return Math.ceil(((327 * length * mgw)/(272 * grade))/1000)
    }

    // baseSideRailDuringFLPLiftEndsMinI(){
    //     console.log('side rail end minI: ',)
    //     return Math.ceil()
    // }

    baseSideRailDuringFLPLiftEndsMinZ(length, mgw, grade, overhang){
        console.log('side rail end minZ: ',Math.ceil((981*mgw*overhang**2)/(425*grade*length)/1000))
        return Math.ceil((981*mgw*overhang**2)/(425*grade*length)/1000)
    }

    // baseSideRailDuringFLPLiftCentreMinI(){
    //     console.log('side rail centre minZ: ',)
    //     return Math.ceil()
    // }

    baseSideRailDuringFLPLiftCentreMinZ(length, mgw, grade, overhang, flpCentres){
        return Math.ceil(-(981*mgw*(flpCentres**2-(4*overhang**2)))/(1700*grade*length)/1000)
    }


    getBaseSideRailMinI(length, mgw){
        let results = [this.baseSideRailDuringSlingLiftMinI(length, mgw)]
        return results[0]
    }

    getBaseSideRailMinZ(length, mgw, grade, overhang, flpCentres){
        let results = [this.baseSideRailDuringSlingLiftMinZ(length, mgw, grade),
                       this.baseSideRailDuringFLPLiftCentreMinZ(length, mgw, grade, overhang, flpCentres),
                       this.baseSideRailDuringFLPLiftEndsMinZ(length, mgw, grade, overhang)]
        const minZ = results.reduce((a,b) => Math.max(a,b))
        return minZ
    }

    

    getBaseSideRail(length, mgw, grade, overhang, flpCentres){
        let minIy = ImpactLoads.minI(length, mgw)
        let minZy = ImpactLoads.minZ(length, mgw, grade)
        let minIx = this.getBaseSideRailMinI(length, mgw)
        let minZx = this.getBaseSideRailMinZ(length, mgw, grade, overhang, flpCentres)
        return this.fetchMember(minIx, minZx, minIy, minZy)
    }
    

    getBaseEndRail(width, mgw, grade){
        let minI =  ImpactLoads.minI(width, mgw)
        let minZ = ImpactLoads.minZ(width, mgw, grade)
        return this.fetchMemberY(minI, minZ, 'rhs')
    }

    getForkLiftPocket(){
        
    }

    cornerPostMinArea(mass, grade){
        return Math.ceil((327*mass)/(34*grade)/100)
    }

    getCornerPost(height, mgw, grade){
        let minI = ImpactLoads.minI(height, mgw)
        let minZ = ImpactLoads.minZ(height, mgw, grade)
        let minA = this.cornerPostMinArea(mgw, grade)
        return this.fetchMemberCornerPost(minI, minZ, 'shs', minA)
    }

    getTopSideRail(){

    }

    getTopEndRail(width, mgw, grade){
        let minI = ImpactLoads.minITop(width, mgw)
        let minZ = ImpactLoads.minZTop(width, mgw, grade)
        return this.fetchMemberY(minI, minZ, 'shs')
    }
}

export default ProtoFrame