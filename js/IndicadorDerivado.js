import { Indicador } from './Indicador.js';
import { Serie } from './Serie.js';

export class IndicadorDerivado extends Indicador {
    constructor(codigo, nombre, categoria, unidad, codigoTasa) {
        super(codigo, nombre, categoria, unidad);
        this.codigoTasa = codigoTasa;
    }

    async obtenerSerie(api, codigoPais) {
        const poblacion = await new Indicador("SP.POP.TOTL").obtenerSerie(api, codigoPais);
        const tasa = await new Indicador(this.codigoTasa).obtenerSerie(api, codigoPais);
        const puntos = poblacion.puntos
            .filter(p => tasa.valorEnAnio(p.anio) !== null)
            .map(p => ({ anio: p.anio, valor: Math.round(p.valor * tasa.valorEnAnio(p.anio)/1000) }));
            return new Serie(puntos);
        }
}


