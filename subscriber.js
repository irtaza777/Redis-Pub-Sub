const { createClient } = require('redis');
const client = createClient();
client
    .connect()
    .then(async (res) => {
        console.log('connected')
    })
client.on('connect', () => {
    console.log('Subscriber connected to Redis');
});

client.on('error', (err) => {
    console.error('Redis Error:', err);
});

// Subscribe to 'channel1'
client.subscribe('channel1', (err, count) => {
    if (err) {
        console.error('Subscribe error:', err);
    } else {
        console.log(`Subscribed successfully! Listening to ${count} channel(s).`);
    }
});

// Handle messages received from subscribed channels
client.on('message', (channel, message) => {
    console.log(`Received message in '${channel}': ${message}`);
});

// Close the Redis client gracefully on SIGINT (Ctrl+C)
process.on('SIGINT', () => {
    client.quit(() => {
        console.log('Redis client closed');
        process.exit();
    });
});
