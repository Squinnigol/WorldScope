export class Tema {
    constructor(boton) {
        this.boton = boton;
        this.clave = "worldscope-tema";
        const guardado = localStorage.getItem(this.clave);
        if (guardado === null) {
            this.actual = "claro";
        } else {
            this.actual = guardado;
        }
        this.aplicar();
        this.boton.addEventListener("click", () => this.cambiar());
    }

    cambiar() {
        if (this.actual === "claro") {
            this.actual = "oscuro";
        } else {
            this.actual = "claro";
        }
        localStorage.setItem(this.clave, this.actual);
        this.aplicar();
    }

    aplicar() {
        document.documentElement.dataset.tema = this.actual;
        if (this.actual === "oscuro") {
            this.boton.textContent = "☀️";
            this.boton.setAttribute("aria-label", "Cambiar a tema claro");
        } else {
            this.boton.textContent = "🌙";
            this.boton.setAttribute("aria-label", "Cambiar a tema oscuro");
        }
    }
}