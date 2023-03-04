import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ connect, defaultAccount }) => {
  const [vote, setVote] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`flex justify-between bg-black text-w text-lg ${
          defaultAccount ? 'pl-40 pr-20' : 'px-40'
        } py-4  font-medium shadow`}
      >
        <div
          className="text-2xl"
          onClick={() => {
            navigate('/');
          }}
        >
          ElectionChain
        </div>
        <div className="flex gap-20">
          <div
            className="cursor-pointer"
            onClick={() => {
              navigate('/');
            }}
          >
            Home
          </div>
          <div className="cursor-pointer relative">
            <span onClick={() => setVote(!vote)}>Vote</span>
            {/* {vote ? (
              <KeyboardArrowUpIcon onClick={handleCommunity} />
            ) : (
              <KeyboardArrowDownIcon onClick={handleCommunity} />
            )} */}
            <div
              className={`bg-black w-32 tracking-wider text-[1rem] top-11 my-2 rounded border-black border-[0.09rem] ${
                vote ? 'absolute' : 'hidden'
              }`}
            >
              <div
                className="font-sans cursor-pointer hover:font-bold px-2 py-1 mt-1"
                onClick={() => {
                  setVote(!vote);
                  navigate('/create-poll');
                }}
              >
                Create Poll
              </div>
              <div
                className="font-sans cursor-pointer hover:font-bold px-2 py-1 mt-1 mb-1"
                onClick={() => {
                  setVote(!vote);
                  navigate('/voting');
                }}
              >
                Cast Vote
              </div>
            </div>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              navigate('/result');
            }}
          >
            Results
          </div>
          <div className="cursor-pointer" onClick={() => navigate('/connect')}>
            Connect
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
