import React, { useContext } from "react";
import { userData } from "../UserData";
import userContext from "../contexts/UserContext";

const SelectUser = () => {
  const { setUser } = useContext(userContext);

  const handleUserChange = (event) => {
    const selectedUserEmail = event.target.value;
    const selectedUser = userData.find((item) => item.user_email === selectedUserEmail);
    setUser(selectedUser);
    console.log(selectedUser)
  };

  return (
    <select
      className="rounded-md h-10 cursor-pointer p-2 text-white bg-orange-primary"
      name="userSelect"
      id="userSelect"
      onChange={handleUserChange}
    >
      {userData.map((item, index) => (
        <option className="text-green-primary bg-white" key={item.id} value={item.id}>
          {item.user_email}
        </option>
      ))}
    </select>
  );
};

export default SelectUser;
