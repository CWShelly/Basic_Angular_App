
// process.env.APP_SECRET = 'secretymcsecret';
if (!process.env.APP_SECRET) {
  // process.env.APP_SECRET = 'aSecret';
  // console.log(process.env.APP_SECRET);
  throw new Error('you have to set the app secret environment variable');
}


// process.env.APP_SECRET ? console.log('got app secret') : process.env.APP_SECRET = 'secret';

// !process.env.APP_SECRET ? console.log('got app secret') : throw new Error('set the app secret first')
// if (process.env.APP_SECRET) {
//   console.log('got secret');
// }
// process.env.APP_SECRET = 'secret';

const app = require(__dirname + '/_server.js');
const PORT = 4000;

app(PORT, 'mongodb://localhost/2R_db', console.log('server is up on ' + PORT));
