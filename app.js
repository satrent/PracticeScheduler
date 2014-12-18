var express = require('express')
var app = express()

app.use('/', express.static(__dirname + '/web/pages'));
app.use('/js', express.static(__dirname + '/web/js'));
app.use('/css', express.static(__dirname + '/web/css'));

app.get('/', function (req, res) {
  res.send('Hello World!')
})

var server = app.listen(8895, function () {
  var port = server.address().port
  console.log('Example app listening on %s', port)
})
