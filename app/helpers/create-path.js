const path = require('path');

const createPath = (page) => path.resolve(__dirname, '../angular-ngrx', `${page}.html`);

module.exports = createPath;