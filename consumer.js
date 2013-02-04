require("nodetime").profile();

var zmq = require('zmq')
  , sock = zmq.socket('pull');

var start;
var count = 0;


sock.connect('tcp://127.0.0.1:3000');
console.log('Consumer connected to port 3000');

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