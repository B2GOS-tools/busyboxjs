var exec = require('child_process').exec; 

var arguments = process.argv.splice(2);
console.log('所传递的参数是：', arguments);

var home_path = process.env.HOME();//???

var cmdStr = '';
//arguments.forEach(function (val, index, array) {
//  cmdStr = cmdStr + ' ' + val ;
//});

function Cmd(cmdStr){
	exec(cmdStr, function(err,stdout,stderr){
   	 if(err) {
       		console.log('error:'+stderr);
		return stderr;
  	  } else {
		console.log('stdout:'+stdout);
		return stdout;
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
	//
	var arr = cmdStr.toString().split(" ");
	if( arr[0] == 'cd' ){
		var arguments_tmp = process.argv.splice(1);
		var cmdStr_tmp = '';
		arr.forEach(function (val, index, array) {
			if(index != 0 ){
				  cmdStr_tmp = cmdStr_tmp + ' ' + cmdStr_tmp ;
			}
		});
		console.log('所传递的参数是：', cmdStr_tmp);
		process.chdir(cmdStr_tmp);
		return '';
	}else {
		console.log('所传递的参数是：', cmdStr);
		return Cmd(cmdStr);
	}
	
}


var express = require('express'); 
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io')(server);

// app.use('/', express.static(__dirname + '/public')); 

server.listen(80);

//socket部分
io.on('connection', function(socket) {
	//触发客户端事件stdout
	socket.emit('stdout',type_prompt(home_path));
	
	//触发事件cmd
    socket.on('cmd', function(data) {
        console.log(data);
	cmdStr = data;
	socket.emit('stdout','/n');
	socket.emit('stdout',read_command());
	socket.emit('stdout','/n');
	socket.emit('stdout',type_prompt(home_path));
    })

    //断开事件
    socket.on('disconnect', function(data) {
        //console.log('断开',data);
        //socket.emit('c_leave','离开');
        //socket.broadcast用于向整个网络广播(除自己之外)
        //socket.broadcast.emit('c_leave','某某人离开了')
    })

});

