#!/usr/bin/python
import smbus

I2C_BUS = 1
bus = smbus.SMBus(I2C_BUS)

# 7 bit address (will be left shifted to add the read write bit)
DEVICE_ADDRESS = 0x48

# Read the temp register
temp_reg_12bit = bus.read_word_data(DEVICE_ADDRESS, 0)
temp_low = (temp_reg_12bit & 0xff00) >> 8
temp_high = (temp_reg_12bit & 0x00ff)

# Convert to temp from page 6 of datasheet
temp = (((temp_high * 256) + temp_low)>>4)

# Handle negative temps
if temp > 0x7FF:
 temp = temp-4096;
temp_C = float(temp) * 0.0625
print "%3.2f" % (temp_C)
