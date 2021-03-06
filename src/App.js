import React, { useState } from "react";

import "./App.css";
import MobyD from "./Moby.js";

function App() {
  const [para, setpara] = useState(null);
  const [textVisible, settextVisible] = useState(false);
  const [submitpara, setsubmitpara] = useState(null);

  function handleSubmit(e) {
   
    e.preventDefault();
    if (para > 0) {
      settextVisible(true);
      setsubmitpara(para);
    }
  }

  function number(e) {
    setpara(e);
  }

  return (
    <div className="App">
      <main className="main">
        <section className="lead">
          <h1>
            Moby Dick - <em>or the whale</em>
          </h1>

          <h5>
            Generates random sentences from the entire text of Moby Dick. This can be used as a more
            interesting substiute to Lorem Ipsum text. Press copy to copy to
            clipboard.
          </h5>
        </section>
        <form action="/" method="POST" onSubmit={handleSubmit}>
          <input
            type="number"
            className="paragraph-number"
            name="numberOfParagraphs"
            onChange={e => number(e.target.value)}
          />

          <input type="submit" value="Generate" className="generate-button" />
        </form>
        {textVisible && <MobyD paragraphs={submitpara} textv ={textVisible}  />}
      </main>
    </div>
  );
}

export default App;
