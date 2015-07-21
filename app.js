var eventproxy = require('eventproxy');
var cheerio = require('cheerio');
var superagent = require('superagent');
var url = require('url');
var fs = require('fs');
var path = require('path');
// var request = require('request');
var http = require('http');
var utility = require('utility');
// var mongoose = require('mongoose');
// var targetUrlArr = ['http://www.shixiseng.com/interns.html?kd=&xl=&yx=&st=&city=杭州&com_id=&day=&searchtype=1',
// 'http://www.shixiseng.com/interns.html?kd=&xl=&yx=&st=&city=杭州&com_id=&day=&searchtype=1&page=55']
// var targetUrl = 'http://www.shixiseng.com/interns.html?kd=&xl=&yx=&st=&city=杭州&com_id=&day=&searchtype=1&page='+i;
// mongoose.connect('mongodb://admin:klomSU6prSBS@localhost:27017/admin');
// var Bear = require('./app/models/bear');
// var Dpost = mongoose.model('Dpost', { 
// 	name: String ,
// 	postId: Number ,
// 	jobTitle: String ,		
// 	postUrl: String ,
// 	publishTime: String ,
// 	deadline: String ,	
// 	company: String ,
// 	companyClass: String ,
// 	companySize: String ,
// 	companyPage: String ,
// 	jobRequest: Array ,
// 	jobDescription: String ,
// 	jobAddress: String ,
// 	baiduMapPoint: String
// });




