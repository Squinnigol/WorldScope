export class Serie {
    constructor(puntos) {
        this.puntos = puntos;
    }

    ultimoValor() {
        if (this.puntos.length === 0) {
            return null;
        }
        const ultimo = this.puntos[this.puntos.length - 1];
        return ultimo.valor;
    }

    valorEnAnio(anio) {
        const punto = this.puntos.find(p => p.anio === anio);
        if (punto === undefined) {
            return null;
        }
        return punto.valor;
    }

}