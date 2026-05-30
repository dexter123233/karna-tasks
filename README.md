# Karna Tasks

A full-stack task management application built with Flutter and PostgreSQL.

## Project Structure

```
karna-tasks/
├── flutter_app/          # Flutter mobile app
│   ├── lib/
│   │   ├── main.dart
│   │   ├── models/task.dart
│   │   ├── providers/task_provider.dart
│   │   ├── screens/
│   │   │   ├── home_screen.dart
│   │   │   └── add_task_screen.dart
│   │   ├── services/api_service.dart
│   │   └── widgets/task_card.dart
│   └── pubspec.yaml
├── server/              # Node.js/Express backend
│   ├── index.js
│   ├── db/
│   │   ├── index.js
│   │   └── setup.js
│   └── routes/tasks.js
└── package.json
```

## Setup for GitHub Codespaces

### 1. Open in Codespaces

Click "Code" → "Create codespace on main" to open this repo in GitHub Codespaces.

### 2. Install Flutter Extension

In Codespaces, install the Flutter extension from the Extensions panel (or search "Flutter" in the marketplace).

### 3. Set up PostgreSQL

The app expects PostgreSQL running. In Codespaces:

```bash
# Install PostgreSQL
sudo apt update && sudo apt install postgresql postgresql-contrib

# Start PostgreSQL
sudo service postgresql start

# Create database and user
sudo -u postgres psql -c "CREATE USER karna WITH PASSWORD 'karna123';"
sudo -u postgres psql -c "CREATE DATABASE karna_tasks OWNER karna;"
```

### 4. Configure Environment Variables (optional)

Create a `.env` file in the server directory:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=karna_tasks
DB_USER=karna
DB_PASSWORD=karna123
```

### 5. Install Dependencies

```bash
# Install server dependencies
cd server && npm install

# Install Flutter dependencies (in Flutter extension terminal)
cd ../flutter_app && flutter pub get
```

### 6. Run the Backend

```bash
cd server && npm start
```

The API will be available at `http://localhost:3001`

### 7. Run the Flutter App

```bash
cd flutter_app && flutter run
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get task by ID |
| POST | `/api/tasks` | Create new task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |
| GET | `/api/health` | Health check |

## Task Object

```json
{
  "id": 1,
  "title": "Task title",
  "description": "Task description",
  "status": "pending | in_progress | completed",
  "priority": "low | medium | high",
  "created_at": "2025-01-01T00:00:00Z",
  "due_date": "2025-01-15T00:00:00Z"
}
```

## Features

- Create, read, update, delete tasks
- Priority levels (low, medium, high)
- Due date tracking
- Mark tasks as complete
- Swipe to delete
- Pull to refresh
- Real-time sync with backend
