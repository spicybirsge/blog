const express = require('express');
const router = express.Router();
const blogPosts = require("../../database/schemas/blogPosts");
const authorize = require("../../middleware/authorize")

router.delete('/blog', authorize, async(req, res) => {
try {
    const {id} = req.body;
    if(!id) {
        return res.status(400).json({success:false, message:"blog id is required", code:400})
    }
    const blogExist = await blogPosts.findOne({_id :id})
    if(!blogExist) {
        return res.status(404).json({success:false, message:"Blog post not found", code:404})
    }
    await blogPosts.deleteOne({_id: id});
    return res.status(200).json({success:true, message:"Blog post deleted", code: 200})
 } catch(e) {
    console.error(e)
    return res.status(500).json({success: false, message: "Internal server error", code: 500})
}

})

module.exports = router;