import { createQueue } from 'kue';

function sendNotification(phoneNumber, message) {
  console.log(
    `Sending notification to ${phoneNumber}, with message: ${message}`
  );
}

const queue = createQueue();

queue.process('push_notification_code_2', (job, done) => {
  const { phoneNumber, message } = job.data;

  sendNotification(phoneNumber, message);
  done();
});
