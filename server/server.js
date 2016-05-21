const app = require(__dirname + '/_server.js');
const PORT = 4000;

app(PORT, 'mongodb://localhost/2R_db', console.log('server up on ' + PORT));
