import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function ExerciseList() {
  const [exercises, setExercises] = useState([]);

  // console.log(exercises);

  const deleteExercise = (id) => {
    axios
      .delete("http://localhost:5000/exercises/" + id)
      .then((res) => console.log(res.data));
    setExercises(exercises.filter((el) => el._id !== id));
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/exercises/")

      .then((res) => setExercises(res.data))

      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <h3>Logged Exercises </h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise) => {
            return (
              <tr>
                <td>{exercise.username}</td>
                <td>{exercise.description}</td>
                <td>{exercise.duration}</td>
                <td>{exercise.date.substring(0, 10)}</td>
                <td>
                  <Link
                    to={"/edit/" + exercise._id}
                    className="btn btn-primary"
                  >
                    edit
                  </Link>
                  |
                  <button
                    href="#"
                    className="btn btn-primary"
                    onClick={() => {
                      deleteExercise(exercise._id);
                    }}
                  >
                    delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ExerciseList;
