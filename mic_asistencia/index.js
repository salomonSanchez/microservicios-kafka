const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const apiRoute = require('./routes/router');

app.use('/api/v1', apiRoute);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}/api/v1`)
})