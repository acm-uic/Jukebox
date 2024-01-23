import profilePicAdrian from "../images/Arrow Swarm trails.png"


export const AdrianKnight = ( ) => {
    return (
      <div>
        <div className="flex justify-center align-middle bg-purple-500 shadow-contributor max-w-[380px] h-[100px] m-5 border-solid border-2 border-black" >
          <img alt="profile picture of Adrian Knight" className="rounded-[50%] border-indigo-600 border-[4px] -translate-x-[20%] -translate-y-4 hover:animate-ping delay-1000" src={profilePicAdrian} width={100} height={100} />
          <div className="text-black text-center w-full self-center mr-5">
            <h3 className="text-2xl  ">
              Adrian Knight
            </h3>
            <div>
              <a href={"https://github.com/Ajknight121"}>@Ajknight121</a>
            </div>
          </div>
        </div>
      </div>
    );
  };