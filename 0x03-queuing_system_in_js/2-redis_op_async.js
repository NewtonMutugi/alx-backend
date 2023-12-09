import { createClient } from 'redis';
import { promisify } from 'util';

const redis_client = createClient();

redis_client.on('error', (err) =>
  console.log('Redis client not connected to the server: ', err)
);

redis_client.on('connect', () =>
  console.log('Redis client connected to the server')
);

const setAsync = promisify(redis_client.set).bind(redis_client);
const getAsync = promisify(redis_client.get).bind(redis_client);

async function setNewSchool(schoolName, value) {
  try {
    const reply = await setAsync(schoolName, value);
    console.log('Reply: ' + reply);
  } catch (err) {
    console.error(err);
  }
}

async function displaySchoolValue(schoolName) {
  try {
    const reply = await getAsync(schoolName);
    console.log(reply);
  } catch (err) {
    console.error(err);
  }
}


async function exampleUsage() {
  await displaySchoolValue('Holberton');
  await setNewSchool('HolbertonSanFrancisco', '100');
  await displaySchoolValue('HolbertonSanFrancisco');
}

exampleUsage();

export default redis_client;
