const express = require('express');
const app = express();

// static files
app.use(express.static(path.join(__dirname, 'dist')));

app.listen(3000, () => console.log('Gator app listening on port 3000!'));