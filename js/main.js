import { WorldBankAPI } from './WorldBankAPI.js';
import { BuscadorPaises } from './BuscadorPaises.js';

const api = new WorldBankAPI();
const paises = await api.obtenerPaises();

new BuscadorPaises(
    document.querySelector("#buscador-inicio"),
    document.querySelector("#resultados-inicio"),
    paises
);
new BuscadorPaises(
    document.querySelector("#buscador-header"),
    document.querySelector("#resultados-header"),
    paises
);