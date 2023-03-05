import React from "react";

const Features = () => {
  return (
    <div style={{ height: "85vh", paddingTop: "50px" }}>
      <p className="text-6xl text-center" style={{ paddingBottom: "50px" }}>
        Features
      </p>
      <div className="grid grid-cols-3 gap-10" style={{ paddingLeft: "50px" }}>
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gradient-to-r hover:from-purple-500 hover:to-pink-500">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">
              Multiple Voting Methods
            </div>
            <p className="text-gray-700 text-base">
              The platform can support multiple voting methods, such as approval
              voting, ranked-choice voting, and quadratic voting. This will
              allow stakeholders to choose.
            </p>
          </div>
        </div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gradient-to-r hover:from-purple-500 hover:to-pink-500">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Voter Verification</div>
            <p className="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
            </p>
          </div>
        </div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gradient-to-r hover:from-purple-500 hover:to-pink-500">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">
              Immutable Voting Records
            </div>
            <p className="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
            </p>
          </div>
        </div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gradient-to-r hover:from-purple-500 hover:to-pink-500">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">
              Real-time Vote Tallying
            </div>
            <p className="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
            </p>
          </div>
        </div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gradient-to-r hover:from-purple-500 hover:to-pink-500">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Tamper-proof Records</div>
            <p className="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
            </p>
          </div>
        </div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gradient-to-r hover:from-purple-500 hover:to-pink-500">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Secure Voting</div>
            <p className="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
