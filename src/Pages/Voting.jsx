import React from 'react';

const Voting = () => {
  return (
    <>
      <div className="px-20 tracking-wider">
        <div className="mt-20 text-6xl text-grey font-bold">Voting</div>
        <div className="mt-5 text-6xl text-black font-semibold">
          Open Votes : 3
        </div>
        <div className="flex mt-20">
          <div className="pl-4 uppercase text-sm tracking-widest text-black font-bold w-[25%]">
            Created By
          </div>
          <div className="uppercase text-sm tracking-widest text-black font-bold w-[50%]">
            Description
          </div>
          <div className="uppercase text-sm tracking-widest text-black font-bold w-[25%]">
            Expires
          </div>
        </div>
        <div className="mt-5 bg-w border-grey border-[0.05rem] rounded-md">
          <div className="flex py-5 items-center">
            <div className="pl-5 uppercase text-sm tracking-wide text-black font-medium w-[25%]">
              Daniel Beerer
            </div>
            <div className="uppercase text-sm tracking-wide text-black font-medium w-[50%]">
              Should we merge the last commit made around updating...
            </div>
            <div className="uppercase text-sm tracking-wide text-black font-medium w-[15%] cursor-pointer">
              7 Days
            </div>
            <div className="text-sm border-title text-title border-[0.05rem] px-4 py-2">
              VOTE
            </div>
          </div>
          <div className=""></div>
          <div className=""></div>
        </div>
      </div>
    </>
  );
};

export default Voting;
