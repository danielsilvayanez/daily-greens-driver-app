import React, { useState } from 'react';

export default function BoxModal({ handleSubmit }) {
  const [box, setBox] = useState({ box: 0, smallbox: 0 });

  return (
    <form>
      <label>
        Pfandboxen groß:
        <input
          type="number"
          onChange={handleChange}
          name="box"
          value={box.box}
        />
      </label>
      <label>
        Pfandboxen klein:
        <input
          type="number"
          onChange={handleChange}
          name="smallbox"
          value={box.smallbox}
        />
      </label>
      <button
        onClick={() => {
          handleSubmit(boxNum, smallboxNum);
          closeModal();
        }}
      >
        Ok
      </button>
      <button onClick={closeModal}>Abbrechen</button>
    </form>
  );

  function handleChange(event) {
    setBox({ [event.target.name]: event.target.value });
  }
}
