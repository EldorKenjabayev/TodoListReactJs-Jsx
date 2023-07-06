import React, { useState, useEffect } from "react";
import "./todo.css";
import { v4 as uuidv4 } from "uuid";
import Draggable from "react-draggable";
import randomColor from "randomcolor";
import Button from "@mui/material/Button";

import BasicModal from "./modal/Modal";
import EditModal from "./modal/EditModal";

export default function Todo() {
  const [name, setName] = useState("");
  const [todo, setTodo] = useState("");
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (name.trim() && todo.trim() !== "") {
      let newItem = {
        id: uuidv4(),
        name: name,
        todo: todo,
        color: randomColor({
          luminosity: "light",
        }),
        position: {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        },
        createdAt: new Date().toLocaleTimeString(),
      };
      setItems([...items, newItem]);
      setName("");
      setTodo("");
    } else {
      alert("type something... ");
      setTodo("");
      setName("");
    }
  };

  const defPos = (data, index) => {
    let newArray = [...items];
    newArray[index].position = {
      x: data.x,
      y: data.y,
    };

    setItems(newArray);
  };

  const deleteTodo = (id) => {
    let newArr = items.filter((item) => item.id !== id);
    setItems(newArr);
  };

  // edit

  const [open, setOpen] = React.useState(false);
  const [editTodo, setEditTodo] = useState("");
  const handleOpen = (item) => {
    setOpen(true);
    setEditTodo(item);
    console.log(item);
  };
  // const handleClose = () => {
  //   setOpen(false);
  //   addItem();
  // };

  return (
    <div>
      <div className="content">
        <BasicModal addItem={addItem} setName={setName} setTodo={setTodo} />
        <EditModal
          open={open}
          handleOpen={handleOpen}
          editTodo={editTodo}
          setOpen={setOpen}
          items={items}
          setItems={setItems}
        />
        {items.map((item, index) => {
          return (
            <Draggable
              key={index}
              defaultPosition={item.position}
              onStop={(_, data) => {
                defPos(data, index);
              }}
            >
              <div
                className="todo"
                style={{
                  backgroundColor: item.color,
                  padding: "40px 30px   20px 30px",
                }}
              >
                <div>
                  <h3
                    style={{
                      position: "absolute",
                      top: "5px",
                      fontSize: "17px",
                    }}
                  >
                    {" "}
                    {item.name}
                  </h3>
                  <p>
                    <span
                      style={{
                        fontWeight: "600",
                      }}
                    >
                      Todo:{" "}
                    </span>
                    {item.todo}
                  </p>
                </div>{" "}
                <br />
                <div>
                  <button
                    className="delete"
                    onClick={() => deleteTodo(item.id)}
                    style={{
                      position: "absolute",
                      cursor: "pointer",
                      top: "10px",
                      right: "10px",
                    }}
                  >
                    x
                  </button>
                  <i
                    class="bx bx-edit"
                    style={{
                      cursor:'pointer', 
                      position: "absolute",
                      cursor: "pointer",
                      top: "8px",
                      right: "35px",
                      fontSize: "25px",
                    }}
                    onClick={() => handleOpen(item)}
                  ></i>
                </div>
                <div>Yaratilgan vaqt: {item.createdAt}</div>
              </div>
            </Draggable>
          );
        })}
      </div>
    </div>
  );
}
