import {WorldBankAPI} from './WorldBankAPI.js';

const api = new WorldBankAPI();
const paises = await api.obtenerPaises();
console.log(paises.length);
const poblacion = await api.obtenerIndicador('ESP', 'SP.POP.TOTL');
console.log(poblacion.length, poblacion[0]);