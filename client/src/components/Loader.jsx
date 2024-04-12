import React from 'react'

const Loader = () => {
  return (
    <div className='w-full flex justify-center items-center overflow-hidden'>
      <div className='border-4 border-[#0088ea] h-16 w-16 rounded-full border-t-[#ecf1fe] animate-spin' />
    </div>
  )
}

export default Loader
