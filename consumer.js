require("nodetime").profile();

var zmq = require('zmq')
  , sock = zmq.socket('pull');

var start;
var count = 0;
var host = 'tcp://' + (!!process.argv[2] ? process.argv[2] : "127.0.0.1")
var port = ":" + (!!process.argv[3] ? process.argv[3] : "3000");

//Workaround to avoid Heroku resetting the app for not binding to the designated port
if(process.env.PORT) {
	console.log("heroku workaround");
	net = require("net");
	net.createServer().listen(process.env.PORT);
}
console.log('Consumer connected to ' + (host + port));
sock.connect(host + port);

sock.on('message', function(msg){
	var d = JSON.parse(msg);
	
	if(!start) {
		start = new Date();
		console.log("Start Receiving", start.getTime());
	}
	
	if(d.end) {
		var end = (new Date()).getTime();
		console.log("End Receiving: " +  end + " ms", "Time: " + (end - start) + " ms" ,"Count:" + count);
		process.exit(0);
	} else {
		count++;
	}
	//console.log("Message", data)
});