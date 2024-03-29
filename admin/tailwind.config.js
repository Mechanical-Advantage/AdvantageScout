/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.svelte"],
    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: "#6419E6",
                    secondary: "#facc15",
                    accent: "#f3f4f6",
                    neutral: "#1269dc",
                    "base-100": "#1a1a1a",
                    info: "#3ABFF8",
                    success: "#36D399",
                    warning: "#FBBD23",
                    error: "#F87272"
                }
            }
        ]
    },
    theme: {
        extend: {}
    },
    plugins: [require("daisyui"), require("tailwindcss-animate")]
};
