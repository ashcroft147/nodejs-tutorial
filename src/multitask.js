
/* 
 * https 는 OS를 사용하는 모듈
 * fs, crypto module은 Threadpool을 사용하는 모듈
 * 
 * Threadpool을 사용하는 모듈과 OS를 사용하는 모듈이 동시에 사용되었을때, 
 * 실행되는 순서를 보고자 하는 예제이다. 
 * 
 * fs 모듈은 두번의 pause가 발생하는데(1 : file의 메타정보를 얻어오는 경우, 2 : file stream 데이터를 얻는 경우)
 * fs의 pause가 발생함에 따라 Thread의 사용의 순서가 switch 됨을 잘 이해하는지에 관한 예제이다. 
 * 
 */
const https = require('https');
const crypto = require('crypto');
const fs = require('fs');


const start = Date.now();

function doRequest() {
    https.request('https://www.google.com', res => {
        res.on('data', () => {});
        res.on('end', () => {
            console.log(Date.now() - start);
        });
    })
    .end();
}

function doHash() {
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
        console.log('Hash:', Date.now() - start);
    });
}

doRequest();

fs.readFile('multitask.js', 'utf8', () => {
    console.log('FS: ', Date.now() - start);
});

doHash();
doHash();
doHash();
doHash();
