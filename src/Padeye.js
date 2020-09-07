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


static getPadeye(mgw, slingAngle){
    const wll = this.getWLL(mgw, slingAngle)
    const keys = Object.keys(PadeyeDims).sort((a,b)=> a-b)
    const key = keys.find(v => v>wll/1000)
    return PadeyeDims[key]
}

}

export default Padeye