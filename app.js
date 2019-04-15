var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var mysql = require('mysql');
app.use(bodyParser.urlencoded({extended:false}));

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "nodejs"
  });

app.post('/joinok', function(req, res){
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var user ={'id': req.body.id,'name':req.body.name,'pwd':req.body.pwd,'tel':req.body.tel,'email':req.body.email,'address':req.body.address};
        var sql = "INSERT INTO member set ?";
        con.query(sql, user, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");
          res.end('회원가입이 완료되었습니다.');
        });
      });
     
});

app.get('/memberlist', function(req, res){
    console.log('hello memberlist')
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM member", function (err, result, fields) {
          if (err) throw err;
          console.log(result[0].id);
          var list ='';
          for(var i=0;i < result.length;i++){
              list +='<li>'+ result[i].id +','+result[i].name +','+result[i].pwd+','+ result[i].tel+','+ result[i].email+','+ result[i].address +'</li>'+'<br>';
          }
          var tempalte =`
          <!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
    </head>
    <body>
        <h1>
            회원정보list
        </h1>
        <tr><th><input type="button" value="뒤로가기" onclick="history.back(-1);"></th></tr>
        <ul>
        ${list}
        </ul>
    </body>
</html>
          `;
          res.end(tempalte);
        });
      });
    });

app.get('/', function(req, res){
fs.readFile('views/index.html',  'utf-8', function(err, data){
if(err){
    console.log(err);
    res.send('intenal server error');
}
res.end(data);
});
});

app.get('/login.html', function(req, res){
    console.log('hello login');
    fs.readFile('views/login.html',  'utf-8', function(err, data){
        if(err){
            console.log(err);
            res.send('intenal server error');
        }
        res.end(data);
    });
});
app.get('/loginform.html', function(req, res){
    console.log('hello login');
    fs.readFile('views/loginform.html',  'utf-8', function(err, data){
        if(err){
            console.log(err);
            res.send('intenal server error');
        }
        res.end(data);
    });
});

app.post('/loginok', function(req, res){
    console.log('post ok!')
    var id = req.body.id;
    var pwd = req.body.pwd;
    var data = '아이디 : '+id+'<br>'+'비밀번호 : '+pwd;
    res.send(data);
});

app.listen(3000, function(){
    console.log('connected 3000 port');
});