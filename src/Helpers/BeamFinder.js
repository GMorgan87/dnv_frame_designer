import './RHS'
import RHSBeams from './RHS'
import SHSBeams from './SHS'

class BeamFinder{

    static baseRailBeams(minIx, minZx, minIy, minZy, minX){
        return RHSBeams.filter(beam => 
            beam.ixx >= minIx &&
            beam.zxx >= minZx &&
            beam.iyy >= minIy &&
            beam.zyy >= minZy &&
            beam.x >= minX
        )
    }

    static flpBeams(minI, minZ){
        return RHSBeams.filter(beam => 
            beam.iyy >= minI &&
            beam.zyy >= minZ &&
            beam.x > 210 &&
            beam.y > 100
            )
    }

    static topSideRailBeams(minI, minZ, minA){
        return SHSBeams.filter(beam =>
                beam.ixx >= minI &&
                beam.zxx >= minZ &&
                beam.csa >= minA
            )
    }

    static topEndRailBeams(minI, minZ){
        return SHSBeams.filter(beam => 
            beam.ixx >= minI &&
            beam.zxx >= minZ
            )
    }

    static baseEndRailBeams(minI, minZ){
        return RHSBeams.filter(beam =>
            beam.iyy >= minI &&
            beam.zyy >= minZ
            )
    }

    static cornerPostBeams(minI, minZ, minA){
        return SHSBeams.filter(beam => 
            beam.ixx >= minI &&
            beam.zxx >= minZ &&
            beam.csa >= minA)
    }

}

export default BeamFinder