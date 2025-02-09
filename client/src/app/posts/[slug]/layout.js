import { Inter } from "next/font/google";
import { ConfigProvider } from "antd";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import vars from "@/variables/vars";
const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({ params, searchParams }, parent) {
 
  const id = params.slug
  const url = vars.BACKEND_URL+"/api/v1/read/blog?id="+id
  const request = await fetch(url, {
      method: 'GET',
      next: {
        revalidate: 0
      }
  })

  const response = await request.json();
 
    
      
      return {
        title: response.data.title,
        description: response.data.description,
        icons: {
          icon: '/logo.png',
          shortcut: '/logo.png',
          apple: '/logo.png',
          other: {
            rel: 'apple-touch-icon-precomposed',
            url: '/logo.png',
          },
        },
        openGraph: {
          title: response.data.title,
          description: response.data.description,
        
          siteName: "Shaheer Ahamed's Blog",
          images: [
            {
              url: response.data.imageURL,
              
            },
          ],
          locale: 'en_US',
          type: 'website',
        },
        twitter: {
          card: 'summary_large_image',
          title: response.data.title,
          description: response.data.description,
          images: [response.data.imageURL],
        },
      };

  

}


export default function PostLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>     <ConfigProvider
     theme={{
      token: {
        colorPrimary: '#4bd26f',
      },
    }}><AntdRegistry>{children}</AntdRegistry></ConfigProvider></body>
    </html>
  );
}
