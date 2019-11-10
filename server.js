const express = require('express');
var connectDB = require('./config/db');
var app = express();
var cors = require('cors');
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json({extension: false}));

app.use('/api/candidates',require('./routes/api/candidates'));

app.listen(PORT,`listening to port ${PORT}`);
