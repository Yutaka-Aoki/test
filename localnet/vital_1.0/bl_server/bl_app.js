var noble = require('noble');
var _ = require('underscore');
var fs = require('fs');
//var req = require('request');

var UUIDs = {
  service: "713d0000-503e-4c75-ba94-3148f18d941e".replace(/\-/g, ''),
  tx:      "713d0003-503e-4c75-ba94-3148f18d941e".replace(/\-/g, ''),
  rx:      "713d0002-503e-4c75-ba94-3148f18d941e".replace(/\-/g, '')};

//var baseUrl = 'http://54.64.93.38:8888/pulse';

var is_connected=0;

noble.on('stateChange', function(state) {
	if (state === 'poweredOn') {
		noble.startScanning();
		console.log('Start Scanning...');
	} else {
		noble.stopScanning('Stop Scanning');
	}
});
noble.on('discover', function(peripheral) {
	if(peripheral.advertisement.localName === 'BlendMicro') {
		console.log('BlendMicro found!');
		console.log('BlendMicro UUID: ' + peripheral.uuid);
		
		peripheral.on('disconnect', function(err) {
			if(err) console.log('ERR (disconnect)');
			is_connected = 0;
			console.log('Disconnected!');
			var id = setInterval(function() {
				if(!is_connected) {
					//setTimeout(function() {
					//	noble.stopScanning();
					//	console.log('Stop Scanning.');
					//}, 3000);
					noble.startScanning();
					console.log('Start Scanning...');
				}else{
					clearInterval(id);
				}
			}, 3000);
		});

		peripheral.connect(function(err) {
			if(err) console.log('ERR (connect)');
			is_connected = 1;
			console.log("BlendMicro connected!");

			//setInterval(function() {
			//	peripheral.updateRssi(function(err, rssi) {
			//		console.log('rssi:' + rssi);
			//	});
			//}, 1000);

			peripheral.discoverServices([], function(err, services) {
				var service = _.find(services, function(service) {
							return service.uuid == UUIDs.service;
				});
				service.discoverCharacteristics([], function(err, chars) {
					var rx = _.find(chars, function(char) {
						return char.uuid == UUIDs.rx;
					});

					var mongodb = require('mongodb');
					var server = new mongodb.Server('localhost',27017,{});	
					console.log("DBConnect");
					var db = new mongodb.Db('pulsox', server, {w :1});
					//var db = new mongodb.Db('pulsox', server, {});
					db.open(function(err,db){
						if(err){
							throw err;
						}
						console.log("Success:DBOpen")
						db.collection('pulse_air',{'capped':true,'size':1024},function(err,collection){
							if (err) {
								console.log(err);
								throw err;
							}
							console.log("Success:collection")
			
							rx.on('read', function(data, isNotification) {
								var prated = data.readUInt8(0);
								var pwaved = (data.readUInt8(1) << 8) + data.readUInt8(2);
								collection.insert({"prate":prated,"pwave":pwaved,"time":new Date()},{safe:true},function(err,doc){
									console.log("prate: " + prated + "\tpwave: " + pwaved);
								});
							});

						});
						rx.notify(true, function(err) { console.log('Notification!'+err); });
					});
				});
			});
		});

	//} else {
	//	console.log("device NOT found")

	}
});
