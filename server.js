// Const express requires express
const express = require ('express');
// Const db requies the connection configuration
const db = require('./config/connection');
// Const routes requires routes
const routes = require('./routes');

// Const app uses express
const app = express();
// Const Port setting up the port for the server
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Starts the server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  })
});