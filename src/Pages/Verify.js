import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Verify = ({ connect, defaultAccount }) => {
  const [step, setStep] = useState(0);
  const [can, setCan] = useState(0);
  const [formData, setFormData] = useState({});
  const [email, setEmail] = useState('');
  const [pan, setPan] = useState('');
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoad(true);

    const options = {
      method: 'POST',
      url: 'https://pan-card-verification1.p.rapidapi.com/v3/tasks/sync/verify_with_source/ind_pan',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '15b6349dcemsh9d506902b260d0fp1b6792jsna64ed0116bd9',
        'X-RapidAPI-Host': 'pan-card-verification1.p.rapidapi.com',
      },
      data: `{"task_id":"74f4c926-250c-43ca-9c53-453e87ceacd1","group_id":"8e16424a-58fc-4ba4-ab20-5bc8e7c3c41e","data":{"id_number":"${pan}"}}`,
    };
    // axios.request(options).then(function (response) {
    //   // console.log(response.data);
    // });
    createacc();
  };
  async function createacc() {
    try {
      let result = await fetch('http://jenilsavla.pythonanywhere.com/signup/', {
        method: 'POST',
        body: JSON.stringify({
          password: '12345678',
          email: email,
          pan: pan,
          address: JSON.stringify(defaultAccount),
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      result = await result.json();
      console.log(result);
      // if (result.token) {
      //   // Swal.fire("Logged in Successfully!", "success", "success");
      //   // sessionStorage.setItem('name', result.user.username);
      //   // sessionStorage.setItem('user_id', JSON.parse(JSON.stringify(result.user.id)));
      //   sessionStorage.setItem("token", result.token);
      //   console.log("yess")
      //   // history("/")
      // } else {
      //   // Swal.fire("Oops!!", "Some error while login", "error");
      //   console.log("error");
      // }
      if (result.success == true) {
        window.alert('Verified Successfully!!');
        navigate('/');
      } else {
        window.alert('Invaild Credentials');
      }
    } catch (error) {
      console.log('Error' + error);
      window.alert('Invaild Credentials');
    }
    setLoad(false);
  }

  return (
    <>
      {step == 0 && (
        <div className="mt-32 border-[0.02rem] border-gray-300 w-[65%] mx-auto shadow">
          <div className="bg-grey flex justify-between w-full px-5 py-3">
            <div className="flex">
              <div className="w-7 h-7 text-lg text-center rounded-full bg-white text-orange -pl-2">
                1
              </div>
              <div className="font-medium text-xl ml-5 w-max text-orange">
                Create Poll
              </div>
            </div>
          </div>
          <div className=" px-5 py-2">
            <div className="mt-4 mb-4 flex justify-center">
              <div className="">
                <button
                  className="px-5 py-1 bg-blue-500 text-white hover:bg-blue-400 text-lg rounded-full"
                  onClick={() => connect()}
                >
                  Connect to MetaMask
                </button>
              </div>
            </div>
            <div className="mt-5 text-[1.0rem] text-center">
              Account Number: {defaultAccount}
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
        <div className="mt-32 border-[0.02rem] border-gray-300 w-[65%] mx-auto shadow-xl">
          <div className="bg-grey flex justify-between w-full px-5 py-3">
            <div className="flex">
              <div className="w-7 h-7 text-lg text-center rounded-full bg-white text-orange -pl-2">
                1
              </div>
              <div className="font-medium text-xl ml-5 w-max text-orange">
                Verify your identify
              </div>
            </div>
          </div>
          <div className=" px-5 py-2">
            <form>
              <div className="flex items-center gap-10 mt-5">
                <div className="text-black tracking-wider w-[18%]">
                  Email :{' '}
                </div>
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="placeholder:text-[1.0rem] bg-w outline-none py-[0.5rem] w-[70%] px-4 mt-2 border-gray-300 border-[0.08rem]"
                  placeholder="Enter here"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="flex items-center gap-10 mt-5">
                <div className="text-black tracking-wider  w-[18%]">
                  PanCard Number:{' '}
                </div>
                <input
                  type="text"
                  name="password"
                  id="password"
                  className="placeholder:text-[1.0rem] bg-w outline-none py-[0.5rem] w-[70%] px-4 mt-2 border-gray-300 border-[0.08rem]"
                  // placeholder="Enter here"
                  placeholder="AAAAA1234A"
                  onChange={(e) => setPan(e.target.value)}
                  value={pan}
                />
              </div>
              <div className="mt-4 mb-4 flex justify-center">
                <div className="">
                  <button
                    // type="submit"
                    className="px-5 py-2 flex items-center bg-blue-500 text-white hover:bg-blue-400 text-lg rounded-full"
                    onClick={(e) => handleSubmit(e)}
                  >
                    {load && (
                      <svg
                        class="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          class="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          // strokeWidth="4"
                        ></circle>
                        <path
                          class="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    )}
                    {load ? 'Verifiying...' : 'Verified'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Verify;
