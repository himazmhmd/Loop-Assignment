const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/studentRoutes');

// Initialize Express
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB

const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));  
// Create a simple Mongoose schema and model
const Student = mongoose.model('Loop', new mongoose.Schema({
    name: String,
    age: Number,
    course: String
}));

app.use('/api', studentRoutes);

// Start the server
const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
