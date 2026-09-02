# Coki Librería

Interfaz web de una librería de barrio: catálogo de útiles escolares, servicio de
impresiones y consulta del estado de pedidos. Trabajo Práctico 2 — HTML + CSS
(Flexbox, Grid, variables CSS y Responsive Design), versionado con Git y GitHub.

## Integrantes

- Nahum Saravia — [@Nahum-Saravia](https://github.com/Nahum-Saravia) (CSS / estilos)
- Sofía Sánchez — [@sofisanchez126](https://github.com/sofisanchez126)
- _(completar tercer integrante)_

## Descripción breve

El sitio está formado por varias páginas HTML semánticas que comparten una única
hoja de estilos externa (`style.css`):

| Página | Contenido |
| --- | --- |
| `MenuPrincipal.html` | Inicio con las categorías principales |
| `libreria.html` | Búsqueda y selección de productos de librería |
| `impresiones.html` | Formulario para configurar una impresión |
| `consultarpedido.html` | Búsqueda del estado de un pedido |
| `SesionUsuario.html` | Inicio de sesión de cliente |
| `SesionAdmin.html` | Inicio de sesión de administrador |

## Tecnologías utilizadas

- HTML5 semántico (`header`, `nav`, `main`, `section`, `article`, `footer`, `form`)
- CSS3: variables (`:root` / `var()`), Flexbox, CSS Grid, Media Queries, Box Model
- Tipografías de Google Fonts: **Fredoka** (títulos) y **Nunito** (texto)
- Git y GitHub (ramas `main` / `dev`, Pull Requests)

## ¿Dónde utilizamos Flexbox?

- **Navegación del `header`** (`nav` / `nav ul`): los enlaces se distribuyen en fila
  con `display: flex`, `gap` y `flex-wrap`.
- **Barra de app** de `libreria.html` y `consultarpedido.html`: el logo, el menú y
  el carrito se alinean con `display: flex` y `align-items: center`.
- **Formulario de login (`#clientLoginForm`)** y **footer**: columnas centradas con
  Flexbox.

## ¿Dónde utilizamos Grid?

- **Sección de categorías del inicio** (`[data-page="inicio"] main > section`):
  `display: grid` con `grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))`
  para que las tarjetas se reacomoden solas.
- **Listado de productos** (`#productList`) y **resultados de pedido**
  (`#searchResults`): grillas con `repeat(auto-fill, minmax(...))`.
- **Formulario de impresiones** en pantallas medianas: grid de 2 columnas dentro de
  una media query.

## ¿Qué variables CSS creamos?

Definidas en `:root` y usadas con `var()`:

- **Colores de marca:** `--color-primario`, `--color-primario-oscuro`,
  `--color-secundario`, `--color-secundario-oscuro`
- **Neutros y superficies:** `--color-fondo`, `--color-superficie`,
  `--color-superficie-alt`, `--color-texto`, `--color-texto-suave`, `--color-borde`
- **Estados:** `--color-exito`, `--color-error`
- **Tipografías:** `--fuente-titulos`, `--fuente-texto`
- **Espaciado:** `--esp-xs`, `--esp-sm`, `--esp-md`, `--esp-lg`, `--esp-xl`
- **Bordes y radios:** `--radio-sm`, `--radio-md`, `--radio-lg`, `--borde-fino`
- **Sombras:** `--sombra-sm`, `--sombra-md`, `--sombra-lg`
- **Layout:** `--ancho-contenido`

## ¿Cómo implementamos el Responsive Design?

- **Enfoque mobile first:** los estilos base están pensados para celular (una sola
  columna) y se van ampliando con media queries.
- **Media queries** en `min-width: 600px` (tablet) y `min-width: 992px` (escritorio):
  el header del inicio pasa a fila, el formulario de impresiones a 2 columnas y las
  grillas usan celdas más anchas.
- **Unidades relativas:** `rem` para tipografía y espaciados, `%` y `fr` para anchos,
  `vw` / `vh` para medidas de viewport (`min-height: 100vh`, `width: min(92vw, 400px)`),
  `px` sólo para bordes y detalles finos.
- **`clamp()`** en los títulos para que escalen entre un mínimo y un máximo.
- **Grillas fluidas** con `auto-fit` / `auto-fill` que cambian la cantidad de columnas
  según el ancho disponible.
- `<meta name="viewport">` en todas las páginas.

## Estructura del proyecto

```
Coki_Libreria/
├── img/
│   ├── coki-logo.png
│   ├── consultas.png
│   ├── impresiones.png
│   └── utilesescolares.png
├── style.css
├── MenuPrincipal.html
├── libreria.html
├── impresiones.html
├── consultarpedido.html
├── SesionUsuario.html
├── SesionAdmin.html
└── README.md
```

## Flujo de trabajo con Git

1. Ramas `main` (entrega final) y `dev` (desarrollo).
2. Todo el desarrollo se hace sobre `dev` (o ramas `feat/...` que se integran a `dev`).
3. Commits frecuentes con mensajes claros y descriptivos.
4. Pull Requests con compañeros asignados como revisores.
5. Integración final de `dev` a `main`.
