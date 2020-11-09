import './RHS'
import RHSBeams from './RHS'
import './SHS'

class BeamFinder{

    static baseRailBeams(minIx, minZx, minIy, minZy, minX){
        const results = RHSBeams.filter(beam => 
            beam.ixx >= minIx &&
            beam.zxx >= minZx &&
            beam.iyy >= minIy &&
            beam.zyy >= minZy &&
            beam.x >= minX
        )
        return results
    }

    static flpBeams(minI, minZ){
        const results = RHSBeams.filter(beam => 
            beam.iyy >= minI &&
            beam.zyy >= minZ &&
            beam.x > 210 &&
            beam.y > 100
            )
        return results
    }


}

export default BeamFinder