#!/bin/sh

# TODO: Cleanup, is this necessary?

if grep -q 'i2c-bcm2708' /etc/modules; then
  echo 'Seems i2c-bcm2708 module already exists, skip this step.'
else
  echo 'i2c-bcm2708' >> /etc/modules
fi
if grep -q 'i2c-dev' /etc/modules; then
  echo 'Seems i2c-dev module already exists, skip this step.'
else
  echo 'i2c-dev' >> /etc/modules
fi

# BLACKLIST
echo '>>> Do some blacklisting'
if [ -f /etc/modprobe.d/raspi-blacklist.conf ]; then
  sed -i 's/^blacklist spi-bcm2708/#blacklist spi-bcm2708/' /etc/modprobe.d/raspi-blacklist.conf
  sed -i 's/^blacklist i2c-bcm2708/#blacklist i2c-bcm2708/' /etc/modprobe.d/raspi-blacklist.conf
else
  echo 'File raspi-blacklist.conf does not exist, skip this step.'
fi

# SET TIMEZONE (not necessary)

# Default to UTC if no TIMEZONE env variable is set
echo "Setting time zone to ${TIMEZONE=UTC}"
# This only works on Debian-based images
echo "${TIMEZONE}" > /etc/timezone
dpkg-reconfigure tzdata
