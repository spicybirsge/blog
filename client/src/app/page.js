'use client'
import { loggedIn, loaded } from "@/store";
import { useEffect, useState } from "react";
import { authenticate } from "@/functions/authenticate";
import LoadingComponent from "@/components/LoadingComponent";
import {Card } from 'antd';
import Navbar from "@/components/NavBar";
import {Typography,  Divider, Spin, message} from 'antd'
const {Title, Paragraph, Text} = Typography;
import './global.css'
import PostCard from "@/components/PostCard";
import vars from "@/variables/vars";
export default function Page() {
  const isLoaded = loaded((state) => state.loaded);
  const isLoggedIn = loggedIn((state) => state.loggedIn);
 const [posts, setPosts] = useState([])
const [postFetching, setPostsFetching] = useState(true)
const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
   
    if (!isLoaded) {
      authenticate();
    }

    async function fetchPosts() {
      const url = vars.BACKEND_URL+"/api/v1/read/all-blogs";
      const request = await fetch(url, {
        method: 'GET'
      })

      const response = await request.json()
  
      if(response.success) {
        setPostsFetching(false)
        setPosts(response.data)
        return;
      } else {
      return messageApi.success("Error fetching posts")
      }
     
        
    }
    if(isLoaded) {
      fetchPosts()
     }
 
      
   
  }, [isLoaded]);
 
  if (!isLoaded) {
    return <LoadingComponent/>
  }

  return <>{contextHolder}<Navbar loggedIn={isLoggedIn}></Navbar>
  <div className="container">
    <Title level={2}>Shaheer Ahamed's Blog</Title>
    <Paragraph>Hi I am Shaheer Ahamed a full-stack web and app developer. You can read my blog posts here. Want to contact me? message me through <a href="https://discord.com/users/818903544723406858" target="_blank">discord</a>.</Paragraph>
    <Divider></Divider>
    <Title level={2} style={{"textAlign": "center"}}>Posts</Title>
    <Spin spinning={postFetching} size="large">
    {posts.map((blogpost)=> (<>
      <PostCard createdAt={blogpost.createdAt} title={blogpost.title} description={blogpost.description} loggedIn={isLoggedIn} id={blogpost._id} views={blogpost.views}></PostCard> <Divider/></>
    ) ) }{posts.length === 0 ? <Paragraph style={{"textAlign": "center"}}>No posts yet, come back later?</Paragraph> : <></>}</Spin>

   </div></>;
}