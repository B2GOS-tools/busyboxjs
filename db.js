

// // Object to JSON
// var json_person = JSON.stringify(person);

// //wrte
// fs.writeFile('person.json',json_person,function(err){
//     if(err){
//         console.error(err);
//     }
//     console.log('----------新增成功-------------');
// });


      var fs = require('fs');
      var userid = new Object();//object
      // var data_josn = JSON.stringify(userid);//json

// function init(){
//       var fs = require('fs');
//       var person = new Object();//object
//       var person_josn = JSON.stringify(person);
//       // person.name = 'chy';
//       // person.age = 24;
// }

function open_json(file_path){
      // fs.readFile(file_path,function(err,data){
      //     if(err){
      //         return console.error(err);
      //     }
      //     // JSON to Object
      //     userid = JSON.parse(data);
      //     // console.log(userid);
      // });
      userid = JSON.parse(fs.readFileSync(file_path));
}

function get_data(){
    // console.log('data:'+ userid );
    return userid;
}



module.exports = {
    name: 'json_db',
    // init,
    open_json,
    get_data,



}
// console.log(module);
