import { Indicador } from './Indicador.js';
import { IndicadorDerivado } from './IndicadorDerivado.js';

export const catalogo = [
    new Indicador("SP.POP.TOTL", "Población total", "Demografía", "Personas"),
    new IndicadorDerivado("NACIMIENTOS", "Nacimientos estimados", "Demografía", "Nacimientos por año (estimación)", "SP.DYN.CBRT.IN"),
]