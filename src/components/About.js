import React, {useState, useEffect } from 'react';
import axios from 'axios';

function About(props) {
const [types, setTypes] = useState(); // declaración de variables
const [counter, setCounter ] = useState(0);
useEffect(() => {
  console.log('useEffect');
  axios.get('/ws/rest/types')
  .then(res => {
    console.log(res);
    setTypes(res.data);
  }).catch(error => {
    console.log(error);
  })
}, []);

  return (
    // <h3>Requested Param: {props.match.params.id}</h3>
    <>
      <h3>About</h3>
      <p>Contenido del about</p>
      <p>  Counter : {counter} </p>
      <button onClick={() => setCounter(counter+1)}> Incremente counter</button>
      {
        types && types.map (type => {
          return (
            <p> {type.name}</p>
          )
        })
      }
    </>
  );
}

export default About;