const express = require('express');
const app = express();
const PORT = 3000;
const { Pool } = require('pg');

const pool = new Pool({
    user: 'your_username',
    host: 'localhost',
    database: 'fitness-trackr',
    password: 'your_password',
    port: 5432,
});

app.use(express.json());

const handleRequest = require('./activities');
const handleRoutine = require('./routines');
const handleRoutineActivity = require('./routines_activities');

app.get('/api/v1/activities', handleRequest.getAll);
app.get('/api/v1/activities/:id', handleRequest.getById);
app.post('/api/v1/activities', handleRequest.create);
app.delete('/api/v1/activities/:id', handleRequest.delete);

app.get('/api/v1/routines', handleRoutine.getAll);
app.get('/api/v1/routines/:id', handleRoutine.getById);
app.post('/api/v1/routines', handleRoutine.create);
app.delete('/api/v1/routines/:id', handleRoutine.delete);

app.post('/api/v1/routines_activities', handleRoutineActivity.create);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});