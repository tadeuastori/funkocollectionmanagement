const fs = require('fs-extra');
fs.move('docs/browser', 'dist', (err) => { if(err) { return console.error(err); } });
fs.remove('docs/browser', (err) => { if(err) { return console.error(err); } });
fs.remove('dist/*', (err) => { if(err) { return console.error(err); } });