class ImpactLoads{

    static minZ(length, mass, grade){
        return Math.ceil((981 * length * mass) / (2720 * grade)/1000)
    }

    static minI(length, mass){
        return Math.ceil((0.0000155774*length ** 2 * mass)/10000)
    }

    static minZTop(length, mass, grade){
        return Math.ceil((2943 * length * mass) / (13600 * grade)/1000)
    }

    static minITop(length, mass){
        return Math.ceil((0.00000934642*(length ** 2) * mass)/10000)
    }

}

export default ImpactLoads