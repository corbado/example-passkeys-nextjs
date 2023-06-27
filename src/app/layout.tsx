import './globals.css'
import {Inter} from 'next/font/google'

const inter = Inter({subsets: ['latin']})

export const metadata = {
    title: 'Corbado Example Next.js',
    description: 'Corbado example in Next.js with web component',
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
        <body className={inter.className}>{children}</body>
        </html>
    );
}