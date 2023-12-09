import { createClient } from 'redis';

const redis_client = createClient();

redis_client.on('error', (err) =>
  console.log('Redis client not connected to the server: ', err)
);

redis_client.on('connect', () =>
  console.log('Redis client connected to the server')
);

function setNewSchool(schoolName, value) {
  redis_client.set(schoolName, value, (err, reply) => {
    err ? console.log(err) : console.log('Reply: ' + reply);
  });
}

function displaySchoolValue(schoolName) {
  redis_client.get(schoolName, (err, reply) => {
    err ? console.log(err) : console.log(reply);
  });
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
export default redis_client;
