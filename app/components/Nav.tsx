'use client'

import { Session } from 'next-auth'
import { signIn } from 'next-auth/react'
import Image from 'next/image'

export default function Nav({user}: Session){
  return (
    <nav className='flex justify-between items-center py-8'>
      <h1>E-Commerce do Bertoldo</h1>
      <ul className='flex items-center gap-12'>
        {!user && (
          <div>
            <li className='bg-teal-600 text-white py-2 px-4 rounded-md'>
            <button onClick={() => signIn()}>Sign In</button>
          </li>
          <li>Dashboard</li>
          </div>
        )}
        {user && (
          <>
            <li>
            <Image className="rounded-full" src={user?.image as string} alt='Foto de perfil do usuário' width={48} height={48}/>
          </li>
          <li>
            {user.name}
          </li>
          </>
          
        )}
      </ul>
    </nav>
  )
}