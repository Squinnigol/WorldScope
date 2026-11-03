import { Serie } from './Serie.js';

export class Indicador {
    constructor(codigo, nombre, categoria, unidad) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.categoria = categoria;
        this.unidad = unidad;
    }

    async obtenerSerie(api, codigoPais) {
        const datos = await api.obtenerIndicador(codigoPais, this.codigo);
        const puntos = datos
            .filter(d => d.value !== null)
            .map(d => ({ anio: Number(d.date), valor: d.value }))
            .reverse();
        return new Serie(puntos);
    }
}