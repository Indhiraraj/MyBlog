import express from "express";
import bodyParser from "body-parser";
import _ from "lodash";
import getPosts from "./getAllPosts.js";

const app = express();
let posts = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("views", "./views");

app.get("/", async function (req, res) {
  try {
    const postsJson = await getPosts();
    if (postsJson) {
      posts = JSON.parse(postsJson);
      res.render("home", { posts: posts });
    } else {
      res.render("home", { posts: [] });
    }
  } catch (error) {
    console.error("Error in GET / route:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/", function (req, res) {
  // Handle POST request
});

app.get("/posts/:id", function (req, res) {
  const post = posts.find(element => _.lowerCase(element.title) === _.lowerCase(req.params.id));
  if (post) {
    res.render("post", { title: post.title, body: post.content });
  } else {
    res.render("post", { title: "SRY...", body: "No posts" });
  }
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  // Assuming you save the post somehow
  res.redirect("/");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/contacts", function (req, res) {
  res.render("contacts");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("server starts at port 3000");
});

