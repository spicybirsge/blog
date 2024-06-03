'use client'
import { loggedIn, loaded } from "@/store";
import { useEffect } from "react";
import { authenticate } from "@/functions/authenticate";
import { useRouter } from "next/navigation";
import LoadingComponent from "../../components/LoadingComponent";
import { Form, Input , Button, Typography, message} from "antd";
import { useState } from "react";
import Link from 'next/link'
import vars from "@/variables/vars";
const {Title, Paragraph} = Typography

export default function Page () {
    const router = useRouter()
    const [messageApi, contextHolder] = message.useMessage();
    const [butLoading, setButtonLoading] = useState(false)
    const isLoaded = loaded((state) => state.loaded);
    const isLoggedIn = loggedIn((state) => state.loggedIn);
    
    
    useEffect(() => {
        if (!isLoaded) {
          authenticate();
        }
       
      }, []);
    
      if (!isLoaded) {
        return <LoadingComponent  />
      }
      if(isLoaded && isLoggedIn) {
        return router.push('/dashboard', { scroll: false })
      }

    async function onFinish(values) {
      setButtonLoading(true)
     const key = values.auth_key;

     const URL = vars.BACKEND_URL+"/api/v1/read/is-authenticated";

     const request = await fetch(URL, {
      method: 'GET',
      headers:{
        "Content-Type": "application/json",
        "Authorization": "Bearer "+key
      }
     })

     const response = await request.json();
     if(response.success) {
      setButtonLoading(false)
      window.localStorage.setItem("token", key);
      loggedIn.setState({loggedIn: true})

      return;
     } else {
      setButtonLoading(false)
        messageApi.error("Invalid key")
        return;
     }

    }
    return (<>
    {contextHolder}
      <div
          style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '100vh',
          }}
      >
          <Form
              name="basic"
              layout="vertical"
              style={{ width: 400 }}  
              onFinish={onFinish}
          >
              <Form.Item style={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                  <Title level={3}>Hello Admin 👋</Title>
              </Form.Item>
              <Form.Item
                  label="Auth key"
                  name="auth_key"
                  rules={[
                      {
                          required: true,
                          message: 'Please provide your Auth key',
                      },
                  ]}
              >
                  <Input />
              </Form.Item>
              <Form.Item>
                  <Button type="primary" htmlType="submit" loading={butLoading}>
                      Submit
                  </Button>
              </Form.Item>
              <Form.Item style={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                  <Paragraph>Go back <Link href={"/"}>home?</Link></Paragraph>
              </Form.Item>
          </Form>
      </div></>
  );
}