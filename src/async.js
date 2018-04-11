
/* 
 * OS와 관련된 Task가 libuv의 Thread pool의 사용과는 다름을 보여주는 예제
 * 보통 networking과 관련한 task는 OS와 관련이 되어 있고, 
 * libuv의 역할은 request 를 호출하는 역할을 하고, 
 * request의 결과를 받아서 node에 결과를 알려주는 역할은 OS가 수행한다.
 */
const https = require('https');

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

doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();