const fs = require("fs");
const path = require("path");

rollup_css = fs.readFileSync(path.join("build", "game_rollup.css"), "utf-8");
tailwind_css = fs.readFileSync(path.join("build", "game_tailwind.css"), "utf-8");
fs.writeFileSync(path.join("build", "game.css"), rollup_css + "\n" + tailwind_css);
