// express web server 
const express = require('express'); // require is grabbing from node modules, it allows us to use express on this page
const bodyParser = require('body-parser'); 
const app = express(); // the object app now has the functionallity of express

app.use(bodyParser.json());
app.use('/', require('./routes/contacts'));
const port = process.env.port || 8081;

app.listen(port);
console.log('Web server at port: ' + port);

