const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth.js');
const userRoute = require('./routes/users.js');
const movieRoute = require('./routes/movies.js');
const listRoute = require('./routes/lists.js');

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGOURL)
  .then(() => console.log('MongoDB is connected'))
  .catch((err) => {
    console.log(err);
  });

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/movies', movieRoute);
app.use('/api/movielist', listRoute);

// Test route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
