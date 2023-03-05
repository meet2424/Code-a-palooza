import React from "react";
import home from "../assets/home.png";
import { AiOutlineArrowRight } from "react-icons/ai";
const LandingPage = () => {
  return (
    <>
      <div className="grid grid-cols-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" style={{ height:"100vh"}}>
        <div style={{ padding: "200px 0 0 50px" }}>
          <p className="font-sans text-6xl leading-tight font-bold text-white">
            Let's Make Voting Secure With{" "}
            <span className="text-blue font-bold text-blue-900">VoteChain</span>
          </p>
          <h3 className="font-sans text-3xl text-white" style={{ paddingTop: "20px" }}>
            Where Every Vote <span className="italic">Counts!</span>
          </h3>
        </div>
        <div style={{ padding: "100px 0 0 50px", height:"60vh" }}>
          <img src={home} alt="" />
          {/* <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full justify-start">
            Get Started <AiOutlineArrowRight />
          </button> */}
        </div>
      </div>
    </>
  );
};

export default LandingPage;
