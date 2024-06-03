import React, { useState } from "react";

export default function ReactKomponente() {
  const [value, setValue] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const handleButtonChange = () => {
    setValue(value + 1);
  };

  return (
    <div>
      {isOpen && (
        <>
          <button
            style={{ backgroundColor: "blue", width: "50px", height: "50px" }}
            onClick={handleButtonChange}
          >
            hier klicken
          </button>
          <h1>Anzahl Klick {value}</h1>)
        </>
      )}
    </div>
  );
}
