const express = require('express');
const router = express.Router();
const slugify = require("slugify");
const blogPosts = require("../../database/schemas/blogPosts");
const authorize = require("../../middleware/authorize")

router.post("/blog", authorize , async(req, res) => {
    try {
        const {title, description, content} = req.body;

        if(!title || !description || !content) {
            return res.status(400).json({success: false, message: "title, description, content is required", code: 400});
        }

        const ID = slugify(title, {
            lower: true
        });

        const blogPostObject = {
            _id: ID,
            title: title,
            description: description,
            content: content,
            views: [],
            createdAt: Date.now(),
            lastEdited: Date.now()

        }

        await blogPosts.create(blogPostObject);
        return res.status(200).json({success: true, message: "Blog post created", data: blogPostObject, code: 200})


    } catch(e) {
        console.error(e)
        return res.status(500).json({success: false, message: "Internal server error", code: 500})
    }
})

module.exports = router;