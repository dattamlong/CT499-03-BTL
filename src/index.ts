import * as http from 'http';

import { Config } from './config';
import App from './app';

const port = Config.portNumber;
const server = http.createServer(App);
server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
