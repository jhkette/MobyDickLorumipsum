import React  , {useRef, useState, useEffect }  from 'react'
import draculatext from './dracula/dracula.txt'


const Dracula = (props) => {
    
    const [text, setText] = useState([])
    const textAreaRef = useRef(null);
    
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(draculatext);
        const finalresponse = await response.text();
        const re = finalresponse.split(".");
        setText(re);
      };
  
      fetchData();
    }, []);

   function getRandomSentence (){
    let randomSentence = text[Math.floor(Math.random() * text.length)];
    return randomSentence;

   } 

   function getParagraph (){
    let paragraph = '';
    // Set the minimum number of words
    let sentences = 6;
    let firstSentence = true;
    while (paragraph.length < sentences) {
      if (firstSentence) {
        paragraph = paragraph.concat(getRandomSentence());
        firstSentence = false;
      } else {
        paragraph = paragraph.concat(' ' + getRandomSentence());
      }
    }
    return paragraph;

   }
     
   function paragraphHTML () {
    const numberOfParagraphs = 5;
    let allParagraphs = [];
   
    while (allParagraphs.length < numberOfParagraphs) {
      allParagraphs.push(getParagraph());
    }
    
    let paragraphHTML = '';
    allParagraphs.forEach(function (paragraph) {
      paragraphHTML +=   paragraph + '.' ;
    });
    paragraphHTML = '<p>' + paragraphHTML + '</p>'
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
    <div className="dracula">
      <div ref={textAreaRef} dangerouslySetInnerHTML ={totalParagraphs() }  />
      <button onClick={copyToClipboard}>Copy</button> 
    </div>
    
  )
}

export default Dracula
