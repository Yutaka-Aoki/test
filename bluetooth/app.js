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
		noble.stopScanning();
		console.log('Stop Scanning.');
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
					fs.writeFile('pulse_air.csv', 'PulseRate,PulseWave\n');
					rx.on('read', function(data, isNotification) {
						var prate = data.readUInt8(0);
						var pwave = (data.readUInt8(1) << 8) + data.readUInt8(2);
						//fs.appendFile('pulse_air.json', JSON.stringify({prate: prate, pwave: pwave}, null, ''));
						fs.appendFile('pulse_air.csv', prate + ',' + pwave + '\n');
						console.log("prate: " + prate + "\tpwave: " + pwave);
						//fs.appendFile('pdata.txt', pdata + '\n', function(err) {
						//	//console.log(err);
						//});
						//req.post(baseUrl, {
						//	form: {key: 'pdata'}
						//	},function(err){}
						//);
						//var pdata = {
						//	signal: data.readUInt8(0),
						//};
						//var data10b = data.readUInt16LE(0) & 1023;
						//console.log('data:' + data10b);
					});
					rx.notify(true, function(err) { console.log('Notification!'); });
				});
			});
		});

	//} else {
	//	console.log("device NOT found")

	}
		
});
