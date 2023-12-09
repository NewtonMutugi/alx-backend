import { createClient } from 'redis';

const redis_client = createClient();

redis_client.on('connect', () =>
  console.log('Redis client connected to the server')
);

redis_client.on('error', (err) =>
  console.log('Redis client not connected to the server: ' + err)
);

redis_client.subscribe('holberton school channel');

redis_client.on('message', (_channel, message) => {
  console.log(message);
  if (message === 'KILL_SERVER') {
    client.unsubscribe('holberton school channel');
    client.quit();
  }
});
