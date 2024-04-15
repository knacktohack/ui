import { Box, Modal } from "@mui/material";
import React, { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 12,
};
const NotifItem = (props) => {
  const item = props.item;
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className=" w-8/12 bg-green-light border-2 border-green-primary flex flex-col justify-start items-start h-4/6 gap-4 p-4 overflow-y-scroll  text-lg text-neutral-600 font-medium"
        >
          <div className="text-2xl font-semibold text-orange-primary self-center">
            Violation Details
          </div>
          <div>User Email : {item.user_email}</div>
          <div>Risk Score : {item.score}</div>
          <div>Violation Priority : {item.violation_priority}</div>
          <div>Violation Question : {item.violation_question}</div>
          <div>Organisation : {item.organization_name}</div>
        </Box>
      </Modal>
      <div
        onClick={() => {
          setOpen(true);
        }}
        className="w-full flex flex-row justify-between items-center bg-green-light border  p-4 text-lg font-medium text-neutral-700 cursor-pointer hover:bg-neutral-200"
      >
        <div className=" hover:text-orange-primary underline cursor-pointer">
          Violation by {item.user_email} of Priority {item.violation_priority}{" "}
          on {item.violation_question}
        </div>
        <div>{item.date}</div>
      </div>
    </>
  );
};

export default NotifItem;
