var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var twilio = require('twilio');
var client = require('twilio')('AC289d888c7c8c1c0d8906f73d92b35809', 'db49bbda72a0d53ede2061c3f0392713');
var Twit = require('twit')

var T = new Twit({
  consumer_key:         'eA3PH4FpiNx4taan3jyQgkOrx',
  consumer_secret:      'mtpPcxL9Q1S3jPqn6rVkjduK0kK2Gz0uodx0hO41Vr5V1Kvhvd',
  access_token:         '1572967369-dkJYNLGExYgD777RlN3sWZQKl0zX4qjJWwk5WyP',
  access_token_secret:  'fy2DTVLWj7xvp0IwAYpK0aS7vwLH2zYfe5iSykP5pzUIi'
})

// function getTweets(hashtag) {
//
//  filter_stream = T.get('statuses/filter', { track: hashtag});
// }

app.use(bodyParser.urlencoded({extended: false}))

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.post('/sms', function (req, res) {

  var resp = new twilio.TwimlResponse();
  var body = req.body.Body
  console.log(body);

  var command = body.split(' ')[0]
  var hash = body.split(' ')[1]


  if (command === 'search') {

    T.get('search/tweets', { q: hash, count: 1 }, function(err, data, response) {
      console.log(data);

    //  for (var i =0; i<=3; i++){
      resp.message(data.statuses[0].text);
      res.send(resp.toString());

  })

  }
  // resp.message("You Said: "+body);
  //  console.log("something happened");
  //  console.log("params",req.params);
  //res.send(resp.toString());
});


//function handleResponse (resp, res) {

//}
