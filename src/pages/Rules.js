import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminNav from "../components/AdminNav";
import { backendUrl } from "../constants";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 12,
};

const Rules = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [rules, setRules] = useState([]);
  const [addingRule, setAddingRule] = useState(false);
  const [newRule, setNewRule] = useState("");
  const [question, setQuestion] = useState(null);
  const [sampleQuestions, setSampleQuestions] = useState([]);
  const [newSampleQuestion, setNewSampleQuestion] = useState("");
  const [addQuestion, setAddQuestion] = useState(false);

  const handleModal = (ques) => {
    setOpen(true);
    setQuestion(ques);

    rules.forEach((rule) => {
      console.log(rule);
      if (rule.question === ques) {
        setSampleQuestions(rule.sample_questions);
        return;
      }
    });
  };

  const fetchRules = async () => {
    const obj = {};
    try {
      const response = await axios.post(`${backendUrl}/questions`, obj, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      setRules(response.data);
    } catch (error) {
      console.error("Error fetching rules:", error);
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  async function deleteQuestion(event) {
    const questionName = event.target.getAttribute("question");
    console.log(questionName);
    const obj = {
      question: questionName,
    };

    try {
      const response = await axios.post(`${backendUrl}/questions_delete`, obj, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);
      if (response.status === 200) {
        const filteredRules = rules.filter(
          (item) => item.question !== questionName
        );
        setRules(filteredRules);
        toast.success("Question deleted successfully");
      }
    } catch (error) {
      console.error("Error fetching rules:", error);
    }
  }

  async function updateRules(event) {
    const questionId = event.target.id;
    const rating = event.target.previousElementSibling.value;
    const obj = {
      id: questionId,
      priority: rating,
    };

    console.log(obj);

    try {
      const response = await axios.put(`${backendUrl}/questions_update`, obj, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);
      if (response.status === 200) {
        toast.success("Question updated successfully");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const addQuestionPost = async ()=>  {
    const obj = {
      'question': question,
      'sample_question':newSampleQuestion
    };

    try{
      const response = await axios.post(`${backendUrl}/sample_question`, obj, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success(response.data.message);
    }
    catch(err){
      toast.error(err)
    }

  }

  async function addRule() {
    const obj = {
      rule: newRule,
    };

    try {
      const response = await axios.post(`${backendUrl}/rules_add`, obj, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);
      if (response.status === 200) {
        //check if response.data is empty list or dict

        if (response.data.length === 0) {
          toast.error("No rule was generated");
          return;
        }

        toast.success("Rules are added, they will be reflected shortly.");
        setNewRule("");
        let changedRules = rules;
        //merge two arrays rules, response.data both are arrays

        changedRules = changedRules.concat(response.data);
        setRules(changedRules);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="h-screen w-screen flex flex-col ">
      <AdminNav header={"Rules"}/>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className=" w-8/12 bg-green-light border-2 border-green-primary flex flex-col justify-start items-start h-4/6 gap-4 p-4 overflow-y-scroll "
        >
          <button
            onClick={async () => {
              const temp = !addQuestion;

              if (addQuestion && newSampleQuestion !== "") {
                await addQuestionPost()
                console.log(sampleQuestions)
                setSampleQuestions((prev)=>[...prev,newSampleQuestion])
              }
              setAddQuestion(temp);
            }}
            className="p-4 py-1 text-white  text-center bg-orange-primary  cursor-pointer"
          >
            {addQuestion
              ? newSampleQuestion === ""
                ? "Cancel"
                : "Save"
              : "Add Question"}
          </button>
          {addQuestion && (
            <input
              className=" px-3 py-2 bg-gray-100 w-full"
              placeholder="Enter your new question here..."
              onChange={(e) => setNewSampleQuestion(e.target.value)}
            ></input>
          )}
          {sampleQuestions.map((item, index) => (
            <div key={index} className="text-lg border">
              {index + 1}. {item}
            </div>
          ))}
        </Box>
      </Modal>
      <div className="flex flex-col gap-4 h-full p-4">
        <button
          className="text-white py-2 px-4 text-xl bg-orange-primary  w-2/12 self-end"
          onClick={async () => {
            const temp = !addingRule;

            if (addingRule && newRule !== "") {
              await addRule();
            }
            setAddingRule(temp);
          }}
        >
          {console.log(newRule)}
          {addingRule ? (newRule === "" ? "Cancel" : "Save") : "Add Rule"}
        </button>

        {addingRule && (
          <div className="flex flex-col gap-2">
            {/* Your nice textbox goes here */}
            <textarea
              className=" h-20 p-4 bg-gray-100"
              placeholder="Enter your new rule here..."
              onChange={(e) => setNewRule(e.target.value)}
            ></textarea>
          </div>
        )}
        {rules.map((item, index) => (
          <div
            key={index}
            className="w-full flex flex-row justify-between items-center bg-green-light border  p-4 text-lg font-medium text-neutral-700"
          >
            {index + 1}
            {". "}
            {item.question}

            <div className="flex flex-row  gap-3 items-center justify-center">
              <button
                onClick={() => {
                  handleModal(item.question);
                }}
                className="text-white mr-4  bg-green-primary px-4 py-1 "
              >
                See Sample Questions
              </button>
              <select
                className=" h-10 cursor-pointer p-2 text-green-primary"
                name="rating"
                id="rating"
                defaultValue={item.priority}
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
                  7 (Moderate)
                </option>
                <option className=" text-green-primary" value="6">
                  6 (Moderate)
                </option>
                <option className=" text-green-primary" value="5">
                  5 (Moderate)
                </option>
              </select>
              <button
                className="p-4 py-1 text-white  text-center bg-orange-primary  00 cursor-pointer"
                id={item.id}
                onClick={updateRules}
              >
                Save
              </button>
              <button
                className="p-4 py-1 text-white  text-center bg-orange-primary  00 cursor-pointer"
                question={item.question}
                onClick={deleteQuestion}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rules;
