'use client'
import { loggedIn, loaded } from "@/store";
import { useEffect, useState } from "react";
import { authenticate } from "@/functions/authenticate";
import LoadingComponent from "@/components/LoadingComponent";
import Navbar from "@/components/NavBar";
import {Typography,  Divider, Spin, message, Space} from 'antd'
const {Title, Paragraph, Text} = Typography;
import { useRouter } from "next/navigation";
import '../global.css'
import PostCard from "@/components/PostCard";
import vars from "@/variables/vars";
import Link from "next/link";
export default function Page() {
    const router = useRouter()
    const [messageApi, contextHolder] = message.useMessage();
    const [posts, setPosts] = useState([])
    const [postFetching, setPostsFetching] = useState(true)
    const isLoaded = loaded((state) => state.loaded);
    const isLoggedIn = loggedIn((state) => state.loggedIn);
    
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
    

        if(isLoaded && !isLoggedIn) {
            return router.push('/login', { scroll: false })
          }
        if (!isLoaded) {
            return <LoadingComponent/>
          }

          function logOut() {
            window.localStorage.removeItem("token")
            loggedIn.setState({ loggedIn: false });
          }
    return <>{contextHolder}
    <div className="container">
    <Navbar loggedIn={isLoggedIn}></Navbar>
        <Title level={2}>Welcome to dashboard!</Title>
        <Paragraph>Here you can manage all your blog posts as you wish! Found a bug? report it at <a href="https://github.com/spicybirsge/blog/issues" target="_blank">github</a>. Create a  <Link href={"/new"}>new blog post</Link> or <a onClick={logOut}>logout</a></Paragraph>
        <Divider></Divider>
        <Title level={2} style={{"textAlign": "center"}}>Posts</Title>
        <Spin spinning={postFetching} size="large">
        <Space direction="vertical" style={{"width" : "100%"}}>
    {posts.map((blogpost)=> (<>
      <PostCard createdAt={blogpost.createdAt} title={blogpost.title} description={blogpost.description} cover={blogpost.imageURL} loggedIn={isLoggedIn} id={blogpost._id} views={blogpost.views}></PostCard> </>
    ) ) }</Space>{posts.length === 0 ? <Paragraph style={{"textAlign": "center"}}>No posts yet, create some?</Paragraph> : <></>}</Spin>
        </div></>
}