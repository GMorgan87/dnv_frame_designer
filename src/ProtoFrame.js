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


    getProtoFrame(){
        let frame = {}
        this.getBaseSideRail(this.length, this.mgw, this.grade)
        return frame
    }

    getBaseSideRailMinI(length, mgw){
        return ImpactLoads.minI(length, mgw)
    }

    getBaseSideRailMinZ(length,mgw,grade){
        return ImpactLoads.minZ(length, mgw, grade)
    }

    fetchMember(minI, minZ){
        let member = {}
        fetch(`http://resteel.herokuapp.com/sections/rhs/${minI}/${minZ}`)
        .then(res => res.json())
        .then(data => member = data)
        return member
    }

    getBaseSideRail(length, mgw, grade){
        let minI = this.getBaseSideRailMinI(length, mgw)
        let minZ = this.getBaseSideRailMinZ(length, mgw, grade)
        let member = this.fetchMember(minI, minZ)
        return member
    }
    

    getBaseEndRail(){

    }

    getForkLiftPocket(){
        
    }

    getCornerPost(){

    }

    getTopSideRail(){

    }

    getTopEndRail(){

    }
}

export default ProtoFrame