const { Pool } = require('pg');

const getAll = (req, res, next) => {
    const query = 'SELECT * FROM routines';
    pool.query(query)
        .then((response) => {
            res.json(response.rows);
        })
        .catch(next);
};

const getById = (req, res, next) => {
    const id = parseInt(req.params.id);
    const query = 'SELECT * FROM routines WHERE id = $1';
    pool.query(query, [id])
        .then((response) => {
            if (response.rowCount > 0) {
                const routine = response.rows[0];
                res.json(routine);
            } else {
                res.status(404).json({ message: 'Routine not found' });
            }
        })
        .catch(next);
};

const create = (req, res, next) => {
    const { is_public, name, goal } = req.body;
    const query = 'INSERT INTO routines (is_public, name, goal) VALUES ($1, $2, $3) RETURNING id';
    pool.query(query, [is_public, name, goal])
        .then((response) => {
            res.status(201).json({ id: response.insertId[0], message: 'Routine created successfully' });
        })
        .catch(next);
};

const removeRoutine = (req, res, next) => {
    const id = parseInt(req.params.id);
    const query = 'DELETE FROM routines WHERE id = $1';
    pool.query(query, [id])
        .then(() => {
            res.status(200).json({ message: 'Routine deleted successfully' });
        })
        .catch(next);
};

module.exports = {
    getAll,
    getById,
    create,
    removeRoutine
};