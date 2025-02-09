'use client'
import { loggedIn, loaded } from "@/store";
import { useEffect, useState } from "react";
import { authenticate } from "@/functions/authenticate";
import LoadingComponent from "@/components/LoadingComponent";
import Navbar from "@/components/NavBar";
import {Typography,  Divider, Spin, message, Space, Input} from 'antd'
const {Title, Paragraph, Text} = Typography;
import './global.css'
import PostCard from "@/components/PostCard";
import vars from "@/variables/vars";
export default function Page() {
  const isLoaded = loaded((state) => state.loaded);
  const isLoggedIn = loggedIn((state) => state.loggedIn);
  const[constantPosts, setConstantPosts] = useState([])
 const [posts, setPosts] = useState([])

const [postFetching, setPostsFetching] = useState(true);

const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    try {
    if (!isLoaded) {
      authenticate();
    }
} catch(e) {
  console.error(e)
  messageApi.error("Error while authenticating (see console for more info)")

}
    async function fetchPosts() {
      try {
      const url = vars.BACKEND_URL+"/api/v1/read/all-blogs";
      const request = await fetch(url, {
        method: 'GET'
      })

      const response = await request.json()
  
      if(response.success) {
        setPostsFetching(false)
        setConstantPosts(response.data)
        setPosts(response.data)
        
        return;
      } else {
        console.error(response.message)
      return messageApi.error("Error fetching posts (see console for more info)")
      }
    } catch(e) {
      console.error(e)
      messageApi.error("Error while fetching posts (see console for more info)")
    }
        
    }
    if(isLoaded) {
      fetchPosts()
     }
 
      
   
  }, [isLoaded]);
 
  if (!isLoaded) {
    return <LoadingComponent/>
  }

  const searchPosts =(value) => {

if(value === "" || value === null) {

  setPosts(constantPosts)
  return;
}


  setPosts(constantPosts.filter((post) => (
    post.title.toLowerCase().includes(value.toLowerCase()) ||
          post.description.toLowerCase().includes(value.toLowerCase()) ||
          post.content.toLowerCase().includes(value.toLowerCase())
  )))
}
  

  return <> {contextHolder}
  <div className="container">
 <Navbar loggedIn={isLoggedIn}></Navbar>
    <Title level={2}>Shaheer Ahamed's Blog</Title>
    <Paragraph>Hi I am Shaheer Ahamed a full-stack web and app developer. You can read my blog posts here. Want to contact me? message me through <a href="https://discord.com/users/818903544723406858" target="_blank">discord</a>.</Paragraph>
    <Divider></Divider>
    <Title level={2} style={{"textAlign": "center"}}>Posts</Title>
    <Input placeholder="Type here to search" style={{marginBottom: "10px", maxWidth: "50%"}} onChange={(e) => {searchPosts(e.target.value)}}></Input>
    <Spin spinning={postFetching} size="large">
      
    <> 
    {posts.map((blogpost)=> (<Space direction="vertical" style={{"width" : "100%"}}>
      <PostCard  cover={blogpost.imageURL} createdAt={blogpost.createdAt} title={blogpost.title} description={blogpost.description} loggedIn={isLoggedIn} id={blogpost._id} views={blogpost.views}></PostCard> </Space>
    ) ) }{posts.length === 0 ? <Paragraph style={{"textAlign": "center"}}>No posts yet, come back later?</Paragraph> : <></>}</></Spin>

   </div></>;
}