import React  , { useState, useEffect }  from 'react'
import draculatext from './dracula/dracula.txt'


const Dracula = (props) => {
    
    const [text, setText] = useState([])
    
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
    const total = 6;
    while(totalParagraph.length < total){
      totalParagraph.push(paragraphHTML());
    };
    let finalParagraphs = '';
    totalParagraph.forEach(function(paragraph){
      finalParagraphs += paragraph;
    })
    return {__html:finalParagraphs};
  }
      
 
   
  return (
     
    <div dangerouslySetInnerHTML ={totalParagraphs() } />
    
  )
}

export default Dracula
