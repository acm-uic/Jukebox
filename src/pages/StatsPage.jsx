import React, { useState } from 'react'

export default function StatsPage() {
    //using plays as int, likes as int, and recency as an int
    const videoList = [{title:'comcast', plays:8888888888, likes:45324, recency:2}, {title:'verizon', plays:1321, likes:214, recency:0}, {title:'atnt', plays:25893, likes:757, recency:4}, {title:'cricket', plays:20943, likes:8374, recency:7}]

    // History == 0, Most Played == 1, Most Liked == 2
    const [currentTab, setCurrentTab] = useState(0)

    function compareByLikes(a, b){
        return a.likes - b.likes
    }

    function compareByPlays(a, b){
        return a.plays - b.plays
    }

    function compareByRecency(a, b){
        return a.recency - b.recency
    }

  return (
    <div className='h-screen bg-[#262425] flex flex-col items-center text-[#FFFFFF] pt-[71px]'>
        <div className='flex gap-10 text-5xl w-[991px] justify-between p-2 font-extrabold mb-[37px]'>
            <div
            onClick={() => {setCurrentTab(0)}}
            className={
                currentTab == 0 ?
                    'hover:cursor-pointer text-[#F6CF00] underline hover:text-yellow-700 hover:no-underline'    
                    :'hover:cursor-pointer hover:text-[#F6CF00] hover:underline'
            }>
                History
            </div>
            <div
            onClick={() => {setCurrentTab(1)}}
            className={
                currentTab == 1 ?
                    'hover:cursor-pointer text-[#F6CF00] underline hover:text-yellow-700 hover:no-underline'    
                    :'hover:cursor-pointer hover:text-[#F6CF00] hover:underline'
            }>
                Most Played
            </div>
            <div
            onClick={() => {setCurrentTab(2)}}
            className={
                currentTab == 2 ?
                    'hover:cursor-pointer text-[#F6CF00] underline hover:text-yellow-700 hover:no-underline'    
                    :'hover:cursor-pointer hover:text-[#F6CF00] hover:underline'
            }>
                Most Liked
            </div>
        </div>
        <div className='flex flex-col gap-9 relative'>  
            {currentTab == 0 && videoList.sort(compareByRecency).map((vid, index) =>
                <div key={index} className='bg-[#464545] h-[108px] w-[862px]'>{vid.title}</div>
            )}
            {currentTab == 1 && videoList.sort(compareByPlays).reverse().map((vid, index) =>
            <div key={index} className='flex items-center gap-9'>
                <div className='absolute -left-1/4 text-2xl font-extrabold'>{`Plays: ${vid.plays}`}</div>       
                <div className='bg-[#464545] h-[108px] w-[862px]'>{vid.title}</div>
            </div>
            )}
            {currentTab == 2 && videoList.sort(compareByLikes).reverse().map((vid, index) =>
            <div key={index} className='flex items-center gap-9'>
                <div className='absolute -left-1/4 text-2xl font-extrabold'>{`Likes: ${vid.likes}`}</div>       
                <div className='bg-[#464545] h-[108px] w-[862px]'>{vid.title}</div>
            </div>
            )}
        </div>
    </div>
  )
}
