'use client'

import timeStampToDate from "@/functions/timeStampToDate";
import { loggedIn, loaded } from "@/store";
import { useEffect, useState } from "react";
import { authenticate } from "@/functions/authenticate";
import LoadingComponent from "@/components/LoadingComponent";
import Navbar from "@/components/NavBar";
import {Typography,  Divider, Spin, message, Input, Button, Space, Avatar, Tooltip} from 'antd'
const {Title, Paragraph, Text} = Typography;
import { useRouter } from "next/navigation";
import MDEditor from '@uiw/react-md-editor';
import '../../global.css'
import {ArrowLeftOutlined, EditOutlined} from '@ant-design/icons'
import vars from "@/variables/vars";
import Link from "next/link";




export default function Page({ params }) {
    const router = useRouter()
    const isLoaded = loaded((state) => state.loaded);
    const isLoggedIn = loggedIn((state) => state.loggedIn);
 
    const [exist, setExist] = useState(true)
    const [fetching, setFetching] = useState(true)
    const [post, setPost] = useState(null)
    const [messageApi, contextHolder] = message.useMessage();

    const {back} = useRouter()
     
    useEffect(() => {
        try {
          if (!isLoaded) {
            authenticate();
          }
        } catch(e) {
          console.error(e)
          messageApi.error("Error while authenticating (see console for more info)")
        
        }


        async function FetchBlog() {
            const id = params.slug
            const url = vars.BACKEND_URL+"/api/v1/read/blog?id="+id
            const request = await fetch(url, {
                method: 'GET'
            })
    
            const response = await request.json();
            if(response.success) {
                document.title = response.data.title
                setFetching(false);
                setPost(response.data);
                return
    
            } else {
                setExist(false)
                setFetching(false);
            }
        }

        if(isLoaded) {
            FetchBlog()
        }
    }, [isLoaded])

    
    if(!isLoaded) {
        return <LoadingComponent></LoadingComponent>
    }
 
    return <>{contextHolder}<Navbar loggedIn={isLoggedIn}></Navbar>
    <div className="container"><Spin spinning={fetching} size="large">
   <Button type="text" icon={<ArrowLeftOutlined />} onClick={()=> {back()}}></Button>
        <Title level={2}>{post?.title}</Title>
  <Paragraph strong>{post?.description}</Paragraph>
  <Paragraph>Post on <Text strong>{timeStampToDate(post?.createdAt)}</Text></Paragraph> 
  <Space >
    <Paragraph><Text strong> <Avatar src={"/avatar.png"} size={25}></Avatar> Shaheer Ahamed</Text></Paragraph> 
  </Space>
  <Divider></Divider>
  <MDEditor.Markdown source={post?.content}  />
  <Divider></Divider>
  <Paragraph>Last edited at <Text strong>{timeStampToDate(post?.lastEdited)}</Text></Paragraph>
   {isLoggedIn ? <Link href={"/manage/"+params.slug}><Tooltip title="Manage post"><Button type="primary" icon={<EditOutlined/>}></Button></Tooltip></Link> : <></>} </Spin></div>
    </>;
}

