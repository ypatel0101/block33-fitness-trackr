const express = require('express');
const request = require('request');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Fitness Trackr API');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

request('http://localhost:3000/api/v1/activities', (error, response, body) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log(body);
    }
});

let body = JSON.stringify({ name: 'Yoga', description: 'Stretching and meditation.' });
request.post('http://localhost:3000/api/v1/activities', { json: true, body: body }, (error, response, body) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log(body);
    }
});