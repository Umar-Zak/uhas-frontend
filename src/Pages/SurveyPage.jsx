import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from "react-router-dom"
import { Formik } from 'formik';
import {MdCancel} from "react-icons/md"
import { editSurvey, getStudentAnswers, getSurveyQuestions, getSurveys, postSurvey } from '../utils/questionaire';
import Loader from '../components/Loader';
function SurveyPage(props) {
    const {id} = useParams()
    const navigate = useNavigate()
    const [answers, setAnswers] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState({})
    const [index, setIndex] = useState(0)
    const [answered, setAnswered] = useState([])
    const [survey, setSurvey] = useState([])
    const [selectedOption, setSelectedOption] = useState("")
    const [showQuesForm, setShowQuesForm] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [editedAnswer, setEditedAnswer] = useState("")
    const [showEditForm, setShowEditForm] = useState(false)
    const [selectedQuestion, setSelectedQuestion] = useState({})
    const section = {
        a: "A",
        b: "B",
        c: "C",
        d: "D",
        e: "E"
    }
    const loadAnswers = async() => {
        const data = await getStudentAnswers(id)
        setAnswers(data)
    }

    useEffect(() => {
        loadAnswers()
    },[])


    const handleNext = () => {
        if(index > survey.length - 1 || !selectedOption) return
        const answer = {answer: selectedOption, question: currentQuestion._id}
        setAnswered([...answered, answer])
        setSelectedOption("")
        setIndex(index + 1)
        setCurrentQuestion(survey[index+1])
      }
  
      const handleFinish = async () => {
        const body = {
          answers: 
          [...answered, 
            {question: currentQuestion._id, answer: selectedOption}],
            student: id
          }
        
          await postSurvey(body, setIsLoading)
      }
  
     const handleStartSurvey = async(section) => {
        const data = await getSurveys(section)
        setSurvey(data)
        console.log({...data[index]})
        setCurrentQuestion({...data[index]})
        setShowQuesForm(true)
        
      }

      const handleEdit = id => {
        const answer = answers.find(ans => ans._id === id)
        setSelectedQuestion(answer)
        setEditedAnswer(answer.answer)
        setShowEditForm(true)
      }

      const saveEdit = async () => {
        await editSurvey({answer: editedAnswer}, selectedQuestion._id)
        setEditedAnswer("")
        setShowEditForm(false)
        loadAnswers()
      }
    
    const sectionA = answers.filter(ans => ans.question.section.toLowerCase() === section.a.toLowerCase())
    const sectionB = answers.filter(ans => ans.question.section.toLowerCase() === section.b.toLowerCase())
    const sectionC = answers.filter(ans => ans.question.section.toLowerCase() === section.c.toLowerCase())
    const sectionD = answers.filter(ans => ans.question.section.toLowerCase() === section.d.toLowerCase())
    return (
     <>
        { showQuesForm && 
         <div className="modal">
            <div style={{width: "800px", height: "500px", overflowY: "scroll" }}  className="login-container register-container">
                 <div className="cancel-container">
                    <MdCancel onClick={() => setShowQuesForm(false)} style={{cursor:"pointer"}} size={25} color='white'/>
                 </div>
                     <Formik 
                     initialValues={{name: "" }} 
                     >
                         {({handleChange,handleSubmit,errors,touched})=>(
                            <>
                  
                  {<div className="question-container">
       <h3 className="question__category"> { currentQuestion?.title + " " + currentQuestion?.section}</h3>
       <div className="simple-flex question-flex">
           <div className="question__number">
               <p>{currentQuestion?.number}</p>
           </div>
           <p className="question">
           {currentQuestion?.question}
           </p>
       </div>
       {
           currentQuestion?.options?.map((option,index) =>(
           <>
            {option.type==="radio" &&(<div key={index}   className="simple-flex answer-flex">
            <div onClick={() => setSelectedOption(option.value)} className={`answer__label ${selectedOption === option.value? "active-answer" : "answer__label"}`}>
                <p>{index + 1}</p>
            </div>
            <p className="answer">{option.value}</p>
        </div>)}
        {option.type!=="radio" && <input key={index} onChange={({target}) => setSelectedOption(target.value)}  className="question-text" type={option.type} placeholder={option.value} /> }
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
  </div>xx

        </>
                            
                         )}
                     </Formik>
                </div>
         </div>
                
                }

                { showEditForm && 
                <div className="modal">
                     <div style={{width: "800px", height: "500px", overflowY: "scroll" }}  className="login-container register-container">
                 <div className="cancel-container">
                    <MdCancel onClick={() => setShowEditForm(false)} style={{cursor:"pointer"}} size={25} color='white'/>
                 </div>
                     <Formik 
                     initialValues={{name: "" }} 
                     >
                         {({handleChange,handleSubmit,errors,touched})=>(
                            <>
                  
                  {
                    <div className="question-container">
       {
           selectedQuestion?.question?.options?.map((option,index) =>(
           <>
            {option.type==="radio" &&(<div key={index}   className="simple-flex answer-flex">
            <div onClick={() => setEditedAnswer(option.value)} className={`answer__label ${editedAnswer === option.value? "active-answer" : "answer__label"}`}>
                <p>{index + 1}</p>
            </div>
            <p className="answer">{option.value}</p>
        </div>)}
        {option.type!=="radio" && <input value={editedAnswer} key={index} onChange={({target}) => setEditedAnswer(target.value)}  className="question-text" type={option.type} placeholder={option.value} /> }
           </>
           )
          
           )
       }
     
   </div>}
   <div className="next-container">
<button onClick={saveEdit}  className="button button__primary button__normal">Save</button>
 { isLoading && <Loader/>}
  </div>xx

        </>
                         )}
                     </Formik>
                </div>
                </div>
                }
     
        <div style={{minHeight: "700px"}} className="dashboard dashboard--large" >
                 <div className="section-a section">
          <h3 className="basic-data">{sectionA[0]?.question?.title}</h3>
        <table className="table table-responsive table-hover">
              <thead>
                  <tr >
                      <th scope="col">Date Taken</th>
                      <th scope="col">Question</th>
                      <th scope="col">Answer</th>
                      <th scope="col">Edit</th>
                  </tr>
              </thead>
              
              <tbody>
               {
                sectionA.map(ans => (
                    <tr>
                        <td>{ans.posted_on.toString().substr(0,10)}</td>
                        <td>{ans.question.question}</td>
                        <td>{ans.answer}</td>
                        <button onClick={() => handleEdit(ans._id)} style={{padding: "10px", marginBlock:"10px", width: "100px", borderRadius:"5px", outline:"none", marginInline:"10px", fontSize:"13px"}} >Edit</button>
                    </tr>
                ))
               }
              </tbody>
              </table>
                </div>

                <div className="section-a section">
                 {sectionB.length === 0 &&   <button onClick={() => handleStartSurvey("B")} style={{marginBottom: "10px"}} className="button button-primary">Take Section B</button>}
          {sectionB.length > 0 && <h3 className="basic-data">{sectionB[0].question.title}</h3>}
        <table className="table table-responsive table-hover">
              <thead>
                  <tr >
                      <th scope="col">Date Taken</th>
                      <th scope="col">Question</th>
                      <th scope="col">Answer</th>
                      <th scope="col">Edit</th>
                  </tr>
              </thead>
              
              <tbody>
               {
                sectionB.map(ans => (
                    <tr>
                        <td>{ans.posted_on.toString().substr(0, 10)}</td>
                        <td>{ans.question.question}</td>
                        <td>{ans.answer}</td>
                        <button onClick={() => handleEdit(ans._id)} style={{padding: "10px", marginBlock:"10px", width: "100px", borderRadius:"5px", outline:"none", marginInline:"10px", fontSize:"13px"}} >Edit</button>
                    </tr>
                ))
               }
              </tbody>
              </table>
                </div>

                <div className="section-a section">
                 {sectionC.length === 0 &&   <button onClick={() => handleStartSurvey("C")} style={{marginBottom: "10px"}} className="button button-primary">Take Section C</button>}
          {sectionC.length > 0 && <h3 className="basic-data">{sectionC[0].question.title}</h3>}
        <table className="table table-responsive table-hover">
              <thead>
                  <tr >
                      <th scope="col">Date Taken</th>
                      <th scope="col">Question</th>
                      <th scope="col">Answer</th>
                      <th scope="col">Edit</th>
                  </tr>
              </thead>
              
              <tbody>
               {
                sectionC.map(ans => (
                    <tr>
                        <td>{ans.posted_on.toString().substr(0, 10)}</td>
                        <td>{ans.question.question}</td>
                        <td>{ans.answer}</td>
                        <button onClick={() => handleEdit(ans._id)} style={{padding: "10px", marginBlock:"10px", width: "100px", borderRadius:"5px", outline:"none", marginInline:"10px", fontSize:"13px"}} >Edit</button>
                    </tr>
                ))
               }
              </tbody>
              </table>
                </div>

                <div className="section-a section">
                 {sectionD.length === 0 &&   <button onClick={() => handleStartSurvey("D")} style={{marginBottom: "10px"}} className="button button-primary">Take Section D</button>}
          {sectionD.length > 0 && <h3 className="basic-data">{sectionD[0].question.title}</h3>}
        <table className="table table-responsive table-hover">
              <thead>
                  <tr >
                      <th scope="col">Date Taken</th>
                      <th scope="col">Question</th>
                      <th scope="col">Answer</th>
                      <th scope="col">Edit</th>
                  </tr>
              </thead>
              
              <tbody>
               {
                sectionD.map(ans => (
                    <tr>
                        <td>{ans.posted_on.toString().substr(0, 10)}</td>
                        <td>{ans.question.question}</td>
                        <td>{ans.answer}</td>
                        <button onClick={() => handleEdit(ans._id)} style={{padding: "10px", marginBlock:"10px", width: "100px", borderRadius:"5px", outline:"none", marginInline:"10px", fontSize:"13px"}} >Edit</button>
                    </tr>
                ))
               }
              </tbody>
              </table>
                </div>
        </div></>
    );
}

export default SurveyPage;