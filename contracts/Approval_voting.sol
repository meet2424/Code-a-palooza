// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
// import "@openzeppelin/contracts/utils/Strings.sol";

contract Voting{
    uint public systemCount;
    struct VotingSystem{
        uint uniqueId;
        string systemName;
        uint numberOfCandidates;
        string[] candidates;
        uint votingPeriod;       
        string[] votersForElection;
        string electionHelderName;
        string description;
    }

    mapping (uint => mapping (string => uint)) public differentSystemVotes;
    mapping (uint => mapping (address => bool)) differentSystemVotingDone;
    mapping (uint => mapping (string => bool)) differentPanCardsVoting;
    mapping (uint => VotingSystem) public systems;

    function getSystemDetails(uint _uniqueId) public view returns (uint, string memory, uint, string[] memory, uint, string[] memory, string memory, string memory) {
        VotingSystem memory system = systems[_uniqueId];
        return (system.uniqueId, system.systemName, system.numberOfCandidates, system.candidates, system.votingPeriod, system.votersForElection, system.electionHelderName, system.description);
    }

    function createSystem(uint _uniqueId, string memory _systemName, uint _numberOfCandidates, string[] memory _candidates,uint numberOfDays,string[] memory _votersForElection, string memory _electionHelderName,string memory _description) public   {
        uint _votingPeriod = block.timestamp + (numberOfDays * 1 days);
        VotingSystem memory system =  VotingSystem(_uniqueId,_systemName,_numberOfCandidates,_candidates,_votingPeriod,_votersForElection,_electionHelderName,_description);
        systems[_uniqueId] = system;
        systemCount++;
    }


    address payable owner;
    mapping (address => uint) votingDone;
  
    constructor() {
        owner = payable(msg.sender);
    }


    function showBalance() public view returns(uint) {
        return address(this).balance;
    }

    function voteKarteRaho(uint _uniqueId,string memory _candidateName,string memory _candidateAadhar) public  {
        voteNow(_uniqueId,_candidateName,_candidateAadhar);
    }

    function checkIfUserExists(uint _uniqueId,string memory _candidateAadhar) internal view returns(bool){
        for(uint i=0;i<systems[_uniqueId].votersForElection.length;i++){
            if (keccak256(bytes(systems[_uniqueId].votersForElection[i])) == keccak256(bytes(_candidateAadhar))){
                return true;
            }
        }
        return false;
    }

    function voteNow(uint _uniqueId,string memory _candidateName,string memory _candidateAadhar) internal{
        require(checkIfUserExists(_uniqueId, _candidateAadhar),"You are not Authorized to Vote");
        // require(differentSystemVotingDone[_uniqueId][msg.sender]==false,"You have already Voted");
        // require(differentPanCardsVoting[_uniqueId][_candidateAadhar]==false,"You have already Voted");
        require(systems[_uniqueId].votingPeriod >= block.timestamp, "The voting time is Over!");
        differentSystemVotes[_uniqueId][_candidateName] +=1;
        differentSystemVotingDone[_uniqueId][msg.sender] = true;
        differentPanCardsVoting[_uniqueId][_candidateAadhar]=true;
    }

    function getCandidates(uint _uniqueId) public view returns (string[] memory)  {
        return systems[_uniqueId].candidates;
    }

    function getVoters(uint _uniqueId) public view returns (string[] memory)  {
        return systems[_uniqueId].votersForElection;
    }

    function addMoneyToOwner() public payable{
        require(msg.sender == owner, "Not Authorized");
        payable(msg.sender).transfer(1 ether);
    }

    function getWinner(uint _uniqueId) public view returns (string memory) {
        require(msg.sender == owner, "Not Authorized");
        require(systems[_uniqueId].votingPeriod < block.timestamp, "Voting period has not ended yet");

        uint maxVotes = 0;
        string memory winner;

        for (uint i = 0; i < systems[_uniqueId].numberOfCandidates; i++) {
            uint candidateVotes = differentSystemVotes[_uniqueId][systems[_uniqueId].candidates[i]];
            if (candidateVotes > maxVotes) {
                maxVotes = candidateVotes;
                winner = systems[_uniqueId].candidates[i];
            }
        }
        return winner;
    }

    function getSystemIdsOfVoter(string memory _voterAddress) public view returns (uint[] memory) {
        uint[] memory systemIds = new uint[](systemCount);
        uint systemIndex = 0;
        for (uint i = 1; i <= systemCount; i++) {
            for (uint j = 0; j < systems[i].votersForElection.length; j++) {
                if (keccak256(bytes(systems[i].votersForElection[j])) == keccak256(bytes(_voterAddress))) {
                    systemIds[systemIndex] = systems[i].uniqueId;
                    systemIndex++;
                    break;
                }
            }
        }
        return systemIds;
    }

    function getOtherCandidates(uint _uniqueId, string memory _voterAadhar) public view returns (string[] memory) {
        string[] memory candidates = systems[_uniqueId].candidates;
        uint numCandidates = systems[_uniqueId].numberOfCandidates;
        string[] memory otherCandidates = new string[](numCandidates - 1);
        uint index = 0;

        for (uint i = 0; i < numCandidates; i++) {
            if (keccak256(bytes(systems[_uniqueId].votersForElection[i])) == keccak256(bytes(_voterAadhar))) {
                // If the current voter has voted for this candidate, skip to the next candidate
                continue;
            }

            otherCandidates[index] = candidates[i];
            index++;
        }

        return otherCandidates;
    }

    function getTimeRemaining(uint _uniqueId) public view returns (uint) {
        require(systems[_uniqueId].votingPeriod > 0, "Poll has not started yet");
        require(systems[_uniqueId].votingPeriod > block.timestamp, "Poll has ended");

        uint timeRemaining = systems[_uniqueId].votingPeriod - block.timestamp;

        return timeRemaining;
    }

}