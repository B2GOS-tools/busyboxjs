var exec = require('child_process').exec; 

var arguments = process.argv.splice(2);
console.log('所传递的参数是：', arguments);

var home_path = process.env.HOME();//???

var cmdStr = '';
arguments.forEach(function (val, index, array) {
  cmdStr = cmdStr + ' ' + val ;
});

function Cmd(cmdStr){
	exec(cmdStr, function(err,stdout,stderr){
   	 if(err) {
       		console.log('error:'+stderr);
  	  } else {
		console.log('stdout:'+stdout);
  	  }
});

}


function type_prompt(home_path){
	var head = '[node-shell:]';
	var path = process.cwd();
	if( path == home_path ){
		head = head + '~' + '#' + ' ' ;
	}else {
		head = head + path + '#'+ ' ' ;
	}
	return head;
}


function read_command(){
	if( process.argv.val[0] == 'cd' ){
		var arguments_tmp = process.argv.splice(1);
		var cmdStr_tmp = '';
		arguments_tmp.forEach(function (val, index, array) {
		  cmdStr_tmp = cmdStr_tmp + ' ' + cmdStr_tmp ;
		});
		console.log('所传递的参数是：', cmdStr_tmp);
		process.chdir(cmdStr_tmp);
	}else {
		console.log('所传递的参数是：', cmdStr);
		Cmd(cmdStr);
	}
	
}


