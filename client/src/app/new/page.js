'use client'
import { loggedIn, loaded } from "@/store";
import { useEffect, useState } from "react";
import { authenticate } from "@/functions/authenticate";
import LoadingComponent from "@/components/LoadingComponent";
import Navbar from "@/components/NavBar";
import {Typography,  Divider, Spin, message, Input, Button, Space} from 'antd'
const {Title, Paragraph, Text} = Typography;
import { useRouter } from "next/navigation";
import MDEditor from '@uiw/react-md-editor';
import '../global.css'

import vars from "@/variables/vars";

export default function Page() {
    const[title, setTitle] = useState(null)
    const [description, setDescription] = useState(null)
    const [content, setContent] = useState(null)

    const router = useRouter()
    const [messageApi, contextHolder] = message.useMessage();
   
    const isLoaded = loaded((state) => state.loaded);
    const isLoggedIn = loggedIn((state) => state.loggedIn);
    const [creating, setCreating] = useState(false)
    
    useEffect(() => {
        try {
          if (!isLoaded) {
            authenticate();
          }
        } catch(e) {
          console.error(e)
          messageApi.error("Error while authenticating (see console for more info)")
        
        }
    }, [loaded])

    if(!isLoaded) {
        return <LoadingComponent></LoadingComponent>
    }

    if(isLoaded && !isLoggedIn) {
        return router.push('/login', { scroll: false })
      }

      const createBlogPost = async() => {
        if(!title) {
            return messageApi.error("title is required")
        }

        if(!description) {
            return messageApi.error("description is required")
        }

        if(!content) {
            return messageApi.error("content is required")
        }

        setCreating(true)

        const url = vars.BACKEND_URL+"/api/v1/create/blog"
        const request = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+window.localStorage.getItem("token")
            },
            body: JSON.stringify({
                title: title,
                content: content,
                description: description
            })
        })

        const response = await request.json();
        if(response.success) {
            setCreating(false)
            messageApi.success("Blog post created taking you there in 3 seconds")
            setTimeout(() => {router.push("/posts/"+response.data._id, {
                scroll: false
            })}, 3000)
            return;
        } else {
            setCreating(false)
            messageApi.error(response.message)
        }
      }
    return <>{contextHolder}<Navbar loggedIn={isLoggedIn}></Navbar>
    <div className="container">
  
        <Title level={3}>Blog Title</Title>
       <Input value={title} onChange={(e) => {setTitle(e.target.value)}}></Input>
       <Title level={3}>Blog Description</Title>
       <Input value={description} onChange={(e) => {setDescription(e.target.value)}}></Input>
        <Title level={3}>Blog Content</Title>
    <MDEditor
        value={content}
        onChange={setContent}
      />
<Space align="baseline" direction="horizontal" >  
      <Button style={{marginTop: "18px"}} type="primary" onClick={createBlogPost} loading={creating}>Create Blog</Button></Space>
      
     </div></>
}