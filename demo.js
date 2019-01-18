var exec = require('child_process').exec; 

var arguments = process.argv.splice(2);
console.log('所传递的参数是：', arguments);

var home_path = process.env.HOME;

var cmdStr = '';

var stdoutStr = '';


function Cmd(cmdStr){
	exec(cmdStr, function(err,stdout,stderr){
   	 if(err) {
		stdoutStr = stderr ;
  	  } else {
		stdoutStr = stdout ;
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


function read_command(input){
	//
	var arr = input.split(" ");
	console.log(arr.length);
	if( arr[0] == 'cd' ){
		var cmdStr_tmp = '';
		arr.forEach(function (val, index, array) {
			if(index != 0 ){
				if (index == 1) {
					cmdStr_tmp = val;
				}else{
				  	cmdStr_tmp = cmdStr_tmp + ' ' +  val;
				}
			}
		});
		process.chdir(cmdStr_tmp);
	}else {
		Cmd(input);
	}
	
}




const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



// console.log(type_prompt(home_path));

// rl.on('line', function (input) {
// 	read_command(input);
// 	// while(stdoutStr == ''){

// 	// }
// 	console.log(stdoutStr);
// 	stdoutStr = '';
// 	console.log('\n 清除wwwwwww\n ');
// 	console.log(type_prompt(home_path));
// });


// https://zeit.co/blog/async-and-await
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}





var express = require('express'); 
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io')(server);

// app.use('/', express.static(__dirname + '/public')); 

server.listen(8080);

console.log('服务器启动');
//socket部分
io.on('connection', function(socket) {
	//触发客户端事件stdout
	console.log('用户登陆');

	socket.emit('stdout',type_prompt(home_path));
	
	//触发事件cmd
    socket.on('cmd', function(data) {
    	console.log(data);
	cmdStr = data;
	// socket.emit('stdout','/n');
	read_command(cmdStr);

	// 用法
	sleep(400).then(() => {
	    // 这里写sleep之后需要去做的事情
	    socket.emit('stdout', stdoutStr);
		socket.emit('stdout',type_prompt(home_path));
		cmdStr = '';
		stdoutStr = '';
	})


    })

    //断开事件
    socket.on('disconnect', function(data) {
        //console.log('断开',data);
        //socket.emit('c_leave','离开');
        //socket.broadcast用于向整个网络广播(除自己之外)
        //socket.broadcast.emit('c_leave','某某人离开了')
    })

});

