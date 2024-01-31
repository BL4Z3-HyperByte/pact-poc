import { PactV3 } from '@pact-foundation/pact';
import path from 'path';
import process from 'process';

const provider = new PactV3({
  dir: path.resolve(process.cwd(), 'pacts'),
  consumer: 'react-app-pact',
  provider: 'node-api-dredd',
  logLevel: 'debug',
});

export { provider };
