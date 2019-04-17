var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var router = require('./router/main')(app);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "nodejs"
  });

  //로그인시 로그인성공
app.post('/loginok', function(req, res){
    console.log('post ok!')
    var id = req.body.id;
    var data =`${id} 님 로그인에 성공하셨습니다.`;
    res.send(data);
});

//회원가입 성공
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

//가입된 회원정보 리스트
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

app.listen(3000, function(){
    console.log('connected 3000 port');
});