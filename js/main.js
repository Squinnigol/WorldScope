import { WorldBankAPI } from './WorldBankAPI.js';
import { BuscadorPaises } from './BuscadorPaises.js';
import { Dashboard } from './Dashboard.js';
import { catalogo } from './catalogo.js';
import { Grafico } from './Grafico.js';
import { Favoritos } from './Favoritos.js';

const api = new WorldBankAPI();
const favoritos = new Favoritos();
window.favoritos = favoritos; // solo per provare dalla console, poi lo togliamo
const paises = await api.obtenerPaises();

new BuscadorPaises(
    document.querySelector("#buscador-inicio"),
    document.querySelector("#resultados-inicio"),
    paises
);

const grafico = new Grafico(document.querySelector("#dialogo-grafico"));
const dashboard = new Dashboard(document.querySelector("#pais-resultado"), api, paises, catalogo, grafico, favoritos);

function router() {
    const partes = location.hash.split("/");
    if (partes[1] === "pais") {
        dashboard.mostrarPais(partes[2]);
    }
}

window.addEventListener("hashchange", router);
router();

const botonArriba = document.querySelector("#boton-arriba");
window.addEventListener("scroll", () => {
    botonArriba.hidden = window.scrollY < 400;
});
botonArriba.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});