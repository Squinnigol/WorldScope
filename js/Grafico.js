export class Grafico {
    constructor(dialogo) {
        this.dialogo = dialogo;
        this.titulo = dialogo.querySelector(".dialogo-titulo");
        this.lienzo = dialogo.querySelector("canvas");
        this.grafico = null;
    }

    mostrar(titulo, serie, anioDestacado) {
        this.titulo.textContent = titulo;
        this.dialogo.showModal();

        if (this.grafico !== null) {
            this.grafico.destroy();
        }

        const estilos = getComputedStyle(document.documentElement);
        const colorPrimario = estilos.getPropertyValue("--color-primario").trim();
        const colorTexto = estilos.getPropertyValue("--color-texto-suave").trim();

        const anios = serie.anios();

        this.grafico = new Chart(this.lienzo, {
            type: "line",
            data: {
                labels: anios,
                datasets: [{
                    data: serie.valores(),
                    borderColor: colorPrimario,
                    backgroundColor: colorPrimario,
                    pointRadius: anios.map(anio => anio === anioDestacado ? 6 : 0),
                    tension: 0.2
                }]
            },
            options: {
                locale: "es-ES",
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: { ticks: { color: colorTexto } },
                    y: { ticks: { color: colorTexto } }
                }
            }
        });
    }
}