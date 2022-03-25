const path = require("path");

const createPath = (page) => path.resolve(__dirname, "../view", `${page}.html`);

module.exports = createPath;