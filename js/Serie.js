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

    ultimoAnio() {
        if (this.puntos.length === 0) {
            return null;
        }
        const ultimo = this.puntos[this.puntos.length - 1];
        return ultimo.anio;
    }


    valorEnAnio(anio) {
        const punto = this.puntos.find(p => p.anio === anio);
        if (punto === undefined) {
            return null;
        }
        return punto.valor;
    }

    anios() {
        return this.puntos.map(p => p.anio);
    }

    valores() {
        return this.puntos.map(p => p.valor);
    }
}