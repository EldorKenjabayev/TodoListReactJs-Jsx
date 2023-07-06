import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Draggable from "react-draggable";
import randomColor from "randomcolor";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditModal({
  open,
  editTodo,
  setOpen,
  items,
  setItems,
}) {
  const [newTodo, setNewTodo] = useState("");
  const [newUser, setNewUser] = useState("");

  const handleClose = () => {
    setOpen(false);

    let filtered = items.map((item) => {
      if (item.id === editTodo.id) {
        let newItem = {
          id: item.id,
          name: newUser !== "" ? newUser : editTodo.name,
          todo: newTodo !== "" ? newTodo : editTodo.todo,
          color: item.color,
          position: item.position,
          newUser: newUser !== "" ? newUser : editTodo.newUser,
          createdAt: new Date().toLocaleTimeString(),
        };

        return newItem;
      }

      return item;
    });

    setItems(filtered);
    setNewTodo("");
    setNewUser("");

    console.log(filtered);
  };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            id="standard-basic"
            label="write your name"
            variant="standard"
            onChange={(e) => setNewUser(e.target.value)}
            sx={{
              width: "430px",
              marginBottom: "20px",
            }}
          />
          <TextField
            id="standard-basic"
            label="todo"
            variant="standard"
            defaultValue={editTodo.todo}
            onChange={(e) => setNewTodo(e.target.value)}
            sx={{
              width: "430px",
              marginBottom: "20px",
            }}
          />

          <Button
            variant="contained"
            sx={{ width: "430px", backgroundColor: "#424141" }}
            onClick={handleClose}
          >
            Add todo
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
