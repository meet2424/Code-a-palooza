import Voting from '../abis/Voting.json';
import Approval from '../abis/ApprovalVoting.json';
import Rank from '../abis/RankBasedVoting.json';
import React, { useEffect, useState } from 'react';
const VotingPage = ({ defaultAccount }) => {
  const [method, setMethod] = useState('Approval');
  const [key, setKey] = useState('');
  const [can, setCan] = useState(4);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({});
  const [vote, setVote] = useState({
    vote1: false,
    vote2: false,
  });

  // const data = [
  //   {
  //     creater: 'Daniel Beerer',
  //     description: 'Should we merge the last commit made around updating...',
  //     days: '7 Days',
  //   },
  //   {
  //     creater: 'Daniel Beerer',
  //     description: 'Should we merge the last commit made around updating...',
  //     days: '7 Days',
  //   },
  // ];

  const getSimple = async (key) => {
    const web3 = window.web3;
    const networkId = await web3.eth.net.getId();
    const networkData = Voting.networks[networkId];
    if (networkData) {
      // Assign contract
      const dstorage = new web3.eth.Contract(Voting.abi, networkData.address);
      const voters = await dstorage.methods.getSystemDetails(key).call();
      console.log(voters);
      if (voters[1] != '') {
        const d = [];
        d.push({
          creater: voters[6],
          description: voters[7],
          days: voters[4],
          candidates: voters[3],
          voters: voters[5],
          can: voters[2],
          system: voters[1],
          id: voters[0],
          method: 'Voting',
        });
        setData(d);
      }
      // return voters;
    } else {
      window.alert('DStorage contract not deployed to detected network.');
      return 'error';
    }
  };
  const getApproval = async (key) => {
    const web3 = window.web3;
    const networkId = await web3.eth.net.getId();
    const networkData = Approval.networks[networkId];
    if (networkData) {
      // Assign contract
      const dstorage = new web3.eth.Contract(Approval.abi, networkData.address);
      const voters = await dstorage.methods.getSystemDetails(key).call();
      console.log(voters);
      if (voters[1] != '') {
        const d = [];
        d.push({
          creater: voters[6],
          description: voters[7],
          days: voters[4],
          candidates: voters[3],
          voters: voters[5],
          can: voters[2],
          system: voters[1],
          id: voters[0],
          method: 'Approval',
        });
        setData(d);
      }
      // return voters;
    } else {
      window.alert('DStorage contract not deployed to detected network.');
      return 'error';
    }
  };
  const getRank = async (key) => {
    const web3 = window.web3;
    const networkId = await web3.eth.net.getId();
    const networkData = Rank.networks[networkId];
    if (networkData) {
      // Assign contract
      const dstorage = new web3.eth.Contract(Rank.abi, networkData.address);
      const voters = await dstorage.methods.getSystemDetails(key).call();
      console.log(voters);
      if (voters) {
        const d = [];
        d.push({
          creater: voters[6],
          description: voters[7],
          days: voters[4],
          candidates: voters[3],
          voters: voters[5],
          can: voters[2],
          system: voters[1],
          id: voters[0],
          method: 'Rank',
        });
        setData(d);
      }
      // return voters;
    } else {
      window.alert('DStorage contract not deployed to detected network.');
      return 'error';
    }
  };
  useEffect(() => {}, []);

  const getCandidateVoteCountsRank = async (item) => {
    const web3 = window.web3;
    const networkId = await web3.eth.net.getId();
    const networkData = Rank.networks[networkId];
    if (networkData) {
      // Assign contract
      const dstorage = new web3.eth.Contract(Rank.abi, networkData.address);
      const voters = await dstorage.methods
        .getCandidateVoteCounts('003')
        .call();
      console.log(voters);
      let s = '';
      for (let i = 0; i < item.can; i++) {
        s += `${item.candidates[i]} ${voters[i]} `;
      }
      window.alert('Success ' + s);
      // return voters;
    }
  };
  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
    console.log(formData);
  }

  const handleOpen = (name, value) => {
    setVote((prev) => {
      return {
        prev,
        [name]: value,
      };
    });
  };

  const handleApprovalVote = async (id, candidate, voter) => {
    const web3 = window.web3;
    const networkId = await web3.eth.net.getId();
    const networkData = Approval.networks[networkId];
    if (networkData) {
      // Assign contract
      const dstorage = new web3.eth.Contract(Approval.abi, networkData.address);
      const res = await dstorage.methods
        .voteKarteRaho(
          id, //uniqueId
          candidate, //System Name
          voter // _numberOfCandidates
        )
        .send({ from: defaultAccount[0] })
        .on('transactionHash', (hash) => {
          console.log('Success');
          window.alert('Success');
        });
      // return voters;
    } else {
      window.alert('DStorage contract not deployed to detected network.');
      return 'error';
    }
  };
  const handleRankVote = async (id, data, voter, item) => {
    const arr = Object.values(data);
    // console.log(arr);
    // console.log(voter);
    const web3 = window.web3;
    const networkId = await web3.eth.net.getId();
    const networkData = Rank.networks[networkId];
    if (networkData) {
      // Assign contract
      const dstorage = new web3.eth.Contract(Rank.abi, networkData.address);
      const res = await dstorage.methods
        .castRankVote(
          id, //uniqueId
          voter,
          arr
        )
        .send({ from: defaultAccount[0] })
        .on('transactionHash', (hash) => {
          console.log('Success');
          getCandidateVoteCountsRank(item);
        });
      // return voters;
    } else {
      window.alert('DStorage contract not deployed to detected network.');
      return 'error';
    }
  };
  return (
    <>
      <div className="px-20 tracking-wider">
        <div className="mt-20 text-6xl text-grey font-bold">Voting</div>
        <div className="mt-5 text-6xl text-black font-semibold">Open Votes</div>

        <div className="mt-20 flex gap-28">
          <div
            className={`text-2xl font-semibold cursor-pointer ${
              method == 'Simple' ? 'underline underline-offset-8' : ''
            }`}
            onClick={() => setMethod('Simple')}
          >
            Simple Voting
          </div>
          <div
            className={`text-2xl font-semibold cursor-pointer ${
              method == 'Approval' ? 'underline underline-offset-8' : ''
            }`}
            onClick={() => setMethod('Approval')}
          >
            Approval Voting
          </div>
          <div
            className={`text-2xl font-semibold cursor-pointer ${
              method == 'Rank' ? 'underline underline-offset-8' : ''
            }`}
            onClick={() => setMethod('Rank')}
          >
            Rank Based Voting
          </div>
        </div>

        <div className="flex items-center justify-center w-max mx-auto bg-white shadow-md rounded-md mt-10 border-grey border-[0.05rem] px-5 py-2">
          <div className="flex items-center gap-5">
            <div className="text-black tracking-wider">Enter Key : </div>
            <input
              type="text"
              className="placeholder:text-[1.0rem] bg-w outline-none py-[0.5rem] px-4 border-gray-300 border-[0.08rem]"
              placeholder="Enter here"
              onChange={(e) => {
                setKey(e.target.value);
              }}
            />
          </div>
          <div className=" flex justify-center items-center ml-4">
            <div className="">
              <button
                className="px-5 py-2 bg-blue-500 text-white hover:bg-blue-400 text-lg rounded-full"
                onClick={() => {
                  switch (method) {
                    case 'Approval':
                      getApproval(key);
                      break;
                    case 'Rank':
                      getRank(key);
                      break;
                    case 'Simple':
                      getSimple(key);
                      break;

                    default:
                      break;
                  }
                }}
              >
                Enter
              </button>
            </div>
          </div>
        </div>

        <div className="flex mt-20">
          <div className="pl-4 uppercase text-sm tracking-widest text-black font-bold w-[25%]">
            Created By
          </div>
          <div className="uppercase text-sm tracking-widest text-black font-bold w-[50%]">
            Description
          </div>
          <div className="uppercase text-sm tracking-widest text-black font-bold w-[25%]">
            Expires
          </div>
        </div>
        <div className="mt-5 bg-w border-grey border-[0.05rem] rounded-md">
          {data.map((item, i) => {
            return (
              <div className="" key={i}>
                <div
                  className="flex py-5 items-center cursor-pointer hover:bg-gray-100"
                  onClick={() =>
                    handleOpen(`vote${i + 1}`, !vote[`vote${i + 1}`])
                  }
                >
                  <div className="pl-5 uppercase text-sm tracking-wide text-black font-medium w-[25%]">
                    {item.creater}
                  </div>
                  <div className="uppercase text-sm tracking-wide text-black font-medium w-[50%]">
                    {item.description}
                  </div>
                  <div className="uppercase text-sm tracking-wide text-black font-medium w-[15%] cursor-pointer">
                    {item.days}
                  </div>
                  <div className="cursor-pointer text-sm border-title text-title font-bold border-[0.05rem] px-4 py-[0.35rem]">
                    VOTE
                  </div>
                </div>
                {vote[`vote${i + 1}`] && (
                  <>
                    <div className="w-[75%] mx-auto my-5 shadow-lg bg-slate-100 rounded-md px-5 py-4">
                      <div className="flex justify-between">
                        <div className="text-[1.12rem] tracking-wider font-semibold text-title">
                          {item.method} Voting Method
                        </div>
                        <div className="text-[1.12rem] tracking-wider font-semibold">
                          Expires in 7 days
                        </div>
                      </div>
                      <div className="pl-10 my-3 text-lg text-black font-medium">
                        {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Integer non venenatis massa, quis gravida urna ? */}
                        {item.description}
                      </div>

                      {item.method == 'Approval' && (
                        <div className="pl-20">
                          <div className="grid grid-cols-2">
                            {item.candidates.map((c) => {
                              return (
                                <div className="flex gap-32 mt-4">
                                  <div className="text-lg font-semibold text-black">
                                    {c}{' '}
                                  </div>
                                  <div
                                    className="cursor-pointer text-sm border-ble bg-ble text-w rounded-md font-bold border-[0.05rem] px-4 py-[0.25rem]"
                                    onClick={() =>
                                      handleApprovalVote(
                                        item.id,
                                        c,
                                        defaultAccount[0]
                                      )
                                    }
                                  >
                                    VOTE
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      {item.method == 'Rank' && (
                        <div className="pl-20">
                          {item.candidates.map((i, index) => {
                            return (
                              <>
                                <div className="flex items-center gap-10 mt-4">
                                  <div className="text-lg font-semibold text-black mr-4">
                                    {i}{' '}
                                  </div>
                                  {(() => {
                                    let rows = [];
                                    for (let j = 1; j <= item.can; j++) {
                                      rows.push(
                                        <div className="tracking-wide font-extralight ">
                                          <input
                                            type="radio"
                                            id={`rank${index + 1}${j}`}
                                            name={i}
                                            value={`${j}`}
                                            checked={formData[i] === `${j}`}
                                            onChange={handleChange}
                                            className="mr-2 text-xl cursor-pointer"
                                          />
                                          <label
                                            htmlFor={`rank${index + 1}${j}`}
                                            className="text-lg cursor-pointer"
                                          >
                                            {j}
                                          </label>
                                        </div>
                                      );
                                    }
                                    return rows;
                                  })()}
                                </div>
                              </>
                            );
                          })}
                          <div
                            className="w-max mx-auto mt-2 cursor-pointer text-sm border-ble bg-ble text-w rounded-md font-bold border-[0.05rem] px-4 py-[0.25rem]"
                            onClick={() =>
                              handleRankVote(
                                item.id,
                                formData,
                                defaultAccount[0],
                                item
                              )
                            }
                          >
                            VOTE
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
                <div className="h-[0.1rem] bg-grey"></div>
              </div>
            );
          })}
          <div className=""></div>
        </div>
      </div>
    </>
  );
};

export default VotingPage;
