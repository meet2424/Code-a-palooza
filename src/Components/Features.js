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
              To prevent fraud and ensure the authenticity of the votes, the
              platform can use a multi-factor authentication system to verify
              the identity of voters.
            </p>
          </div>
        </div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gradient-to-r hover:from-purple-500 hover:to-pink-500">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">
              Immutable Voting Records
            </div>
            <p className="text-gray-700 text-base">
              The platform can store all voting records on the blockchain,
              ensuring that they are immutable and tamper-proof. This can
              provide a transparent.
            </p>
          </div>
        </div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gradient-to-r hover:from-purple-500 hover:to-pink-500">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">
              Real-time Vote Tallying
            </div>
            <p className="text-gray-700 text-base">
              The platform can provide real-time vote tallying, allowing
              stakeholders to see the results of the vote as soon as they are
              available.
            </p>
          </div>
        </div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gradient-to-r hover:from-purple-500 hover:to-pink-500">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Tamper-proof Records</div>
            <p className="text-gray-700 text-base">
              The platform can store all voting records on the blockchain,
              ensuring that they are immutable and tamper-proof. This can
              provide a transparent.
            </p>
          </div>
        </div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gradient-to-r hover:from-purple-500 hover:to-pink-500">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Secure Voting</div>
            <p className="text-gray-700 text-base">
              The platform can provide real-time vote tallying, allowing
              stakeholders to see the results of the vote as soon as they are
              available.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
