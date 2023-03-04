// import Voting from '../abis/Voting.json';
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import Navbar from './Components/Navbar';

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

  // const createPoll = async (account, data) => {
  //   const web3 = window.web3;
  //   const networkId = await web3.eth.net.getId();
  //   const networkData = Voting.networks[networkId];
  //   if (networkData) {
  //     // Assign contract
  //     const dstorage = new web3.eth.Contract(Voting.abi, networkData.address);
  //     console.log(dstorage);
  //     const res = await dstorage.methods
  //       .createSystem(
  //         123, //uniqueId
  //         'My Voting System', //System Name
  //         3, // _numberOfCandidates
  //         ['Alice', 'Bob', 'Charlie'], //_candidates
  //         7, //numberOfDays
  //         ['Voter1', 'Voter2', 'Voter3'], //_votersForElection
  //         'Election ABC Inc.' //_electionHelderName
  //       )
  //       .send({ from: account })
  //       .on('transactionHash', (hash) => {
  //         // console.log('Success');
  //         setMessage('Poll created!!');
  //       });
  //   } else {
  //     window.alert('DStorage contract not deployed to detected network.');
  //     return 'error';
  //   }
  // };

  // const getVoters = async (uniqueId = 123) => {
  //   const web3 = window.web3;
  //   const networkId = await web3.eth.net.getId();
  //   const networkData = Voting.networks[networkId];
  //   if (networkData) {
  //     // Assign contract
  //     const dstorage = new web3.eth.Contract(Voting.abi, networkData.address);
  //     const voters = await dstorage.methods.getVoters(uniqueId).call();
  //     // console.log(voters);
  //     return voters;
  //   } else {
  //     window.alert('DStorage contract not deployed to detected network.');
  //     return 'error';
  //   }
  // };
  // const result = await contract.methods.<method-name>(<arguments>).call();

  return (
    <>
      <Navbar />
      <center>
        <h1>MetaMask Wallet Connection </h1>

        <button onClick={connectWallet}>Connect Wallet Button</button>
        <h3>Address: {defaultAccount}</h3>

        {/* <h3>Enter uniqueId: </h3>
        <input type="text" placeholder="Address: " /> */}

        {defaultAccount && (
          <>
            {/* <button onClick={() => createPoll(defaultAccount[0])}> */}
            Create Poll
            {/* </button> */}
            {/* <button onClick={() => console.log(defaultAccount[0])}>
              Create Poll
            </button> */}
            <div>{Message}</div>
          </>
        )}
        {/* {errorMessage} */}
      </center>
    </>
  );
};

export default App;
