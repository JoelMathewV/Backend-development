const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var items = [];
var works = [];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/", function(req, res){
    var today = new Date();

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    var day = today.toLocaleDateString("en-US", options);

    res.render("list", {
        kindofday: day, itemName: items
    });
});

app.post("/",function(req, res){
    var item = req.body.newItem;
    if (req.body.button === "Work"){
        works.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }
} );

app.get("/work", function(req, res){
    res.render("list", {kindofday: "Work Day", itemName: works});
});

app.post("/work", function(req,res){
    let item = req.body.newItem;
    works.push(item);
    res.redirect("/work");
});

app.listen(3000, function(){
    console.log("server started on port 3000");
});