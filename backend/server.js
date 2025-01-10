const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
const db = require('./config/database');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Connect to database
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

// Routes
app.use('/api', routes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});