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
- ...



### 01/11/2026
- ...



### 02/11/2026
- ...


### 03/11/2026
- ...



### 04/11/2026
- ...



### 05/11/2026
- ...