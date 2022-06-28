import React from 'react';
import {Formik} from "formik"
import {useNavigate} from "react-router-dom"
import {MdCancel} from "react-icons/md"
import Loader from './Loader';


function StudentQuestionnaireModal({isLoading, survey, index,setShowQuesForm, currentQuestion, handleNext, handleFinish, selectedOption, setSelectecOption}) {
    const navigate = useNavigate()

    return (
       <div className="modal">
        <div style={{width: "800px", height: "500px", overflowY: "scroll" }}  className="login-container register-container">
                 <div className="cancel-container">
                    <MdCancel onClick={()=>setShowQuesForm(false)} style={{cursor:"pointer"}} size={25} color='white'/>
                 </div>
                     <Formik 
                     >
                         {({})=>(
                            <>
                  
                  {<div className="question-container">
       <h3 className="question__category"> { currentQuestion.title + " " + currentQuestion.section}</h3>
       <div className="simple-flex question-flex">
           <div className="question__number">
               <p>{currentQuestion.number}</p>
           </div>
           <p className="question">
           {currentQuestion.question}
           </p>
       </div>
       {
           currentQuestion?.options?.map((option,index) =>(
           <>
            {option.type==="radio" &&(<div key={index}   className="simple-flex answer-flex">
            <div onClick={() => setSelectecOption(option.value)} className={`answer__label ${selectedOption === option.value? "active-answer" : "answer__label"}`}>
                <p>{index + 1}</p>
            </div>
            <p className="answer">{option.value}</p>
        </div>)}
        {option.type!=="radio" && <input key={index} onChange={({target}) => setSelectecOption(target.value)}  className="question-text" type={option.type} placeholder={option.value} /> }
           </>
           )
          
           )
       }
     
   </div>}
   <div className="next-container">
    <button style={{marginRight:"15px"}} onClick={()=>navigate("/dashboard")} className="button button__light button__normal">Quit</button>
 {!isLoading && index !== (survey.length -1) && <button onClick={handleNext}  className="button button__primary button__normal">Next</button>}
 {!isLoading && index === (survey.length -1) && <button onClick={handleFinish}  className="button button__primary button__normal">Finish</button>}
 { isLoading && <Loader/>}
  </div>

        </>
                            
                         )}
                     </Formik>
                </div>
       </div>
    );
}

export default StudentQuestionnaireModal;