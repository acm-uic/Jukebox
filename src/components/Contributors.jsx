import profilePicAdrian from "../images/Arrow Swarm trails.png"
import profilePicOwen from "../images/black_hole.png"
import profilePicEthan from "../images/EthanPic.png"
import profilePicAndre from "../images/andreProfilePicture.png"
import profilePicManh from "../images/manh.png"

export const AdrianKnight = () => {
  return (
    <div>
      <div className="flex justify-center align-middle bg-purple-500 shadow-contributor max-w-[380px] h-[100px] m-5 border-solid border-2 border-black " >
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

export const OwenNeal = () => {
  return (
    <div>
      <div className="flex justify-center align-middle bg-black shadow-contributor max-w-[380px] h-[100px] m-5 border-solid border-2 border-black " >
        <img alt="profile picture of Owen Neal" className="rounded-[50%] border-blue-500 border-[4px] -translate-x-[20%] -translate-y-4 hover:" src={profilePicOwen} width={100} height={100} />
        <div className="text-blue-500 text-center w-full self-center mr-5">
          <h3 className="text-2xl  ">
            Owen Neal
          </h3>
          <div>
            <a href={"https://github.com/owenneal"}>@owenneal</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Andre = () => {
  return (
    <div>
      <div className="flex justify-center align-middle bg-yellow-500 shadow-contributor max-w-[380px] h-[100px] m-5 border-solid border-2 border-black rounded-lg" >
        <div className="-translate-x-[20%] -translate-y-4 h-full">
          <img alt="profile picture of Andre Rimes" className="hover:animate-spin rounded-[50%] border-black border-[4px]  " src={profilePicAndre} width={130} height={110} />
        </div>
        <div className="text-black text-center w-full self-center mr-5">
          <h3 className="text-2xl ">
            Andre Rimes
          </h3>
          <div>
            <a href={"https://github.com/AndreRimes"}>@AndreRimes</a>
          </div>
        </div>
      </div>
    </div>
  )

}

export const Manh = () => {
  return (
    <div>
      <div className="flex justify-center align-middle bg-[#03045e] shadow-contributor max-w-[380px] h-[100px] m-5 border-solid border-4 border-indigo-800">
        <img alt="profile photo of Manh" className="rotate-90 -translate-x-[20%] -translate-y-4 aspect-square rounded-[50%] border-8 border-violet-600 hover:border-violet-400 hover:border-[6px]" src={profilePicManh}  width="100px" height="100px"/>
        <div className="text-white text-center w-full self-center mr-5">
          <h3 className="text-2xl  ">
            Manh Phan
          </h3>
          <div>
            <a href={"https://github.com/Mightymanh"}>@Mightymanh</a>
          </div>
        </div>
      </div>
    );
  };

  export const EthanKy = ( ) => {
    return (
      <div>
        <div className="flex justify-center align-middle bg-black shadow-contributor max-w-[380px] h-[100px] m-5 border-solid border-2 border-cyan" >
          <img alt="profile picture of Ethan Ky" className="rounded-[50%] border-cyan-500 border-[4px] -translate-x-[20%] -translate-y-4 hover:" src={profilePicEthan} width={100} height={100} />
          <div className="text-cyan-500 text-center w-full self-center mr-5">
            <h3 className="text-2xl  ">
              Ethan Ky
            </h3>
            <div>
              <a href={"https://github.com/eky2"}>@eky2</a>
            </div>
          </div>
        </div>
      </div>
    );
  };

