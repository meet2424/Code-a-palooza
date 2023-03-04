import React from 'react';

const Navbar = ({ connect, defaultAccount }) => {
  return (
    <>
      <div
        className={`flex justify-between bg-black text-w text-lg ${
          defaultAccount ? 'pl-40 pr-20' : 'px-40'
        } py-4  font-medium shadow`}
      >
        <div className="text-2xl">Logo</div>
        <div className="flex gap-20">
          <div className="cursor-pointer">Home</div>
          <div className="cursor-pointer">Vote</div>
          <div className="cursor-pointer">Results</div>
          <div className="cursor-pointer" onClick={connect}>
            {defaultAccount ? defaultAccount : 'Connect'}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
