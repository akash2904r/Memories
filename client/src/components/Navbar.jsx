import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-white w-[90%] mx-auto my-5 shadow-md rounded-lg'>
      <div className='flex gap-1 justify-center'>
        <div className='text-blue-400 text-3xl'>Memories</div>
        <img 
          src="/memories.jpg" 
          alt="Memories"
          className='w-10 h-10' 
        />
      </div>
    </nav>
  )
}

export default Navbar
