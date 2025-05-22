// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  // Configuración del sistema de contenido
  content: {
    collections: [
      {
        name: 'blog',
        pattern: 'src/content/blog/**/*.{md,mdx}'
      }
    ]
  }
});