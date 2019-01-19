// https://zeit.co/blog/async-and-await
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}



//需要引入db.js的其他文件
var person = require('./db.js');
person.open_json('./person.json');
console.log(person.get_data());



var exec = require('child_process').exec; 
var execSync = require('child_process').execSync; 

var home_path = process.env.HOME;

var cmdStr = '';

var stdoutStr = '';


function Cmd(cmdStr){
	// console.log(execSync(cmdStr)[0]);
	return execSync(cmdStr).toString();

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
		return Cmd(input);
	}
	
}




var express = require('express'); 
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io')(server);

// app.use('/', express.static(__dirname + '/public')); 

server.listen(8001);

console.log('服务器启动');

//socket部分
io.on('connection', function(socket) {
	//触发客户端事件stdout
	console.log('用户登陆' + socket.id);

	socket.emit('stdout',type_prompt(home_path));
	
	//触发事件cmd
    socket.on('cmd', function(data) {
    	console.log(data);
		cmdStr = data;
		socket.emit('stdout', read_command(cmdStr));
		socket.emit('stdout',type_prompt(home_path));
		cmdStr = '';

    })

    //断开事件
    socket.on('disconnect', function(data) {
    	console.log('用户断开' + socket.id);

    })

    socket.on('reconnect', function(data) {
        console.log('reconnect',data);
    })

    

    // join in room
    // socket.join('group1');

    // leave the room
    // socket.leave(data.room);

 //    获取连接的客户端socket
	// io.sockets.clients().forEach(function (socket) {
	//     //.....
	// })

});



