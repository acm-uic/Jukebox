import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <>
        <nav className = "px-20 flex flex-row items-center w-screen h-24 text-4xl h-150px font-black bg-neutral-900 text-white">
            <ul className="flex flex-1 text-xl font-normal gap-8 text-gray-300 flex-wrap">
                <li className="inline hover:text-white"><Link to="/">Home</Link></li>
                <li className="inline hover:text-white"><Link to="/stats">Stats</Link></li>
                <li className="inline hover:text-white"><Link to="/contributors">Contributors</Link></li>
            </ul>
            <h1 className="text-center"> ACM@UIC JUKEBOX </h1>
            <div className="flex flex-1 flex-row-reverse items-center h-full">
            <button className="h-3/4 aspect-square">
                <img src="src/images/ProfilePic.png"/>
            </button>
            </div>
        </nav>
        </>
    )
};