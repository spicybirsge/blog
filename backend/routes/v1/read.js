const express = require('express');
const router = express.Router();
const blogPosts = require("../../database/schemas/blogPosts");
const authorize = require("../../middleware/authorize")

router.get("/is-authenticated", authorize, async(req, res) => {

    try {
        return res.status(200).json({success: true, message: "Authenticated", code: 200})
    } catch(e) {
        console.error(e)
        return res.status(500).json({success: false, message: "Internal server error", code: 500})
        
    }
})

router.get("/blog", async(req, res) => {
try { 
    const {id} = req.query;
    const IP = req.ip;
    if(!id) {
        return res.status(400).json({success:false, message:"id is required", code:400})
    }
    const blog = await blogPosts.findOne({_id: id})
    if(!blog) {
        return res.status(404).json({success: false, message: "Blog post not found", code:404})
    }

    if(!blog.views.includes(IP)) {
        blog.views.push(IP)
        await blog.save()
    }

    const blogPostObject = {
        _id: blog._id,
        title: blog.title,
        description: blog.description,
        content: blog.content,
        views: blog.views.length,
        createdAt: blog.createdAt,
        lastEdited: blog.lastEdited
    }

   return res.status(200).json({success: true, message: "Blog found", data: blogPostObject, code: 200})

 } catch(e) {
    console.error(e)
    return res.status(500).json({success: false, message: "Internal server error", code: 500})
    
}
})

module.exports = router;