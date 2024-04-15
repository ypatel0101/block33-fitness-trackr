const { Pool, Client } = require('pg');

const client = new Client({
    user: 'your_username',
    host: 'localhost',
    database: 'fitness-trackr',
    password: 'your_password',
    port: 5432,
});

const seedDatabase = async () => {
    try {
        await client.connect();

        const activities = [
            { name: 'Running', description: 'Cardio exercise to improve endurance.' },
            { name: 'Weightlifting', description: 'Strength training to build muscle.' }
        ];

        const routines = [
            { is_public: true, name: 'Morning Workout', goal: 'Get energized for the day.' },
            { is_public: false, name: 'Evening Workout', goal: 'Wind down after a long day.' }
        ];

        const routinesActivities = [
            { routine_id: 1, activity_id: 1, count: 30 },
            { routine_id: 1, activity_id: 2, count: 2 },
            { routine_id: 2, activity_id: 1, count: 15 }
        ];

        await client.query('TRUNCATE TABLE activities, routines, routines_activities RESTART IDENTITY CASCADE;');

        await client.query('INSERT INTO activities (name, description) VALUES ($1, $2)', [activities[0].name, activities[0].description]);
        await client.query('INSERT INTO activities (name, description) VALUES ($1, $2)', [activities[1].name, activities[1].description]);

        await client.query('INSERT INTO routines (is_public, name, goal) VALUES ($1, $2, $3)', [routines[0].is_public, routines[0].name, routines[0].goal]);
        await client.query('INSERT INTO routines (is_public, name, goal) VALUES ($1, $2, $3)', [routines[1].is_public, routines[1].name, routines[1].goal]);

        await client.query('INSERT INTO routines_activities (routine_id, activity_id, count) VALUES ($1, $2, $3)', [routinesActivities[0].routine_id, routinesActivities[0].activity_id, routinesActivities[0].count]);
        await client.query('INSERT INTO routines_activities (routine_id, activity_id, count) VALUES ($1, $2, $3)', [routinesActivities[1].routine_id, routinesActivities[1].activity_id, routinesActivities[1].count]);
        await client.query('INSERT INTO routines_activities (routine_id, activity_id, count) VALUES ($1, $2, $3)', [routinesActivities[2].routine_id, routinesActivities[2].activity_id, routinesActivities[2].count]);

        console.log('Database seeded successfully.');
        await client.end();
    } catch (error) {
        console.error('Error seeding database:', error);
        await client.end();
    }
};

seedDatabase();