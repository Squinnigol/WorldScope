export class WorldBankAPI {
    constructor() {
        this.urlBase = "https://api.worldbank.org/v2/es";
        this.cache = new Map();
    }
    async pedir(ruta) {
        if (this.cache.has(ruta)) {
            return this.cache.get(ruta);
        }
        const respuesta = await fetch(`${this.urlBase}${ruta}`);
        if (!respuesta.ok) {
            throw new Error(`Error ${respuesta.status} al pedir ${ruta}`);
        }
        const datos = await respuesta.json();
        this.cache.set(ruta, datos);
        return datos;
    }
    async obtenerPaises() {
        const datos = await this.pedir(`/country?format=json&per_page=300`);
        return datos[1].filter(pais => pais.region.id !=='NA');
    }

    async obtenerIndicador(codigoPais, codigoIndicador) {
        const datos = await this.pedir(`/country/${codigoPais}/indicator/${codigoIndicador}?format=json&per_page=300`);

        return datos[1] ?? [];
    }
}