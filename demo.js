var exec = require('child_process').exec; 

var arguments = process.argv.splice(2);
console.log('所传递的参数是：', arguments);


var cmdStr = '';
process.argv.forEach(function (val, index, array) {
  cmdStr = cmdStr + ' ' + val ;
});


exec(cmdStr, function(err,stdout,stderr){
    if(err) {
        console.log('error:'+stderr);
    } else {
	console.log('stdout:'+stdout);
    }
});
