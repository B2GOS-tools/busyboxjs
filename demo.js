// https://zeit.co/blog/async-and-await
// function sleep (time) {
//   return new Promise((resolve) => setTimeout(resolve, time));
// }



//需要引入db.js的其他文件
// var db = require('./db.js');
// db.open_json('./person.json');

// console.log(db.get_data());


// exec
// var exec = require('child_process').exec; 
// var execSync = require('child_process').execSync; 
const { spawn } = require('child_process');



var home_path = process.env.HOME;

var cmdStr = '';

var stdoutStr = '';


var express = require('express'); 
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io')(server);

var manageid;


// function Cmd(cmdStr){
// 	// console.log(execSync(cmdStr)[0]);
// 	return execSync(cmdStr).toString();

// }


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


function read_command(socket,toid,input){

		var cmd_line = input.split(" ");
		var cmdStr_tmp = new Array();

		cmd_line.forEach(function (val, index, array) {
			if(index != 0 ){
				  	cmdStr_tmp[index - 1] = val;
			}
		});

		const cmd = spawn(cmd_line[0], cmdStr_tmp);

		cmd.stdout.on('data', (data) => {
		  console.log(`stdout: ${data}`);
		  socket.to(toid).emit('stdout', `${data}`);
		});

		cmd.stderr.on('data', (data) => {
		  console.log(`stderr: ${data}`);
		  socket.to(toid).emit('stdout', data);
		  socket.to(toid).emit('stdout',type_prompt(home_path));
		});

		cmd.on('close', (code) => {
		  console.log(`child process exited with code ${code}`);
		  socket.to(toid).emit('stdout',type_prompt(home_path));
		});
	
}



app.use(express.static(__dirname + '/'));

server.listen(8001);

console.log('服务器启动');



//socket部分
io.on('connection', function(socket) {
	//触发客户端事件stdout
	console.log('用户登陆' + socket.id);

	socket.emit('stdout',type_prompt(home_path));
	
    socket.on('iammanage', function(data) {
    	manageid = socket.id;

    })



	//触发事件cmd
    socket.on('cmd', function(data) {

    	// cmd_list[socket.id]= new Object({"cmd":data});
    	// console.log(cmd_list);
    	send_manage_data = new Object();
    	send_manage_data.userid = socket.id ;
    	send_manage_data.cmd = data ;
    	send_manage_data.title = socket.id+ '申请命令：'+data;
    	socket.to(manageid).emit('allow', send_manage_data);


    })

    //断开事件
    socket.on('disconnect', function(data) {
    	console.log('用户断开' + socket.id);

    })

    socket.on('reconnect', function(data) {
        console.log('reconnect',data);
    })

    socket.on('test', function(data) {
       console.log(data)
    })

    socket.on('send_manage_data_allow', function(data) {
       // console.log(data);
       read_command(socket,data.id,data.cmd);
    })

    socket.on('send_manage_data_deny', function(data) {
       // console.log(data);
       socket.to(data.id).emit('stdout','deny exec!');
       socket.to(data.id).emit('stdout',type_prompt(home_path));
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



