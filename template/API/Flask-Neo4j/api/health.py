from flask import Blueprint, jsonify, current_app
from graph.neo4j_connector import Neo4jConnector

health_bp = Blueprint('health', __name__)

@health_bp.route('/health', methods=['GET'])
def health_check():
    # Check Flask app
    flask_status = 'ok'
    # Check Neo4j connection
    try:
        connector = Neo4jConnector(
            current_app.config['NEO4J_URI'],
            current_app.config['NEO4J_USER'],
            current_app.config['NEO4J_PASSWORD']
        )
        # Run a simple query
        result = connector.run_query('RETURN 1 AS result')
        neo4j_status = 'ok' if result and result[0].get('result') == 1 else 'fail'
        connector.close()
    except Exception as e:
        neo4j_status = f'fail: {str(e)}'
    return jsonify({
        'flask': flask_status,
        'neo4j': neo4j_status
    }) 