import * as http from 'http';

import App from './app';
import { config } from './config';

const port = config.PORT;
const server = http.createServer(App);
server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