function getEveryPage(basicUrl, i) {

	superagent.get( basicUrl + i )
		.end(function (err, sres) {
			if (err) {
				return console.error(err);
			}
			
			var $ = cheerio.load(sres.text);
      
			// console.log($('.shopList').find('.fix').find('a').eq(0).attr('href'));
	    $('.shopList').each(function () {
	      var name = $(this).find('.fix').eq(0).find('a').eq(0).text().trim();
 	      var homepage = $(this).find('.fix').eq(0).find('a').eq(1).attr('href');
	      var ca_pic = $(this).find('.fix').eq(1).find('img').eq(0).attr('src');
	      
	      var ca_info1 = $(this).find('.fix').eq(1).find('p').eq(0).text().trim();
	      var ca_info2 = $(this).find('.fix').eq(1).find('p').eq(1).text().trim();
	      var ca_info3 = $(this).find('.fix').eq(1).find('p').eq(2).text().trim().replace(/\r\n|\n/g,"").replace(/\s+/g, "");

	      var dbz1_title = $(this).find('.fix').eq(1).find('a').eq(1).attr('title');
	      var dbz1_page = $(this).find('.fix').eq(1).find('a').eq(1).attr('href');
	      var dbz1_pic = $(this).find('.fix').eq(1).find('img').eq(1).attr('src');
	      var dbz1_pic_big = String(dbz1_pic).substr(0, 58) + '.abig.jpg';

	      var dbz2_title = $(this).find('.fix').eq(1).find('a').eq(2).attr('title');
	      var dbz2_page = $(this).find('.fix').eq(1).find('a').eq(2).attr('href');
	      var dbz2_pic = $(this).find('.fix').eq(1).find('img').eq(2).attr('src');
	      var dbz2_pic_big = String(dbz2_pic).substr(0, 58) + '.abig.jpg';

	      var dbz3_title = $(this).find('.fix').eq(1).find('a').eq(3).attr('title');
	      var dbz3_page = $(this).find('.fix').eq(1).find('a').eq(3).attr('href');
	      var dbz3_pic = $(this).find('.fix').eq(1).find('img').eq(3).attr('src');
	      var dbz3_pic_big = String(dbz3_pic).substr(0, 58) + '.abig.jpg';

	      var ca_data = {
	      							// "name:" + name + "\n" + 
	      							// "homepage" + homepage + "\n" +
	      							// "ca_pic:" + ca_pic + "\n" +
	      							// "ca_pic_big:" + ca_pic_big + "\n" +
	      							// "ca_info1:" + ca_info1 + "\n" +
	      							// "ca_info2:" + ca_info2 + "\n" +
	      							// "ca_info3:" + ca_info3 + "\n" +
	      							// "dbz1_title:" + dbz1_title + "\n" +
	      							// "dbz1_page:" + dbz1_page + "\n" +
	      							// "dbz1_pic:" + dbz1_pic + "\n" +
	      							// "dbz1_pic_big:" + dbz1_pic_big + "\n" +
	      							// "dbz2_title:" + dbz2_title + "\n" +
	      							// "dbz2_page:" + dbz2_page + "\n" +
	      							// "dbz2_pic:" + dbz2_pic + "\n" +
	      							// "dbz2_pic_big:" + dbz2_pic_big + "\n" +
	      							// "dbz3_title:" + dbz3_title + "\n" +
	      							// "dbz3_page:" + dbz3_page + "\n" +
	      							// "dbz3_pic:" + dbz3_pic + "\n" +
	      							// "dbz3_pic_big:" + dbz3_pic_big
	      							// ;
	      	name: name, 
	      	homepage: homepage, 
	      	ca_pic: ca_pic,
	      	ca_info1: ca_info1, 
	      	ca_info2: ca_info2, 
	      	ca_info3: ca_info3,
	      	dbz1_title: dbz1_title,
	      	dbz1_page: dbz1_page,
	      	dbz1_pic: dbz1_pic,
	      	dbz1_pic_big: dbz1_pic_big,
	      	dbz2_title: dbz2_title,
	      	dbz2_page: dbz2_page,
	      	dbz2_pic: dbz2_pic,
	      	dbz2_pic_big: dbz2_pic_big,
	      	dbz3_title: dbz3_title,
	      	dbz3_page: dbz3_page,
	      	dbz3_pic: dbz3_pic,
	      	dbz3_pic_big: dbz3_pic_big
	      };
				console.log(ca_data);
				var ca_data_str = JSON.stringify(ca_data, null, 4);
				console.log(ca_data_str);
	      // fs.mkdir(path, [mode], callback)
				// mode 默认为 0777，表示可读可写
				// var id = homepage.substr(21, 20);
				// console.log(ca_data_str);
				fs.mkdirSync('./ca_69_data/' + name);

				fs.writeFile('./ca_69_data/' + name + '/info.json', ca_data_str, 'utf-8', function(err){ 
					 if(err){ 
					 		throw err;
					 }else{ 
					 		console.log('保存成功, 赶紧去看看乱码吧'); 
					 } 
				});

				process.on('uncaughtException', function (err) {
				    console.log(err);
				}); 
				// fs.writeFile('./ca_69_data/' + name + '/info.json', ca_data_str, function (err) {
				//   if (err) {
				//   	console.log(err);
				//   };
				//   console.log('It\'s saved!');
				// });

				// ca_pic
				http.get(ca_pic , function(res){
          var imgData = '';
          res.setEncoding('binary'); //一定要设置response的编码为binary否则会下载下来的图片打不开
          res.on('data', function(chunk){
              imgData+=chunk;
          });
          res.on('end', function(){

                fileName  = utility.md5(imgData);

                fs.writeFile('./ca_69_data/' + name + '/ca_pic.jpg', imgData, 'binary', function (err){
                		if (err) {
									  	throw err;
									  };
  									console.log('It\'s saved!');
               });

        	});

				});
				
				// dbz1_pic
				http.get(dbz1_pic , function(res){
          var imgData = '';
          res.setEncoding('binary'); //一定要设置response的编码为binary否则会下载下来的图片打不开
          res.on('data', function(chunk){
              imgData+=chunk;
          });
          res.on('end', function(){

                fileName  = utility.md5(imgData);

                fs.writeFile('./ca_69_data/' + name + '/dbz1_pic.jpg', imgData, 'binary', function (err){
                		if (err) {
									  	throw err;
									  };
  									console.log('It\'s saved!');
               });

        	});

				});
				// dbz1_pic_big
				http.get(dbz1_pic_big , function(res){
          var imgData = '';
          res.setEncoding('binary'); //一定要设置response的编码为binary否则会下载下来的图片打不开
          res.on('data', function(chunk){
              imgData+=chunk;
          });
          res.on('end', function(){

                fileName  = utility.md5(imgData);

                fs.writeFile('./ca_69_data/' + name + '/dbz1_pic_big.jpg', imgData, 'binary', function (err){
                		if (err) {
									  	throw err;
									  };
  									console.log('It\'s saved!');
               });

        	});

				});
				// dbz2_pic
				http.get(dbz2_pic , function(res){
          var imgData = '';
          res.setEncoding('binary'); //一定要设置response的编码为binary否则会下载下来的图片打不开
          res.on('data', function(chunk){
              imgData+=chunk;
          });
          res.on('end', function(){

                fileName  = utility.md5(imgData);

                fs.writeFile('./ca_69_data/' + name + '/dbz2_pic.jpg', imgData, 'binary', function (err){
                		if (err) {
									  	throw err;
									  };
  									console.log('It\'s saved!');
               });

        	});

				});
				// dbz2_pic_big
				http.get(dbz2_pic_big , function(res){
          var imgData = '';
          res.setEncoding('binary'); //一定要设置response的编码为binary否则会下载下来的图片打不开
          res.on('data', function(chunk){
              imgData+=chunk;
          });
          res.on('end', function(){

                fileName  = utility.md5(imgData);

                fs.writeFile('./ca_69_data/' + name + '/dbz2_pic_big.jpg', imgData, 'binary', function (err){
                		if (err) {
									  	throw err;
									  };
  									console.log('It\'s saved!');
               });

        	});

				});
				// dbz3_pic
				http.get(dbz3_pic , function(res){
          var imgData = '';
          res.setEncoding('binary'); //一定要设置response的编码为binary否则会下载下来的图片打不开
          res.on('data', function(chunk){
              imgData+=chunk;
          });
          res.on('end', function(){

                fileName  = utility.md5(imgData);

                fs.writeFile('./ca_69_data/' + name + '/dbz3_pic.jpg', imgData, 'binary', function (err){
                		if (err) {
									  	throw err;
									  };
  									console.log('It\'s saved!');
               });

        	});

				});
				// dbz3_pic_big
				http.get(dbz3_pic_big , function(res){
          var imgData = '';
          res.setEncoding('binary'); //一定要设置response的编码为binary否则会下载下来的图片打不开
          res.on('data', function(chunk){
              imgData+=chunk;
          });
          res.on('end', function(){

                fileName  = utility.md5(imgData);

                fs.writeFile('./ca_69_data/' + name + '/dbz3_pic_big.jpg', imgData, 'binary', function (err){
                		if (err) {
									  	throw err;
									  };
  									console.log('It\'s saved!');
               });

        	});

				});

		    

    //     fs.writeFile('ca_69_data/' + name + '/ca_pic.jpg', ca_pic, function (err) {
    //     	if (err) next(err);
				//   console.log('It\'s saved!');
				// });
				 

						
	

    });
      
  
		console.log('now is getting page :' + i);
			// console.log(postUrls);
			// console.log('had ' + postUrls.length +' posts');
		console.log('=================');
			// return postUrls;
	});

};
		
fs.mkdir('./ca_69_data/', function (err) {
	if (err) { throw err };
});

for (var i = 1; i < 8; i++) {
	var basicUrl = 'http://ca.artron.net/list?page=';
	getEveryPage(basicUrl, i);
};
// var targetUrl = basicUrl + i;
// console.log(postUrls);
			