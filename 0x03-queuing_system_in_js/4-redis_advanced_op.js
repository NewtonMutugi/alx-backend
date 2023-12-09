import { createClient } from 'redis';

const redis_client = createClient();

redis_client.on('error', (err) =>
  console.log('Redis client not connected to the server: ', err)
);

redis_client.on('connect', () =>
  console.log('Redis client connected to the server')
);

const reply = (err, reply) => {
  err ? console.log(err) : console.log('Reply: ' + reply);
};

redis_client.hset('HolbertonSchools', 'Portland', 50, reply);

redis_client.hset('HolbertonSchools', 'Seattle', 80, reply);

redis_client.hset('HolbertonSchools', 'New York', 20, reply);

redis_client.hset('HolbertonSchools', 'Bogota', 20, reply);

redis_client.hset('HolbertonSchools', 'Cali', 40, reply);

redis_client.hset('HolbertonSchools', 'Paris', 2, reply);

redis_client.hgetall('HolbertonSchools', (err, reply) => {
  if (err) {
    console.error(err);
  } else {
    console.log('HolbertonSchools:', reply);
  }

  // Close the Redis client
  redis_client.quit();
});
