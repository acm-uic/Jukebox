import { useState } from 'react'
import ReactPlayer from 'react-player';

export const VideoPlayer = () => {
    const [url, setUrl] = useState("");

    return <>
        <h1>Hi!</h1>
        <ReactPlayer url={url}/>
        <form>
            <label> Enter a video URL:
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
            </label>
        </form>
    </>
}