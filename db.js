
var fs = require('fs');
var userid_data = new Object();//object


function open_json(file_path){
      userid_data = JSON.parse(fs.readFileSync(file_path));
}

function get_data(){
    return userid_data;
}

function save_json(userid_data){
    // Object to JSON
    var data = JSON.stringify(userid_data);
    //wrte
    fs.writeFile('person.json',data,function(err){
        if(err){
            console.error(err);
        }
        console.log('--保存完毕--');
    });

}



module.exports = {
    name: 'json_db',
    open_json,
    get_data,
    save_json,

}
