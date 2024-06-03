'use client'
import timeStampToDate from "@/functions/timeStampToDate"
import { Button, Avatar, Typography, Card, Tooltip } from "antd"
const {Text, Title, Paragraph} = Typography
import {EditOutlined, ExportOutlined, EyeOutlined} from '@ant-design/icons'
import Link from "next/link"
export default function PostCard(props) {
    return <Link href={"/posts/"+props.id}  style={{
        textDecoration: "none",
        color: "inherit",
        ":hover": {
          textDecoration: "none",
          color: "inherit",
        },
        ":visited": {
          color: "inherit",
        },
      }}><Card>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
      <Avatar src={"/avatar.png"} size={25} />
      <div style={{ marginLeft: 16 }}>
        <Title level={4}>Shaheer Ahamed</Title>
        <Text>Posted on {timeStampToDate(props.createdAt)}</Text>
      </div>
    </div>
    <Title level={3}>{props.title}</Title>
    <Paragraph style={{ marginTop: 16 }}>{props.description}</Paragraph><div>
    <Tooltip title={props.views+" views"}><Text><EyeOutlined /> {props.views}</Text></Tooltip>
    {props.loggedIn ? <Tooltip title="Manage post"><Link href={"/manage/"+props.id}><Button type="text" icon={<EditOutlined />}></Button></Link></Tooltip>  : <></>}
   

    </div>
  </Card></Link>
}