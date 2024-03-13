import React, { useState } from 'react'
import StatVideoCard from '../components/StatVideoCard'

export default function StatsPage() {
    //using plays as int, likes as int, and recency as an int
    const videoList = [
        {title:'Do I Wanna Know?', url:'https://www.youtube.com/watch?v=bpOSxM0rNPM', length: 365, plays: 1627943000, likes:9600000, recency:3},
        {title:'As It Was', url:'https://www.youtube.com/watch?v=H5v3kku4y6Q', length: 165, plays: 698605451, likes:7900000, recency:2},
        {title:'The Monkey Dance', url:'https://www.youtube.com/watch?v=qQB-V4r-uMY', length: 139, plays: 19623952, likes:10000, recency:1}, 
        {title:'I KNOW ?', url:'https://www.youtube.com/watch?v=X7aF3nZOS98', length: 226, plays: 14728895, likes:489000, recency:4}
    ]

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

  /*return (
    <div className='min-h-screen w-full flex-grow bg-[#262425] flex flex-col items-center text-[#FFFFFF] py-[71px]'>
        <div className='flex text-center lg:gap-10 gap-2 lg:text-5xl text-4xl w-full lg:w-[991px] justify-between py-2 font-extrabold mb-[37px] px-2 sm:px-20'>
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
                <StatVideoCard key={index} video={vid} />
            )}
            {currentTab == 1 && videoList.sort(compareByPlays).reverse().map((vid, index) =>
            <div key={index} className='flex-col flex items-center lg:gap-9 gap-1'>
                <StatVideoCard key={index} video={vid} />
                <div className='lg:absolute lg:-left-1/4 text-2xl font-extrabold'>{`Plays: ${vid.plays}`}</div>       
            </div>
            )}
            {currentTab == 2 && videoList.sort(compareByLikes).reverse().map((vid, index) =>
            <div key={index} className='flex items-center gap-9'>
                <div className='absolute -left-1/4 text-2xl font-extrabold'>{`Likes: ${vid.likes}`}</div>       
                <StatVideoCard key={index} video={vid} />
            </div>
            )}
        </div>
    </div>
  )*/
}
