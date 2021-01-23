const fs = require('fs');
const csv = require('csv-parse');
const download = require('image-downloader');

let options = {};

fs.createReadStream('data.csv')
    .pipe(csv())
    .on('data', (row) => {
        options = {
            url: row[1],
            dest: `./images/${row[0]}.jpg`
        }

        download.image(options)
            .then(({ filename }) => {
                console.log('Saved to', filename)
            })
            .catch((err) => console.error(err))
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
    });