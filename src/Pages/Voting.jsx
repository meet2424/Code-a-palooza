import React, { useState } from 'react';

const Voting = () => {
  const data = [
    {
      creater: 'Daniel Beerer',
      description: 'Should we merge the last commit made around updating...',
      days: '7 Days',
    },
    {
      creater: 'Daniel Beerer',
      description: 'Should we merge the last commit made around updating...',
      days: '7 Days',
    },
  ];

  return (
    <>
      <div className="px-20 tracking-wider">
        <div className="mt-20 text-6xl text-grey font-bold">Voting</div>
        <div className="mt-5 text-6xl text-black font-semibold">
          Open Votes : 2
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
          {data.map((item, i) => {
            return (
              <div className="" key={i}>
                <div className="flex py-5 items-center cursor-pointer hover:bg-gray-100">
                  <div className="pl-5 uppercase text-sm tracking-wide text-black font-medium w-[25%]">
                    {item.creater}
                  </div>
                  <div className="uppercase text-sm tracking-wide text-black font-medium w-[50%]">
                    {item.description}
                  </div>
                  <div className="uppercase text-sm tracking-wide text-black font-medium w-[15%] cursor-pointer">
                    {item.days}
                  </div>
                  <div className="cursor-pointer text-sm border-title text-title font-bold border-[0.05rem] px-4 py-[0.35rem]">
                    VOTE
                  </div>
                </div>
                <div className="h-[0.1rem] bg-grey"></div>
              </div>
            );
          })}
          {/* <div className="flex py-5 items-center cursor-pointer hover:bg-gray-100">
            <div className="pl-5 uppercase text-sm tracking-wide text-black font-medium w-[25%]">
              Daniel Beerer
            </div>
            <div className="uppercase text-sm tracking-wide text-black font-medium w-[50%]">
              Should we merge the last commit made around updating...
            </div>
            <div className="uppercase text-sm tracking-wide text-black font-medium w-[15%] cursor-pointer">
              7 Days
            </div>
            <div className="cursor-pointer text-sm border-title text-title font-bold border-[0.05rem] px-4 py-[0.35rem]">
              VOTE
            </div>
          </div> */}
          <div className=""></div>
        </div>
      </div>
    </>
  );
};

export default Voting;
