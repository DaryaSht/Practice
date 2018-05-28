const express = require('express');// load library "express"

const app = express();// varible app is a web-server

app.use(express.static('public'));

app.listen(1357, () =>{// configure the server on the port
    console.log('Server on port 1357 is running!');
});

