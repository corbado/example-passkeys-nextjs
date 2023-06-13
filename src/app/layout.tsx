import './globals.css'
import {Inter} from 'next/font/google'

const inter = Inter({subsets: ['latin']})

export const metadata = {
    title: 'Corbado Example Next.js',
    description: 'Corbado example in Next.js with web component',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <head>
            <script defer src="https://auth.corbado.com/auth.js"></script>
        </head>
        <body className={inter.className}>{children}</body>
        </html>
    )
}
