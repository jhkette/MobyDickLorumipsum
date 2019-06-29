import React  , { useState, useEffect }  from 'react'
import draculatext from './dracula.txt'
import _ from 'lodash'

const Dracula = () => {
    
    const [text, setText] = useState([])
    
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(draculatext);
        const finalresponse = await response.text();
        const re = finalresponse.split(".");
        // const final =  _.shuffle(re);
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
    // Generate the number of paragraphs as specified by the user
    while (allParagraphs.length < numberOfParagraphs) {
      allParagraphs.push(getParagraph());
    }
    // Convert array into HTML string
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
