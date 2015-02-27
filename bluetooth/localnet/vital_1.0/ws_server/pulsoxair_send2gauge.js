var setting = require("./config.js");
var wsServer = require("ws").Server;
//WebSocketサーバーの起動
//var ws = new wsServer({host : setting.WebSocketIP ,port : setting.WebSocketPORT4});
var ws = new wsServer({port : setting.WebSocketPORT4});
broadCast();//データ配信開始 

//クライアント接続時情報
ws.on('connection',function(ws){
	console.log("ClientConnnect");
	
	//ws.on('message', function(message) {
	//	broadCast();
	//});
	ws.on('close',function(){
		console.log('connection close');
		DataAry = [];
	});
});
/*function broadCast() {
	//MongoDBとの接続
	var mongoClient = require('mongodb').MongoClient;
	var server = require('mongodb').Server;	//DB接続完了
	
	mongoClient.connect("mongodb://54.64.93.38:27017/pulsox",function(err,db){
		test.equal(null,err);
		test.ok(db != null);
		console.log("Connected Corectly to Server");
	})
}*/
	/*var db = new mongodb.Db(setting.DB_NAME, server, {safe : true});
	

	db.open(function(err,db){
		if(err){
			throw err;
		}
		console.log("Success:DBOpen")
		var collection = db.collection(setting.DB_Collection3);
		var latestcursor = collection.find().sort({$natural : -1 }).limit(1);
		var i = 0 ;
		var DataAry = [];

		latestcursor.nextObject(function(err,item){
			if(err){
				console.log(err);
			}
			// create stream and listen
	        var stream = collection.find({_id : { $gt : item._id }},{ tailable : true , awaitdata : true , numberOfRetries : -1  }).sort({$natural: 1}).stream();
	        
	        stream.on('data', function(items){
           		var jsontext = JSON.stringify(items);  //JavaScriptオブジェクトに変換
				var jsonData = JSON.parse(jsontext); //JSON文字列に変換
				
				var Data = [];
				var Day = jsonData.DateTime.slice(0,8);
				var Time = jsonData.DateTime.slice(8,17)
				
				Data[0]= Time;
				Data[1]= jsonData.prate;
				Data[2]= jsonData.pwave;
				DataAry[i] = Data;
				i++;
			
				var tid = setInterval(function(){		
					ws.clients.forEach(function(client) {
						if (i > 0 ){
							client.send(JSON.stringify(DataAry));
							DataAry = [];
							i = 0;	
						}
					});
				},1000);
			});		
		});
	});
}*/

function broadCast() {
	//MongoDBとの接続
	var mongodb = require('mongodb');
	var server = new mongodb.Server(setting.DB_IP, setting.DB_PORT);	//DB接続完了
	var db = new mongodb.Db(setting.DB_NAME, server, {safe : false});
	
	db.open(function(err,db){
		if(err){
			throw err;
		}
		console.log("Success:DBOpen")
		var collection = db.collection(setting.DB_Collection3);
		var latestcursor = collection.find().sort({$natural : -1 }).limit(1);
		var i = 0 ;
		var DataAry = [];

		latestcursor.nextObject(function(err,item){
			if(err){
				console.log(err);
			}
			// create stream and listen
	        	var stream = collection.find({_id : { $gt : item._id }},{ tailable : true , awaitdata : true , numberOfRetries : -1  }).sort({$natural: 1}).stream();
	        	
	        	stream.on('data', function(items){
           			var jsontext = JSON.stringify(items);  //JavaScriptオブジェクトに変換
				var jsonData = JSON.parse(jsontext); //JSON文字列に変換
				var Data = [];
				var Day = jsonData.time.slice(0,10);
				var Time = jsonData.time.slice(11,19);
				
				Data[0]= Time;
				Data[1]= jsonData.prate;
				Data[2]= jsonData.pwave;
				DataAry[i] = Data;
				i++;

				// for debug
				//console.log("Data[0]: " + Data[0]);
				//console.log("Data[1]: " + Data[1]);
				//console.log("Data[2]: " + Data[2]);
				//console.log(i + ": " + JSON.stringify(DataAry)[i]);
				
				var tid = setInterval(function(){		
					ws.clients.forEach(function(client) {
						if (i > 0 ){
							client.send(JSON.stringify(DataAry[0]));
							//console.log("DataAry: " + DataAry[0]);
							DataAry = [];
							i = 0;	
						}
					});
				},1000);
			});		
		});
	});
}
