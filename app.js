const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { url } = require("inspector");
const { json } = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req, res){
    const fname = req.body.firstname;
    const lname = req.body.lastname;
    const email = req.body.email;

    const data = {
        members:[{
            email_address: email,
            status: "subscribed",
            merge_fields: 
                {
                  FNAME: fname,
                  LNAME: lname  
                }
        }]
    };
    //converting to json
    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/<LISTID>";
    const options = {
        method: "POST",
        auth: "sample:<APIKEY>"
    };
    const request = https.request(url, options, function(response){
        if (response.statusCode === 200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html")
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req, res){
    res.redirect("/");
})
app.listen(3000, function(){
    console.log("server running on 3000");
});