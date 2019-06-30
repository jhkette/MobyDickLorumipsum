import React, { useState, useEffect, textAreaRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import Dracula from "./Dracula.js";

function App() {
  let paragraphs = null;
  const [textVisible, settextVisible] = useState(false);
  // const [paragraphs, setparagraphs] = useState(null)
  const [submitpara, setsubmitpara] = useState(null);

  // useEffect(() => {
  //   settextVisible()
  // }

  function handleSubmit(e) {
    console.log(e);
    e.preventDefault();
    settextVisible(true);
    setsubmitpara(paragraphs);
  }

  function number(e) {
    paragraphs = e;
  }

  return (
    <div className="App">
      <main className="main">
        <form action="/" method="POST" onSubmit={handleSubmit}>
          <input
            type="number"
            className="paragraph-number"
            name="numberOfParagraphs"
            onChange={e => number(e.target.value)}
          />

          <input type="submit" value="Generate" className="generate-button" />
        </form>
        {textVisible && <Dracula paragraphs={submitpara} />}
      </main>
    </div>
  );
}

export default App;
