import express from "express";

import bodyParser from "body-parser";

import _ from "lodash";



const app = express();

const posts =[];

const homePageContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";



app.set("view engine" , "ejs");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"))

app.get("/",function(req,res){
    
    //res.render("header",{pageTitle: title});
    
    res.render("home",{homeContent:homePageContent,posts:posts})
})


app.post("/",function(req,res){

})

app.get("/posts/:id",function(req,res){
    console.log(req.params);

    posts.forEach(element => {
        if (_.lowerCase(element.title) === _.lowerCase(req.params.id)) {
            res.render("post",{title: element.title,body: element.content})
        } else {
            res.render("post",{title: "SRY...",body: "No posts"})
        }
        
    });
    
  
       
   
 
})



app.get("/compose",function(req,res){
    res.render("compose")
})

app.post("/compose",function(req,res){

    const post = {
        "title":req.body.postTitle,
        "content":req.body.postBody
    }
    posts.push(post)
    res.redirect("/")

})

app.get("/about",function(req,res){
    res.render("about")
})

app.get("/contacts",function(req,res){
    res.render("contacts")
})

app.listen(3000,function(){
    console.log("server starts at port 3000")
})