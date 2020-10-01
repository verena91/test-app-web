import React, { useState, useEffect } from 'react';

function About(props) {
  const [counter,setCounter] = useState(0);

  useEffect(() => {
    console.log('useEffect')
  })
  
  return (
    // <h3>Requested Param: {props.match.params.id}</h3>
    <>
      <h3>About</h3>
      <p>Contenido del about</p>
    </>
  );
}

export default About;