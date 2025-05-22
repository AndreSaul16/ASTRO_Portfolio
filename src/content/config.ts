// src/content/config.ts
import { defineCollection, z } from 'astro:content';

// Definimos una colección para los posts del blog
const blogCollection = defineCollection({
  type: 'content', // 'content' para archivos Markdown o MDX
  schema: z.object({
    title: z.string(), // Título del post (obligatorio)
    pubDate: z.date(), // Fecha de publicación (obligatoria)
    description: z.string(), // Descripción corta para vistas previas (obligatoria)
    author: z.string().default('Saúl Briceño'), // Autor, con un valor por defecto
    image: z.object({
      url: z.string().optional(), // URL de una imagen destacada (opcional)
      alt: z.string().optional()  // Texto alternativo para la imagen (opcional)
    }).optional(),
    tags: z.array(z.string()).optional(), // Array de tags o categorías (opcional)
    isDraft: z.boolean().default(false), // Para marcar si es un borrador (opcional)
    // Puedes añadir más campos aquí según necesites
    // Por ejemplo: category: z.string().optional(),
  }),
});

// Exportamos las colecciones que hemos definido
export const collections = {
  'blog': blogCollection,
};
