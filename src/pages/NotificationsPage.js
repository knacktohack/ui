import axios from "axios";
import React, { useEffect, useState } from "react";
import { getUserDataById } from "../UserData";
import AdminNav from "../components/AdminNav";
import NotifItem from "../components/NotifItem";
import { backendUrl } from "../constants";

const NotificationsPage = () => {
  const [violations, setViolations] = useState([]);

  useEffect(() => {
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
        setViolations(data.reverse());
        console.log(data);
      } catch (error) {
        // Handle error
        console.error("Error fetching potential flagged users:", error);
      }
    }

    fetchViolations();
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col ">
      <AdminNav header={"Notifications"} />
      <div className="flex flex-col gap-4 h-full p-4">
        {violations.map((item, index) => (
          <NotifItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
