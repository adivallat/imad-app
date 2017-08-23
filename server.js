var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articleOne=
{
    title:'article 1',
    heading:'article 1',
    date:'aug 17',
    content:`<h3>
            <p> Article 1</p>
            </h3>
                august
            <hr/>
                HI bro.
                HI bro.`
    
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

app.get('/article1',function(req,res){
    res.send(createTemplate(articleOne));
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

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
