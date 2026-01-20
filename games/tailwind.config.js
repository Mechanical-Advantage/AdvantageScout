/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./current/**/*.svelte"],
    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: "#3b82f6",
                    secondary: "#facc15",
                    accent: "#012be5",
                    neutral: "#191D24",
                    "base-100": "#1a1a1a",
                    info: "#3ABFF8",
                    success: "#19b428",
                    warning: "#fbe923",
                    error: "#fa3939"
                }
            }
        ]
    },
    theme: {
        extend: {
            animation: {
                'mobility': 'skew-5deg translate-70px fade-out'
            }
        }
    },
    plugins: [require("daisyui"), require("tailwindcss-animate")]
};
