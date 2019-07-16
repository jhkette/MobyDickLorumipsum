import React, { useRef, useState, useEffect } from "react";
import _ from "lodash";

import mobyText from "./moby/moby.txt";

// I'm using react memo here to ensure the component only
// updates when it receives new props.
// This means it doesn't update when paragraph number is increased,
// only when the form is submitted and new props are sent to component.
const MobyD = React.memo(function MobyD(props) {
  const [text, setText] = useState([]);
  const [loading, setLoading] = useState(false);

  const textAreaRef = useRef(null);

  // https://www.robinwieruch.de/react-hooks-fetch-data/
  // guidance on fetching data with react hooks
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(mobyText);
        const finalresponse = await response.text();
        const re = await finalresponse.split(".");        
        await setText(re);
      } catch (err) {
        console.log(err);
      }
      finally {
        await setLoading(true);
      }
    };
    fetchData();
  }, []);

  function getRandomSentence() {
    
    function random() {
      const randomSentence = _.sample(text);
      return randomSentence;
    }
    const numberOfSentences = 2;
    let allSentences = [];

    while (allSentences.length < numberOfSentences) {
      allSentences.push(random());
    }
    if (allSentences.length === 2) {
      let paragraphHTML = "";
      allSentences.forEach(function(paragraph) {
        paragraphHTML += paragraph + ".";
      });
      paragraphHTML = "<p>" + paragraphHTML + "</p>";
      return paragraphHTML;
    }
  }

 function totalParagraphs() {
  let totalParagraph = [];
    const total = props.paragraphs;
    while (totalParagraph.length < total) {
      totalParagraph.push(getRandomSentence());
    }
    let finalParagraphs = "";
    totalParagraph.forEach(function(paragraph) {
      finalParagraphs += paragraph;
    });
 
    return { __html: finalParagraphs } 
  }

  function copyToClipboard(e) {
    // https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
    // very useful article on how to copy to clipboard
    // create textarea element add text using innerhtml
    //
    let text = textAreaRef.current.innerText;
    const el = document.createElement("textarea");
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";

    el.innerHTML = text;
    // el.setAttribute('readonly', '');
    document.body.appendChild(el);
    el.select(); // Select the <textarea> content
    document.execCommand("copy"); // Copy - only works as a result of a user action (e.g. click events)

    document.body.removeChild(el); // Remove the <textarea> element
  }

  return (
   
    <div>
      <button onClick={copyToClipboard} className="clipboard">
        Copy
      </button>
      <div className="moby">
      {loading &&
        <div ref={textAreaRef} dangerouslySetInnerHTML={totalParagraphs()} />
      }
      {!loading && <p>Loading...</p> }
      </div>
    </div>
   
  );
});

export default MobyD;
