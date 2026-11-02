export class WorldBankAPI {
    constructor() {
        this.urlBase = "https://api.worldbank.org/v2/es";
    }
    async pedir(ruta) {
        const respuesta = await fetch(`${this.urlBase}${ruta}`);
        if (!respuesta.ok) {
            throw new Error(`Error ${respuesta.status} al pedir ${ruta}`);
        }
        return respuesta.json();
    }
    async obtenerPaises() {
        const datos = await this.pedir(`/country?format=json&per_page=300`);
        return datos[1].filter(pais => pais.region.id !=='NA');
    }

    async obtenerIndicador(codigoPais, codicoIndicador) {
        const datos = await this.pedir(`/country/${codigoPais}/indicator/${codicoIndicador}?format=json&per_page=300`);

        return datos[1] ?? [];
    }
}