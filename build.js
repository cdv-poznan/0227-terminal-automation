const sass = require("sass");
const fs = require("fs");

const compiled = sass.renderSync({ file: "./src/style.scss" });

const css = compiled.css.toString("utf8");

fs.writeFileSync("./dist/style.css", css);
