const sensorLib = require('node-dht-sensor');
let sensor = null;
let read = null;

const DHT_SENSOR_PIN = process.env.DHT_SENSOR_PIN ? parseInt(process.env.DHT_SENSOR_PIN, 10) : null;
const DHT_SENSOR_TYPE = process.env.DHT_SENSOR_TYPE ? parseInt(process.env.DHT_SENSOR_TYPE, 10) : null;

if (DHT_SENSOR_PIN !== null && DHT_SENSOR_TYPE!== null) {
  sensor = sensorLib.initialize(
    DHT_SENSOR_TYPE,
    DHT_SENSOR_PIN
  );

  read = () => {
    const data = sensorLib.read();
    const temperature = data.temperature.toFixed(2);
    const humidity = data.humidity.toFixed(2);
    return {
      temperature,
      humidity
    };
  }
}

module.exports = {
  sensor,
  read
};
