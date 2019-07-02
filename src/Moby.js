import React  , {useRef, useState, useEffect }  from 'react'

import mobyText from './moby/moby.txt'



// I'm using react memo here to ensure the component only
// updates when it receives new props.
// This means it doesn't update when paragraph number is increased,
// only when the form is submitted and new props are sent to component. 
const MobyD = React.memo(function MobyD(props) {
    
    const [text, setText] = useState([])
  
    const textAreaRef = useRef(null);
    
    // https://www.robinwieruch.de/react-hooks-fetch-data/
    // guidance on fetching data with react hooks
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(mobyText);
        const finalresponse = await response.text();
        const re = await finalresponse.split(".");
  
        setText(re);
      };
  
      fetchData();
    }, []);

 function getRandomSentence (){
    let randomSentence =  text[Math.floor(Math.random() * text.length)]
    return randomSentence;
   } 
  // use async await and then
 function getParagraph (){
    let para =  getRandomSentence()
    let paragraph = '';
    // Set the minimum number of words
   
    let firstSentence = true;
    if(para !== undefined){
      if (firstSentence) {
        paragraph = paragraph.concat(para );
        firstSentence = false;
      } else {
        paragraph = paragraph.concat(' ' + para );
      }
    }
  
    return paragraph;

   }
     
 function paragraphHTML () {
    const numberOfParagraphs = 3;
    let allParagraphs = [];
   
    while (allParagraphs.length < numberOfParagraphs) {
      allParagraphs.push(getParagraph());
    }
    
    let paragraphHTML = '';
    allParagraphs.forEach(function (paragraph) {
      paragraphHTML +=   paragraph + '.' ;
    });
    paragraphHTML =  '<p>' + paragraphHTML + '</p>'
    return paragraphHTML 
  };

function totalParagraphs(){
    let totalParagraph = [];
    const total = props.paragraphs;
    while(totalParagraph.length < total){
      totalParagraph.push(paragraphHTML());
    };
    let finalParagraphs = '';
    totalParagraph.forEach(function(paragraph){
      finalParagraphs += paragraph;
    })
  
   console.log(finalParagraphs);
   return {__html:finalParagraphs};
  }

  function copyToClipboard (e){
    // https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
    // very useful article on how to copy to clipboard
    // create textarea element add text using innerhtml
    // 
    let text = textAreaRef.current.innerText;
    const el = document.createElement('textarea');
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
   
    el.innerHTML =  text
    // el.setAttribute('readonly', '');
    document.body.appendChild(el);
    const selected =            
    document.getSelection().rangeCount > 0        // Check if there is any content selected previously
      ? document.getSelection().getRangeAt(0)     // Store selection if found
      : false;                                    // Mark as false to know no selection existed before
    el.select(); // Select the <textarea> content
    document.execCommand('copy'); // Copy - only works as a result of a user action (e.g. click events)
    
    document.body.removeChild(el); // Remove the <textarea> element
  
  }
  
 
  
  return (
    <div>
    <button onClick={copyToClipboard} className="clipboard">Copy</button> 
    <div className="moby">
      
      <div ref={textAreaRef} dangerouslySetInnerHTML ={totalParagraphs()}  />
      
    </div>
    </div>
    
  )
});

export default MobyD
