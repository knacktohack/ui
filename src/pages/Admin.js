import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  const flaggedUsers = [
    {
      username: "adnan.khurshid@company.com",
      risk: "very high",
    },
    {
      username: "aditya.ganguly@company.com",
      risk: "high",
    },
    {
      username: "kabirraj.singh@company.com",
      risk: "high",
    },
    {
      username: "amartya.chakraborty@company.com",
      risk: "high",
    },
    {
      username: "amartya.chakraborty@company.com",
      risk: "high",
    },
  ];

  const notifications = [
    {
      id: 123,
      username: "aditya.ganguly@company.com",
      rule: 3,
      timestamp: "2024-04-12T09:30:00Z",
    },
    {
      id: 124,
      username: "john.doe@example.com",
      rule: 1,
      timestamp: "2024-04-11T15:45:00Z",
    },
    {
      id: 125,
      username: "jane.smith@example.com",
      rule: 2,
      timestamp: "2024-04-10T20:00:00Z",
    },
    {
      id: 126,
      username: "bob.johnson@example.com",
      rule: 3,
      timestamp: "2024-04-09T10:15:00Z",
    },
    {
      id: 127,
      username: "emma.watson@example.com",
      rule: 1,
      timestamp: "2024-04-08T18:20:00Z",
    },
  ];

  const queries = [
    {
      id: 123,
      username: "adnan.khurshid@company.com",
      heading: "How to send an email to someone without any trace",
      action: "blocked",
    },
    {
      id: 124,
      username: "john.doe@company.com",
      heading: "Anonymous Insider Trading guide",
      action: "blocked",
    },
    {
      id: 125,
      username: "jane.smith@company.com",
      heading: "Accessing the dark web safely",
      action: "sanitized",
    },
    {
      id: 126,
      username: "sam.jones@company.com",
      heading: "How to get personal details of another employee in my company",
      action: "blocked",
    },
    {
      id: 127,
      username: "emily.brown@company.com",
      heading: "Illegal streaming websites list",
      action: "blocked",
    },
  ];

  function calculateHoursDifference(timestamp) {
    const currentTime = new Date();
    const timestampDate = new Date(timestamp);
    const differenceInMilliseconds = currentTime - timestampDate;
    const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60); // Convert milliseconds to hours
    return Math.round(differenceInHours); // Round the result to the nearest hour
  }

  return (
    <div className="h-screen w-screen flex flex-col ">
      <div className="w-full bg-green-primary text-white text-2xl font-semibold tracking-wide flex flex-row justify-between items-center p-3 h-12  ">
        Dashboard
      </div>
      <div className="w-full p-4 flex flex-row h-full gap-8">
        <div className="w-4/12 flex flex-col gap-5 h-full">
          <div className="w-full flex flex-col h-3/6 bg-green-light rounded-md border-2 px-6 py-4 gap-2">
            <div className="flex flex-row justify-between items-center w-full text-2xl font-medium text-neutral-600 mb-3">
              <div>Flagged users</div>{" "}
              <div className="min-w-20 text-center">Risk</div>
            </div>
            {flaggedUsers.slice(0, 4).map((item, index) => (
              <div
                key={index}
                className="flex flex-row justify-between items-center w-full text-neutral-600"
              >
                <Link className="text-lg underline hover:text-orange-primary">
                  {item.username}
                </Link>
                <div
                  className={`capitalize ${
                    item.risk === "very high"
                      ? "text-red-600"
                      : item.risk === "high"
                      ? "text-orange-400"
                      : ""
                  } font-semibold  text-sm min-w-20 text-center tracking-wide`}
                >
                  {item.risk}
                </div>
              </div>
            ))}
            {flaggedUsers.length > 4 && (
              <div className="bg-orange-primary text-white text-xl max-w-fit mt-4 rounded-md p-4 py-2 tracking-wider">
                See All
              </div>
            )}
          </div>
          <div className="w-full flex flex-col h-3/6 bg-green-light rounded-md border-2 px-6 py-4 gap-2 ">
            <div className="flex flex-row justify-between items-center w-full text-2xl font-medium text-neutral-800 mb-3">
              <div>Notifications</div>{" "}
            </div>
            {notifications.slice(0, 4).map((item, index) => (
              <div
                key={index}
                className="flex flex-row justify-between items-center w-full text-neutral-600 "
              >
                <Link className=" hover:text-orange-primary">
                  Violation of Rule #{item.rule} by {item.username}
                </Link>
                <div>{calculateHoursDifference(item.timestamp)}h</div>
              </div>
            ))}
            {notifications.length > 4 && (
              <div className="bg-orange-primary text-white text-xl max-w-fit mt-4 rounded-md p-4 py-2 tracking-wider">
                See All
              </div>
            )}
          </div>
        </div>
        <div className="w-8/12 flex flex-col gap-5 h-full">
          <div className="w-full flex flex-col h-4/6 bg-green-light rounded-md border-2 px-6 py-4 gap-2">
            <div className="flex flex-row justify-between items-center w-full text-3xl font-medium text-neutral-600 mb-3">
              Recent Queries
            </div>
            <div className="flex flex-col gap-3 divide-y-2 divide-slate-300">
              {queries.slice(0, 4).map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row justify-between items-center"
                >
                  <div className="flex flex-col  overflow-ellipsis">
                    <div className=" underline cursor-pointer">
                      {item.heading}
                    </div>
                    <div>by {item.username}</div>
                  </div>
                  <div className="text-lg font-semibold italic text-red-600 capitalize">
                    {item.action}
                  </div>
                </div>
              ))}
            </div>
            {queries.length > 4 && (
              <div className="bg-orange-primary text-white text-xl max-w-fit mt-4 rounded-md p-4 py-2 tracking-wider">
                See All
              </div>
            )}
          </div>
          <div className="w-full flex flex-row h-2/6 justify-center items-center  border-2 px-6 py-4 gap-10 ">
            <div className="flex flex-col justify-evenly items-center w-4/12 gap-5">
              <button className="text-white py-2 px-4 text-xl bg-orange-primary rounded-md w-full">
                + Add New Rule
              </button>
              <button className="text-white py-2 px-4 text-xl bg-green-primary rounded-md w-full">
                Edit Existing Rules
              </button>
            </div>
            <div className="text-2xl font-semibold">OR</div>
            <div className="flex flex-col gap-4 w-full">
              <label class="w-full h-4/6 flex flex-col items-center px-4 py-4 bg-green-light text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer text-orange-primary hover:text-green-primary transition duration-200 ease-in-out">
                <svg
                  class="w-6 h-6"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span class="mt-2 leading-normal">Select a file</span>
                <input type="file" class="hidden" />
              </label>
              <button className="text-white py-2 px-4 text-xl bg-green-primary rounded-md w-full">
                + Add New Rule
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
