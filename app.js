const express = require('express');
const app = express();
const sequelize = require('./config/connection')
const path = require('path');


const PORT = process.env.PORT || 3000;
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
})