<div align="center">
  <h1>🍗 Brasas del Sabor</h1>
  <h3>Landing page gastronómica para pedidos de pollo a la brasa</h3>
  <br>
  <p>
    <a href="https://ai.studio/apps/5ab29619-592a-4a09-99ee-365277c09c48">
      <img src="https://img.shields.io/badge/Ver%20en-Google%20AI%20Studio-4285F4?style=for-the-badge&logo=google" alt="Ver en Google AI Studio">
    </a>
    <img src="https://img.shields.io/badge/Estado-En%20desarrollo-f59e0b?style=for-the-badge" alt="Estado en desarrollo">
    <img src="https://img.shields.io/badge/Licencia-MIT-16a34a?style=for-the-badge" alt="Licencia MIT">
  </p>
  <p>
    <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React 19">
    <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript">
    <img src="https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite" alt="Vite 6">
    <img src="https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS 4">
  </p>
</div>

---

## 📸 Vista previa

> Reemplaza las rutas de ejemplo por tus capturas reales. Guárdalas en public/images/screenshots/.

<div align="center">
  <table>
    <tr><td align="center" width="50%"><strong>🏠 Inicio</strong></td><td align="center" width="50%"><strong>🍗 Carta</strong></td></tr>
    <tr><td><img src="./public/images/screenshots/inicio.png" alt="Página de inicio" width="100%"></td><td><img src="./public/images/screenshots/carta.png" alt="Carta y catálogo" width="100%"></td></tr>
    <tr><td align="center"><strong>🏷️ Promociones</strong></td><td align="center"><strong>🛒 Carrito</strong></td></tr>
    <tr><td><img src="./public/images/screenshots/promociones.png" alt="Promociones" width="100%"></td><td><img src="./public/images/screenshots/carrito.png" alt="Carrito de compras" width="100%"></td></tr>
    <tr><td align="center"><strong>📍 Ubicación</strong></td><td align="center"><strong>💬 WhatsApp</strong></td></tr>
    <tr><td><img src="./public/images/screenshots/ubicacion.png" alt="Ubicación y mapa" width="100%"></td><td><img src="./public/images/screenshots/whatsapp.png" alt="Contacto por WhatsApp" width="100%"></td></tr>
  </table>
</div>

<!-- Ejemplo usando una imagen alojada en internet:
<img src="https://tu-dominio.com/imagenes/inicio.png" alt="Inicio" width="800">
-->

---

## 🎯 Descripción

**Brasas del Sabor** es una landing page moderna y responsive para un restaurante especializado en pollo a la brasa peruano. Reúne la presentación del negocio, carta, promociones, ubicación, reseñas y preguntas frecuentes.

El visitante puede explorar productos, filtrar por categorías, consultar detalles, marcar favoritos, agregar productos al carrito y generar un pedido o consulta mediante WhatsApp.

> **Alcance actual:** frontend demostrativo con datos locales/mock y persistencia en el navegador. Preparado para evolucionar hacia una API, inventario y pedidos reales.

## ✨ Funcionalidades

| Ícono | Funcionalidad | Descripción |
| --- | --- | --- |
| 🏠 | **Hero principal** | Presentación de la marca y llamadas a la acción. |
| 🍽️ | **Carta digital** | Catálogo con categorías y búsqueda. |
| 🔍 | **Detalle de producto** | Modal con información y productos relacionados. |
| 🏷️ | **Promociones** | Ofertas, descuentos y cupones configurables. |
| 🛒 | **Carrito** | Cantidades, delivery y total estimado. |
| ⭐ | **Favoritos** | Productos guardados en localStorage. |
| 💬 | **WhatsApp** | Acceso directo para consultas o pedidos. |
| 📍 | **Ubicación** | Dirección, horarios y mapa. |
| 📱 | **Responsive** | Experiencia adaptada a móvil y escritorio. |

## 🛠️ Tecnologías

- **React 19** y **TypeScript**
- **Vite 6** y **Tailwind CSS 4**
- **Lucide React** para iconos
- **Motion** para animaciones
- **Canvas Confetti** para efectos de confirmación
- **Google GenAI** disponible para futuras integraciones con Gemini

## 📁 Estructura del proyecto

~~~text
.
├── public/                  # Recursos públicos y futuras capturas
├── src/
│   ├── components/          # Secciones, catálogo, carrito y navegación
│   ├── context/             # Estado global de carrito y notificaciones
│   ├── data/                # Productos, ofertas, categorías, FAQ y reseñas
│   ├── hooks/               # Hooks reutilizables
│   ├── services/            # Servicios de productos y pedidos
│   ├── assets/              # Imágenes y recursos de la marca
│   ├── config.ts            # Datos del restaurante y cupones
│   ├── App.tsx              # Composición principal
│   └── main.tsx             # Punto de entrada
├── index.html
├── package.json
└── vite.config.ts
~~~

## 🚀 Instalación y ejecución

### Requisitos

- Node.js 18 o superior
- npm 9 o superior

~~~bash
git clone <URL_DEL_REPOSITORIO>
cd pollería-brasas-del-sabor
npm install
npm run dev
~~~

Abre http://localhost:3000 en tu navegador.

## 📜 Scripts disponibles

~~~bash
npm run dev      # Servidor de desarrollo
npm run lint     # Comprueba TypeScript
npm run build    # Compilación de producción en dist/
npm run preview  # Previsualiza la compilación
~~~

## ⚙️ Configuración

Actualiza los datos del negocio en src/config.ts: nombre, teléfono, WhatsApp, dirección, mapa, horarios, delivery, redes sociales y cupones. Los productos, categorías, ofertas, reseñas y preguntas frecuentes se gestionan desde src/data/.

Si utilizas Google AI Studio, copia .env.example como .env.local y configura:

~~~env
GEMINI_API_KEY=tu_clave_de_gemini
APP_URL=http://localhost:3000
~~~

No publiques claves privadas en el repositorio.

## 📄 Licencia

Este proyecto se distribuye bajo la licencia MIT. Consulta [LICENSE](./LICENSE) para conocer los términos completos.

## 👨‍💻 Autor

Desarrollado por **WangLing Tech**.

<div align="center"><p>Hecho con ❤️ usando React, TypeScript y Tailwind CSS.</p></div>
