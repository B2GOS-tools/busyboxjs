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






var dbObject = require('./db.js');

function init() {
     var dbParams = new Object();
     dbParams.db_name = "SISO";
     dbParams.db_version = "2";
     dbParams.db_store_name = "Test";
     dbObject.init(dbParams);
 }
 function Tinsert() {
     // 填入初始值
     dbObject.put({ title: "Quarry Memories", author: "Fred", isbn: 123456 }, 1);
     dbObject.put({ title: "Water Buffaloes", author: "Fred", isbn: 234567 }, 2);
     dbObject.put({ title: "Bedrock Nights", author: "Barney", isbn: 345678 }, 3);
 }
 function Tselect() {
     dbObject.select(3);
 }
 function Tupdate() {
     dbObject.put({ title: "Quarry wu", author: "lex", isbn: 123456 }, 1);
 }
 function Tdelete() {
     dbObject.delete(3);
 }
 function Tclear() {
     dbObject.clear();
 }



// const readline = require('readline');
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });



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

server.listen(8001);

console.log('服务器启动');

init();

Tinsert();
//socket部分
io.on('connection', function(socket) {
	//触发客户端事件stdout
	console.log('用户登陆' + socket.id);

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



