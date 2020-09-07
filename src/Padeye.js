import Enhancement from './Enhancement'
import PadeyeDims from './PadeyedDims'

class Padeye{

static getWLL(mgw,slingAngle){
    if (mgw < 2000) {
        return 2694.3
    } else {
        return Math.round((mgw*Enhancement[mgw-(mgw%500)])/(3*Math.cos((slingAngle*(Math.PI/180)))))
    }
}

static filterPadeyes(wll){
    let result = []
    const keys = Object.keys(PadeyeDims)
    for (let key of keys){
        if (parseInt(key) > wll/1000){
            result.push(PadeyeDims[key])
        }
    }
    return result.sort((a,b)=>a.swl-b.swl)
}


static getPadeye(mgw, slingAngle){
    const wll = this.getWLL(mgw, slingAngle)
    return Padeye.filterPadeyes(wll)
}

}

export default Padeye