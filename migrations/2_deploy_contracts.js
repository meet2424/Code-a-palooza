const Voting = artifacts.require("Voting");
// const ApprovalVoting = artifacts.require("ApprovalVoting")
// const QuadVoting = artifacts.require("QuadVoting")
// const RankBasedVoting = artifacts.require("RankBasedVoting")


module.exports = function(deployer) {
  deployer.deploy(Voting);
  // deployer.deploy(ApprovalVoting);
  // deployer.deploy(QuadVoting);
  // deployer.deploy(RankBasedVoting);
};
