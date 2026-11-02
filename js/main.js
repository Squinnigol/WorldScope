import {WorldBankAPI} from './WorldBankAPI.js';

const api = new WorldBankAPI();
const paises = await api.obtenerPaises();
console.log(paises.length);
const poblacion = await api.obtenerIndicator('ESP', 'SP.POP.TOTL');
console.log(poblacion.length, poblacion[0]);
console.time('segunda')
await api.obtenerPaises();
console.timeEnd('segunda');