import React from 'react';
import Chart from 'chart.js/auto';
import { Pie } from 'react-chartjs-2';
import img1 from '../assets/1.jpg';
const labels = ['January', 'February', 'March'];
const data = {
  labels: labels,
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(133, 105, 241)',
        'rgb(164, 101, 241)',
      ],
      borderColor: 'black',
      data: [0, 10, 5, 2],
    },
  ],
};
const Results = () => {
  return (
    <>
      <div className="px-20">
        <div className="mt-20 text-6xl text-grey font-bold tracking-wider">
          ELECTION RESULTS 2023
        </div>
        <div className="grid grid-cols-2 mt-10 w-[85%] mx-auto gap-12">
          <div>
            <Pie className="" data={data} />
          </div>
          <div className="flex justify-between">
            <div className=" rounded">
              <img className="w-40 rounded-full" src={img1} alt="img" />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">John</div>
              </div>
            </div>
            <div className="">
              <img className="w-40 rounded-full" src={img1} alt="img" />
              <div className="font-bold text-xl">John</div>
            </div>
          </div>
          <div className=" rounded">
            <img className="w-40 rounded-full" src={img1} alt="img" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">John</div>
            </div>
          </div>
          <div className=" rounded">
            <img className="w-40 rounded-full" src={img1} alt="img" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl">John</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Results;
