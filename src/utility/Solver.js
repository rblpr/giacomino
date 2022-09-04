class Solver {

    constructor() {}

    mul(a, b) {
        let res = undefined;
        if((!Number.isFinite(a) && b == 0) || (!Number.isFinite(b) && a == 0)) {
            res =  0;
        } else {
            res = a * b;
        }
        if(Number.isNaN(res) || res === undefined) throw new Error("Risultato non valido: " + a + " * " + b)
        return res;
    }

    div(a, b) {
        let res = undefined;

        if((a == Infinity && b == Infinity) || (a == -Infinity && b == -Infinity)) {
            res =  1;
        } else if((a == -Infinity && b == Infinity) || (a == Infinity && b == -Infinity) ) {
            res = -1;
        }else {
            res =  a / b
        }
        if(Number.isNaN(res) || res === undefined) throw new Error("Risultato non valido: " + a + " / " + b)
        return res;
    }

    sum(a, b) {
        let res = a + b;
        if(Number.isNaN(res) || res === undefined) throw new Error("Risultato non valido: " + a + " / " + b)
        return res;
    }
}