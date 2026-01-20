import React from 'react'

const Navbar = () => {
  return (
    <div className='w-full h-20 border-y-2 border-gray-400 flex justify-between py-5 px-10 items-center'>
        <div className="left flex gap-10 items-center">
      <div className="logo bg-violet-200 p-2 text-2xl text-violet-950 rounded-full">
        Expenso
      </div>
      <div className="links ">
        <ul className='flex gap-4'>
            <li className='text-black flex flex-col '><div>Expenses</div><div className='bg-black w-[72px] rounded-full h-1'></div></li>
            <li className='text-gray-500'>Projects</li>
            <li className='text-gray-500'>Reports</li>
        </ul>
      </div>
      </div>
      <div className="right flex gap-10 items-center">
        <div className='py-2 px-2 text-purple-900 rounded-full bg-violet-200 '>🎁 Earn ＄50</div>
        <div className='bg-violet-200 border border-purple-900 rounded-full flex items-center gap-4 py-2 relative px-2'>
            <div className='text-[12px] text-violet-950 mr-15'>
            <div>Khushi's Organisation</div>
            <div>Free plan -0/5 scans</div>
            </div>
            <div className='bg-violet-950 text-2xl font-bold py-2 text-white w-[50px] h-[50px] text-center rounded-full absolute right-0'>
                𝓚
            </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
