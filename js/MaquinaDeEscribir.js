export class MaquinaDeEscribir {
    constructor(input, palabras) {
        this.input = input;
        this.palabras = palabras;
        this.textoOriginal = input.placeholder;
        this.temporizador = null;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        this.input.addEventListener("focus", () => this.detener());
        this.input.addEventListener("blur", () => this.iniciar());
        this.iniciar();
    }

    elegirPalabra() {
        const indice = Math.floor(Math.random() * this.palabras.length);
        return this.palabras[indice];
    }

    iniciar() {
        this.palabra = this.elegirPalabra();
        this.letras = 0;
        this.borrando = false;
        this.paso();
    }

    detener() {
        clearTimeout(this.temporizador);
        this.input.placeholder = this.textoOriginal;
    }

    paso() {
        if (this.borrando) {
            this.letras--;
        } else {
            this.letras++;
        }
        this.input.placeholder = "Buscar: " + this.palabra.slice(0, this.letras);

        let espera = 100;
        if (!this.borrando && this.letras === this.palabra.length) {
            this.borrando = true;
            espera = 1500;
        } else if (this.borrando && this.letras === 0) {
            this.borrando = false;
            this.palabra = this.elegirPalabra();
            espera = 400;
        } else if (this.borrando) {
            espera = 50;
        }

        this.temporizador = setTimeout(() => this.paso(), espera);
    }
}