#!/bin/bash

[ -z "$ROUTER_IP" ] && echo "We cannot determine ROUTER_IP. Set it as a environment variable" && exit 1;

ping -c4 $ROUTER_IP > /dev/null

if [ $? != 0 ]
then
  echo "We cannot reach $ROUTER_IP. Rebooting";
  sudo /sbin/shutdown -r now
fi
