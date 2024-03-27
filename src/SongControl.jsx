import { VideoContextProvider, videoContext } from "./domain/videoContext";
import { useContext } from 'react';

export const SongControl = () => {
    {/**Will add volume dial in future */}

    let video = {
        id: 3,
        url: "Youtube.com", 
        title: "No video",
        duration: 0,
        plays: 0,
        likes: 0,
        skips: 0,
        skiplimit: 10
    }

    
    let {current} = useContext(videoContext)
    if (Object.keys(current).length == 0) {
        current = video;
    }
    const {likes, skips, skiplimit, duration, title} = current;
    const durationString = new Date(duration * 1000).toISOString().substring(14,19)


    return (
        <div className = "flex flex-row self-center items-center w-screen h-32 p-8 text-4xl font-bold bg-neutral-900 text-white absolute bottom-0">

            {/*Centering stores title and playback bar */}
            <div className = "flex flex-col w-screen space-y-4 self-center">
                {/*The Title*/}
                <p className = "flex justify-start items-center">Title: {title}</p>
                {/*Progress bar and time left */}
                <div className = "flex space-x-10 items-center self-end">
                    <progress className=" w-[800px] h-2"></progress>
                    <p className="text-lg">{durationString}</p>
                </div>
            </div>

            {/* Stores skip count and likes count */}
            <div className = "flex flex-col justify-center space-y-4 h-20 items-end w-150 text-3xl text-gray-400">

                {/**Stores # of skips */}
                <div className = "flex space-x-8 h-16 text-2xl0">
                    <button className = "bg-neutral-600 w-36 h-10 rounded-l text-white">Skip</button>
                    <p> {skips}/{skiplimit}</p>
                </div>

                {/* Includes likes and count*/}
                <div className="flex flex-row items-center space-x-4">
                    <img className = "h-12 w-12" src="src/images/Like0.png"/>
                    <p className="flex">{likes}</p>
                </div>
            </div>
        </div>
    )
};