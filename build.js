const sass = require("sass");
const fs = require("fs");
const babel = require('@babel/core');

const compiled = sass.renderSync({ file: "./src/style.scss" });

const css = compiled.css.toString("utf8");

fs.writeFileSync("./dist/style.css", css);

babel.transform('async function get() {}');
