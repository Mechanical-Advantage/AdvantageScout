import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import css from "rollup-plugin-css-only";
import svelte from "rollup-plugin-svelte";
import { terser } from "rollup-plugin-terser";

export default {
    input: "current/GameManager.js",
    output: {
        format: "iife",
        name: "GameManager",
        file: "build/game.js"
    },
    plugins: [
        svelte(),
        css({ output: "game_rollup.css" }),
        terser(),
        resolve({
            browser: true,
            dedupe: ["svelte"]
        }),
        commonjs(),
        babel({ babelHelpers: "bundled" })
    ]
};
