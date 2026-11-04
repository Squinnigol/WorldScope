# Planificación de WorldScope (entrega: viernes 06/11/2026)

| Día | Objetivo | Tareas | Ramas | Hito |
|---|---|---|---|---|
| **Vie 30/10** | Diseño | Análisis de requisitos y PDF · Mockups (home, país, comparar, favoritos) · Decisiones de navegación · Estructura de carpetas · Git: main + dev | — | ✅ Diseño cerrado |
| **Sáb 31/10** | Estructura y estilo base | HTML semántico (header, nav, 4 vistas, footer) · CSS: variables de color, tema claro/oscuro, layout responsive del header · Globo CSS girando (día/noche) | `feature/html-estructura` · `feature/css-base` | Home visible con globo |
| **Dom 01/11** | Datos | Clase `WorldBankAPI` (fetch, paginación, caché `Map`, errores) · Clases `Serie`, `Indicador`, `IndicadorDerivado` · `catalogo.js` con los 15 indicadores | `feature/api-worldbank` · `feature/modelo-indicadores` | 217 países y series correctas en consola |
| **Lun 02/11** | MVP | `BuscadorPaises` (2 instancias) con banderas · `MaquinaDeEscribir` · Router por hash en `WorldScopeApp` · `Dashboard`: página país (15 tarjetas + panel con slider) · Estados: carga / error / sin datos · `solicitudId` | `feature/buscador` · `feature/pagina-pais` | 🚩 **PR dev → main** (MVP) |
| **Mar 03/11** | Requisitos mínimos | Gráfico de líneas (Chart.js) · Tabla del historial · `Preferencias` (favoritos ★, tema, última selección) · Vista Favoritos (tabla) · Exportar CSV | `feature/grafico` · `feature/favoritos-tema` · `feature/csv` | 🚩 **PR dev → main** (requisitos cubiertos) |
| **Mié 04/11** | Extras | Vista Comparar (barras del año + líneas de evolución) · Mapa satelital Leaflet en página país (*se recorta primero si hay retraso*) | `feature/comparar` · `feature/mapa` | App completa |
| **Jue 05/11** | Entrega | Pruebas de los 5 criterios de aceptación · Repaso responsive · Optimizar imágenes · README · Memoria técnica (PDF) · Capturas de Trello · GitHub Pages | `docs/readme-memoria` | 🚩 **PR final dev → main** |
| **Vie 06/11** | Presentación | Ensayo: explicar clases, herencia, flujo de datos y decisiones de diseño | — | 🎤 |

## Bitácora diaria

### 30/10/2026
- Análisis de requisitos y del diseño original (PDF).
- Mockups: navegación, home con globo, página país, favoritos, comparar.
- Estructura inicial del proyecto y ramas main / dev y feature/html.

### 31/10/2026
- Estructura HTML semántica: head, header, 4 vistas (inicio, país, comparar, favoritos) y footer.
- Decisiones: estrella ★ para favoritos, «Mis favoritos» en toda la interfaz.
- Retraso de medio día respecto al plan: el CSS pasa a esta tarde/mañana.


### 01/11/2026
- CSS base: variables, tema claro/oscuro, cabecera responsive.
- Globo CSS girando, versión de noche, halo de atmósfera.
- Portada a pantalla completa con fondo de estrellas.
- Siguiente paso: título, subtítulo y buscador dentro del globo con efecto cristal.



### 02/11/2026
- Titulo, subtitulo y buscador dentro del globo con efecto cristal.
- Quitadas las lupas.
- Ajustes de la barra de busqueda en el globo.
- Rama `feature/api-worldbank`: clase `WorldBankAPI` con `pedir(ruta)` (fetch, control de errores, caché con `Map`), `obtenerPaises()` (217 países, filtrando agregados con `region.id !== "NA"`) y `obtenerIndicador(codigoPais, codigoIndicador)`.


