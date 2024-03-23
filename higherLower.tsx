import React, { useState } from "react";
import { Frame } from "frames-js";

const HigherLowerGame = () => {
  const [number, setNumber] = useState(Math.floor(Math.random() * 100) + 1);

  const handleHigher = () => {
    const newNumber = Math.floor(Math.random() * (100 - number)) + number + 1;
    setNumber(newNumber);
  };

  const handleLower = () => {
    const newNumber = Math.floor(Math.random() * number);
    setNumber(newNumber);
  };

  return (
    <div>
      <h1>Guess the Number</h1>
      <p>The number is: {number}</p>
      <Frame>
        <button onClick={handleHigher}>Higher</button>
        <button onClick={handleLower}>Lower</button>
      </Frame>
    </div>
  );
};

export default HigherLowerGame;
