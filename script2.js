const parse = require('csv-parse');
const fs = require('fs');
const download = require('image-downloader');

const processFile = async () => {
    // let count = 0;
    let records = [];
    const parser = fs
        .createReadStream(`./test.csv`)
        .pipe(parse({
            // CSV options if any
        }));
    for await (const record of parser) {
        // Work with each record
        setTimeout(() => {
            options = {
                url: record[1],
                dest: `./images/${record[0]}`
            };

            download.image(options)
                .then(({ filename }) => {
                    console.log('Saved to', filename)
                })
                .catch((err) => console.error(err));

            records.push(record);
            // count++;
        }, 2000);
    }
    return records
}

(async () => {
    const records = await processFile()
    // console.info(records);
})()