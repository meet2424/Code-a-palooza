import React from "react";
import home from "../assets/home.png";
import { AiOutlineArrowRight } from "react-icons/ai";
const LandingPage = () => {
  return (
    <>
      <div className="grid grid-cols-2" style={{backgroundColor:"#A7BCE0", height:"100vh"}}>
        <div style={{ padding: "200px 0 0 50px" }}>
          <p className="font-sans text-6xl leading-tight">
            Let's Make Voting Secure With{" "}
            <span className="text-blue-600 font-medium">ElectionChain</span>
          </p>
          <h3 className="font-sans text-3xl" style={{ paddingTop: "20px" }}>
            Where Every Vote <span className="italic">Counts!</span>
          </h3>
        </div>
        <div style={{ padding: "100px 0 0 0" }}>
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
