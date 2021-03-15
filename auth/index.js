const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get('api', (req, res) => {
    res.status(200).send('Hi there');
});

app.listen(30001, () => {
    console.log('Auth service has been started successfully on 30001');
});