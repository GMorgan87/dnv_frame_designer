class Calculator {

    costructor(){}

      impactLoadMinZ(length, mass, grade){
        console.log('minZ:', (981 * length * mass) / (2720 * grade))
        return ((981 * length * mass) / (2720 * grade))
      }

      impactLoadMinI(length, mass){
        console.log('minI:', (0.0000155774*length ** 2 * mass))
        return (0.0000155774*length ** 2 * mass)
      }

      impactLoadMinZTop(length, mass, grade){
        return (2943 * length * mass) / (13600 * grade)
      }

      impactLoadMinITop(length, mass){
        return (0.00000934642*(length ** 2) * mass)
      }

      static checkBaseSideRailImpactLoads(){
        const minI = Math.ceil(this.impactLoadMinI(this.state.frameDims.l, this.state.frameDims.m)/10000)
        const minZ = Math.ceil(this.impactLoadMinZ(this.state.frameDims.l, this.state.frameDims.m, this.state.frameDims.grade)/1000)
        console.log("minI", minI)
        console.log("minZ", minZ)
        fetch(`http://resteel.herokuapp.com/sections/rhs/${minI}/${minZ}`)
        .then(res => res.json())
        .then(data => console.log(data))
      }

}

export default Calculator