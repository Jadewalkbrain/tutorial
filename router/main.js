module.exports = function(app){


//welcome page
app.get('/', function(req, res){
    res.render('index.html');
    
    });

  //login page  
  app.get('/login', function(req, res){
    console.log('hello login');
        res.render('login.html');
    });

//loginjoinform page
app.get('/loginform', function(req, res){
    console.log('hello login');
        res.render('loginform.html');
    });

//memberlist page
app.get('/memberlist', function(req, res){
        res.render('memberlist.html');
    });
}