

const { spawn } = require('child_process');


var arr = 'ping 127.0.0.1';

arr = arr.split(" ");
console.log(arr.length);
var cmdStr_tmp = new Array();

arr.forEach(function (val, index, array) {
	if(index != 0 ){
		  	cmdStr_tmp[index - 1] = val;
	}
});



const cmd = spawn(arr[0], cmdStr_tmp);

cmd.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

cmd.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

cmd.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
