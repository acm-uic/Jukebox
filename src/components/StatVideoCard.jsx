import React, { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

export default function StatVideoCard({video}) {
  //taking title as string, length as seconds, url as string
  const {title, length, url} = video
  const lengthString = new Date(length * 1000).toISOString().substring(14,19)

  const [showUrl, setShowUrl] = useState(false)

  function handleClick(){
    // Add what happens if the Queue button is pressed

  }

  return (
    <div className='w-full lg:w-[862px] lg:h-[108px] bg-[#464545] flex justify-between items-center text-[#ffffff] py-2 px-3 rounded'>
      <div className='h-full flex flex-col gap-1'>
        <div className='lg:text-5xl sm:text-4xl text-3xl font-bold'>{title}</div>
        <div className='flex items-center'>
          <button onClick={() => setShowUrl(!showUrl)}className='text-sm active:scale-90 active:text-gray-500 transition duration-100 ease-in-out'>
            <img src='/copyIcon.png'/>
          </button>
          {showUrl && <CopyToClipboard text={url}>
            <button className='text-sm active:scale-90 active:text-gray-500 transition duration-100 ease-in-out'>
             {url}
            </button>
          </CopyToClipboard>}
        </div>
      </div>
      <div className="h-full flex flex-col items-end justify-between">
        <div className='text-sm font-bold h-1/4'>{`LENGTH: ${lengthString}`}</div>
        <button onClick={handleClick} className='text-2xl font-bold h-3/4 active:scale-90 active:text-gray-500 transition duration-100 ease-in-out'>ADD TO QUEUE</button>
      </div>
    </div>
  )
}
