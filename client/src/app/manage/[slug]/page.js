'use client'
import { loggedIn, loaded } from "@/store";
import { useEffect, useState } from "react";
import { authenticate } from "@/functions/authenticate";
import LoadingComponent from "@/components/LoadingComponent";
import Navbar from "@/components/NavBar";
import {Typography,  Divider, Spin, message, Input, Button, Empty, Space, Tooltip} from 'antd'
const {Title, Paragraph, Text} = Typography;
import { useRouter } from "next/navigation";
import MDEditor from '@uiw/react-md-editor';
import '../../global.css'
import vars from "@/variables/vars";
import Link from "next/link";
import {ExportOutlined} from '@ant-design/icons'
export default function Page({ params }) {

    const[title, setTitle] = useState(null)
    const [description, setDescription] = useState(null)
    const [content, setContent] = useState(null)

    const router = useRouter()
    const [messageApi, contextHolder] = message.useMessage();
   
    const isLoaded = loaded((state) => state.loaded);
    const isLoggedIn = loggedIn((state) => state.loggedIn);
    const [updating, setUpdating] = useState(false)
   const [exist, setExist] = useState(true);
   const [post, setPost] = useState(null)
   const [fetching, setFetching] = useState(true)
   
    useEffect(() => {
        try {
            if (!isLoaded) {
              authenticate();
            }
          } catch(e) {
            console.error(e)
            messageApi.error("Error while authenticating (see console for more info)")
          
          }

          async function FetchPost() {
            const ID = params.slug;
            const URL = vars.BACKEND_URL+"/api/v1/read/blog?id="+ID;
            const request = await fetch(URL, {method: "GET"})
            const response = await request.json();
            if(response.success) {
                setFetching(false)
                setExist(true);
                setPost(response.data)
                setTitle(response.data.title)
                setDescription(response.data.description)
                setContent(response.data.content)
                return

            } else {
                setFetching(false) 
                setExist(false)
                return;
            }
          }

          if(isLoaded) {
            FetchPost()
          }
          
    }, [isLoaded])

    if(!isLoaded) {
        return <LoadingComponent/>
    }

    if(isLoaded && !isLoggedIn) {
        return router.push('/login', { scroll: false })
      }


      async function UpdateBlog() {
        setUpdating(true);
        const ID = params.slug;
        const URL = vars.BACKEND_URL+"/api/v1/update/blog"
        const request = await fetch(URL, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+window.localStorage.getItem("token")
            },
            body: JSON.stringify({
                id: ID,
                title: title,
                description: description,
                content: content
            })
        })

        const response = await request.json();
        if(response.success) {
            setUpdating(false)
            messageApi.success("Post updated")
            return;
        } else {
            setUpdating(false)
            messageApi.error(response.message)
            return;
        }

      }

      async function DeleteBlog() {
        setUpdating(true)
        const URL = vars.BACKEND_URL+"/api/v1/delete/blog"
        const ID = params.slug;
        const request = await fetch(URL, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+window.localStorage.getItem("token")
            },
            body: JSON.stringify({
                id: ID
            })
        })

        const response = await request.json()
            if(response.success) {
                setUpdating(false)
                messageApi.success("Blog deleted successfully, taking you to dashboard in 3 seconds")
                setTimeout(() => {router.push("/dashboard", {
                    scroll: false
                })}, 3000)
                return;
            } else {
                setUpdating(false)
                messageApi.error(response.message)
            }
        
      }
    return <>{contextHolder}<Navbar loggedIn={isLoggedIn}></Navbar>
    <div className="container">{exist?  <Spin size="large" spinning={fetching}>
        <Title level={3}>Blog Title</Title>
       <Input value={title} onChange={(e) => {setTitle(e.target.value)}}></Input>
       <Title level={3}>Blog Description</Title>
       <Input value={description} onChange={(e) => {setDescription(e.target.value)}}></Input>
        <Title level={3}>Blog Content</Title>
    <MDEditor
        value={content}
        onChange={setContent}
      />
<Space align="baseline" direction="horizontal" >      <Button style={{marginTop: "18px"}} type="primary"  loading={updating} onClick={UpdateBlog}>Update Blog</Button>
<Button style={{marginTop: "18px"}} type="primary"  loading={updating} danger onClick={DeleteBlog}> Delete</Button>
<Link href={"/posts/"+params.slug}><Tooltip title="View blog post"><Button type="text" icon={<ExportOutlined />}></Button></Tooltip></Link>
</Space>

        </Spin> : <Empty description={<><span>Blog post not found <Link href={"/new"}>create one?</Link></span></>}></Empty>}
       
        </div></>
  }