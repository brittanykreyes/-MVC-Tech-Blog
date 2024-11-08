const express = require('express');
const { Blog } = require('../../models');
const router = express.Router();

// GET routes for rendering the handlebars

router.get("/", (req, res) => {
    res.render("homepage")
})



router.get("/login", (req, res) => {
    res.render("login")
})



router.get("/signup", (req, res) => {
    res.render("signup")
})



router.get("/dashboard", async(req, res) => {
    const allblog= await Blog.findAll()
    const blogs= allblog.map(blog => blog.get({plain: true}))
    res.render("dashboard", {
        blogs
    })
})



router.get("/blogpost", (req, res) => {
    res.render("blogpost")
})



router.get("/blog/new", (req, res) => {
    res.render("newblog")
})



module.exports = router;