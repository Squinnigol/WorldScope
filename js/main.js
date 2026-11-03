import { WorldBankAPI } from './WorldBankAPI.js';
import { Indicador } from './Indicador.js';
import { IndicadorDerivado } from './IndicadorDerivado.js';

const api = new WorldBankAPI();
const poblacion = new Indicador("SP.POP.TOTL", "Población total", "Demografía", "Personas");

const serie = await poblacion.obtenerSerie(api, "ESP");
console.log(serie);
console.log("Último valor:", serie.ultimoValor());
console.log("Año 1990:", serie.valorEnAnio(1990));
console.log("Años:", serie.anios());
const nacimientos = new IndicadorDerivado("NACIMIENTOS", "Nacimientos estimados", "Demografía", "Nacimientos por año (estimación)", "SP.DYN.CBRT.IN");
const serieNac = await nacimientos.obtenerSerie(api, "ESP");
console.log("Nacimientos ESP:", serieNac.ultimoValor());
console.log("Último punto:", serieNac.puntos[serieNac.puntos.length - 1]);
console.log("Último año:", serieNac.ultimoAnio());