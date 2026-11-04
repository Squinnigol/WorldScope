import { WorldBankAPI } from './WorldBankAPI.js';
import { catalogo } from './catalogo.js';

const api = new WorldBankAPI();

for (const indicador of catalogo) {
    const serie = await indicador.obtenerSerie(api, "ESP");
    console.log(indicador.nombre, "→", serie.ultimoAnio(), serie.ultimoValor(), indicador.unidad);
}