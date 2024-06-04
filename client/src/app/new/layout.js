import { Inter } from "next/font/google";
import { ConfigProvider } from "antd";
import { AntdRegistry } from '@ant-design/nextjs-registry';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'New blog post',
  description: 'Create a new blog post',
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
    title: 'New blog post',
    description: 'Create a new blog post',
  
    siteName: "Shaheer Ahamed's Blog",
    images: [
      {
        url: '/logo.png',
        width: 479,
        height: 472 ,
        alt: 'Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Shaheer Ahamed's Blog",
    description: 'Create a new blog post',
    images: ['/logo.png'],
  },
};
export default function RootLayout({ children }) {
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
