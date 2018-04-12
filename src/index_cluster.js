/* 
 * node의 clustering 에 관한 예제이다.
 * - cluster.fork() 메소드 호출을 통해서 child instance의 갯수를 늘릴수 있지만. 무조건 성능에 이점이 있는 것은 아니다.
 * - cluster의 갯수는 node가 실행되는 컴퓨터 스펙의 physical core 혹은 logical core의 갯수와 동일하게 가져가는 것이 
 *   성능상의 이점을 얻을 수 있는 방법이다.
 */
process.env.UV_THREADPOOL_SIZE = 1; // every child instance of cluster has 1 thread 
const cluster = require('cluster');

if(cluster.isMaster) {
    // Cause index.js to be executed *again* but in child mode
    cluster.fork(); // every cluster has their own threadpool
    cluster.fork();
    // cluster.fork();
    // cluster.fork();
    // cluster.fork();
} else {

    // Executed when child mode
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
}