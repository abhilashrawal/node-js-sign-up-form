const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var passport = require("passport")
LocalStrategy = require("passport-local"),
passportLocalMongoose = 
        require("passport-local-mongoose")
mongoose.connect('mongodb://127.0.0.1:27017/abhilashketan')
  .then(() => console.log('MongoDB Connected!'));
  
// const contactSchema = {
// email: String,
// query: String,
// };

const formSchema ={
name:String,
email:String,
password:String

}
// const Contact = mongoose.model("Contact", contactSchema);
const Form = mongoose.model("Form", formSchema);
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(express.static(__dirname + '/public'));


  
// app.get("/contact", function(req, res){
// 	res.render("contact");
// });
app.get("/form", function(req, res){
     	res.render("form");
});
app.get("/", function(req, res){
    res.render("home");
});
app.get("/login", function(req, res){
    res.render("login");
});
app.post("/login", async function(req, res){
    try {
        // check if the user exists
        const user = await Form.findOne({ username: req.body.username });
        if (user) {
          //check if password matches
          const result = req.body.password === user.password;
          if (result) {
            res.render("profile");
          } else {
            res.status(400).json({ error: "password doesn't match" });
          }
        } else {
          res.status(400).json({ error: "User doesn't exist" });
        }
      } catch (error) {
        res.status(400).json({ error });
      }
});
  
// app.post("/contact", function (req, res) {
// 	console.log(req.body.email);
// const contact = new Contact({
// 	email: req.body.email,
// 	query: req.body.query,
// });

 
// contact.save(function (err) {
// 	if (err) {
// 		throw err;
// 	} else {
// 		res.render("contact");
// 	}
// });
// });
app.post("/form", function (req, res) {
    console.log("email"+req.body.email);
    console.log(req.body.name);
    console.log(req.body.password);
    const form = new Form({
       name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });

form.save(function (err) {
 	if (err) { 
    		throw err;
     	} else {
     		res.render("form");
     	}
     });
    });
app.listen(3000, function(){
	console.log("App is running on Port 3000");
});
