import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import css from "rollup-plugin-css-only";
import svelte from "rollup-plugin-svelte";
import { terser } from "rollup-plugin-terser";

export default {
    input: "src/Admin.js",
    output: {
        format: "iife",
        name: "Admin",
        file: "build/admin.js"
    },
    plugins: [
        svelte(),
        css({ output: "admin_rollup.css" }),
        terser(),
        resolve({
            browser: true,
            dedupe: ["svelte"]
        }),
        commonjs(),
    ]
};
