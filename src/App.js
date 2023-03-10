import Voting from './abis/Voting.json';
import Approval from './abis/ApprovalVoting.json';
import Rank from './abis/RankBasedVoting.json';
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import Navbar from './Components/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import VotingPage from './Pages/Voting';
import { Poll } from './Pages/Poll';
import Results from './Pages/Results';
import Verify from './Pages/Verify';
import LandingPage from './Pages/LandingPage';
import Features from './Components/Features';
import Footer from './Components/Footer';

const App = () => {
  const [Message, setMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);

  useEffect(() => {
    loadWeb3();
    // connectWallet();
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
    console.log('account', account);
    const candidates = [];
    for (let i = 1; i <= data.can; i++) {
      candidates.push(data[`candidate${i}`]);
    }
    const voters = [];
    for (let i = 1; i <= data.voter; i++) {
      if (data[`voter${i}`]) {
        voters.push(data[`voter${i}`]);
      }
    }

    const web3 = window.web3;
    const networkId = await web3.eth.net.getId();
    let networkData;
    // console.log(networkData);
    console.log(candidates);
    console.log(voters);
    // Assign contract
    let dstorage;
    switch (data.method) {
      case 'Approval':
        console.log('Approval');
        console.log(Approval.networks[networkId].address);
        dstorage = new web3.eth.Contract(
          Approval.abi,
          Approval.networks[networkId].address
        );
        break;
      case 'Simple':
        console.log('Simple');
        console.log(Voting.networks[networkId].address);
        dstorage = new web3.eth.Contract(
          Voting.abi,
          Voting.networks[networkId].address
        );
        break;
      case 'Rank':
        console.log('Rank');
        console.log(Rank.networks[networkId].address);
        dstorage = new web3.eth.Contract(
          Rank.abi,
          Rank.networks[networkId].address
        );
        break;
      case 'Quadratic':
        // networkData == Approval.networks[networkId];
        // dstorage = new web3.eth.Contract(Voting.abi, networkData.address);
        break;

      default:
        break;
    }
    if (dstorage) {
      // const dstorage = new web3.eth.Contract(Approval.abi, networkData.address);
      // console.log(dstorage);
      const res = await dstorage.methods
        .createSystem(
          data.id, //uniqueId
          data.systemName, //System Name
          data.can, // _numberOfCandidates
          candidates, //_candidates
          data.minutes, //numberOfDays
          voters, //_votersForElection
          data.electionHelderName, //_electionHelderName
          data.description
        )
        .send({ from: account[0] })
        .on('transactionHash', async (hash) => {
          let result = await fetch(
            'http://jenilsavla.pythonanywhere.com/success/',
            {
              method: 'POST',
              body: JSON.stringify({
                data: voters,
                id: data.id,
              }),
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
            }
          );
          console.log(result);
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

  return (
    <>
      <Navbar connect={connectWallet} defaultAccount={defaultAccount} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <LandingPage />
              <Features />
              <Footer />
            </>
          }
        />
        <Route
          path="/connect"
          element={
            <Verify connect={connectWallet} defaultAccount={defaultAccount} />
          }
        />
        <Route
          path="/voting"
          element={<VotingPage defaultAccount={defaultAccount} />}
        />
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
        <Route
          path="/landing"
          element={
            <>
              <LandingPage />
              <Features />
              <Footer />
            </>
          }
        />
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
