require("nodetime").profile();

var zmq 	= require('zmq'),
	socket	= zmq.socket("push"); 

var start, end;
var count = 0;

var timeMs = (!!process.argv[2] ? parseInt(process.argv[2]) : 10000);

sock.bindSync('tcp://127.0.0.1:3000');
console.log('Producer bound to port 3000');

setInterval(function(){
  console.log('sending work');
  sock.send('some work');
}, 500);

start = new Date();
end = start.getTime() + timeMs;

console.log("Start Sending", start.getTime());
function send() {
	if(end >= (new Date()).getTime()){
		pub.write(JSON.stringify({welcome: 'rabbit.js'}), 'utf8');
		count++;
		process.nextTick(send);
	} else {
		pub.write(JSON.stringify({"end": 1}))
		console.log("Finished Sending: " +  end + " ms", "Time: " + ((new Date()).getTime() - start) + " ms" ,"Count:" + count);
		process.exit(0);
	}
}
send();

