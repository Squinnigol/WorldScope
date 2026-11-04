export class Dashboard {
    constructor(contenedor, api, paises, catalogo, grafico) {
        this.contenedor = contenedor;
        this.api = api;
        this.paises = paises;
        this.catalogo = catalogo;
        this.grafico = grafico;
        this.anio = null;
        
    }
    
    mostrarPais(codigo) {
        const pais = this.paises.find(p => p.id === codigo);
        this.codigo = codigo;
        this.pais = pais;
        this.anio = null;
        this.tarjetas = [];
        this.contenedor.innerHTML = "";
        this.contenedor.hidden = false;
        
        if (pais === undefined) {
            this.contenedor.textContent = "País no encontrado.";
            return;
        }
        
        const cabecera = document.createElement("div");
        cabecera.className = "pais-cabecera";
        
        const bandera = document.createElement("img");
        bandera.src = `https://flagcdn.com/w160/${pais.iso2Code.toLowerCase()}.png`;
        bandera.alt = `Bandera de ${pais.name}`;
        bandera.width = 80;
        
        const titulo = document.createElement("h2");
        titulo.textContent = pais.name;
        
        const datos = document.createElement("p");
        datos.textContent = `${pais.region.value.trim()} - Capital: ${pais.capitalCity}`;
        
        cabecera.append(bandera, titulo, datos, this.crearSelectorAnio());
        this.contenedor.append(cabecera);
        
        let categoriaActual = "";
        let rejilla;
        for (const indicador of this.catalogo) {
            if (indicador.categoria !== categoriaActual) {
                categoriaActual = indicador.categoria;
                const subtitulo = document.createElement("h3");
                subtitulo.textContent = categoriaActual;
                rejilla = document.createElement("div");
                rejilla.className = "rejilla";
                this.contenedor.append(subtitulo, rejilla);
            }
            const tarjeta = this.crearTarjeta(indicador);
            this.tarjetas.push({ tarjeta, indicador });
            tarjeta.addEventListener("click", () => this.abrirGrafico(indicador));
            rejilla.append(tarjeta);
            this.rellenarTarjeta(tarjeta, indicador, codigo);
        }
        
        this.contenedor.scrollIntoView({ behavior: "smooth" });
    }
    
    crearSelectorAnio() {
        const anioMin = 1960;
        const anioMax = new Date().getFullYear() - 1;
        
        const panel = document.createElement("div");
        panel.className = "selector-anio";
        
        const etiqueta = document.createElement("span");
        etiqueta.textContent = "Año:";
        
        const anterior = this.crearBoton("◀", "Año anterior");
        const textoAnio = document.createElement("strong");
        textoAnio.textContent = "Último";
        const siguiente = this.crearBoton("▶", "Año siguiente");
        const ultimo = this.crearBoton("Último", "Último dato disponible");
        
        const fila = document.createElement("div");
        fila.className = "selector-anio-barra";
        const barra = document.createElement("input");
        barra.type = "range";
        barra.min = anioMin;
        barra.max = anioMax;
        barra.value = anioMax;
        barra.setAttribute("aria-label", "Año de los datos");
        fila.append(anioMin, barra, anioMax);
        
        const cambiarAnio = (anio) => {
            this.anio = anio;
            if (anio === null) {
                textoAnio.textContent = "Último";
                barra.value = anioMax;
            } else {
                textoAnio.textContent = anio;
                barra.value = anio;
            }
            this.actualizarTarjetas();
        };
        
        barra.addEventListener("input", () => cambiarAnio(Number(barra.value)));
        anterior.addEventListener("click", () => cambiarAnio(Math.max(anioMin, Number(barra.value) - 1)));
        siguiente.addEventListener("click", () => cambiarAnio(Math.min(anioMax, Number(barra.value) + 1)));
        ultimo.addEventListener("click", () => cambiarAnio(null));
        
        panel.append(etiqueta, anterior, textoAnio, siguiente, ultimo, fila);
        return panel;
    }
    
    crearBoton(texto, descripcion) {
        const boton = document.createElement("button");
        boton.type = "button";
        boton.textContent = texto;
        boton.setAttribute("aria-label", descripcion);
        return boton;
    }
    
    actualizarTarjetas() {
        for (const elemento of this.tarjetas) {
            this.rellenarTarjeta(elemento.tarjeta, elemento.indicador, this.codigo);
        }
    }
    
    async abrirGrafico(indicador) {
        const serie = await indicador.obtenerSerie(this.api, this.codigo);
        if (serie.ultimoValor() === null) {
            return;
        }
        
        let anioDestacado = this.anio;
        if (anioDestacado === null) {
            anioDestacado = serie.ultimoAnio();
        }
        
        const titulo = `${this.pais.name} · ${indicador.nombre} (${indicador.unidad})`;
        this.grafico.mostrar(titulo, serie, anioDestacado);
    }
    
    crearTarjeta(indicador) {
        const tarjeta = document.createElement("article");
        tarjeta.className = "tarjeta";
        
        const nombre = document.createElement("h4");
        nombre.textContent = indicador.nombre;
        
        const valor = document.createElement("p");
        valor.className = "tarjeta-valor";
        valor.textContent = "Cargando…";
        
        const detalle = document.createElement("p");
        detalle.className = "tarjeta-detalle";
        detalle.textContent = indicador.unidad;
        
        tarjeta.append(nombre, valor, detalle);
        return tarjeta;
    }
    
    async rellenarTarjeta(tarjeta, indicador, codigo) {
        const valor = tarjeta.querySelector(".tarjeta-valor");
        const detalle = tarjeta.querySelector(".tarjeta-detalle");
        valor.textContent = "Cargando…";
        detalle.textContent = indicador.unidad;
        tarjeta.classList.remove("tarjeta-error");
        
        try {
            const serie = await indicador.obtenerSerie(this.api, codigo);
            
            let numero;
            let anio;
            if (this.anio === null) {
                numero = serie.ultimoValor();
                anio = serie.ultimoAnio();
            } else {
                numero = serie.valorEnAnio(this.anio);
                anio = this.anio;
            }
            
            if (numero === null) {
                valor.textContent = "Sin datos";
                return;
            }
            
            if (Math.abs(numero) >= 1000000) {
                valor.textContent = numero.toLocaleString("es-ES", { notation: "compact", compactDisplay: "long", maximumFractionDigits: 2 });
            } else {
                valor.textContent = numero.toLocaleString("es-ES", { maximumFractionDigits: 2 });
            }
            detalle.textContent = `${indicador.unidad} · ${anio}`;
        } catch (error) {
            valor.textContent = "Error al cargar";
            tarjeta.classList.add("tarjeta-error");
        }
    }
}