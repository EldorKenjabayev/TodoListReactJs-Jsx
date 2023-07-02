import React, { useState, useEffect } from "react";
import "./todo.css";
import { v4 as uuidv4 } from "uuid";
import Draggable from "react-draggable";
import randomColor from "randomcolor";
import Button from "@mui/material/Button";

import BasicModal from "./modal/Modal";

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
          x: 200,
          y: 200,
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

  return (
    <div>
      <div className="content">
        <BasicModal addItem={addItem} setName={setName} setTodo={setTodo} />
        {items.map((item, index) => {
          return (
            <Draggable
              key={index}
              defaultPosition={item.position}
              onStop={(_, data) => {
                defPos(data, index);
              }}
            >
              <div className="todo" style={{ backgroundColor: item.color, padding:"20px 30px" }}>
                <div>
                  <h3>Name: {item.name}</h3>
                  <h3>Surname: {item.todo}</h3>
                </div> <br />

                <button className="delete"  onClick={() => deleteTodo(item.id)} style={{
                  position:'absolute',
                  cursor:'pointer',
                  top:'10px',
                  right:'10px'
                }}>
                  x
                </button>
                <div>Yaratilgan vaqt: {item.createdAt}</div>
              </div>
            </Draggable>
          );
        })}
      </div>
    </div>
  );
}
