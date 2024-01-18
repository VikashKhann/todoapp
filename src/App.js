import { useEffect, useState } from "react";
import "./App.css";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

function App() {
  const [isCompletedScreen, setIscompletedScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewtitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);

  const handleAdd = () => {
    let newTodo = {
      title: newTitle,
      desc: newDesc,
    };

    let updatedTodo = [...allTodos];
    updatedTodo.push(newTodo);
    setTodos(updatedTodo);
    localStorage.setItem("todoList", JSON.stringify(updatedTodo));
  };

  const handleDelete = (index) => {
    let removeTodo = [...allTodos];
    removeTodo.splice(index, 1);
    localStorage.setItem("todoList", JSON.stringify(removeTodo));
    setTodos(removeTodo);
  };

  const handleComplete = (index) => {
    let presentTime = new Date();
    let dd = presentTime.getDate();
    let mm = presentTime.getMonth();
    let yy = presentTime.getFullYear();
    let hh = presentTime.getHours();
    let mi = presentTime.getMinutes();
    let ss = presentTime.getSeconds();

    let entryTime =
      dd + "/" + mm + "/" + yy + " at " + hh + ":" + mi + ":" + ss;

    let completedItem = {
      ...allTodos[index],
      time: entryTime,
    };

    let updatedCompletedList = [...completedTodos, completedItem];
    setCompletedTodos(updatedCompletedList);
    localStorage.setItem(
      "completedTodoList",
      JSON.stringify(updatedCompletedList)
    );
    handleDelete(index);
  };

  const handleCompletedDelete = (index) => {
    let removeCompletedTodo = [...completedTodos];
    removeCompletedTodo.splice(index, 1);
    setCompletedTodos(removeCompletedTodo);
    localStorage.setItem(
      "completedTodoList",
      JSON.stringify(removeCompletedTodo)
    );
  };

  useEffect(() => {
    let getTodo = JSON.parse(localStorage.getItem("todoList"));
    let getCompletedTodo = JSON.parse(
      localStorage.getItem("completedTodoList")
    );
    if (getTodo) {
      setTodos(getTodo);
    }
    if (getCompletedTodo) {
      setCompletedTodos(getCompletedTodo);
    }
  }, []);

  return (
    <div className="App">
      <h1 className="mainHeader">ToDo List</h1>
      <div className="todo-wrapper">
        <div className="inputGroup">
          <div className="titleInput">
            <label className="labelTitle">Title</label>
            <input
              type="text"
              className="inputTitle"
              placeholder="Enter the title"
              value={newTitle}
              onChange={(e) => setNewtitle(e.target.value)}
            />
          </div>
          <div className="descInput">
            <label className="labelDesc">Description</label>
            <input
              type="text"
              className="inputDesc"
              placeholder="Enter the Description"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
            />
          </div>
          <div className="addInput">
            <button type="button " className="primaryBtn" onClick={handleAdd}>
              Add
            </button>
          </div>
        </div>
        <div className="displayArea">
          <div className="btnGroup">
            <button
              className={
                isCompletedScreen === false ? "todoBtn active" : "todoBtn"
              }
              onClick={() => {
                setIscompletedScreen(false);
              }}
            >
              ToDo
            </button>
            <button
              className={
                isCompletedScreen === true
                  ? "completedBtn active"
                  : "completedBtn"
              }
              onClick={() => {
                setIscompletedScreen(true);
              }}
            >
              Completed
            </button>
          </div>
          <div className="listGroup">
            {isCompletedScreen === false &&
              allTodos.map((item, index) => {
                return (
                  <div className="listItem" key={index}>
                    <div className="listDetails">
                      <h3 className="itemTitle">{item.title}</h3>
                      <p className="itemDesc">{item.desc}</p>
                    </div>
                    <div className="listIcon">
                      <AiOutlineDelete
                        className="deleteIcon"
                        title="delete?"
                        onClick={() => {
                          handleDelete(index);
                        }}
                      />
                      <BsCheckLg
                        className="completeIcon"
                        title="completed?"
                        onClick={() => {
                          handleComplete(index);
                        }}
                      />
                    </div>
                  </div>
                );
              })}

            {isCompletedScreen === true &&
              completedTodos.map((item, index) => {
                return (
                  <div className="listItem" key={index}>
                    <div className="listDetails">
                      <h3 className="itemTitle">{item.title}</h3>
                      <p className="itemDesc">{item.desc}</p>
                      <p className="itemDesc">
                        <small>Completed on {item.time}</small>
                      </p>
                    </div>
                    <div className="listIcon">
                      <AiOutlineDelete
                        className="deleteIcon"
                        title="delete?"
                        onClick={() => {
                          handleCompletedDelete(index);
                        }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
