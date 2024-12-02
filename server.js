const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route for the root
app.get('/oldstyle', (req, res) => {
    console.log("oldstyle")
  res.sendFile(path.join(__dirname, 'public', 'index_oldstyle.html'));
});
// Define a route for the root
app.get('/v2', (req, res) => {
  console.log("v2")
res.sendFile(path.join(__dirname, 'public', 'v2.html'));
});



// Define a route for the root
app.get('/v3', (req, res) => {
  console.log("v3")
res.sendFile(path.join(__dirname, 'public', 'v3.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
