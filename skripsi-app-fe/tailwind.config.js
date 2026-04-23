import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        color:{
            'heading-color': '#0F147F',
            'text-color': '#4A4E6D'
        },
        extend: {},

    },
    plugins: [daisyui],
}

