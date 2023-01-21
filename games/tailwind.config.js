/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./current/**/*.svelte"],
    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: "#3b82f6",
                    secondary: "#facc15",
                    accent: "#c729c2",
                    neutral: "#191D24",
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
        extend: {
            keyframes: {
                softbounce: {
                    '0%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(50px)' },
                    '100%': {transform: 'translateY(0)'}
                }
            },

            animation: {
                'softbounce': 'softbounce 2s ease-in-out infinte'
            }
        }
    },
    plugins: [require("daisyui"), require("tailwindcss-animate")]
};
