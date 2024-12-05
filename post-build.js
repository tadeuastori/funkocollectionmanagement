const fs = require('fs-extra');
fs.move('docs/browser', 'docs', { overwrite: true }, (err) => { 
    if(err) { 
        return console.error(err); 
    } else {
        fs.remove('docs/browser', (err) => { if(err) { return console.error(err); } });
        fs.remove('dist/*', (err) => { if(err) { return console.error(err); } });
    } 
});

