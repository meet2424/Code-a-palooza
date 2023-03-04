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
        Candidate[] candidates;
        uint votingPeriod;       
        string[] votersForElection;
        string electionHelderName;
        string description;
        
    }

    struct Candidate {
        string name;
        uint availableCredits;
    }

    mapping (uint => mapping (string => uint)) public differentSystemVotes;
    mapping (uint => mapping (address => bool)) differentSystemVotingDone;
    mapping (uint => mapping (string => bool)) differentPanCardsVoting;
    mapping (uint => VotingSystem) public systems;

    function getSystemDetails(uint _uniqueId) public view returns (uint, string memory, uint, Candidate[] memory, uint, string[] memory, string memory, string memory) {
        VotingSystem memory system = systems[_uniqueId];
        return (system.uniqueId, system.systemName, system.numberOfCandidates, system.candidates, system.votingPeriod, system.votersForElection, system.electionHelderName, system.description);
    }

    function createVotingSystem(string memory _systemName, uint _numberOfCandidates, string[] memory _candidates, uint _votingPeriod, string[] memory _votersForElection, string memory _electionHelderName, string memory _description) public returns (uint systemId) {
        systemCount++;
        VotingSystem storage system = systems[systemCount];
        system.uniqueId = systemCount;
        system.systemName = _systemName;
        system.numberOfCandidates = _numberOfCandidates;
        system.votingPeriod = _votingPeriod;
        system.votersForElection = _votersForElection;
        system.electionHelderName = _electionHelderName;
        system.description = _description;

        for (uint i = 0; i < _candidates.length; i++) {
            Candidate memory candidate = Candidate({name: _candidates[i], availableCredits: 100});
            system.candidates.push(candidate);
        }

        return systemCount;
    }

    address payable owner;
    mapping (address => uint) votingDone;
  
    constructor() {
        owner = payable(msg.sender);
    }

    function showBalance() public view returns(uint) {
        return address(this).balance;
    }

    function checkIfUserExists(uint _uniqueId,string memory _candidateAadhar) internal view returns(bool){
        for(uint i=0;i<systems[_uniqueId].votersForElection.length;i++){
            if (keccak256(bytes(systems[_uniqueId].votersForElection[i])) == keccak256(bytes(_candidateAadhar))){
                return true;
            }
        }
        return false;
    }
    
    function castQuadraticVote(uint _systemId, uint _candidateIndex, uint _value) public {
        require(systems[_systemId].votingPeriod >= block.timestamp, "Voting period has ended");
        // require(!differentSystemVotingDone[_systemId][msg.sender], "You have already casted your vote for this system");
        require(_candidateIndex < systems[_systemId].numberOfCandidates, "Invalid candidate index");

        Candidate storage selectedCandidate = systems[_systemId].candidates[_candidateIndex];
        require(selectedCandidate.availableCredits >= _value * _value, "Selected candidate does not have enough credits");

        selectedCandidate.availableCredits -= _value * _value;
        uint votes = _value;
        differentSystemVotes[_systemId][selectedCandidate.name] += votes;
        differentSystemVotingDone[_systemId][msg.sender] = true;
    }

    function getCandidateVoteCounts(uint systemId) public view returns (uint[] memory) {
        uint[] memory voteCounts = new uint[](systems[systemId].numberOfCandidates);
        for (uint i = 0; i < systems[systemId].numberOfCandidates; i++) {
            Candidate storage candidate = systems[systemId].candidates[i];
            uint votes = differentSystemVotes[systemId][candidate.name];
            voteCounts[i] = votes; 
        }
        return voteCounts;
    }


    function getLeadingCandidate(uint systemId) public view returns (string memory) {
        string memory leadingCandidate = "";
        uint leadingVoteCount = 0;
        for (uint i = 0; i < systems[systemId].numberOfCandidates; i++) {
            Candidate storage candidate = systems[systemId].candidates[i];
            uint votes = differentSystemVotes[systemId][candidate.name];
            uint sqrtVotes = votes; // calculate square root of votes
            if (sqrtVotes > leadingVoteCount) { // compare square root of votes
                leadingCandidate = candidate.name;
                leadingVoteCount = sqrtVotes;
            }
        }
        return leadingCandidate;
    }



    function getWinner(uint _uniqueId) public view returns (string memory) {
        require(msg.sender == owner, "Not Authorized");
        require(systems[_uniqueId].votingPeriod < block.timestamp, "Voting period has not ended yet");

        uint maxVotes = 0;
        string memory winner;

        for (uint i = 0; i < systems[_uniqueId].numberOfCandidates; i++) {
            uint candidateVotes = systems[_uniqueId].candidates[i].availableCredits;
            if (candidateVotes > maxVotes) {
                maxVotes = candidateVotes;
                winner = systems[_uniqueId].candidates[i].name;
            }
        }
        return winner;
    }

    function getTimeRemaining(uint _uniqueId) public view returns (uint) {
        require(systems[_uniqueId].votingPeriod > 0, "Poll has not started yet");
        require(systems[_uniqueId].votingPeriod > block.timestamp, "Poll has ended");

        uint timeRemaining = systems[_uniqueId].votingPeriod - block.timestamp;

        return timeRemaining;
    }

}