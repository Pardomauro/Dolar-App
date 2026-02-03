
# AppDolarHoy

AppDolarHoy es una aplicación desarrollada en React que permite consultar la cotización actual del dólar en Argentina, facilitando la conversión de divisas y mostrando información relevante de manera clara y actualizada.

## Funcionalidades principales

- **Consulta de cotización del dólar**: Obtiene y muestra la cotización actualizada del dólar en Argentina.
- **Conversión de divisas**: Permite convertir montos entre pesos argentinos y dólares estadounidenses.
- **Formato de fechas**: Presenta la fecha de la última actualización en un formato legible y amigable.
- **Interfaz intuitiva**: Diseño simple y moderno, optimizado para una experiencia de usuario fluida.

## Estructura del proyecto

- `src/App.jsx`: Componente principal de la aplicación.
- `src/pages/Home.jsx`: Página principal donde se visualiza la cotización y se realizan las conversiones.
- `src/hooks/useCotizacion.js`: Hook personalizado para obtener la cotización del dólar desde una API externa.
- `src/utils/convertCurrency.js`: Función utilitaria para realizar la conversión de monedas.
- `src/utils/formatDate.js`: Función utilitaria para formatear fechas.
- `src/App.css`: Estilos principales de la aplicación.

## Implementaciones destacadas

- **React Hooks**: Uso de hooks personalizados para la gestión de datos y lógica de negocio.
- **Vite**: Configuración con Vite para un desarrollo rápido y eficiente.
- **ESLint**: Configuración de ESLint para mantener buenas prácticas y calidad de código.
- **Despliegue en Vercel**: Preparado para despliegue rápido y sencillo en Vercel.

## Instalación y uso

1. Clona el repositorio:
	```bash
	git clone <url-del-repositorio>
	```
2. Instala las dependencias:
	```bash
	npm install
	```
3. Inicia la aplicación en modo desarrollo:
	```bash
	npm run dev
	```
4. Accede a la app en [http://localhost:5173](http://localhost:5173)

## Créditos

Desarrollado por Mauro para la práctica de programación en React.

---

