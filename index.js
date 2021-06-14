const express = require('express');
const app = express();

// Routes
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hello world'
    })
})

app.listen(3000, () => {
    console.log('Server running on port:', 3000);
})