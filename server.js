var express = require('express');
var morgan = require('morgan');
var path = require('path');

var Pool=require('pg').Pool;

var config={
    user:'adivallat',
    database:'adivallat',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var articles=
{
    'articleOne':
    {
        title:'article 1',
        heading:'article 1',
        date:'aug 17',
        content:`<h3>
                <p> Article 1</p>
                </h3>
                <hr/>
                    HI bro.
                    HI bro.`
    },
    'articleTwo':
    { 
        title:'article 2',
        heading:'article 2',
        date:'aug 17',
        content:`<h3>
                <p> Article 2</p>
                </h3>
                <hr/>
                    HI bro.
                    HI bro.`
        
    },
    'articleThree':
    {
        title:'article 2',
        heading:'article 2',
        date:'aug 17',
        content:`<h3>
                <p> Article 3</p>
                </h3>
                <hr/>
                    HI bro.
                    HI bro.`
    }
};


function createTemplate(data)
{
    var title=data.title;
    var date=data.date;
    var heading=data.heading;
    var content=data.content;
    var htmlTemplate=
    `<html>
        <head>
            <title>${title}</title>
        <!--<meta name"viewport" content="width=device-width,initial-scale-1"/>-->
        <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
            <div class="container">
                <a href="/">Home</a>
            </div>
            <hr/>
            <div>
                ${date}
            </div>
            <hr/>
            <div>
                ${content}
            </div>
        </body>
    </html>`
    ;
    return htmlTemplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool=new Pool(config);

app.get('/test-db',function(req,res){
    pool.query('SELECT * FROM test',function(err,result){
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            res.send(JSON.stringify(result.rows));
        }
    });
});

var counter=0;
app.get('/counter', function (req, res) 
{
    counter=counter+1;
    res.send(counter.toString());
});

app.get('/articles/:articleName',function(req,res)
{
    var articleName=req.params.articleName;
    
    pool.query("SELECT * FROM article WHERE title="+req.params.articleName,function (req, res){
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            if(result.rows.length)
            {
                res.status(404).send('article not found!');
            }
            else
            {
                var articleData=result.rows[0];
                res.send(createTemplate(articleData));
            }
        
        }
    });
    res.send(createTemplate(articleData));
});

app.get('/article2',function(req,res){
     res.sendFile(path.join(__dirname, 'ui', 'article2.html'));
});

app.get('/article3',function(req,res){
    res.send('article 3');
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/pic2.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'pic2.jpg'));
});






// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
