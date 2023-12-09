import { createClient } from 'redis';

const redis_client = createClient();

redis_client.on('connect', () =>
  console.log('Redis client connected to the server')
);

redis_client.on('error', (err) =>
  console.log('Redis client not connected to the server: ' + err)
);

function publishMessage(message, time) {
  setTimeout(() => {
    console.log('About to send ' + message);
    redis_client.publish('holberton school channel', message);
  }, time);
}

publishMessage('Holberton school', 1000);
publishMessage('Holberton', 2000);
publishMessage('Holberton school', 3000);
publishMessage('Holberton', 4000);
publishMessage('Holberton school', 5000);
publishMessage('Holberton', 6000);
