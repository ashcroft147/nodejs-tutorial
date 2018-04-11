/* 
 * node.js는 single thread가 아니라는 것을 보여주는 예제이다. 
 * event loop는 single thread가 맞지만, CPU 연산이 필요한 Task는 
 * libuv 모듈을 통해서 실행되며, libuv는 4개의 Thread 가 실행되는 
 * Thread Pool을 구성한다.
 */

 //process.env.UV_THREADPOOL_SIZE = '5';
 const crypto = require('crypto');


const start = Date.now();
crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('1:', Date.now() - start);
})

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('2:', Date.now() - start);
})

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('3:', Date.now() - start);
})

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('4:', Date.now() - start);
})

// Thread Pool이 네 개인 경우 5번째 pbkdf2 메소드의 실행시간이 
// 병렬로 처리가 안되어 시간이 증가됨을 보여준다. 
crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('5:', Date.now() - start);
})