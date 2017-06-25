const express = require('express');
const execSync = require('child_process').execSync;
const DHTSensor = require('./dhtsensor');

let thingsReady = false;

let ThingSpeakClient = null;
let client = null;
let channelId = null;
let writeKey = null;

if (!!process.env.THINGS_CHANNEL_ID && !!process.env.THINGS_CHANNEL_KEY) {
  ThingSpeakClient = require('thingspeakclient');
  client = new ThingSpeakClient;
  channelId = parseInt(process.env.THINGS_CHANNEL_ID);
  writeKey = process.env.THINGS_CHANNEL_KEY;
  thingsReady = true;
} else {
  console.log('Please set THINGS_CHANNEL_ID & THINGS_CHANNEL_KEY to start logging');
}

const timeout = 20000;
let channelReady = false;
let busy = false;
let interval = null;

const app = express();

const getTemp = () => {
  const tempRaw = execSync(`${__dirname}/tmp102.py`).toString();
  const temp = parseFloat(tempRaw.split('\n')[0]);
  return temp;
};

const sendTemp = () => {
  if (channelReady && !busy) {
      busy = true;
      const field1 = getTemp();
      client.updateChannel(channelId, { field1 }, (err, res) => {
        if (err) {
          console.log(`Error updating channel ${channelId}:`, err);
        }
        if (res === 0) {
          console.log(`Channel ${channelId} is not updated?`);
        }
        busy = false;
      });
  }
}

const start = () => {
  if (interval === null && thingsReady && channelReady) {
    interval = setInterval(sendTemp, timeout);
  }
}

const stop = () => {
  if (interval !== null && thingsReady && channelReady) {
    clearInterval(interval);
    interval = null;
  }
}

app.get('/', (req, res) => {
  const temperature = getTemp();
  res.json({
    temperature: {
      value: temperature,
      description: 'Temperature in Celcius'
    }
  });
});

app.get('/dht', (req, res) => {
  if (DHTSensor.sensor !== null) {
    const data = DHTSensor.read();
    res.json(data);
  } else {
    res.send(500, 'DHT Sensor is not enabled. Please set DHT_SENSOR_PIN and DHT_SENSOR_TYPE');
  }
});

app.get('/start', (req, res) => {
  start();
  res.send(200, interval !== null ? 'OK' : 'NOT STARTED');
});

app.get('/stop', (req, res) => {
  stop();
  res.send(200, interval === null ? 'OK' : 'NOT STOPPED');
});

const server = app.listen(80, () => {
  const port = server.address().port;
  console.log(`Example app listening on port ${port}`);
});

if (thingsReady) {
  client.attachChannel(channelId, { writeKey }, (err) => {
    if (err) {
      console.log(`Error attaching to channel ${channelId}:`, err);
    } else {
      console.log(`Attached to channel ${channelId}:`);
      channelReady = true;
    }
  });
  start();
}
