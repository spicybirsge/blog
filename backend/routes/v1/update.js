const express = require('express');
const router = express.Router();
const blogPosts = require("../../database/schemas/blogPosts");
const authorize = require("../../middleware/authorize")


router.put("/blog", authorize, async(req, res) => {
try {
    const {id, title,description, content, image_url} = req.body;
    
    if(!id || !title || !description || !content || !image_url) {
        return res.status(400).json({success: false, message: "id, title, description, content, image_url is required", code:400})
    }

    if(!image_url.startsWith("http://") && !image_url.startsWith("https://")) {
        return res.status(400).json({success:false, message: 'Invalid url', code: 400})
    }
    let finalImageURL = image_url;

    if(!finalImageURL.startsWith("https://shaheercdn.onrender.com/")) {

        finalImageURL = `https://shaheercdn.onrender.com/proxy?url=${image_url}`
    }
    const blogPost = await blogPosts.findOne({_id: id})

    if(!blogPost) {
        return res.status(404).json({success:false, message: "Blog post not found", code:404})
    }

    blogPost.title = title;
    blogPost.description = description;
    blogPost.content = content;
    blogPost.lastEdited = Date.now();
    blogPost.imageURL = finalImageURL;
    await blogPost.save();
    return res.status(200).json({success: true, message: "Blog post updated", code:200})


} catch(e) {
    console.error(e)
    return res.status(500).json({success: false, message: "Internal server error", code: 500})
    
} 
})


module.exports = router;