const fs = require('fs');
const moment = require('moment');

exports.pre = (data) => {
    return `<pre>${JSON.stringify(data)}</pre>`;
};

exports.serveSVG = (filename) => {
    return fs.readFileSync(`./public/img/${filename}.svg`)
};

exports.bodyPreview = (input) => {
    if (input) {
        let body = input.replace(/<(?:.|\n)*?>/gm, "");
        return body.length > 40 ? body.substring(0, 40) + '...' : body;
    }
}

exports.dateFormat = (date, format) => {
    return moment(date).format(format);
};