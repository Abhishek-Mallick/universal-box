# Flask-Neo4j Template

A minimal, production-ready Flask template with Neo4j integration, modular API structure, and environment-based configuration.

## Structure

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
└── README.md           # This file
```

## Features
- Modular API using Flask blueprints
- Neo4j database integration (official driver)
- Environment-based config (development, production, testing)
- Sample health check endpoint (Flask + Neo4j)
- Ready for extension with new services/endpoints

## Setup

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
2. **Set environment variables (optional):**
   - `FLASK_ENV` (development/production/testing)
   - `NEO4J_URI`, `NEO4J_USER`, `NEO4J_PASSWORD`
   - `SECRET_KEY`
3. **Run the server:**
   ```bash
   python server.py
   ```

## Extending
- Add new blueprints in `api/` and register them in `app.py`.
- Add business logic in `services/`.
- Add utility functions in `utils/`.
- Use `graph/neo4j_connector.py` to interact with Neo4j.

## Example Health Check
- `GET /health` — Checks Flask app and Neo4j connection.

---
MIT License 