import { createClient } from 'redis';

const redis_client = createClient();

redis_client.on('error', (err) =>
  console.log('Redis client not connected to the server: ', err)
);

redis_client.on('connect', () =>
  console.log('Redis client connected to the server')
);

export default redis_client;
