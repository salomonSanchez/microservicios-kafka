const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const asitencia_v1 = require('./routes/asistencia_v1');
const asitencia_v2 = require('./routes/asitencia_v2');

app.use('/api/v1', asitencia_v1);
app.use('/api/v2', asitencia_v2);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}/api/v1`)
    console.log(`Example app listening at http://localhost:${port}/api/v2`)
})