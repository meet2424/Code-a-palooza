// import Voting from '../abis/Voting.json';
import Voting from '../src/abis/Voting.json';
// import Approval from '../abis/Approval.json';
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import Navbar from './Components/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import VotingPage from './Pages/Voting';
import { Poll } from './Pages/Poll';
import Results from './Pages/Results';
import LandingPage from './Pages/LandingPage';
import Verify from './Pages/Verify';

const App = () => {
  const [Message, setMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);

  useEffect(() => {
    loadWeb3();
    // loadBlockchainData();
    // createPoll();
    // console.log(account);
  }, []);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        'Non-Ethereum browser detected. You should consider trying MetaMask!'
      );
    }
  };

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
  };

  const connectWallet = async () => {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    if (accounts) {
      accountChanged([accounts[0]]);
      // window.alert()
    } else {
      setMessage('Install MetaMask please!!');
    }
  };

  const accountChanged = (accountName) => {
    setDefaultAccount(accountName);
  };

  const createPoll = async (data, account) => {
    console.log('in');
    console.log(data);
    const candidates = [];
    for (let i = 1; i <= data.can; i++) {
      candidates.push(data[`candidate${i}`]);
    }
    const voters = [];
    for (let i = 1; i <= data.voter; i++) {
      voters.push(data[`voter${i}`]);
    }

    // console.log(data);
    // console.log(candidates);
    // console.log(voters);
    const web3 = window.web3;
    const networkId = await web3.eth.net.getId();
    let networkData;
    // Assign contract
    let dstorage;
    switch (data.method) {
      case 'Approval':
        // networkData == Approval.networks[networkId];
        // dstorage = new web3.eth.Contract(Approval.abi, networkData.address);
        break;
      case 'Simple':
        dstorage = new web3.eth.Contract(
          Voting.abi,
          Voting.networks[networkId].address
        );
        break;
      case 'Rank':
        // networkData == Approval.networks[networkId];
        // dstorage = new web3.eth.Contract(Voting.abi, networkData.address);
        break;
      case 'Quadratic':
        // networkData == Approval.networks[networkId];
        // dstorage = new web3.eth.Contract(Voting.abi, networkData.address);
        break;

      default:
        break;
    }
    if (networkData) {
      //   // console.log(dstorage);
      const res = await dstorage.methods
        .createSystem(
          123, //uniqueId
          data.systemName, //System Name
          data.can, // _numberOfCandidates
          candidates, //_candidates
          data.days, //numberOfDays
          voters, //_votersForElection
          data.electionHelderName, //_electionHelderName
          data.description
        )
        .send({ from: account })
        .on('transactionHash', (hash) => {
          console.log('Success');
          window.alert('Success');
          setMessage('Poll created!!');
        });
    } else {
      window.alert('DStorage contract not deployed to detected network.');
      return 'error';
    }
  };

  const getVoters = async (uniqueId = 123) => {
    const web3 = window.web3;
    const networkId = await web3.eth.net.getId();
    const networkData = Voting.networks[networkId];
    if (networkData) {
      // Assign contract
      const dstorage = new web3.eth.Contract(Voting.abi, networkData.address);
      const voters = await dstorage.methods.getVoters(uniqueId).call();
      // console.log(voters);
      return voters;
    } else {
      window.alert('DStorage contract not deployed to detected network.');
      return 'error';
    }
  };
  // const result = await contract.methods.<method-name>(<arguments>).call();

  return (
    <>
      <Navbar connect={connectWallet} defaultAccount={defaultAccount} />
      <Routes>
        <Route
          path="/"
          element={defaultAccount ? <VotingPage /> : <Verify />}
        />
        <Route
          path="/connect"
          element={
            <Verify connect={connectWallet} defaultAccount={defaultAccount} />
          }
        />
        <Route path="/voting" element={<VotingPage />} />
        <Route
          path="/create-poll"
          element={
            defaultAccount ? (
              <Poll createPoll={createPoll} defaultAccount={defaultAccount} />
            ) : (
              <Verify />
            )
          }
        />
        <Route path="/result" element={<Results />} />
      </Routes>
      {/* <div className="text-white mt-20">
        <center>
          <h1>MetaMask Wallet Connection </h1>

          <button onClick={connectWallet}>Connect Wallet Button</button>
          <h3>Address: {defaultAccount}</h3>

          <h3>Enter uniqueId: </h3>
        <input type="text" placeholder="Address: " />

          {defaultAccount && (
            <>
              <button onClick={() => createPoll(defaultAccount[0])}>
              Create Poll
              </button>
              <button onClick={() => console.log(defaultAccount[0])}>
              Create Poll
            </button>
              <div>{Message}</div>
            </>
          )}
          {errorMessage}
        </center>
      </div> */}
    </>
  );
};

export default App;
