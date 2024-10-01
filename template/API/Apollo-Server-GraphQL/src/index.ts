import { createServer } from './server';

const server = createServer();

const PORT = 4000;

server.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/graphql`);
});
