import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function About(props) {
  const [counter,setCounter] = useState(0);
  const [types, setTypes] = useState();

  useEffect(() => {
    console.log('useEffect')

    // axios.get('./ws/rest/tasks')
    // .then(res =>{
    //   console.log(res);
    //   setTypes(res.data);
    // });  }, []);
  })
 
 
  // useEffect(() => { 
  //   console.log('useEffect count changed');
  // } , [counter]);



  return (
    // <h3>Requested Param: {props.match.params.id}</h3>
    <>
      <h3>About</h3>
      <p>Contenido del about</p>
      <p> Counter: {counter}</p>
      <button onClick={() => setCounter(counter+1)} > Increment counter</button>
  {
    types && types.map(type => {
      return (
      <p>{type.name}</p>
      )
    })
  }
    </>
  );
}

export default About;