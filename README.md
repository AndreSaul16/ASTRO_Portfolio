# Portafolio con Astro y TailwindCSS

Este proyecto es un portafolio personal construido con [Astro](https://astro.build/) y [TailwindCSS](https://tailwindcss.com/).

## 🚀 Estructura del Proyecto

```text
portfolio/
├── public/
│   └── favicon.svg
│   └── assets/ # Imágenes globales, fuentes que no necesitan procesamiento
│       └── logo.png
├── src/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── projects/
│   │   │   │   └── proyecto1.jpg
│   │   │   └── blog/
│   │   │       └── imagen-post1.jpg
│   │   ├── components/
│   │   │   ├── Global/
│   │   │   │   ├── Header.astro
│   │   │   │   ├── Footer.astro
│   │   │   │   └── Navigation.astro
│   │   │   ├── UI/
│   │   │   │   ├── Button.astro
│   │   │   │   └── Card.astro
│   │   │   ├── Projects/
│   │   │   │   └── ProjectCard.astro
│   │   │   │   └── ProjectsSection.astro
│   │   │   ├── Blog/
│   │   │   │   └── BlogPostPreview.astro
│   │   │   │   └── BlogSection.astro
│   │   │   └── Contact/
│   │   │       └── ContactForm.astro
│   │   ├── content/
│   │   │   ├── blog/
│   │   │   │   ├── mi-primer-post.md
│   │   │   │   └── otro-articulo-genial.md
│   │   │   └── config.ts
│   │   ├── data/
│   │   │   └── projects.json
│   │   ├── layouts/
│   │   │   └── BaseLayout.astro
│   │   │   └── PostLayout.astro
│   │   ├── pages/
│   │   │   ├── index.astro
│   │   │   ├── blog/
│   │   │   │   ├── index.astro
│   │   │   │   └── [slug].astro
│   │   │   ├── contact.astro
│   │   │   └── 404.astro
│   │   ├── scripts/
│   │   │   ├── animations.js
│   │   │   └── main.js
│   │   ├── styles/
│   │   │   └── global.css
│   │   └── env.d.ts
│   ├── astro.config.mjs
│   ├── tailwind.config.cjs
│   ├── package.json
│   └── tsconfig.json
```

## 🧞 Comandos útiles

Todos los comandos se ejecutan desde la raíz del proyecto:

| Comando              | Acción                                         |
|----------------------|-----------------------------------------------|
| `npm install`        | Instala las dependencias                      |
| `npm run dev`        | Inicia el servidor de desarrollo (`localhost:4321`) |
| `npm run build`      | Genera el sitio para producción en `./dist/`  |
| `npm run preview`    | Previsualiza el sitio generado                |

## 📦 Dependencias principales

- Astro
- TailwindCSS
- @tailwindcss/vite

## 📚 Más información

- [Documentación de Astro](https://docs.astro.build)
- [Documentación de TailwindCSS](https://tailwindcss.com/docs)
