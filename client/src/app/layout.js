import { Inter } from "next/font/google";

import { AntdRegistry } from '@ant-design/nextjs-registry';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Blog - Shaheer Ahamed',
  description: 'Hi I am Shaheer Ahamed a full-stack web and app developer. You can read my blog here.',
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
    title: 'Blog - Shaheer Ahamed',
    description: 'Hi I am Shaheer Ahamed a full-stack web and app developer. You can read my blog here.',
  
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
    description: 'Hi I am Shaheer Ahamed a full-stack web and app developer. You can read my blog here.',
    images: ['/logo.png'],
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}> <AntdRegistry>{children}</AntdRegistry></body>
    </html>
  );
}
