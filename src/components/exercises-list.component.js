import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Single exercise row
const Exercise = ({ exercise, deleteExercise }) => (
  <tr>
    <td>{exercise.username}</td>
    <td>{exercise.description}</td>
    <td>{exercise.duration}</td>
    <td>{exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={`/edit/${exercise._id}`}>edit</Link> |{' '}
      <a href="#" onClick={() => deleteExercise(exercise._id)}>delete</a>
    </td>
  </tr>
);

const ExercisesList = () => {
  const [exercises, setExercises] = useState([]);

  // Fetch exercises on component mount
  useEffect(() => {
    axios.get('http://localhost:5000/exercises/')
      .then(response => setExercises(response.data))
      .catch(error => console.error('Error fetching exercises:', error));
  }, []);

  // Delete exercise by ID
  const deleteExercise = (id) => {
    axios.delete(`http://localhost:5000/exercises/${id}`)
      .then(res => console.log(res.data))
      .catch(err => console.error(err));

    setExercises(exercises.filter(ex => ex._id !== id));
  };

  // Render list
  const exerciseList = () => {
    return exercises.map((exercise) => (
      <Exercise
        exercise={exercise}
        deleteExercise={deleteExercise}
        key={exercise._id}
      />
    ));
  };

  return (
    <div>
      <h3>Logged Exercises</h3>
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
        <tbody>{exerciseList()}</tbody>
      </table>
    </div>
  );
};

export default ExercisesList;
