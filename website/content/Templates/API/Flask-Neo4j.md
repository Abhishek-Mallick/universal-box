## Introduction
The **Flask-Neo4j Template** is a minimal, production-ready starter template designed to simplify building REST APIs with Flask and Neo4j graph database integration. This template provides a modular structure with blueprints, service layers, and environment-based configuration, making it easy to extend for your own application logic.

## Features
- **Modular API Structure**: Uses Flask blueprints for organized route handlers
- **Neo4j Integration**: Official Neo4j driver with connection management
- **Environment-Based Config**: Separate configurations for development, production, and testing
- **Health Check Endpoint**: Sample endpoint to verify Flask and Neo4j connectivity
- **Service Layer Pattern**: Business logic separated in dedicated service modules
- **Utility Functions**: Reusable helper functions and logging utilities

## Technologies Used
- **Python**: Programming language for backend development
- **Flask**: Lightweight web framework for Python
- **Neo4j**: Graph database for connected data
- **Neo4j Python Driver**: Official driver for Neo4j database connectivity
- **Python-dotenv**: Environment variable management

## Installation Steps
To utilize the Flask-Neo4j Template with Universal-Box, follow these steps:

1. **Initialize the project**:
   ```bash
   universal-box init
   ```
2. **Select the Flask-Neo4j Template**:
   Select the following from the menu:
   ```bash
   API > Flask-Neo4j
   ```
3. **Install dependencies**:
   Navigate to your project directory and run:
   ```bash
   pip install -r requirements.txt
   ```
4. **Set environment variables** (optional):
   Create a `.env` file in the project root:
   ```bash
   FLASK_ENV=development
   NEO4J_URI=bolt://localhost:7687
   NEO4J_USER=neo4j
   NEO4J_PASSWORD=your_password
   SECRET_KEY=your_secret_key
   ```
5. **Start the server**:
   ```bash
   python server.py
   ```
6. **Access the API**: The server will run on `http://localhost:5000`

## Project Structure
```
Flask-Neo4j/
├── api/                # API route handlers (Flask blueprints)
├── graph/              # Neo4j connector module
├── services/           # Business logic and service-layer code
├── utils/              # Utility functions (logging, helpers, etc.)
├── app.py              # Flask app factory
├── server.py           # Entrypoint to run the app
├── config.py           # Environment-based config
├── requirements.txt    # Python dependencies
└── README.md           # Documentation
```

## API Endpoints

### Health Check
```bash
GET /health
```
Checks the Flask application and Neo4j database connection status.

**Response:**
```json
{
  "status": "healthy",
  "flask": "running",
  "neo4j": "connected"
}
```

## Extending the Template
- **Add new blueprints**: Create new route handlers in `api/` and register them in `app.py`
- **Add business logic**: Implement service functions in `services/` directory
- **Neo4j queries**: Use `graph/neo4j_connector.py` to interact with the database
- **Utility functions**: Add reusable helpers in `utils/` directory

## Configuration
The template supports three environments:
- **Development**: Debug mode enabled, detailed error messages
- **Production**: Optimized for deployment, security hardened
- **Testing**: Isolated environment for running tests

Set the environment using the `FLASK_ENV` variable.

Visit codebase [here](https://github.com/Abhishek-Mallick/universal-box/tree/main/template/API/Flask-Neo4j)
