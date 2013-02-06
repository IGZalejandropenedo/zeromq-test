require("nodetime").profile();

var zmq = require('zmq')
  , sock = zmq.socket('pull');

var start;
var count = 0;

//Workaround to avoid Heroku resetting the app for not binding to the designated port
if(process.env.PORT) {
	console.log("heroku workaround");
	net = require("net");
	net.createServer().listen(process.env.PORT);
}

sock.connect('tcp://ec2-46-137-6-37.eu-west-1.compute.amazonaws.com:6025');
console.log('Consumer connected to port 6025');

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