import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const Poll = ({ createPoll, defaultAccount }) => {
  const [step, setStep] = useState(0);
  const [can, setCan] = useState(0);
  const [voter, setVoter] = useState(1);
  const [method, setMethod] = useState('Simple');
  const [res, setRes] = useState();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  function handleValue(name, value) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
    // console.log(formData);
  }

  // const handlePayment = useCallback(async () => {
  //   fetch('http://localhost:3001/donate', {
  //     method: 'POST',
  //     body: JSON.stringify({ amount: method }),
  //   })
  //     .then((results) => results.json())
  //     .then((data) => {
  //       const res = data;
  //       setRes(res);
  //       // console.log(res);
  //       // setBlog([...res]);
  //       console.log(res);

  //       const options = {
  //         key: 'rzp_test_71ifT7shoxSTLN',
  //         amount: method,
  //         currency: 'INR',
  //         name: 'Sainik Suvidha',
  //         description: 'Donate your amount',
  //         image: 'https://example.com/your_logo',
  //         order_id: res.op.id,
  //         handler: (res) => {
  //           console.log(res);
  //           navigate('/success');
  //         },
  //         prefill: {
  //           name: 'Piyush Garg',
  //           email: 'youremail@example.com',
  //           contact: '9999999999',
  //         },
  //         notes: {
  //           address: 'Razorpay Corporate Office',
  //         },
  //         theme: {
  //           color: '#3399cc',
  //         },
  //       };

  //       const rzpay = new Razorpay(options);
  //       rzpay.open();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  //   // console.log(res);
  // }, [Razorpay]);

  return (
    <>
      {step == 0 && (
        <div className="mt-32 border-[0.02rem] border-gray-300 w-[65%] mx-auto shadow-xl">
          <div className="bg-grey flex justify-between w-full px-5 py-3">
            <div className="flex">
              <div className="w-7 h-7 text-lg text-center rounded-full bg-white text-orange -pl-2">
                1
              </div>
              <div className="font-medium text-xl ml-5 w-max text-orange">
                Votting Information
              </div>
            </div>
          </div>
          <div className=" px-5 py-2">
            <div className="mt-5 text-[1.0rem]">
              {/* To support the concern and sentiments of spirited citizens like
              you Indian Army is operating two accounts viz Army Central Welfare
              Fund and Army Battle Casualties Welfare Fund, which accepts
              donation / contribution, for serving and retired soldiers and
              their families */}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              non venenatis massa, quis gravida urna. Aliquam non diam blandit,
              varius eros ac, ullamcorper ipsum.Sed consequat scelerisque orci
              et laoreet. Duis lobortis congue mi a dapibus proin eget magna
              commodo.
            </div>
            <div className="flex items-center gap-10 mt-5">
              <div className="text-black tracking-wider w-[18%]">
                System Name :{' '}
              </div>
              <input
                type="text"
                className="placeholder:text-[1.0rem] bg-w outline-none py-[0.5rem] w-[70%] px-4 mt-2 border-gray-300 border-[0.08rem]"
                placeholder="Enter here"
                onChange={(e) => handleValue('systemName', e.target.value)}
              />
            </div>
            <div className="flex items-center gap-10 mt-5">
              <div className="text-black tracking-wider  w-[18%]">
                Election Helder Name :{' '}
              </div>
              <input
                type="text"
                className="placeholder:text-[1.0rem] bg-w outline-none py-[0.5rem] w-[70%] px-4 mt-2 border-gray-300 border-[0.08rem]"
                placeholder="Enter here"
                onChange={(e) =>
                  handleValue('electionHelderName', e.target.value)
                }
              />
            </div>
            <div className="flex items-center gap-10 mt-5">
              <div className="text-black tracking-wider  w-[18%]">
                Description :{' '}
              </div>
              <input
                type="text"
                className="placeholder:text-[1.0rem] bg-w outline-none py-[0.5rem] w-[70%] px-4 mt-2 border-gray-300 border-[0.08rem]"
                placeholder="Enter here"
                onChange={(e) => handleValue('description', e.target.value)}
              />
            </div>
            <div className="flex items-center gap-10 mt-5">
              <div className="text-black tracking-wider w-[18%]">
                Number of Candidates :{' '}
              </div>
              <input
                type="text"
                className="placeholder:text-[1.0rem] bg-w outline-none py-[0.5rem] w-[70%] px-4 mt-2 border-gray-300 border-[0.08rem]"
                placeholder="0"
                onChange={(e) => setCan(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-10 mt-5">
              <div className="text-black tracking-wider w-[18%]">
                Number of Minutes :{' '}
              </div>
              <input
                type="text"
                className="placeholder:text-[1.0rem] bg-w outline-none py-[0.5rem] w-[70%] px-4 mt-2 border-gray-300 border-[0.08rem]"
                placeholder="Enter minutes"
                onChange={(e) => handleValue('minutes', e.target.value)}
              />
            </div>
            <div className="flex items-center gap-10 mt-5">
              <div className="text-black tracking-wider w-[18%]">
                Unique Id :{' '}
              </div>
              <input
                type="text"
                className="placeholder:text-[1.0rem] bg-w outline-none py-[0.5rem] w-[70%] px-4 mt-2 border-gray-300 border-[0.08rem]"
                placeholder="Enter here"
                onChange={(e) => handleValue('id', e.target.value)}
              />
            </div>
            <div className="mt-4 mb-4 flex justify-end">
              <div className="">
                <button
                  className="px-5 py-2 bg-blue-500 text-white hover:bg-blue-400 text-lg rounded-full"
                  onClick={() => setStep(1)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {step == 1 && (
        <div className="mt-32 border-[0.02rem] border-gray-300 w-[65%] mx-auto shadow">
          <div className="bg-grey flex justify-between w-full px-5 py-3">
            <div className="flex">
              <div className="w-7 h-7 text-lg text-center rounded-full bg-white text-orange -pl-2">
                2
              </div>
              <div className="font-medium text-xl ml-5 w-max text-orange">
                Add Candidates Details
              </div>
            </div>
          </div>
          <div className=" px-5 py-2">
            <div className="mt-5 text-[1.0rem]">
              {/* Invoice will be sent to this phone number. */}
            </div>
            {(() => {
              let rows = [];
              for (let i = 0; i < can; i++) {
                rows.push(
                  <div className="flex items-center gap-10 mt-5" key={i}>
                    <div className="text-black tracking-wider">
                      Candidate Name {i + 1} :{' '}
                    </div>
                    <input
                      type="text"
                      className="placeholder:text-[1.0rem] bg-w outline-none py-[0.5rem] w-[70%] px-4 mt-2 border-gray-300 border-[0.08rem]"
                      placeholder="Enter here"
                      onChange={(e) =>
                        handleValue(`candidate${i + 1}`, e.target.value)
                      }
                    />
                  </div>
                );
              }
              return rows;
            })()}

            <div className="mt-4 mb-4 flex justify-end">
              <div className="">
                <button
                  className="px-5 py-1 bg-blue-500 text-white hover:bg-blue-400 text-lg rounded-full"
                  onClick={() => setStep(2)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {step == 2 && (
        <div className="mt-32 border-[0.02rem] border-gray-300 w-[65%] mx-auto shadow">
          <div className="bg-grey flex justify-between w-full px-5 py-3">
            <div className="flex">
              <div className="w-7 h-7 text-lg text-center rounded-full bg-white text-orange -pl-2">
                3
              </div>
              <div className="font-medium text-xl ml-5 w-max text-orange">
                Add Voters Details
              </div>
            </div>
          </div>
          <div className=" px-5 py-2">
            <div className="mt-5 text-[1.0rem]">
              {/* Invoice will be sent to this phone number. */}
            </div>
            {(() => {
              let rows = [];
              for (let i = 0; i < voter; i++) {
                rows.push(
                  <div className="flex items-center gap-10 mt-5" key={i}>
                    <div className="text-black tracking-wider">
                      Voter {i + 1} :{' '}
                    </div>
                    <input
                      type="text"
                      className="placeholder:text-[1.0rem] bg-w outline-none py-[0.5rem] w-[70%] px-4 mt-2 border-gray-300 border-[0.08rem]"
                      placeholder="Enter here"
                      onChange={(e) =>
                        handleValue(`voter${i + 1}`, e.target.value)
                      }
                    />
                  </div>
                );
              }
              return rows;
            })()}
            <div
              className="mt-5 cursor-pointer mx-auto border-title border-[0.09rem] text-title font-semibold py-2 px-4 rounded-md w-max"
              onClick={() => setVoter((prev) => prev + 1)}
            >
              Add +
            </div>
            <div className="mt-4 mb-4 flex justify-end">
              <div className="">
                <button
                  className="px-5 py-1 bg-blue-500 text-white hover:bg-blue-400 text-lg rounded-full"
                  onClick={() => setStep(3)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {step == 3 && (
        <div className="mt-32 border-[0.02rem] border-gray-300 w-[65%] mx-auto shadow">
          <div className="bg-grey flex justify-between w-full px-5 py-3">
            <div className="flex">
              <div className="w-7 h-7 text-lg text-center rounded-full bg-white text-orange -pl-2">
                4
              </div>
              <div className="font-medium text-xl ml-5 w-max text-orange">
                Create Poll
              </div>
            </div>
          </div>
          <div className=" px-5 py-2">
            <div className="mt-5 text-[1.0rem] text-center">
              {/* Invoice will be sent to this email address. */}
              {/* Thankyou for support us with{' '} */}
              Aliquam non diam blandit ipsum.
              {/* <span className="font-medium"> {method}</span> */}
            </div>
            <div className="mt-2 text-[1.0rem] text-center">
              {/* This amount will be charged once from your payment method. Your
              invoice will be sent to */}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              non venenatis massa
            </div>
            {/* <div className="mt-2 text-[1.0rem] text-center">
              registered phone number
            </div> */}
            <div className="font-medium text-[1rem] mt-7">
              Select Votting Method
            </div>
            <div className="grid grid-cols-4 gap-20 mt-4">
              <div
                className={`cursor-pointer text-center border-gray-300 rounded-md border-[0.09rem] text-[1rem] py-[0.5rem] ${
                  method == 'Simple'
                    ? 'bg-blue-400 text-white hover:bg-blue-400'
                    : 'hover:bg-slate-50'
                }`}
                onClick={() => setMethod('Simple')}
              >
                Simple
              </div>
              <div
                className={`cursor-pointer text-center border-gray-300 rounded-md border-[0.09rem] text-[1rem] py-[0.5rem] ${
                  method == 'Approval'
                    ? 'bg-blue-400 text-white hover:bg-blue-400'
                    : 'hover:bg-slate-50'
                }`}
                onClick={() => setMethod('Approval')}
              >
                Approval
              </div>
              <div
                className={`cursor-pointer text-center border-gray-300 rounded-md border-[0.09rem] text-[1rem] py-[0.5rem] ${
                  method == 'Rank'
                    ? 'bg-blue-400 text-white hover:bg-blue-400'
                    : 'hover:bg-slate-50'
                }`}
                onClick={() => setMethod('Rank')}
              >
                Rank
              </div>
              <div
                className={`cursor-pointer text-center border-gray-300 rounded-md border-[0.09rem]  text-[1rem] py-[0.5rem] ${
                  method == 'Quadratic'
                    ? 'bg-blue-400 text-white'
                    : 'hover:bg-slate-50'
                }`}
                onClick={() => setMethod('Quadratic')}
              >
                Quadratic
              </div>
            </div>
            <div className="mt-4 mb-4 flex justify-center">
              <div className="">
                <button
                  className="px-5 py-1 bg-blue-500 text-white hover:bg-blue-400 text-lg rounded-full"
                  onClick={() => {
                    const data = { ...formData, method, can, voter };
                    createPoll(data, defaultAccount);
                  }}
                >
                  Create Poll
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
