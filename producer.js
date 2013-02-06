require("nodetime").profile();

var zmq 	= require('zmq'),
	sock    = zmq.socket("push"); 

var start, end;
var count = 0;

//Workaround to avoid Heroku resetting the app for not binding to the designated port
if(process.env.PORT) {
	console.log("heroku workaround");
	net = require("net");
	net.createServer().listen(process.env.PORT);
}

var timeMs = (!!process.argv[2] ? parseInt(process.argv[2]) : 10000);

sock.bindSync('tcp://ec2-46-137-6-37.eu-west-1.compute.amazonaws.com:6025');
console.log('Producer bound to port 6025');

start = new Date();
end = start.getTime() + timeMs;

console.log("Start Sending", start.getTime());
function send() {
	if(end >= (new Date()).getTime()){
		sock.send(JSON.stringify({welcome: 'rabbit.js'}));
		count++;
		process.nextTick(send);
	} else {
		sock.send(JSON.stringify({"end": 1}));
		console.log("Finished Sending: " +  end + " ms", "Time: " + ((new Date()).getTime() - start) + " ms" ,"Count:" + count);
		process.exit(0);
	}
}
send();

