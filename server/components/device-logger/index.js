/**
 * Communicate with Jenkins Plugin
 * 
 * if there is no available device, the client-socket is put into queue by scheduler.
 */
'use strict';

var DeviceLog = require('../../api/devicelog/devicelog.model');

exports.recordStart = function(state, device){
  DeviceLog.create({
    deviceId: device.id,
    state: state
  });
};

exports.record = function(state, device, client){

  switch(state){
    case 'released':
      DeviceLog.create({
        deviceId: device.serial,
        jenkinsJobUrl: device.jobid,
        state: state
      });
      break;

    case 'waiting':
      DeviceLog.create({
        deviceId: device,
        jenkinsJobUrl: client.jobid,
        state: state
      });
      break;

    case 'finding device':
      DeviceLog.create({
        deviceId: device.serial,
        state: state + ' - ' + client
      });
      break;

    default:
      DeviceLog.create({
        deviceId: device.serial,
        jenkinsJobUrl: client.jobid,
        state: state
      });
  }
};

exports.recordEnd = function(state, device){
  DeviceLog.create({
    deviceId: device.id,
    state: state
  });
};