import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

export default function StatVideoCard({video}) {
    const {title, length, url} = video

    function handleClick(){
      // Add what happens if the Queue button is pressed
    }
  
    return (
    <div className='w-full h-[98px] bg-[#464545] flex justify-between items-center text-[#ffffff] py-2 px-3 rounded'>
      <div className='h-full flex flex-col gap-1'>
        <div className='text-5xl font-bold'>{title}</div>
        <CopyToClipboard text={url}>
          <button className='text-sm flex items-center gap-1 active:scale-90 active:text-gray-500 transition duration-100 ease-in-out'>
            <img src='/copyIcon.png'/>
            <div>
             {url}
            </div>
          </button>
        </CopyToClipboard>
      </div>
      <div className="h-full flex flex-col items-end justify-between">
        <div className='text-sm font-bold h-1/4'>{`LENGTH: ${length}`}</div>
        <button onClick={handleClick} className='text-2xl font-bold h-3/4 active:scale-90 active:text-gray-500 transition duration-100 ease-in-out'>ADD TO QUEUE</button>
      </div>
    </div>
  )
}
