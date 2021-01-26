const fs = require('fs');
const csv = require('csv-parse');
const https = require('https');
const Stream = require('stream').Transform;

fs.createReadStream('sample.csv')
    .pipe(csv())
    .on('data', (row) => {
        let options = new URL(row[1]);
        https.request(options, function (response) {
            let data = new Stream();

            response.on('data', function (chunk) {
                data.push(chunk);
            });

            response.on('error', (e) => {
                console.error(e);
            });

            response.on('end', function () {
                fs.writeFileSync(`.\\images\\${row[0]}`, data.read());
            });
        })
            .on("error", (err) => {
                console.log(err);
            })
            .on('timeout', (err) => {
                console.log(err);
                abort();
            })
            .on('uncaughtException', (err) => {
                console.log(err);
                abort();
            })
            .end(() => {
                console.log('request ends');
            });
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
    });