const kafka = require('kafka-node')

console.log(kafka)
var client = new kafka.KafkaClient({ kafkaHost: '168.63.41.72:9091' })
var producer = new kafka.Producer(client);

producer.on('ready', function() {
    console.log('Producer is ready');
});

module.exports = producer