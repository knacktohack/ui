import { Box, Modal } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserDataById } from "../UserData";
import AdminNav from "../components/AdminNav";
import UploadForm from "../components/UploadForm";
import { backendUrl } from "../constants";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 12,
};

const Admin = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [openFileModal, setOpenFileModal] = useState(false);
  const handleCloseFileModal = () => setOpenFileModal(false);
  const [potentialThreats, setPotentialThreats] = useState([]);

  const [flaggedUsers, setFlaggedUsers] = useState([]);

  const [violations, setViolations] = useState([]);

  const [ruleFiles, setRuleFiles] = useState([]);
  const [dataFiles, setDataFiles] = useState([]);

  useEffect(() => {
    // Define an asynchronous function inside the useEffect hook
    async function fetchPotentialThreats() {
      try {
        // Axios POST request to fetch potential threats
        const response = await axios.post(
          `${backendUrl}/potential_violations`,
          {}
        );

        setPotentialThreats(response.data);
      } catch (error) {
        // Handle error
        console.error("Error fetching potential threats:", error);
      }
    }

    async function fetchFlaggedUsers() {
      try {
        const response = await axios.get(`${backendUrl}/get_risk`);
        const data = response.data;
        const users = [];

        data.forEach((item) => {
          const user = getUserDataById(item.user_id);
          if (user) {
            user.severity_score = item.severity_score;
            if (item.severity_score >= 8) user.risk = "very high";
            else user.risk = "high";
            users.push(user);
          }
        });
        setFlaggedUsers(users);
      } catch (error) {
        // Handle error
        console.error("Error fetching potential flagged users:", error);
      }
    }

    async function fetchViolations() {
      try {
        const response = await axios.get(`${backendUrl}/get_violations`);
        const data = response.data;
        data.forEach((item) => {
          const user = getUserDataById(String(item.user_id));
          if (user) {
            item.user_email = user.user_email;
          }
        });
        setViolations(data);
        console.log(data);
      } catch (error) {
        // Handle error
        console.error("Error fetching potential flagged users:", error);
      }
    }

    async function fetchRulesFiles() {
      try {
        const response = await axios.post(
          `${backendUrl}/rules_files`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = response.data;
        setRuleFiles(data);
        console.log(data);
      } catch (error) {
        // Handle error
        console.error("Error fetching Rules Files:", error);
      }
    }
    async function fetchDataFiles() {
      try {
        const response = await axios.post(
          `${backendUrl}/data_files`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = response.data;
        setDataFiles(data);
        console.log(data);
      } catch (error) {
        // Handle error
        console.error("Error fetching Rules Files:", error);
      }
    }

    // Call the asynchronous function
    fetchPotentialThreats();
    fetchFlaggedUsers();
    fetchViolations();
    fetchDataFiles();
    fetchRulesFiles();
  }, []);
  useEffect(() => {
    console.log(potentialThreats);
  }, [potentialThreats]);

  const handleViolation = async (id, accepted) => {
    try {
      // Send a POST request to handle the potential violation
      const resp = await axios.post(
        `${backendUrl}/handle_potential_violation`,
        {
          id: id,
          accepted: accepted,
        }
      );

      // Update the state or perform any other necessary actions
      console.log(resp);
      setPotentialThreats((prevThreats) =>
        prevThreats.filter((threat) => threat.id !== id)
      );
      console.log(
        `Potential violation ${accepted ? "added" : "deleted"} successfully.`
      );
    } catch (error) {
      // Handle error
      console.error("Error handling potential violation:", error);
    }
  };

  function calculateHoursDifference(timestamp) {
    const currentTime = new Date();
    const timestampDate = new Date(timestamp);
    const differenceInMilliseconds = currentTime - timestampDate;
    const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60); // Convert milliseconds to hours
    return Math.round(differenceInHours); // Round the result to the nearest hour
  }

  return (
    <div className="h-screen w-screen flex flex-col ">
      <AdminNav header={"Dashboard"} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className=" w-8/12 bg-green-light border-2 border-green-primary flex flex-col justify-start items-start h-4/6 gap-4 p-4 overflow-y-scroll rounded-lg"
        >
          {flaggedUsers.map((item, index) => (
            <div
              key={index}
              className="flex flex-row justify-between items-center w-full text-neutral-600"
            >
              <Link className="text-lg underline hover:text-orange-primary">
                {item.user_email}
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
        </Box>
      </Modal>
      <Modal
        open={openFileModal}
        onClose={handleCloseFileModal}
        aria-labelledby="modal-modal-title2"
        aria-describedby="modal-modal-description2"
      >
        <Box
          sx={style}
          className=" w-8/12 bg-green-light border-2 text-neutral-600 border-green-primary flex flex-col justify-start items-start h-4/6 gap-4 p-4 overflow-y-scroll overflow-x-hidden rounded-lg"
        >
          {ruleFiles.length && <div className="text-2xl font-semibold">Rules Files</div>}
          {ruleFiles.map((item, index) => (
            <div className="flex flex-row justify-between items-center gap-10 w-full border-2 border-green-primary rounded-md p-2">
              <div className="text-lg font-semibold">Filename : {item.file_name}</div>
              <Link className="px-4 py-1 bg-orange-primary text-white text-lg rounded-md" to={item.url} >Download</Link>
            </div>
          ))}
          {dataFiles.length>0 && <div className="text-2xl font-semibold">Data Files</div>}
          {dataFiles.map((item, index) => (
            <div className="flex flex-row justify-between items-center gap-10 w-full border-2 border-green-primary rounded-md p-2">
              <div className="text-lg font-semibold">Filename : {item.file_name}</div>
              <Link className="px-4 py-1 bg-orange-primary text-white text-lg rounded-md" to={item.url} >Download</Link>
            </div>
          ))}
        </Box>
      </Modal>
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
                  {item.user_email}
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
              <div
                onClick={() => {
                  setOpen(true);
                }}
                className="bg-orange-primary text-white text-xl max-w-fit mt-4 rounded-md p-4 py-2 tracking-wider"
              >
                See All
              </div>
            )}
          </div>
          <div className="w-full flex flex-col h-3/6 bg-green-light rounded-md border-2 px-6 py-4 gap-2 ">
            <div className="flex flex-row justify-between items-center w-full text-2xl font-medium text-neutral-800 mb-3">
              <div>Notifications</div>{" "}
            </div>
            {violations.slice(0, 4).map((item, index) => (
              <div
                key={item.id}
                className="flex flex-row justify-between items-center w-full text-neutral-600 "
              >
                <Link
                  to={"/notifications"}
                  className=" hover:text-orange-primary underline cursor-pointer truncate"
                >
                  Violation by {item.user_email} of Priority{" "}
                  {item.violation_priority} on {item.violation_question}
                </Link>
              </div>
            ))}
            {violations.length > 4 && (
              <Link
                to="/notifications"
                className="bg-orange-primary text-white text-xl max-w-fit mt-4 rounded-md p-4 py-2 tracking-wider"
              >
                See All
              </Link>
            )}
          </div>
        </div>
        <div className="w-8/12 flex flex-col gap-5 h-full">
          <div className="w-full flex flex-col h-4/6 bg-green-light rounded-md border-2 px-6 py-4 gap-2">
            <div className="flex flex-row justify-between items-center w-full text-3xl font-medium text-neutral-600 mb-3">
              Recent Potential Threats
            </div>
            <div className="flex flex-col gap-3">
              {potentialThreats.slice(0, 4).map((item, index) => (
                <div
                  key={item.id}
                  className="flex flex-row justify-between items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300"
                >
                  <div className="flex flex-col flex-grow overflow-hidden">
                    <div className="text-lg font-semibold text-gray-900 mb-1">
                      {item.question_name}
                    </div>
                    <div className="text-sm text-gray-500 mb-2">
                      {item.prompt}
                    </div>
                    <div className="text-lg font-semibold italic text-red-600 capitalize">
                      Score: {item.score}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                      onClick={() => handleViolation(item.id, "true")}
                    >
                      Add
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                      onClick={() => handleViolation(item.id, "false")}
                    >
                      Ignore
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {potentialThreats.length > 4 && (
              <div className="bg-orange-primary text-white text-xl max-w-fit mt-4 rounded-md p-4 py-2 tracking-wider">
                See All
              </div>
            )}
          </div>
          <div className="w-full flex flex-row h-2/6 justify-center items-center  border-2 px-6 py-4 gap-10 ">
            <div className="flex flex-col justify-evenly items-center w-4/12 gap-5">
              <Link
                to={"/admin/rules"}
                className="text-white py-2 px-4 text-xl bg-green-primary rounded-md w-full text-center"
              >
                Edit Rules
              </Link>
              <button onClick={()=>{setOpenFileModal(true)}} className="text-white py-2 px-4 text-xl bg-orange-primary rounded-md w-full text-center">
                Preview Files
              </button>
            </div>
            <div className="text-2xl font-semibold">OR</div>
            <UploadForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
