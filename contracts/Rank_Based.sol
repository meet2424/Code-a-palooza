// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
// import "@openzeppelin/contracts/utils/Strings.sol";

contract Voting{
    // using Strings for string;
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

    // function voteKarteRaho(uint _uniqueId,string memory _candidateName,string memory _candidateAadhar) public  {
    //     voteNow(_uniqueId,_candidateName,_candidateAadhar);
    // }

    function checkIfUserExists(uint _uniqueId,string memory _candidateAadhar) internal view returns(bool){
        for(uint i=0;i<systems[_uniqueId].votersForElection.length;i++){
            if (keccak256(bytes(systems[_uniqueId].votersForElection[i])) == keccak256(bytes(_candidateAadhar))){
                return true;
            }
        }
        return false;
    }
    function castRankVote(uint systemId, string memory voter, uint[] memory rankings) public {
        // Make sure the voting period is open
        require(block.timestamp < systems[systemId].votingPeriod, "Voting period has ended");
        // Make sure the voter is eligible to vote
        require(!differentPanCardsVoting[systemId][voter], "You have already voted");
        // Make sure the rankings are valid
        require(rankings.length == systems[systemId].numberOfCandidates, "Invalid number of rankings");
        uint[] memory candidatePoints = new uint[](systems[systemId].numberOfCandidates);
        for (uint i = 0; i < rankings.length; i++) {
            uint candidateIndex = rankings[i] - 1; // Convert rank to index (1-based to 0-based)
            require(candidateIndex < systems[systemId].numberOfCandidates, "Invalid candidate ranking");
            candidatePoints[candidateIndex] += i + 1; // Assign points based on rank
        }
        // Update the vote count for each candidate
        for (uint i = 0; i < systems[systemId].numberOfCandidates; i++) {
            string memory candidateName = systems[systemId].candidates[i];
            uint points = candidatePoints[i];
            differentSystemVotes[systemId][candidateName] += points;
        }
        // Mark the voter as having voted
        differentPanCardsVoting[systemId][voter] = true;
    }

    function getCandidateVoteCounts(uint systemId) public view returns (uint[] memory) {
        uint[] memory voteCounts = new uint[](systems[systemId].numberOfCandidates);
        for (uint i = 0; i < systems[systemId].numberOfCandidates; i++) {
            string memory candidateName = systems[systemId].candidates[i];
            voteCounts[i] = differentSystemVotes[systemId][candidateName];
        }
        return voteCounts;
    }
    
    function getLeadingCandidate(uint systemId) public view returns (string memory) {
        string memory leadingCandidate = "";
        uint leadingVoteCount = 0;
        for (uint i = 0; i < systems[systemId].numberOfCandidates; i++) {
            string memory candidateName = systems[systemId].candidates[i];
            uint voteCount = differentSystemVotes[systemId][candidateName];
            if (voteCount > leadingVoteCount) {
                leadingCandidate = candidateName;
                leadingVoteCount = voteCount;
            }
        }
        return leadingCandidate;
    }


    // function voteNow(uint _uniqueId,string memory _candidateName,string memory _candidateAadhar) internal{
    //     require(checkIfUserExists(_uniqueId, _candidateAadhar),"You are not Authorized to Vote");
    //     require(differentSystemVotingDone[_uniqueId][msg.sender]==false,"You have already Voted");
    //     require(differentPanCardsVoting[_uniqueId][_candidateAadhar]==false,"You have already Voted");
    //     require(systems[_uniqueId].votingPeriod >= block.timestamp, "The voting time is Over!");
    //     differentSystemVotes[_uniqueId][_candidateName] +=1;
    //     differentSystemVotingDone[_uniqueId][msg.sender] = true;
    //     differentPanCardsVoting[_uniqueId][_candidateAadhar]=true;
    // }

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

    function getTimeRemaining(uint _uniqueId) public view returns (uint) {
        require(systems[_uniqueId].votingPeriod > 0, "Poll has not started yet");
        require(systems[_uniqueId].votingPeriod > block.timestamp, "Poll has ended");

        uint timeRemaining = systems[_uniqueId].votingPeriod - block.timestamp;

        return timeRemaining;
    }
}