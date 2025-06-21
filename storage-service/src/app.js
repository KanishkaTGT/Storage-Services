const express = require('express');
const bodyParser = require('body-parser');
const storageRoutes = require('./routes/storageRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/storage', storageRoutes());

app.listen(PORT, () => {
    console.log(`Storage Service is running on port ${PORT}`);
});