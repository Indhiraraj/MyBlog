import express from "express";

import bodyParser from "body-parser";

import _ from "lodash";

import getPosts from "./getAllPosts.js";

function App()
{
const app = express();



let posts = [];






app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"))

app.set("views", "./views");


app.get("/", async function (req, res) {




const postsJson = await getPosts();
posts = JSON.parse(postsJson);

    //res.render("header",{pageTitle: title});

    res.render("home", { posts: posts })
})


app.post("/", function (req, res) {

})

app.get("/posts/:id", function (req, res) {

    posts.forEach(element => {
        
        if (_.lowerCase(element.title) === _.lowerCase(req.params.id)) {
            res.render("post", { title: element.title, body: element.content })
        } else {
            res.render("post", { title: "SRY...", body: "No posts" })
        }

    });


})



app.get("/compose", function (req, res) {
    res.render("compose")
})

app.post("/compose", function (req, res) {

    const post = {
        "title": req.body.postTitle,
        "content": req.body.postBody
    }

    res.redirect("/")

})

app.get("/about", function (req, res) {
    res.render("about")
})

app.get("/contacts", function (req, res) {
    res.render("contacts")
})

app.listen(process.env.PORT || 3000, function () {
    console.log("server starts at port 3000")
    console.log(process.env.PORT);
})

}

App()

export default App;
