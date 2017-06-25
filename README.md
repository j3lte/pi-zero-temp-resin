## Push TMP102 values to Thingspeak through Resin

One of my smaller Resin projects. This will:

- Read temperature of a connected [TMP102](https://www.sparkfun.com/products/13314). This is connected through I2C, see an [example project here](https://www.allaboutcircuits.com/projects/transmit-temperature-with-raspberry-pi/)
- Temperature is measured using a simple Python script
- Application itself is Node.JS, it will expose this as an Express website
- It will also send the data to Thingspeak. Needs a channel ID and Write key (see Environment variables). This will push the value to Field 1.
- If the device loses connection with the router, it will reboot itself (checks every 5 minutes). This ensures that the device will keep connected.

# Pushing to Resin device

Run the following commands in your terminal

- `git clone https://github.com/j3lte/pi-zero-temp-resin.git`
- `cd pi-zero-temp-resin`
- `git remote add resin [application endpoint]`
- `git push resin master`

See the [deployment basic](https://docs.resin.io/raspberrypi/nodejs/getting-started/#deploying-code) for more on this

# Environment variables

`ROUTER_IP` : IP address of your router. **Optional**
`TIMEZONE` : Timezone for the device. **Optional**
`THINGS_CHANNEL_ID` : Channel ID in Thingspeak
`THINGS_CHANNEL_KEY` : Write key for your channel

# TODO

- Cleanup the `build.sh`, might not be necessary?
- Timezone is not necessary. Is residual from earlier projects, but might be needed in the future. Used in `build.sh` (if not set, sets to UTC)

# LICENSE

The MIT License (MIT)

Copyright (c) 2017 J.W Lagendijk <jwlagendijk@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
