import { WorldBankAPI } from './WorldBankAPI.js';
import { BuscadorPaises } from './BuscadorPaises.js';
import { Dashboard } from './Dashboard.js';
import { catalogo } from './catalogo.js';
import { Grafico } from './Grafico.js';
import { Favoritos } from './Favoritos.js';
import { VistaFavoritos } from './VistaFavoritos.js';
import { Tema } from './Tema.js';
import { MaquinaDeEscribir } from './MaquinaDeEscribir.js';

const api = new WorldBankAPI();
const favoritos = new Favoritos(document.querySelector("#contador-favoritos"));
new Tema(document.querySelector("#boton-tema"));
const paises = await api.obtenerPaises();

new BuscadorPaises(
    document.querySelector("#buscador-inicio"),
    document.querySelector("#resultados-inicio"),
    paises
);

new MaquinaDeEscribir(document.querySelector("#buscador-inicio"), paises.map(p => p.name));

const grafico = new Grafico(document.querySelector("#dialogo-grafico"));
const dashboard = new Dashboard(document.querySelector("#pais-resultado"), api, paises, catalogo, grafico, favoritos);
const vistaFavoritos = new VistaFavoritos(document.querySelector("#contenido-favoritos"), paises, favoritos);
const vistas = document.querySelectorAll(".vista");

function mostrarVista(id) {
    for (const vista of vistas) {
        vista.hidden = vista.id !== id;
    }
    document.body.dataset.vista = id;
    window.scrollTo(0, 0);
}

function router() {
    const partes = location.hash.split("/");
    if (partes[1] === "pais") {
        const desdeOtraVista = document.querySelector("#vista-inicio").hidden;
        mostrarVista("vista-inicio");
        dashboard.mostrarPais(partes[2], desdeOtraVista);
    } else if (partes[1] === "favoritos") {
        mostrarVista("vista-favoritos");
        vistaFavoritos.mostrar();
    } else {
        mostrarVista("vista-inicio");
        dashboard.ocultar();
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