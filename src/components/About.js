import React, { useEffect, useState } from 'react';
import axios from 'axios';

function About(props) {
  const [counter, setCounter] = useState(0);
  const [types, setTypes] = useState();

  useEffect(() => {
    console.log('useEffect');

    axios.get ('ws/rest/types')
    .then (res =>{
      console.log(res);
      setTypes(res.data);      
    }).catch(error =>{
      console.log(error);
    })
  }, []);

  return (
    // <h3>Requested Pa {
  //} ram: { props.match.params.id }</h3 >
  <>
    <h3>About</h3>
    <p>Contenido del about</p>
    <p>Counter: {counter}</p>
    <button onClick={() => setCounter(counter + 1)}>Incrementar</button>
    
    
    <div>
      <br></br><h4><b>Lista de Tareas</b></h4>
    {
      types && types.map(type =>{
        return(
          <p>{type.name}</p>
        )
      })
    }
    </div>

  </>
  );
}

export default About;