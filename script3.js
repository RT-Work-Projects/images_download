const fs = require('fs');
const download = require('image-downloader');

try {
    let data = fs.readFileSync('data.csv', 'utf8').split('\n');
    // console.log(data);
    data.forEach((row, i) => {
        let imgName = row.trim().split(',')[0];
        let imgUrl = row.trim().split(',')[1];
        setTimeout(() => {
            // console.log(i);
            // console.log(imgName + " : " + imgUrl);
            options = {
                url: imgUrl,
                dest: `./images/${i}--${imgName}`
            };

            download.image(options)
                .then(({ filename }) => {
                    console.log('Saved: ', filename);
                })
                .catch((err) => console.error(err));
        }, i * 600);
    });
} catch (e) {
    console.log('Error:', e.stack);
}