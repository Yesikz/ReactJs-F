#  Yume

Yume es un proyecto de **e-commerce** desarrollado con **React + Vite**. Permite a los usuarios explorar productos, agregarlos al carrito, registrarse, iniciar sesión y realizar compras. También cuenta con un panel de administración para gestionar productos usando **MockAPI**.


## 🔧 Tecnologías utilizadas

* React
* Vite
* CSS (estilos personalizados con responsive design)
* MockAPI (para la gestión de productos desde el admin)
* JavaScript 
* 


## 📁 Estructura del proyecto


ecom-yume/
├─ public/
├─ src/
│  ├─ assets/          # Imágenes y recursos estáticos
│  ├─ components/      # Componentes reutilizables (Header, Footer, Producto, Carrito, Formulario)
│  ├─ pages/           # Páginas principales (Home, Admin, Login, Registro, Pago)
│  ├─ styles/          # CSS global y componentes (main.css)
│  ├─ App.jsx          # Componente principal
│  └─ main.jsx         # Entrada de Vite
├─ package.json
└─ vite.config.js


## 🚀 Instalación y ejecución

1. Clonar el repositorio:

   bash
   git clone https://github.com/tu-usuario/ecom-yume.git


2. Instalar dependencias:

   bash
   npm install


3. Ejecutar el proyecto en modo desarrollo:

   bash
   npm run dev


4. Abrir el navegador en:


   http://localhost:5173
   



## 🛒 Funcionalidades

### Usuario

* Explorar productos con imágenes, nombres y precios.
* Agregar productos al carrito.
* Editar la cantidad de productos en el carrito.
* Realizar compras a través del formulario de pago.
* Registro e inicio de sesión (mock).

### Admin

* Acceso al panel de administración.
* Crear, editar y eliminar productos usando **MockAPI**.
* Visualización de los productos en una tabla con acciones rápidas.



## 🔗 MockAPI

Para manejar los productos desde el admin, se utiliza **MockAPI**:

1. Crear una cuenta en [MockAPI](https://mockapi.io/).

2. Crear un nuevo proyecto y agregar un recurso llamado `productos`.

3. Cada producto debe tener:

   * `id`
   * `nombre`
   * `precio`
   * `imagen`
   * `descripcion` (opcional)

4. Configurar la URL base en el proyecto React:

javascript
   export const API_URL = "https://mockapi.io/proyecto-ecom-yume/productos";


5. Desde el panel de admin se pueden:

   * Crear nuevos productos
   * Editar productos existentes
   * Eliminar productos

6. Todos los cambios se reflejan automáticamente en el front-end.

---

## 🎨 Estilos y diseño

* CSS personalizado con clases reutilizables.

* Responsive design con media queries


## 📌 Notas adicionales

* El proyecto es fácilmente escalable para agregar más funcionalidades.
* Revisar rutas de imágenes y URLs de MockAPI antes de subir a producción.
* Compatible con dispositivos móviles, tablets y escritorio.


## ✨ Autor

* Creado por [Yesik].
* Proyecto educativo / portafolio personal.

