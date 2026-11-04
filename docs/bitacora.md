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
- La entrega es el viernes 06/11 por la mañana: quedan la tarde/noche del 04/11 y el jueves 05/11 (ver «Pendiente»).

#### Pendiente, por orden de prioridad
Rama actual: `feature/pagina-pais` (subida, sin PR todavía).

**Tarde/noche del 04/11**
1. Cerrar `feature/pagina-pais`: selector de año en la cabecera del país (las 15 tarjetas muestran el valor de ese año con `valorEnAnio`) · botón fijo «↑» abajo a la derecha (`window.scrollTo`) · arreglar que buscar el mismo país otra vez no hace nada (el hash no cambia) · PR → `dev`.
2. `feature/grafico`: clic en una tarjeta → `<dialog>` con gráfico de líneas (Chart.js por CDN) y tabla del historial (año / valor) + exportar CSV.

**Jueves 05/11 por la mañana**

3. `feature/favoritos-tema`: clase `Preferencias` (localStorage): ★ en la cabecera del país, tema claro/oscuro con el botón 🌙.
4. Router completo en `main.js`: `#/` inicio · `#/pais/XXX` · `#/favoritos` · `#/comparar` (mostrar una `<section>` y ocultar las demás). Vista Favoritos: tabla con los países guardados (clic → `#/pais/XXX`).

**Jueves 05/11 a mediodía (límite: 15:00)**

5. `feature/comparar` reducido: 2.ª instancia de `BuscadorPaises` + `<select>` de indicador + un gráfico con una línea por país.

**Jueves 05/11 por la tarde**

6. Pruebas de los criterios de aceptación y repaso responsive · README · memoria técnica (PDF) · GitHub Pages · PR `dev` → `main`.

**Viernes 06/11**: entrega por la mañana y presentación.

Recortado: mapa Leaflet, `MaquinaDeEscribir` (solo si sobra tiempo).



### 05/11/2026
- ...