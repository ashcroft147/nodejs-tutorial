/* 
 * node의 clustering 에 관한 예제이다.
 */
const cluster = require('cluster');


if(cluster.isMaster) {
    // Cause index.js to be executed *again* but in child mode
    cluster.fork();
    // cluster.fork();
    // cluster.fork();
    // cluster.fork();
} else {

    // Executed when child mode
    const express = require('express');
    const app = express();

    function doWork(duration) {
        const start = Date.now();
        while (Date.now() - start < duration) {};
    }

    app.get('/', (req, res) => {
        doWork(5000); // Event loop에서의 computational code는 event loop의 다른 작업을 blocking한다.
        res.send('Hi /');
    });

    app.get('/fast', (req, res) => {
        res.send('Hi /fast');
    });

    app.listen(3000);
}