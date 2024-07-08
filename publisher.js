const { createClient } = require('redis');
const client = createClient();
client
  .connect()
  .then((res) => {
    console.log('connected')})

client.on('connect', () => {
    console.log('Publisher connected to Redis');
});

client.on('error', (err) => {
    console.error('Redis Error:', err);
});

// Publish a message every second
setInterval(() => {
    const message = `Message sent at ${new Date().toLocaleTimeString()}`;
    client.publish('channel1', message, (err, reply) => {
        if (err) {
            console.error('Publish error:', err);
        } else {
            console.log(`Published: ${message}`);
        }
    });
}, 1000);

// Close the Redis client gracefully on SIGINT (Ctrl+C)
process.on('SIGINT', () => {
    client.quit(() => {
        console.log('Redis client closed');
        process.exit();
    });
});
