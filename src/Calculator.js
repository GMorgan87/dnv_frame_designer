class Calculator {

    costructor(){}

    static impactLoadMinZ(length, mass, grade){
        console.log('minZ:', (981 * length * mass) / (2720 * grade))
        return ((981 * length * mass) / (2720 * grade))
      }

      static impactLoadMinI(length, mass){
        console.log('minI:', (0.0000155774*length ** 2 * mass))
        return (0.0000155774*length ** 2 * mass)
      }

      impactLoadMinZTop(length, mass, grade){
        return (2943 * length * mass) / (13600 * grade)
      }

      impactLoadMinITop(length, mass){
        return (0.00000934642*(length ** 2) * mass)
      }

}

export default Calculator