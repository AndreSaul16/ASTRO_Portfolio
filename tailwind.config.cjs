// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'
    ],
    theme: {
        extend: {
            // Aquí puedes añadir tus personalizaciones de tema más adelante
            // fontFamily: {
            //   sans: ['TuFuenteFavorita', 'sans-serif'],
            // },
            // colors: {
            //   'custom-amber': '#FFBF00',
            // }
        },
        fontFamily: {
            // El nombre 'sans' es la fuente por defecto de Tailwind para sans-serif.
            // Si quieres que Anton sea tu fuente sans-serif principal en todo el sitio:
            // sans: ['Anton', 'sans-serif'],

            // O, si quieres usarla solo para elementos específicos con una clase custom:
            'anton': ['Anton', 'sans-serif'], // La usaremos como font-anton
            'roboto-mono': ['"Roboto Mono"', 'monospace'], // La usaremos como font-roboto-mono
            'rubik-glitch': ['"Rubik Glitch"', 'cursive'] // O 'sans-serif' como fallback genérico
         
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}