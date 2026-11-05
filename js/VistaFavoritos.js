export class VistaFavoritos {
    constructor(contenedor, paises, favoritos) {
        this.contenedor = contenedor;
        this.paises = paises;
        this.favoritos = favoritos;
    }

    mostrar() {
        this.contenedor.innerHTML = "";

        if (this.favoritos.lista.length === 0) {
            const aviso = document.createElement("p");
            aviso.textContent = "Todavía no tienes favoritos. Busca un país y pulsa ☆ para guardarlo.";
            this.contenedor.append(aviso);
            return;
        }

        const tabla = document.createElement("table");
        tabla.className = "tabla-favoritos";
        tabla.innerHTML = `
            <thead>
                <tr><th>Bandera</th><th>País</th><th>Región</th><th>Capital</th><th></th></tr>
            </thead>
        `;

        const cuerpo = document.createElement("tbody");
        for (const codigo of this.favoritos.lista) {
            const pais = this.paises.find(p => p.id === codigo);
            if (pais === undefined) {
                continue;
            }

            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td><img src="https://flagcdn.com/w40/${pais.iso2Code.toLowerCase()}.png" alt="" width="40"></td>
                <td><a href="#/pais/${pais.id}">${pais.name}</a></td>
                <td>${pais.region.value.trim()}</td>
                <td>${pais.capitalCity}</td>
                <td><button type="button" class="boton-quitar" aria-label="Quitar ${pais.name} de favoritos">✕</button></td>
            `;

            fila.querySelector(".boton-quitar").addEventListener("click", () => {
                this.favoritos.alternar(codigo);
                this.mostrar();
            });

            cuerpo.append(fila);
        }

        tabla.append(cuerpo);
        this.contenedor.append(tabla);
    }
}