import React from 'react'
import Medics from "../assets/medics.svg"
import Footer from '../components/Footer';
const DataCollectionPage = () => {
    return ( <>
   <div className="data-hero">
       <div className="block data-grid">
           <img src={Medics} alt="Medical personnel" className="medics" />
           <div className="data-grid__content">
               <h1 className="data-grid__title">
               Welcome to Our Data Collection Center
               </h1>
               <p className="data-grid__text">
               Data is very essential. But with your health data, 
               we treat it as first class citizen. 
               We don’t comprimize on data privacy
               </p>
           </div>
       </div>
   </div>

   <div className="question-container">
       <h3 className="question__category">Section A: Background Information</h3>
       <div className="simple-flex question-flex">
           <div className="question__number">
               <p>101</p>
           </div>
           <p className="question">
           What is the highest level of schooling you have completed?
           </p>
       </div>
       <div className="simple-flex answer-flex">
           <div className="answer__label active-answer">
               <p>A</p>
           </div>
           <p className="answer">None</p>
       </div>
       <div className="simple-flex answer-flex">
           <div className="answer__label">
               <p>B</p>
           </div>
           <p className="answer">Primary</p>
       </div>
       <div className="simple-flex answer-flex">
           <div className="answer__label">
               <p>C</p>
           </div>
           <p className="answer">Junior High School</p>
       </div>
       <div className="simple-flex answer-flex">
           <div className="answer__label">
               <p>D</p>
           </div>
           <p className="answer">Principal High</p>
       </div>
       <div className="simple-flex answer-flex">
           <div className="answer__label">
               <p>E</p>
           </div>
           <p className="answer">Tertiary</p>
       </div>
   </div>

  <div className="next-container">
  <button className="button button__primary button__normal">Next</button>
  </div>
   <Footer/>
    </> );
}
 
export default DataCollectionPage;