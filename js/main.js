import { WorldBankAPI } from './WorldBankAPI.js';
import { Indicador } from './Indicador.js';

const api = new WorldBankAPI();
const poblacion = new Indicador("SP.POP.TOTL", "Población total", "Demografía", "Personas");

const serie = await poblacion.obtenerSerie(api, "ESP");
console.log(serie);
console.log("Último valor:", serie.ultimoValor());
console.log("Año 1990:", serie.valorEnAnio(1990));
console.log("Años:", serie.anios());