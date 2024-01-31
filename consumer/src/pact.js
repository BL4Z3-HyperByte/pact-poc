import { PactV3 } from '@pact-foundation/pact';
import path from 'path';
import process from 'process';

const provider = new PactV3({
  dir: path.resolve(process.cwd(), 'pacts'),
  consumer: 'ReactApp',
  provider: 'NodeAPI',
  logLevel: 'debug',
});

export { provider };
