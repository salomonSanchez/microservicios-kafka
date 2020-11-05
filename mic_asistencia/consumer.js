var kafka = require('kafka-node'),
    Consumer = kafka.Consumer,
    client = new kafka.KafkaClient({ kafkaHost: '168.63.41.72:9091' }),
    consumer = new Consumer(
        client, [
            { topic: 'asitencia', offset: 0 }
        ], {
            autoCommit: true
        }
    );
consumer.on('message', function(message) {
    console.log(message);
    console.log('mesage: ', message.value);
});

consumer.on('error', function(err) {
    console.log('Error:', err);
})

consumer.on('offsetOutOfRange', function(err) {
    console.log('offsetOutOfRange:', err);
})