'use client'

import Link from 'next/link'
import LoginButton from '../components/auth/SignInButton'

const Header = () => {
  return (
    <header className='bg-[#242424] py-6 px-5'>
      <nav className='center flex items-center text-sm font-medium tracking-wider uppercase text-stone-500'>
        <ul className='ml-auto'>
          <li>
            <LoginButton />
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
