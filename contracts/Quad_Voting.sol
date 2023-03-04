// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract QuadraticVoting {
    struct Proposal {
        uint id;
        string name;
        uint totalVotes;
        mapping(address => uint) votes;
        }
    Proposal[] public proposals;

    function createProposal(string memory _name) public {
        uint proposalId = proposals.length;
        proposals.push(Proposal({id: proposalId, name: _name,totalVotes: 0
        }));
    }

    function vote(uint _proposalId, uint _numVotes) public {
        Proposal storage proposal = proposals[_proposalId];
        uint prevVotes = proposal.votes[msg.sender];
        uint newVotes = prevVotes + _numVotes;

        // Calculate the new total number of votes for the proposal using quadratic voting
        uint oldTotalVotes = proposal.totalVotes;
        uint newTotalVotes = oldTotalVotes + (_numVotes * _numVotes) - (prevVotes * prevVotes);
        proposal.totalVotes = newTotalVotes;

        // Update the number of votes the user has cast for the proposal
        proposal.votes[msg.sender] = newVotes;
    }

    function getProposal(uint _proposalId) public view returns (uint id, string memory name, uint totalVotes) {
        Proposal storage proposal = proposals[_proposalId];
        return (proposal.id, proposal.name, proposal.totalVotes);
    }
}