# Pizzería Mamma Mía — Hito 4

En este hito trabajé sobre mi proyecto de React y Vite para consumir la API de pizzas entregada en el material de apoyo. Reemplacé los datos locales del catálogo y agregué una vista de detalle para una pizza específica.

Utilicé el backend de apoyo sin modificarlo, concentrándome en obtener sus datos y mostrarlos en el frontend.

## Tecnologías

- JavaScript, React y Vite.
- Bootstrap y CSS para la presentación.
- Fetch API para las solicitudes HTTP.
- Node.js y Express en el backend de apoyo.

## Requisitos

Necesito Node.js y npm instalados, con una versión de Node compatible con las dependencias del proyecto. Puedo comprobarlos con:

```bash
node --version
npm --version
```

El frontend y el backend se ejecutan por separado. Debo mantener ambos procesos activos en dos terminales. También necesito internet para instalar dependencias y cargar las imágenes externas.

## Iniciar el backend

Descomprimo **Material de apoyo - Backend Pizzas.zip** y entro a la carpeta que contiene su `package.json`:

```bash
cd simple-api-backend-nodejs-express-fs-json-jwt-main
npm install
npm start
```

El servidor debe indicar que está disponible en `http://localhost:5000`. Inicio el proceso desde su propia carpeta porque lee los datos mediante rutas relativas.

Para comprobarlo, abro estas direcciones en el navegador:

| Endpoint | Respuesta esperada |
| --- | --- |
| `http://localhost:5000/api/pizzas` | Arreglo con las pizzas disponibles. |
| `http://localhost:5000/api/pizzas/p001` | Objeto con la información de la pizza napolitana. |

Estas consultas son públicas y no necesitan token. El backend ya incluye la configuración de CORS para permitir solicitudes desde el frontend.

## Iniciar el frontend

En una segunda terminal, entro a la carpeta del frontend, donde está su `package.json`:

```bash
cd desafio_react_4-main
npm install
npm run dev
```

Si trabajé desde un clon de GitHub, utilizo el nombre de la carpeta del clon en lugar de `desafio_react_4-main`.

Abro la URL que indique Vite. Habitualmente es `http://localhost:5173`, pero utilizo el puerto informado en la terminal. Mantengo el backend funcionando en el puerto `5000`, porque las consultas apuntan explícitamente a esa dirección.

## Revisar Home y Pizza

Siguiendo el enunciado, utilicé `App.jsx` para mostrar una vista a la vez. No incorporé React Router en este hito.

Para revisar el detalle, dejo estos imports:

```jsx
import Pizza from "./components/Pizza";
// import Home from "./components/Home";
```

Entre `Navbar` y `Footer`, dejo:

```jsx
{/* <Home /> */}
<Pizza />
```

Para revisar el catálogo, invierto los comentarios:

```jsx
// import Pizza from "./components/Pizza";
import Home from "./components/Home";
```

```jsx
<Home />
{/* <Pizza /> */}
```

Conservo ambos componentes implementados. El botón “Ver más” no cambia de pantalla en esta etapa; reviso cada vista mediante el cambio indicado en `App.jsx`. Para la presentación final dejo visible `Pizza`, como propone la última etapa del enunciado.

## Cambios que realicé y justificación técnica

### 1. Conecté el catálogo a la API

En `Home.jsx` retiré el import de las pizzas locales desde `src/utils/pizza.js`. Consulté `GET http://localhost:5000/api/pizzas` con `fetch` dentro de `useEffect`.

Guardé la respuesta con `useState([])`. El arreglo vacío permite trabajar con una lista desde el primer render; al recibir los datos, el setter actualiza el estado y React renderiza nuevamente la interfaz.

Conservé `Header` y reutilicé `CardPizza`, pasando nombre, descripción, precio, ingredientes e imagen mediante props. Así, `Home` obtiene los datos y las tarjetas se encargan de presentarlos. Utilicé el ID de cada pizza como `key` de la lista.

### 2. Creé la vista de detalle

Agregué `Pizza.jsx` y consulté `GET http://localhost:5000/api/pizzas/p001` dentro de su propio `useEffect`. Mantuve el ID fijo `p001`, como solicita el desafío.

