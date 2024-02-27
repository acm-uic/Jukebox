import React, { useState } from 'react'

export default function StatVideoCard({video}) {
    const [url, setUrl] = useState(video.url)
  return (
    <div className='w-full h-24 bg-[#464545] flex justify-between items-center text-white p-2'>
        <div className=''>
            <div className='text-5xl font-bold'>{video.title}</div>
            <div>
            <div className='text-sm'>https://www.youtube.com/</div>
            </div>
        </div>
            <div className='h-full flex flex-col items-end'>
                <div className='text-sm font-bold h-1/4'>LENGTH: XX:XX</div>
                <button className='text-2xl font-bold h-3/4'>ADD TO QUEUE</button>
            </div>

    </div>
  )
}
