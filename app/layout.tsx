import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import Nav from './components/Nav'
import './globals.css'
export const metadata = {
  title: 'Next Ecommerce',
  description: 'Next Ecommerce',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  console.log(session)
  return (
    <html lang="en">
      <body className='mx-64'>
        <Nav user={session?.user} expires={session?.expires as string}/>
        {children}
        </body>
    </html>
  )
}