Inicialicé el estado en `null` porque este endpoint devuelve un objeto. Antes de acceder a sus propiedades, comprobé que la carga hubiera terminado y que existiera la pizza.

Mostré nombre, precio, ingredientes, imagen y descripción. Incluí el botón de añadir al carrito sin funcionalidad, de acuerdo con el alcance de este hito.

### 3. Agregué carga y manejo de errores

Incorporé estados de carga y error en ambos componentes para comunicar cuándo la solicitud está pendiente o falla.

Comprobé `response.ok` antes de leer el JSON, porque respuestas como `404` no generan automáticamente un rechazo de `fetch`. Organicé la consulta con `try`, `catch` y `finally` para procesar los datos, mostrar errores y finalizar la carga.

### 4. Incorporé limpieza de efectos

Utilicé `AbortController` y devolví una función de limpieza desde cada efecto para cancelar solicitudes pendientes cuando el componente se retira. También comprobé que la solicitud no estuviera cancelada antes de actualizar el estado.

Mantuve los hooks al inicio de los componentes y las funciones asíncronas dentro de los efectos. El arreglo de dependencias vacío corresponde a consultas que no dependen de valores reactivos cambiantes en este hito.

### 5. Reutilicé componentes y mejoré la presentación

Reutilicé `formatCurrency` para mostrar separadores chilenos: por ejemplo, `5950` se presenta como `$5.950` al agregar el símbolo en el JSX.

Agregué estilos para el encabezado y las imágenes. Utilicé `object-fit: cover` para conservar sus proporciones y clases de Bootstrap para adaptar la distribución al ancho de la pantalla.

Conservé los componentes de hitos anteriores. No incorporé autenticación, checkout ni persistencia del carrito, porque no forman parte de esta entrega.

## Cumplimiento de la escala de evaluación

| Criterio | Implementación | Forma de revisión | Puntaje posible |
| --- | --- | --- | ---: |
| Home consume la API y renderiza tarjetas. | Consulta a `/api/pizzas`, almacenamiento del arreglo en estado y renderizado de `CardPizza` mediante `map`. | Mostrar Home y comprobar las tarjetas y la solicitud en Network. | 2 |
| Home utiliza useEffect. | La consulta se inicia dentro de un efecto con dependencias vacías. | Revisar `Home.jsx`. | 2 |
| Pizza consume la API y renderiza información. | Consulta a `/api/pizzas/p001` y almacenamiento del objeto en estado. | Mostrar Pizza y comprobar el detalle de la napolitana. | 2 |
| Pizza utiliza useEffect. | La consulta se inicia dentro del efecto del componente. | Revisar `Pizza.jsx`. | 2 |
| Pizza muestra los cinco datos solicitados. | Presentación de `name`, `price`, `ingredients`, `img` y `desc`. | Comprobar nombre, precio, ingredientes, imagen y descripción en pantalla. | 2 |
| **Total** | | | **10** |

Esta tabla relaciona el trabajo con los criterios. El puntaje final depende de la evaluación y del correcto funcionamiento de la aplicación.

## Comprobaciones para revisar la entrega

Con ambos servidores activos, puedo comprobar:

1. Que Home muestre las tarjetas obtenidas desde la API.
2. Que Pizza muestre los cinco datos de `p001` y el botón de añadir.
3. Que las consultas tengan respuesta `200` en la pestaña Network del navegador.
4. Que aparezca un mensaje de carga al simular una conexión lenta.
5. Que aparezca un mensaje de error al detener el backend y recargar.
6. Que el precio de la pizza napolitana sea `$5.950`.

Desde la carpeta del frontend, ejecuto además:

```bash
npm run lint
npm run build
```

Lint revisa el código con ESLint y build genera la versión de producción con Vite. Debo resolver los errores que reporten antes de entregar. Estos comandos complementan las pruebas manuales; no sustituyen la comprobación de las consultas al backend.

## Observaciones

- El proyecto utiliza `StrictMode`. En desarrollo puede aparecer una solicitud cancelada seguida de otra por la comprobación adicional de efectos de React.
- Si aparece `Failed to fetch`, compruebo que el backend esté activo en el puerto `5000`.
- Si los datos aparecen pero una imagen falla, reviso su solicitud externa en Network.
- Esta configuración está preparada para revisión local, con frontend y backend ejecutándose en el mismo equipo.
