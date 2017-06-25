#!/bin/sh
set -o errexit

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

# INSTALL BCM2385
bcm2385_version=1.52
rm -f bcm2835-$bcm2385_version.tar.gz
wget http://www.airspayce.com/mikem/bcm2835/bcm2835-$bcm2385_version.tar.gz
tar zxvf bcm2835-$bcm2385_version.tar.gz
cd bcm2835-$bcm2385_version
./configure
make
# sudo make check
sudo make install
rm -rf ./bcm2835-$bcm2385_version
echo "BCM235 library installed"

# SET TIMEZONE (not necessary)

# Default to UTC if no TIMEZONE env variable is set
echo "Setting time zone to ${TIMEZONE=UTC}"
# This only works on Debian-based images
echo "${TIMEZONE}" > /etc/timezone
dpkg-reconfigure tzdata
