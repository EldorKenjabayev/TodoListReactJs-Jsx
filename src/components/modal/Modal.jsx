import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

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

export default function BasicModal({ addItem, setName, setTodo }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    addItem();
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
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
            onChange={(e) => setName(e.target.value)}
            sx={{
              width: "430px",
              marginBottom: "20px",
            }}
          />
          <TextField
            id="standard-basic"
            label="write your surname"
            variant="standard"
            onChange={(e) => setTodo(e.target.value)}
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
