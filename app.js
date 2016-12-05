var file = "test.db"
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

//db.run("CREATE TABLE Stuff (thing TEXT)");

/*
//Insert random data
var stmt = db.prepare("INSERT INTO Stuff VALUES (?)");
var rnd;
for (var i = 0; i < 10; i++) {
    rnd = Math.floor(Math.random() * 10000000);
    stmt.run("Thing #" + rnd);
}
stmt.finalize();
*/

/*
  db.each("SELECT rowid AS id, thing FROM Stuff", function(err, row) {
    console.log(row.id + ": " + row.thing);
  });
*/

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('port',3000);

app.use(express.static('public'));


app.get('/things', function(req,res) {
  var result = [] ;
  db.each("SELECT rowid AS id, thing FROM Stuff", function(err, row) {
    console.log(row.id + ": " + row.thing);
    result.push( row );
  }, function(err, row) {
    console.log("finish");
    res.json(result);
  });
})

/*app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})*/
io.on('connection', function(socket) {
    socket.on('thinks',function(data) {
        io.emit('thinks',[]);
    });
});

http.listen( app.get('port'), function() {
    console.log('listening on *:' + app.get('port'));
});

