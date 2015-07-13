var eventproxy = require('eventproxy');
var cheerio = require('cheerio');
var superagent = require('superagent');
var url = require('url');

// var targetUrlArr = ['http://www.shixiseng.com/interns.html?kd=&xl=&yx=&st=&city=杭州&com_id=&day=&searchtype=1',
// 'http://www.shixiseng.com/interns.html?kd=&xl=&yx=&st=&city=杭州&com_id=&day=&searchtype=1&page=55']
// var targetUrl = 'http://www.shixiseng.com/interns.html?kd=&xl=&yx=&st=&city=杭州&com_id=&day=&searchtype=1&page='+i;



function getEveryPage(basicUrl, i) {

	superagent.get(basicUrl + i)
		.end(function (err, res) {
			if (err) {
				return console.error(err);
			}
			var postUrls = [];
			var $ = cheerio.load(res.text);
			// 获取目标页的所有链
			// console.log($('#div_intern_info').find('a').eq(0).attr('href'));
			$('#div_intern_info').each(function(i){  
	   			var href = $(this).find('a').eq(0).attr('href');
	   			postUrls.push(href);
			});
			console.log('now is getting page :' + i);
			console.log(postUrls);
			console.log('had ' + postUrls.length +' posts');
			console.log('=================');
		

			//
			// if ( postUrls.length == 400 ) {
			var ep = new eventproxy();
			ep.after('post_html', postUrls.length, function (posts) {
			// 重复异步协作
			// ep.after('got_file', files.length, function (list) { }
			// 在所有文件的异步执行结束后将被执行
		  	// 所有文件的内容都存在 posts 数组中
		  		
				posts = posts.map(function (postpair) {
				// var mappedArray = array.map(callback[, thisObject]);
				// 对数组中的每个元素都执行一次指定的函数（callback），
				// 并且以每次返回的结果为元素创建一个新数组
					var postUrl = postpair[0];
					var postHtml = postpair[1];
					// console.log(postpair);
					var $ = cheerio.load(postHtml);
					// var $('#map_address').attr('data-address');
					var address = $('#map_address').attr('data-address');
					var finalAddress = 'http://api.map.baidu.com/geocoder/v2/?address=' + address + '&output=json&ak=7145965faed574a482592e67cd963abd&callback=showLocation&city=杭州市';
					console.log(finalAddress);						
					
						superagent.get(finalAddress)
							.end(function (err, res) {
								if (err) {
									return console.error(err);
								};
								resdata = res.text;
								// console.log('m1:' + resdata);											
							});

				
					// console.log('m2:' + global.resdata);
					var baiduMapData = global.resdata;
					var baiduMapData = String(baiduMapData);
					var baiduMapPoint = baiduMapData.substr(61, 43);

					console.log('MMMMM:' + baiduMapPoint);
					
					return ({

						postId: parseInt(postUrl.substr(32)),
						jobTitle: $('h1').attr('title'),		
						postUrl: postUrl,
						publishTime: $('.publish_time').text().trim(),
						deadline: $('.job_bt').find('.div_border').eq(1).text().trim(),	
						company: $('#company_name').text().trim(),
						companyClass: $('.div_moveup').find('li').eq(0).text().substr(4),
						companySize: $('.div_moveup').find('li').eq(1).text().substr(4),
						companyPage: $('.div_moveup').find('li').eq(2).find('a').attr('href'),
						jobRequest: [$('.job_request').find('span').eq(0).text(),
									 $('.job_request').find('span').eq(1).text(),
									 $('.job_request').find('span').eq(2).text(),
									 $('.job_request').find('span').eq(3).text(),
									 $('.job_request').find('span').eq(4).text()],
						jobDescription: $('.job_bt').find('.div_border').eq(0).text().trim(),
						jobAddress: address,
						baiduMapPoint: baiduMapPoint
						// baiduMapPoint: resdata,
							
							
		      			// href: postUrl,
					});
				});
			  	console.log('final:');
			 	console.log(posts);
			});


			
			postUrls.forEach(function (postUrl) {
			  superagent.get(postUrl)
			    .end(function (err, res) {
			    	console.log(postUrl);
			      	console.log('fetch ' + postUrl + ' successful.');
			      	ep.emit('post_html', [postUrl, res.text]);
			    });
			});
// };
		
	});





		
};
// 

for (var i = 1; i < 55; i++) {
	var basicUrl = 'http://www.shixiseng.com/interns.html?kd=&xl=&yx=&st=&city=杭州&com_id=&day=&searchtype=1&page=';
	getEveryPage(basicUrl, i);

};
// var targetUrl = basicUrl + i;
// console.log(postUrls);
			