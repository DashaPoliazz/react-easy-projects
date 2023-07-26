import React, { useState } from "react";
import ModalWindow from "./components/ModalWindow";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => setIsOpen(true);

  return (
    <div className="App">
      <button onClick={handleOpenModal} className="open-modal-btn">
        ✨ Open modal window
      </button>
      <ModalWindow isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default App;
