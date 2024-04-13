import axios from "axios";
import React, { useRef, useState } from "react";
import { toast } from 'react-toastify';

const UploadForm = () => {
  const [ruleFile, setRuleFile] = useState(null);
  const [docFile, setDocFile] = useState(null);
  const ruleInputRef = useRef(null);
  const docInputRef = useRef(null);

  const handleRuleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      setRuleFile(null);
      return;
    }
    setRuleFile(selectedFile);
  };

  const handleRuleFileUpload = async () => {
    const formData = new FormData();
    formData.append("file", ruleFile);

    try {
      console.log(process.env.SERVER_URI);
      const response = await axios.post(
        `http://127.0.0.1:8000/upload_rules`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      toast.success("File Uploaded Successfully. Rules will be available in 5 minutes");
      setRuleFile(null);
      ruleInputRef.current.value = null;
      console.log("File uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleDocFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      setDocFile(null);
      return;
    }
    setDocFile(selectedFile);
  };

  const handleDocFileUpload = async () => {
    const formData = new FormData();
    formData.append("file", docFile);

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/upload_company_documents`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      toast.success('File uploaded successfully');
      setDocFile(null);
      docInputRef.current.value = null;
      console.log("File uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-row gap-4 w-full">
        <div className="my-file-input">
          <input ref={ruleInputRef} type="file" onChange={handleRuleFileChange} />
        </div>

        <button
          className="text-white py-2 px-4 text-xl bg-orange-primary rounded-md w-4/12"
          onClick={handleRuleFileUpload}
        >
          Upload Rules
        </button>
      </div>
      <div className="flex flex-row gap-4 w-full">
        <div className="my-file-input">
          <input ref={docInputRef} type="file" onChange={handleDocFileChange} />
        </div>
        <button
          className="text-white py-2 px-4 text-xl bg-green-primary rounded-md w-4/12"
          onClick={handleDocFileUpload}
        >
          Upload Doc
        </button>
      </div>
    </div>
  );
};

export default UploadForm;
