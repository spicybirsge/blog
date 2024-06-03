const express = require('express');
const router = express.Router();
const blogPosts = require("../../database/schemas/blogPosts");
const authorize = require("../../middleware/authorize")


router.put("/blog", authorize, async(req, res) => {
try {
    const {id, title,description, content} = req.body;
    
    if(!id || !title || !description || !content) {
        return res.status(400).json({success: false, message: "id, description, content is required", code:400})
    }

    const blogPost = await blogPosts.findOne({_id: id})

    if(!blogPost) {
        return res.status(404).json({success:false, message: "Blog post not found", code:404})
    }

    blogPost.title = title;
    blogPost.description = description;
    blogPost.content = content;
    blogPost.lastEdited = Date.now();
    await blogPost.save();
    return res.status(200).json({success: true, message: "Blog post updated", code:200})


} catch(e) {
    console.error(e)
    return res.status(500).json({success: false, message: "Internal server error", code: 500})
    
} 
})


module.exports = router;