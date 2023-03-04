import React from "react";
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import img1 from "../assets/1.jpg";
const labels = ["January", "February", "March"];
const data = {
  labels: labels,
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(133, 105, 241)",
        "rgb(164, 101, 241)",
      ],
      borderColor: "black",
      data: [0, 10, 5, 2],
    },
  ],
};
const Results = () => {
  return (
    <>
      <h1>ELECTION RESULTS 2023</h1>
      <div className="grid grid-cols-2">
        <div>
          <Pie className="w-24" data={data}/>
        </div>
        <div className="grid grid-cols-3">
          <div className="max-w-sm rounded overflow-hidden">
            <img
              className="w-full rounded-full"
              src={img1}
              alt="img"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">John</div>
            </div>
          </div>
          <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img
              className="w-full rounded-full"
              src={img1}
              alt="Sunset in the mountains"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">John</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Results;
