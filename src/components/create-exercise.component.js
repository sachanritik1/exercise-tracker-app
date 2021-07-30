import React from "react";
import { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";

import "react-datepicker/dist/react-datepicker.css";

function CreateExercise() {
  const [username, setUsername] = useState("test user");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);
  const inputRef = useRef("userInput");

  const onSubmit = (e) => {
    e.preventDefault();
    const exercise = { username, description, duration, date };
    console.log(exercise);
    axios
      .post("http://localhost:5000/exercises/add", exercise)
      .then((res) => console.log(res.data));

    window.location = "/";
  };
  useEffect(() => {
    axios.get("http://localhost:5000/users").then((res) => {
      if (res.data.length > 0) {
        setUsers(res.data.map((user) => user.username));
        setUsername(res.data[0].username);
      }
    });
  }, []);
  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <select
            ref={inputRef}
            required
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          >
            {users.map((user) => {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            required
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Duration(in min):</label>
          <input
            type="number"
            required
            className="form-control"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <div>
            <DatePicker selected={date} onChange={(date) => setDate(date)} />
          </div>
        </div>
        <div className="form-group">
          <button
            type="submit"
            value="Create Exercise Log"
            className="btn btn-primary"
          >
            Create Exercise Log
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateExercise;
