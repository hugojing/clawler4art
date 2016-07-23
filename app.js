var eventproxy = require('eventproxy');
var cheerio = require('cheerio');
var superagent = require('superagent');
var url = require('url');
var fs = require('fs');
var path = require('path');
var http = require('http');
var utility = require('utility');

function getEveryPage(basicUrl, i) {
  superagent.get(basicUrl + i)
    .end(function(err, sres) {
      if (err) {
        return console.error(err);
      }
      var $ = cheerio.load(sres.text);
      $('.shopList').each(function() {
        var name = $(this).find('.fix').eq(0).find('a').eq(0).text().trim();
        var homepage = $(this).find('.fix').eq(0).find('a').eq(1).attr('href');
        var artist_pic = $(this).find('.fix').eq(1).find('img').eq(0).attr('src');

        var artist_info1 = $(this).find('.fix').eq(1).find('p').eq(0).text().trim();
        var artist_info2 = $(this).find('.fix').eq(1).find('p').eq(1).text().trim();
        var artist_info3 = $(this).find('.fix').eq(1).find('p').eq(2).text().trim().replace(/\r\n|\n/g, "").replace(/\s+/g, "");

        var dbz1_title = $(this).find('.fix').eq(1).find('a').eq(1).attr('title');
        var dbz1_page = $(this).find('.fix').eq(1).find('a').eq(1).attr('href');
        var dbz1_pic = $(this).find('.fix').eq(1).find('img').eq(1).attr('src');
        var dbz1_pic_big = String(dbz1_pic).substr(0, 42) + 'small_' + String(dbz1_pic).substr(45, 18);

        var dbz2_title = $(this).find('.fix').eq(1).find('a').eq(2).attr('title');
        var dbz2_page = $(this).find('.fix').eq(1).find('a').eq(2).attr('href');
        var dbz2_pic = $(this).find('.fix').eq(1).find('img').eq(2).attr('src');
        var dbz2_pic_big = String(dbz2_pic).substr(0, 58) + '.abig.jpg';

        var dbz3_title = $(this).find('.fix').eq(1).find('a').eq(3).attr('title');
        var dbz3_page = $(this).find('.fix').eq(1).find('a').eq(3).attr('href');
        var dbz3_pic = $(this).find('.fix').eq(1).find('img').eq(3).attr('src');
        var dbz3_pic_big = String(dbz3_pic).substr(0, 58) + '.abig.jpg';

        var artist_data = {
          name: name,
          homepage: homepage,
          artist_pic: artist_pic,
          artist_info1: artist_info1,
          artist_info2: artist_info2,
          artist_info3: artist_info3,
          dbz1_title: dbz1_title,
          dbz1_page: dbz1_page,
          dbz1_pic: dbz1_pic,
          dbz2_title: dbz2_title,
          dbz2_page: dbz2_page,
          dbz2_pic: dbz2_pic,
          dbz3_title: dbz3_title,
          dbz3_page: dbz3_page,
          dbz3_pic: dbz3_pic
        };
        console.log(artist_data);
        var artist_data_str = JSON.stringify(artist_data, null, 4);
        console.log(artist_data_str);
        // fs.mkdir(path, [mode], callback)
        // mode 默认为 0777，表示可读可写
        // var id = homepage.substr(21, 20);
        // console.log(ca_data_str);
        fs.mkdirSync('./artist_3000_data/' + name);
        fs.writeFile('./artist_3000_data/' + name + '/info.json', artist_data_str, 'utf-8', function(err) {
          if (err) {
            throw err;
          } else {
            console.log('保存成功, 赶紧去看看乱码吧');
          }
        });

        process.on('uncaughtException', function(err) {
          console.log(err);
        });

        http.get(artist_pic, function(res) {
          var imgData = '';
          res.setEncoding('binary'); //一定要设置response的编码为binary否则会下载下来的图片打不开
          res.on('data', function(chunk) {
            imgData += chunk;
          });
          res.on('end', function() {
            fileName = utility.md5(imgData);
            fs.writeFile('./artist_3000_data/' + name + '/artist_pic.jpg', imgData, 'binary', function(err) {
              if (err) {
                throw err;
              };
              console.log('It\'s saved!');
            });
          });
        });

        // dbz1_pic
        http.get(dbz1_pic, function(res) {
          var imgData = '';
          res.setEncoding('binary'); //一定要设置response的编码为binary否则会下载下来的图片打不开
          res.on('data', function(chunk) {
            imgData += chunk;
          });
          res.on('end', function() {
            fileName = utility.md5(imgData);
            fs.writeFile('./artist_3000_data/' + name + '/dbz1_pic.jpg', imgData, 'binary', function(err) {
              if (err) {
                throw err;
              };
              console.log('It\'s saved!');
            });
          });
        });

        // dbz2_pic
        http.get(dbz2_pic, function(res) {
          var imgData = '';
          res.setEncoding('binary'); //一定要设置response的编码为binary否则会下载下来的图片打不开
          res.on('data', function(chunk) {
            imgData += chunk;
          });
          res.on('end', function() {
            fileName = utility.md5(imgData);
            fs.writeFile('./artist_3000_data/' + name + '/dbz2_pic.jpg', imgData, 'binary', function(err) {
              if (err) {
                throw err;
              };
              console.log('It\'s saved!');
            });
          });
        });

        // dbz3_pic
        http.get(dbz3_pic, function(res) {
          var imgData = '';
          res.setEncoding('binary'); //一定要设置response的编码为binary否则会下载下来的图片打不开
          res.on('data', function(chunk) {
            imgData += chunk;
          });
          res.on('end', function() {
            fileName = utility.md5(imgData);
            fs.writeFile('./artist_3000_data/' + name + '/dbz3_pic.jpg', imgData, 'binary', function(err) {
              if (err) {
                throw err;
              };
              console.log('It\'s saved!');
            });
          });
        });
      });
      console.log('now is getting page :' + i);
      console.log('=================');
    });
};

fs.mkdir('./artist_3000_data/', function(err) {
  if (err) {
    throw err
  };
});

for (var i = 299; i < 370; i++) {
  var basicUrl = 'http://artist.artron.net/class.php?page=';
  getEveryPage(basicUrl, i);
};
