import { useState } from 'react'
import ReactPlayer from 'react-player';

export const VideoPlayer = () => {
    // Highly informed by this w3schools tutorial:
    // https://www.w3schools.com/react/react_forms.asp
    const [playerUrl, setPlayerUrl] = useState("");
    const [inputUrl, setInputUrl] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        setPlayerUrl(inputUrl);
    }

    return <>
        <h1>Hi!</h1>
        <ReactPlayer url={playerUrl}/>
        <form onSubmit={handleSubmit}>
            <label> Enter a video URL:
                <input
                    type="text"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                />
                <input type="submit"/>
            </label>
        </form>
    </>
}