import React, { ReactNode } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

type Props = {
  children: ReactNode
}

function Layout({ children }: Props) {
  return (
    <div className="flex justify-center text-white md:mx-0 m-2">
      <div className="flex flex-col w-full max-w-[1280px]">
        <Navbar />
        { children }
        <Footer />
      </div>
    </div>
  )
}

export default Layout