const { Pool } = require('pg');

const create = (req, res, next) => {
    const { routine_id, activity_id, count } = req.body;
    const query = 'INSERT INTO routines_activities (routine_id, activity_id, count) VALUES ($1, $2, $3) RETURNING id';
    pool.query(query, [routine_id, activity_id, count])
        .then((response) => {
            res.status(201).json({ id: response.insertId[0], message: 'Routine Activity created successfully' });
        })
        .catch(next);
};

module.exports = {
    create
};