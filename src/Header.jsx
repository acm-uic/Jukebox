
export const Header = () => {
    return (
        <>
        <nav className = "flex flex-row justify-around items-center w-screen h-24 text-4xl h-150px font-black bg-neutral-900 text-white">
            <h1 className=" absolute center"> ACM@UIC JUKEBOX </h1>
            <button className="h-20 w-20 absolute right-5">
                <img src="src/images/ProfilePic.png"/>
            </button>
        </nav>
        </>
    )
};