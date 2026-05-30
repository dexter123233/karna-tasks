import pool from './index.js';

export async function initializeDatabase() {
  const client = await pool.connect();

  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT DEFAULT '',
        status VARCHAR(50) DEFAULT 'pending',
        priority VARCHAR(50) DEFAULT 'medium',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        due_date TIMESTAMP
      )
    `);

    const result = await client.query('SELECT COUNT(*) FROM tasks');
    if (parseInt(result.rows[0].count) === 0) {
      await seedDatabase(client);
      console.log('Database seeded with sample tasks');
    }

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  } finally {
    client.release();
  }
}

async function seedDatabase(client) {
  const sampleTasks = [
    {
      title: 'Set up PostgreSQL database',
      description: 'Install and configure PostgreSQL for the project',
      priority: 'high',
      status: 'completed',
    },
    {
      title: 'Create Flutter app structure',
      description: 'Initialize Flutter project and set up dependencies',
      priority: 'high',
      status: 'completed',
    },
    {
      title: 'Implement REST API',
      description: 'Build Express endpoints for CRUD operations',
      priority: 'high',
      status: 'in_progress',
    },
    {
      title: 'Design mobile UI screens',
      description: 'Create beautiful Material Design 3 screens',
      priority: 'medium',
      status: 'pending',
    },
    {
      title: 'Connect Flutter to API',
      description: 'Integrate http package and test endpoints',
      priority: 'high',
      status: 'pending',
    },
    {
      title: 'Add task categories',
      description: 'Implement priority levels and due dates',
      priority: 'low',
      status: 'pending',
    },
  ];

  for (const task of sampleTasks) {
    await client.query(
      `INSERT INTO tasks (title, description, priority, status)
       VALUES ($1, $2, $3, $4)`,
      [task.title, task.description, task.priority, task.status]
    );
  }
}
