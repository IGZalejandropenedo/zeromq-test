require("nodetime").profile();

var zmq 	= require('zmq'),
	sock    = zmq.socket("push"); 

var start, end;
var count = 0;

var timeMs = (!!process.argv[2] ? parseInt(process.argv[2]) : 10000);

sock.bindSync('tcp://127.0.0.1:3000');
console.log('Producer bound to port 3000');

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