### 03/11/2026
- Renombrado `obtenerIndicator` → `obtenerIndicador` para mantener todo el código en español.
- Rama `feature/modelo-indicadores`:
  - Clase `Serie`: guarda los puntos `{anio, valor}` y ofrece `ultimoValor()`, `ultimoAnio()`, `valorEnAnio(anio)`, `anios()` y `valores()`. Devuelve `null` cuando no hay datos.
  - Clase `Indicador` (código, nombre, categoría, unidad) con `obtenerSerie(api, codigoPais)`: pide los datos a `WorldBankAPI`, quita los años sin valor, convierte el año a número y ordena de antiguo a reciente.
  - Clase `IndicadorDerivado` (`extends Indicador`): sobrescribe `obtenerSerie` para calcular población × tasa / 1000 (nacimientos y defunciones estimados). Comprobado con España: 317.517 nacimientos en 2024.
  - `catalogo.js` iniciado (2 de 15 indicadores).
- Pendiente: completar `catalogo.js` con los 15 indicadores del PDF.
- Retraso respecto al plan: el MVP (buscador, página país) previsto para el 02/11 aún no está empezado.



### 04/11/2026
- `catalogo.js` completado con los 15 indicadores del PDF (13 directos + 2 derivados). PR `feature/modelo-indicadores` → `dev`.
- Rama `feature/buscador`: clase `BuscadorPaises` con banderas (flagcdn), máximo 8 resultados y búsqueda sin acentos (`normalize("NFD")`): «mexico» encuentra «México». PR → `dev`.
- Cambio de diseño: un solo buscador dentro del globo (quitado el de la cabecera). Al elegir un país, los datos aparecen debajo del globo con desplazamiento suave. Favoritos y Comparar siguen como vistas aparte (`<section>` + enlaces con `#`).
- Rama `feature/pagina-pais`:
  - Clase `Dashboard`: cabecera del país (bandera, nombre, región, capital) y 15 tarjetas agrupadas por categoría.
  - Las 15 peticiones se lanzan en paralelo; cada tarjeta se rellena al llegar sus datos.
  - Estados: «Cargando…», «Sin datos» y «Error al cargar» (`try/catch`).
  - Números grandes abreviados (`notation: "compact"`): «2,25 billones».
  - Router mínimo en `main.js`: lee `#/pais/ITA` con el evento `hashchange`.
- Limpieza de ramas ya fusionadas en GitHub y en local.
- Corregido: volver a buscar el mismo país no hacía nada (el hash no cambiaba). Ahora se lanza el evento `hashchange` a mano con `dispatchEvent`.
- Botón fijo «↑» abajo a la derecha: aparece al bajar más de 400 px (`scrollY`) y vuelve arriba con `scrollTo` suave.
- Selector de año en la cabecera del país: barra deslizante (`<input type="range">`, 1960–2025), flechas ◀ ▶ y botón «Último». Las 15 tarjetas se actualizan al instante con `valorEnAnio` gracias a la caché de `WorldBankAPI`. Se probó primero un `<select>`, pero 66 años en una lista eran incómodos.
- PR `feature/pagina-pais` → `dev` (#6).
- Rama `feature/grafico`:
  - Chart.js 4 por CDN.
  - Nueva clase `Grafico`: dibuja una `Serie` como gráfico de líneas dentro de un `<dialog>` nativo (se cierra con ✕ o Esc, sin JavaScript gracias a `<form method="dialog">`).
  - Clic en una tarjeta → evolución del indicador en todos los años, con un punto en el año elegido.
  - Los colores se leen de las variables CSS (preparado para el tema oscuro).
  - `Dashboard` recibe el `Grafico` desde `main.js` (composición).



#### Pendiente para el jueves 05/11
1. `feature/preferencias`: clase `Preferencias` con `localStorage` → favoritos ★ en la cabecera del país, tema claro/oscuro con el botón 🌙 y último país visto.
2. Router completo (`#/`, `#/pais/XXX`, `#/favoritos`) y vista Favoritos con una tabla de los países guardados. Si sobra tiempo, hacer el enlace «Comparar». `MaquinaDeEscribir` (solo si sobra tiempo).
3. `feature/estilo-tarjetas`: colores y fondos de las tarjetas (después del tema, para probar los dos).
4. Pruebas y repaso responsive · README · Memoria técnica (PDF) · GitHub Pages · PR `dev` → `main`. 



### 05/11/2026
- ...