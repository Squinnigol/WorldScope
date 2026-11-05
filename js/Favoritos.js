export class Favoritos {
    constructor() {
        this.clave = "worldscope-favoritos";
        const guardado = localStorage.getItem(this.clave);
        if (guardado === null) {
            this.lista = [];
        } else {
            this.lista = JSON.parse(guardado);
        }
    }

    guardar() {
        localStorage.setItem(this.clave, JSON.stringify(this.lista));
    }

    contiene(codigo) {
        return this.lista.includes(codigo);
    }

    alternar(codigo) {
        if (this.contiene(codigo)) {
            this.lista = this.lista.filter(c => c !== codigo);
        } else {
            this.lista.push(codigo);
        }
        this.guardar();
    }
}