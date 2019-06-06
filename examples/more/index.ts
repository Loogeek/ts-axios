import axios, { AxiosError } from '../../src/index';
import { AxiosError } from '../../src/core/error';

// document.cookie = 'a=b';

// axios.get('/more/get').then(res => {
//   console.log(res);
// });

// axios
//   .post(
//     'http://127.0.0.1:4000/more/server2',
//     {},
//     {
//       withCredentials: true
//     }
//   )
//   .then(res => {
//     console.log(res);
//   });

// const instance = axios.create();

// axios
//   .post(
//     '/more/post',
//     {
//       a: 1
//     },
//     {
//       auth: {
//         username: 'loogeek',
//         password: '123'
//       }
//     }
//   )
//   .then(res => console.log(res));

axios
  .get('/more/304')
  .then(res => {
    console.log(res);
  })
  .catch((e: AxiosError) => {
    console.log(e.message);
  });

axios
  .get('/more/304', {
    validateStatus(status) {
      return status >= 200 && status < 400;
    }
  })
  .then(res => console.log(res))
  .catch((e: AxiosError) => console.log(e.message));
