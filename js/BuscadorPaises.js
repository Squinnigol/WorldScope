export class BuscadorPaises {
    constructor(input, lista, paises) {
        this.input = input;
        this.lista = lista;
        this.paises = paises;
        this.input.addEventListener("input", () => this.buscar());
    }
    
    normalizar(texto) {
        return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
    }
    
    buscar() {
        const texto = this.normalizar(this.input.value);
        if (texto === "") {
            this.lista.innerHTML = "";
            return;
        }
        const resultados = this.paises
        .filter(p => this.normalizar(p.name).includes(texto))
        .slice(0, 8);
        this.mostrar(resultados);
    }
    
    mostrar(resultados) {
        this.lista.innerHTML = "";
        for (const pais of resultados) {
            const li = document.createElement("li");
            const enlace = document.createElement("a");
            enlace.href = `#/pais/${pais.id}`;
            
            const bandera = document.createElement("img");
            bandera.src = `https://flagcdn.com/w40/${pais.iso2Code.toLowerCase()}.png`;
            bandera.alt = "";
            bandera.width = 24;
            
            enlace.append(bandera, pais.name);
            enlace.addEventListener("click", () => {
                this.input.value = "";
                this.lista.innerHTML = "";
                if (location.hash === enlace.hash) {
                    window.dispatchEvent(new Event("hashchange"));
                }
            });
            
            li.append(enlace);
            this.lista.append(li);
        }
    }
}