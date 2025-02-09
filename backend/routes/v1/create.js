const express = require('express');
const router = express.Router();
const slugify = require("slugify");
const blogPosts = require("../../database/schemas/blogPosts");
const authorize = require("../../middleware/authorize");
const {WebhookClient} = require("discord.js")



router.post("/blog", authorize , async(req, res) => {
    try {
        const {title, description, content, image_url} = req.body;

        if(!title || !description || !content || !image_url) {
            return res.status(400).json({success: false, message: "title, description, content, image_url is required", code: 400});
        }

        if(!image_url.startsWith("http://") && !image_url.startsWith("https://")) {
            return res.status(400).json({success:false, message: 'Invalid url', code: 400})
        }
        let finalImageURL = image_url;

        if(!finalImageURL.startsWith("https://shaheercdn.onrender.com/")) {

            finalImageURL = `https://shaheercdn.onrender.com/proxy?url=${image_url}`
        }

        let ID = slugify(title, {
            lower: true
        });

        const isIDTaken = await blogPosts.findOne({_id: ID});

        if(isIDTaken) {
            ID = ID+"-"+Date.now() 
        }

        const blogPostObject = {
            _id: ID,
            title: title,
            description: description,
            content: content,
            views: [],
            createdAt: Date.now(),
            lastEdited: Date.now(),
            imageURL: finalImageURL

        }

        await blogPosts.create(blogPostObject);
        const webhookToken = process.env.WEBHOOK_URL;

        if(webhookToken) {
            const webhookClient = new WebhookClient({ url: webhookToken});
            const url = `https://blog-shaheerahamed.vercel.app/posts/${ID}`
            webhookClient.send({content: `**New Post**\n${url}`})
        }
        
        return res.status(200).json({success: true, message: "Blog post created", data: blogPostObject, code: 200})


    } catch(e) {
        console.error(e)
        return res.status(500).json({success: false, message: "Internal server error", code: 500})
    }
})

module.exports = router;