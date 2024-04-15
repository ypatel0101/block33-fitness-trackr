const { Pool } = require('pg');

const getAll = (req, res, next) => {
    const query = 'SELECT * FROM activities';
    pool.query(query)
        .then((response) => {
            res.json(response.rows);
        })
        .catch(next);
};

const getById = (req, res, next) => {
    const id = parseInt(req.params.id);
    const query = 'SELECT * FROM activities WHERE id = $1';
    pool.query(query, [id])
        .then((response) => {
            if (response.rowCount > 0) {
                const activity = response.rows[0];
                res.json(activity);
            } else {
                res.status(404).json({ message: 'Activity not found' });
            }
        })
        .catch(next);
};

const create = (req, res, next) => {
    const { name, description } = req.body;
    const query = 'INSERT INTO activities (name, description) VALUES ($1, $2) RETURNING id';
    pool.query(query, [name, description])
        .then((response) => {
            res.status(201).json({ id: response.insertId[0], message: 'Activity created successfully' });
        })
        .catch(next);
};

const removeActivity = (req, res, next) => {
    const id = parseInt(req.params.id);
    const query = 'DELETE FROM activities WHERE id = $1';
    pool.query(query, [id])
        .then(() => {
            res.status(200).json({ message: 'Activity deleted successfully' });
        })
        .catch(next);
};

module.exports = {
    getAll,
    getById,
    create,
    removeActivity
};