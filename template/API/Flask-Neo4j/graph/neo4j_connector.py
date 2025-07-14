from neo4j import GraphDatabase, basic_auth
from flask import current_app

class Neo4jConnector:
    def __init__(self, uri, user, password):
        self.driver = GraphDatabase.driver(uri, auth=basic_auth(user, password))

    def close(self):
        if self.driver:
            self.driver.close()

    def run_query(self, cypher_query, parameters=None):
        with self.driver.session() as session:
            result = session.run(cypher_query, parameters or {})
            return [record.data() for record in result]

# Usage example (in Flask app context):
# from graph.neo4j_connector import Neo4jConnector
# connector = Neo4jConnector(app.config['NEO4J_URI'], app.config['NEO4J_USER'], app.config['NEO4J_PASSWORD'])
# result = connector.run_query('MATCH (n) RETURN n LIMIT 1')
# connector.close() 