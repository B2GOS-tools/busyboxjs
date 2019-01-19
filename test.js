

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

console.log(cmdStr_tmp);

const ls = spawn(arr[0], cmdStr_tmp);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});