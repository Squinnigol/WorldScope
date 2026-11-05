# WorldScope

WorldScope es una web para consultar datos de cualquier país del mundo. Buscas un país, lo eliges y ves de un vistazo cómo está en demografía, economía, salud y sociedad, con datos oficiales del Banco Mundial.

Es mi proyecto individual del curso. Está hecho con HTML, CSS y JavaScript, sin frameworks.

## Qué se puede hacer

- Buscar entre 217 países desde la portada, con un globo terráqueo que gira de fondo.
- Ver la ficha de cada país: bandera y 15 indicadores agrupados por temas.
- Moverse por los años con una barra (de 1960 al año pasado) o volver al último dato disponible de cada indicador con el botón "Último".
- Pulsar cualquier tarjeta para ver su evolución en un gráfico, con el año elegido marcado.
- Guardar países en favoritos y verlos todos juntos en una tabla.
- Cambiar entre tema claro y tema oscuro. La web recuerda la elección.
- El buscador encuentra el país aunque no escribas las tildes ("republica" encuentra "República Checa").
- Un contador junto a Favoritos indica cuántos países tienes guardados.
- Un botón para volver arriba aparece al bajar por la página.
- Funciona también en el móvil, y la animación del buscador se desactiva si el sistema pide reducir el movimiento.

## Cómo probarlo

El código usa módulos de JavaScript, así que no funciona si abres `index.html` con doble clic. Hace falta un servidor local. Cualquiera de estas dos opciones sirve:

- En VS Code, con la extensión Live Server: clic derecho sobre `index.html` y "Open with Live Server".
- Con Python instalado, desde la carpeta del proyecto:

```
python -m http.server
```

y después abrir `http://localhost:8000` en el navegador.

Hace falta conexión a internet, porque los datos se piden a la API en el momento.

## De dónde salen los datos

Todo viene de la API pública del Banco Mundial (versión 2, en español). No necesita clave.

Dos de los indicadores no existen tal cual en la API y los calculo yo: los nacimientos y las defunciones estimadas. Salen de multiplicar la población por la tasa por cada 1.000 habitantes y dividir entre 1.000. Por eso aparecen como estimación.

Las banderas vienen de flagcdn.com y los gráficos están hechos con Chart.js.

Las texturas del globo son de NASA Blue Marble.

## Cómo está organizado

```
index.html          una sola página con todas las vistas
css/styles.css      estilos y los dos temas
js/                 una clase por archivo
assets/img/         texturas del globo (día y noche)
docs/bitacora.md    diario del proyecto
```

Las clases principales:

- `WorldBankAPI`: hace las peticiones a la API y guarda las respuestas en caché, así que cambiar de año no vuelve a pedir nada.
- `Indicador` e `IndicadorDerivado`: describen cada dato. La segunda hereda de la primera y se usa para los que se calculan.
- `Serie`: guarda los datos de un indicador año por año y permite pedir el último valor, el valor de un año concreto o la lista de años y valores para el gráfico.
- `catalogo.js`: la lista de los 15 indicadores.
- `Dashboard`: monta la ficha del país, el selector de año y el botón de favorito.
- `BuscadorPaises`: el buscador con sugerencias.
- `Grafico`: la ventana con el gráfico.
- `Favoritos` y `VistaFavoritos`: guardan los favoritos en `localStorage` y los muestran.
- `Tema`: el cambio de tema claro/oscuro.
- `MaquinaDeEscribir`: el efecto del texto que se escribe solo en el buscador.

## Una sola página

Toda la web es un único `index.html`. Cuando pasas de la portada a un país o a Favoritos, el navegador no carga otra página: `main.js` mira la dirección y enseña la sección que toca, ocultando las demás.

Para eso uso la parte de la URL que va después de `#`:

- `#/` es la portada.
- `#/pais/ESP` es la ficha de un país.
- `#/favoritos` es la lista de favoritos.

Cada vez que cambia, salta el evento `hashchange` y una función, el router, decide qué mostrar. Así la lista de países se pide una sola vez al abrir la web, el cambio entre vistas es inmediato, y los botones de atrás y adelante del navegador funcionan con normalidad. También se puede guardar o compartir el enlace directo a un país.

## Cómo he trabajado

He usado ramas: `main` para lo estable y definitivo, `dev` para el día a día y una rama `feature/...` para cada cosa nueva, que se une a `dev` con un pull request cada vez. En `docs/bitacora.md` está el registro de lo que hice cada día y las decisiones que fui tomando. Ese archivo sustituye al tablero de Trello.

## Lo que se quedó fuera

Al principio había más ideas: comparar países, exportar a CSV, un mapa y un historial. Las quité para llegar a tiempo con lo importante bien hecho.