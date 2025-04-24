import React, { useState, useEffect } from "react";
import "./todoApp.css";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const TodoApp = () => {
  const [todolist, setTodoList] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [addError, setAddError] = useState("");
  const [editError, setEditError] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todolist));
  }, [todolist]);

  const handleEditIndex = (index) => {
    setEditIndex(index);
    setEditValue(todolist[index].text);
    setEditError("");
  };

  const handleSaveEdit = () => {
    if (editValue.trim() !== "") {
      const updatedTask = todolist.map((item, index) =>
        index === editIndex ? { ...item, text: editValue } : item
      );
      setTodoList(updatedTask);
      setEditIndex(null);
      setEditValue("");
      setEditError("");
    } else {
      setEditError("Task should not be empty");
    }
  };

  const handleTodoDelete = (deleteIndex) => {
    const filteredTodoList = todolist.filter(
      (_, index) => index !== deleteIndex
    );
    setTodoList(filteredTodoList);
  };

  const handleSubmit = () => {
    if (input.trim() !== "") {
      const newTask = {
        text: input,
        dueDate: "",
        dueTime: "",
      };
      setTodoList((prevList) => [...prevList, newTask]);
      setInput("");
      setAddError("");
    } else {
      setAddError("*Task should not be empty");
    }
  };

  return (
    <div className="todobody">
      <h1 className="todohead">Daily Planner</h1>

      <div className="input-container">
        <input
          type="text"
          value={input}
          placeholder="What's your plan today?"
          onChange={(e) => {
            setInput(e.target.value);
            if (addError) setAddError("");
          }}
        />
        <button onClick={handleSubmit}>Add Task</button>
      </div>

      {addError && <p className="error-message">{addError}</p>}

      <h2>Your Tasks:</h2>
      {todolist.map((task, index) => (
        <div className="todo-item" key={index}>
          {editIndex === index ? (
            <>
              <input
                className="edit-input"
                type="text"
                value={editValue}
                onChange={(e) => {
                  setEditValue(e.target.value);
                  if (editError) setEditError("");
                }}
              />
              <div className="button-group">
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={() => setEditIndex(null)}>Cancel</button>
              </div>
              {editError && <p className="error-message">{editError}</p>}
            </>
          ) : (
            <>
              <h3>{task.text}</h3>
              <div className="button-group">
                <button onClick={() => handleEditIndex(index)}>
                  <FaRegEdit />
                </button>
                <button onClick={() => handleTodoDelete(index)}>
                  <MdDelete />
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoApp;
