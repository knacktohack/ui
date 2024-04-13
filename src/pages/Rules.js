import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";

const Rules = () => {
    
    const [rules,setRules]= useState([])

    const fetchRules = async ()=>{
        const obj = {
          
        }
        try {
            const response = await axios.post(
              `http://127.0.0.1:8000/questions`,
              obj,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            console.log(response.data);
            setRules(response.data)
          } catch (error) {
            console.error("Error fetching rules:", error);
          }
    }

    useEffect(() => {
        fetchRules()
      }, []);
    

  return (
    <div className="h-screen w-screen flex flex-col ">
      <AdminNav />
      
      <div className="flex flex-col gap-4 h-full p-4">
      <button className="text-white py-2 px-4 text-xl bg-orange-primary rounded-md w-2/12 self-end">
        + Add New Rule
      </button>
        {rules.map((item, index) => (
          <div key={index} className="w-full flex flex-row justify-between items-center bg-green-light border rounded-md p-4 text-lg font-medium text-neutral-700">
            {index + 1}
            {". "}
            {item.question}
            <div className="flex flex-row  gap-3 items-center justify-center">
              <select
                className="rounded-md h-10 cursor-pointer p-2 text-green-primary"
                name="rating"
                id="rating"
              >
                <option className=" text-green-primary" value="10">
                  10 (Very High)
                </option>
                <option className=" text-green-primary" value="9">
                  9 (Very High)
                </option>
                <option className=" text-green-primary" value="8">
                8 (High)
                </option>
                <option className=" text-green-primary" value="7">
                7 (High)
                </option>
                <option className=" text-green-primary" value="6">
                6 (Moderate)
                </option>
                <option className=" text-green-primary" value="5">
                5 (Moderate)
                </option>
              </select>
              <button className="p-4 py-1 text-white rounded-md text-center bg-orange-primary  00 cursor-pointer">
                Save
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rules;
