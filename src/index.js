/* 
 * node의 pm2 활용을 토한 clustering
 * pm2 실행 : pm2 start index.js -i 0 ( ※ logical cores on your computer)
 */
const express = require('express');
const crypto = require('crypto');
const app = express();

app.get('/', (req, res) => {     
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
        res.send('Hi /');  
    })  
});

app.get('/fast', (req, res) => {
    res.send('Hi /fast');
});

app.listen(3000);
