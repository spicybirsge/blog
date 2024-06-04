'use client';

import { Menu } from 'antd';
import Link from 'next/link';
import { HomeOutlined, InfoCircleOutlined, DashboardOutlined,BranchesOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
export default function NavBar(props) {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
  
setPathname(window.location.pathname)
  }, [window.location.pathname])

  const handleMenuItemClick = (e) => {
    
    if (e.key === 'about') {
   
      window.open('https://shaheerahamed.vercel.app', '_blank');
    }

    if (e.key === 'source') {
   
      window.open('https://github.com/spicybirsge/blog', '_blank');
    }
  };

  return (
    <>
      <Menu
        style={{ padding: '0 !important', margin: '0 !important' }}
        mode="horizontal"
        theme="light"
        selectedKeys={[pathname]}
      >
        <Menu.Item key="/" icon={<HomeOutlined />}>
          <Link href="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="about" icon={<InfoCircleOutlined />} onClick={handleMenuItemClick}>
          About
        </Menu.Item>
        <Menu.Item key="source" icon={<BranchesOutlined />} onClick={handleMenuItemClick}>
          Source
        </Menu.Item>
        {props.loggedIn?  <Menu.Item key="/dashboard" icon={<DashboardOutlined/>} >
        <Link href="/dashboard"> Dashboard</Link>
        </Menu.Item> : <></>}
       
      </Menu>
    </>
  );
}