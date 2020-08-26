import ImpactLoads from './ImpactLoads'

class ProtoFrame{

    constructor(frameDims){
        this.length = frameDims.length
        this.width = frameDims.width
        this.height = frameDims.height
        this.mgw = frameDims.mgw
        this.grade = frameDims.grade
        this.slingAngle = frameDims.slingAngle
    }

    async getProtoFrame(){
        let frame = {}
        await this.getBaseSideRail(this.length, this.mgw, this.grade).then(data => frame.baseSideRail = data)
        await this.getBaseEndRail(this.width, this.mgw, this.grade).then(data => frame.baseEndRail = data)
        await this.getTopEndRail(this.width, this.mgw, this.grade).then(data => frame.topEndRail = data)
        // console.log('frame: ', frame)
        return frame
    }


    baseSideRailDuringSlingLiftMinI(length, mgw){
        console.log('sling lift minI: ',Math.ceil(((981 * length**2 * mgw)/20992000)/10000))
        return Math.ceil(((981 * length**2 * mgw)/20992000)/10000)
    }


    baseSideRailDuringSlingLiftMinZ(length, mgw, grade){
        console.log('sling lift minZ:' ,Math.ceil(((327 * length * mgw)/(272 * grade))/1000))
        return Math.ceil(((327 * length * mgw)/(272 * grade))/1000)
    }


    getBaseSideRailMinI(length, mgw){
        return this.baseSideRailDuringSlingLiftMinI(length, mgw)
    }

    getBaseSideRailMinZ(length,mgw,grade){
        return this.baseSideRailDuringSlingLiftMinZ(length, mgw, grade)
    }

    async fetchMemberY(minI, minZ){
        let result = {}
        await fetch(`http://resteel.herokuapp.com/sections/rhs/${minI}/${minZ}`)
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

    getBaseSideRail(length, mgw, grade){
        let minIy = ImpactLoads.minI(length, mgw)
        let minZy = ImpactLoads.minZ(length, mgw, grade)
        let minIx = this.getBaseSideRailMinI(length, mgw)
        let minZx = this.getBaseSideRailMinZ(length,mgw,grade)
        return this.fetchMember(minIx, minZx, minIy, minZy)
    }
    

    getBaseEndRail(width, mgw, grade){
        let minI =  ImpactLoads.minI(width, mgw)
        let minZ = ImpactLoads.minZ(width, mgw, grade)
        return this.fetchMemberY(minI, minZ)
    }

    getForkLiftPocket(){
        
    }

    getCornerPost(){
        
    }

    getTopSideRail(){

    }

    getTopEndRail(width, mgw, grade){
        let minI = ImpactLoads.minITop(width, mgw)
        let minZ = ImpactLoads.minZTop(width, mgw, grade)
        return this.fetchMemberY(minI, minZ)
    }
}

export default ProtoFrame