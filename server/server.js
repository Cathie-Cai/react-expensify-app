
const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;


// one way to customize express server
// static() takes the argument, which is the path to that public folder
app.use(express.static(publicPath)); 

// if what the person request is not in the public folder, give him back index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

// the call back fn gets called when the server is up
app.listen(port, () => {
    console.log('server is up');
});
