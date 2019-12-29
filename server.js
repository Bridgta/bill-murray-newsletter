const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us4.api.mailchimp.com/3.0/lists/30608749bd",
    method: "POST",
    headers: {
      Authorization: "bill1 34de297b8fe2f759aca334aef8a91c8d-us4"
    },
    body: jsonData
  };

  request(options, function(error, response, body) {
    if (error) {
      res.send("There was an error w signing up");
    } else {
      console.log(response.statusCode);
    }
  });
});

app.listen(3000, function() {
  console.log("Server is runnin on port 3000");
});

//API KEY
// 34de297b8fe2f759aca334aef8a91c8d-us4

//List ID

// 30608749bd
