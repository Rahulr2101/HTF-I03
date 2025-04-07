import React from 'react'
import { Logo } from './ui/Logo'
import { Button } from './ui/button'
import { Link } from "react-router";
export const Navbar = () => {
  return (
    <div className=' p-2  bg-white/50'>
        <div className='container mx-auto px-4 '>
            <div className='flex justify-between items-center'>
              <Logo/>
              <div className=' hidden lg:flex space-x-10 text-lg'>
                <Link to="/"  className='text-gray-600 '>Home</Link>
                <Link to="/"  className='text-gray-600 '>About</Link>
                <Link to="/"  className='text-gray-600 '>Features</Link>
              </div>
              <Button className="text-white hidden md:block"  size="xl">
                <p>Contact Us</p>
              </Button>
              </div>
        </div>
    </div>
  )
}
