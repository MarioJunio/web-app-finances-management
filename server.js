var express = require('express');

var app = express();
app.use(express.static(__dirname + '/dist/algomoney-ui'));

app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/dist/algomoney-ui/index.html');
});

app.listen(process.env.PORT || 4200);
