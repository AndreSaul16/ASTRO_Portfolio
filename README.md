# 🚀 Portafolio Personal con Astro

![Astro](https://img.shields.io/badge/Astro-FF5D01?style=for-the-badge&logo=astro&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)

## 📝 Descripción

Este es un portafolio personal moderno y dinámico construido con Astro, diseñado para mostrar proyectos, habilidades y experiencia profesional. El sitio incorpora efectos visuales avanzados, animaciones fluidas y una interfaz de usuario inspirada en terminales y sistemas operativos futuristas.

### 🌟 Características Principales

- **Diseño Responsivo**: Adaptable a todos los dispositivos y tamaños de pantalla
- **Efectos Visuales**: 
  - Efecto glitch en textos
  - Animaciones de carga tipo terminal
  - Efectos de scanline
  - Transiciones suaves entre secciones
- **Secciones Interactivas**:
  - Hero section con efectos de terminal
  - Sección "Sobre Mí" con tarjeta 3D interactiva
  - Blog con sistema de contenido dinámico
  - Formulario de contacto con animaciones
- **Optimización de Rendimiento**:
  - Generación estática de páginas
  - Carga progresiva de imágenes
  - Animaciones optimizadas con GSAP

## 🏗️ Estructura del Proyecto

```
portafolio/
├── public/                 # Archivos estáticos
│   ├── assets/            # Imágenes y recursos
│   └── blog/              # Imágenes del blog
├── src/
│   ├── components/        # Componentes reutilizables
│   │   ├── Blog/         # Componentes del blog
│   │   ├── Contact/      # Componentes de contacto
│   │   ├── Global/       # Componentes globales
│   │   ├── Projects/     # Componentes de proyectos
│   │   └── UI/           # Componentes de interfaz
│   ├── content/          # Contenido del blog (Markdown)
│   ├── layouts/          # Layouts de página
│   ├── pages/            # Páginas de la aplicación
│   ├── scripts/          # Scripts y animaciones
│   └── styles/           # Estilos globales
├── astro.config.mjs      # Configuración de Astro
├── tailwind.config.cjs   # Configuración de Tailwind
└── tsconfig.json         # Configuración de TypeScript
```

## 🛠️ Tecnologías Utilizadas

### Core
- [Astro](https://astro.build/) - Framework web para sitios estáticos
- [TypeScript](https://www.typescriptlang.org/) - Superset tipado de JavaScript
- [TailwindCSS](https://tailwindcss.com/) - Framework CSS utility-first

### Animaciones y Efectos
- [GSAP](https://greensock.com/gsap/) - Biblioteca de animaciones
- [ScrollTrigger](https://greensock.com/scrolltrigger/) - Plugin GSAP para animaciones al scroll

### Desarrollo
- [Node.js](https://nodejs.org/) - Entorno de ejecución JavaScript
- [npm](https://www.npmjs.com/) - Gestor de paquetes

## 🚀 Cómo Empezar

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/AndreSaul16/ASTRO_Portfolio.git
   cd ASTRO_Portfolio
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abre [http://localhost:4321](http://localhost:4321) en tu navegador

### Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye el sitio para producción
- `npm run preview` - Vista previa de la versión de producción
- `npm run format` - Formatea el código
- `npm run lint` - Ejecuta el linter

## 🎨 Características Técnicas Detalladas

### Sistema de Animaciones
El proyecto implementa un sistema modular de animaciones (`src/scripts/animations.js`) que incluye:

- **Efecto Glitch**: Simula distorsiones visuales en textos
- **Typewriter**: Efecto de escritura máquina de escribir
- **Card3D**: Efecto de rotación 3D en tarjetas
- **ScrollTrigger**: Animaciones basadas en scroll
- **Gestor de Efectos**: Sistema para componer y gestionar múltiples efectos

### Sistema de Blog
Implementado usando el sistema de contenido de Astro:

- Contenido en Markdown
- Metadatos para cada post
- Sistema de etiquetas
- Previsualizaciones de posts
- Rutas dinámicas

### Optimizaciones
- Generación estática de páginas
- Optimización de imágenes
- Lazy loading de componentes
- Animaciones optimizadas con GSAP
- Código dividido por rutas

## 📚 Aprendizajes y Buenas Prácticas

### Arquitectura
- Componentes modulares y reutilizables
- Separación clara de responsabilidades
- Sistema de layouts para consistencia
- Gestión de estado y efectos

### Rendimiento
- Optimización de assets
- Carga progresiva
- Animaciones optimizadas
- Generación estática

### Accesibilidad
- Semántica HTML correcta
- Contraste de colores adecuado
- Navegación por teclado
- Textos alternativos

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para contribuir:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 📞 Contacto

Saúl Briceño - [@tu_twitter](https://twitter.com/tu_twitter) - email@ejemplo.com

Link del Proyecto: [https://github.com/AndreSaul16/ASTRO_Portfolio](https://github.com/AndreSaul16/ASTRO_Portfolio)
