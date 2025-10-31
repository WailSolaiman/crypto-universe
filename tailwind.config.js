/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                dark: {
                    primary: '#0a0a0a',
                    secondary: '#1a1a1a',
                    card: '#2a2a2a',
                },
                accent: {
                    blue: '#007acc',
                    light: '#00a8ff',
                },
            },
        },
    },
    plugins: [],
}
