import React, { useState } from "react";
import "./NameInputPage.scss";

const NameInputPage = () => {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (name.trim()) {
      localStorage.setItem("userName", name.trim());
      window.location.href = "/deutsch-lernen";
    }
  };

  return (
    <div className="name-input">
      <h2>What's your name?</h2>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSubmit}>Continue</button>
    </div>
  );
};

export default NameInputPage;
