const express = require('express');
const router = express.Router();
const slugify = require("slugify");
const blogPosts = require("../../database/schemas/blogPosts");
const authorize = require("../../middleware/authorize");
const {WebhookClient} = require("discord.js")



router.post("/blog", authorize , async(req, res) => {
    try {
        const {title, description, content} = req.body;

        if(!title || !description || !content) {
            return res.status(400).json({success: false, message: "title, description, content is required", code: 400});
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
            lastEdited: Date.now()

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