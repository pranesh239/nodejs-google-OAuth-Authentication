const fs = require('fs');

exports.visualize = (data) => {
    return `<pre>${JSON.stringify(data)}</pre>`;
};

exports.serveSVG = (filename) => {
    return fs.readFileSync(`./public/img/${filename}.svg`)
};