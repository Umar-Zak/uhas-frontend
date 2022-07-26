import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from "react-router-dom"
import { Formik } from 'formik';
import {MdCancel} from "react-icons/md"
import { editSchoolSurvey, editSurvey, getSchoolAnswered, getSurveys, postSchoolSurvey } from '../utils/questionaire';
import Loader from '../components/Loader';


function SchoolSurveyPage(props) {
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
        f: "F",
        i: "I",
        h: "H",
        g: "G",
    }
    const loadAnswers = async() => {
        const data = await getSchoolAnswered(id)
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
          await postSchoolSurvey(body, setIsLoading)
         window.location = `/survey/${id}`
      }
  
     const handleStartSurvey = async(section) => {
        const data = await getSurveys(section)
        setSurvey(data)
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
        await editSchoolSurvey({answer: editedAnswer}, selectedQuestion._id)
        setEditedAnswer("")
        setShowEditForm(false)
        loadAnswers()
      }
    
    const sectionF = answers.filter(ans => ans.question.section.toLowerCase() === section.f.toLowerCase())
    const sectionG = answers.filter(ans => ans.question.section.toLowerCase() === section.g.toLowerCase())
    const sectionH = answers.filter(ans => ans.question.section.toLowerCase() === section.h.toLowerCase())
    const sectionI = answers.filter(ans => ans.question.section.toLowerCase() === section.i.toLowerCase())
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
  </div>

        </>
                            
                         )}
                     </Formik>
                </div>
                 </div>
                }
     
        <div style={{minHeight: "700px"}} className="dashboard dashboard--large" >
                 <div className="section-a section">
                 {sectionF.length === 0 &&   <button onClick={() => handleStartSurvey("F")} style={{marginBottom: "10px"}} className="button button-primary">Take Section F</button>}
          <h3 className="basic-data">{sectionF[0]?.question?.title}</h3>
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
                sectionF.map(ans => (
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
                 {sectionG.length === 0 &&   <button onClick={() => handleStartSurvey("G")} style={{marginBottom: "10px"}} className="button button-primary">Take Section G</button>}
          {sectionG.length > 0 && <h3 className="basic-data">{sectionG[0].question.title}</h3>}
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
                sectionG.map(ans => (
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
                 {sectionH.length === 0 &&   <button onClick={() => handleStartSurvey("H")} style={{marginBottom: "10px"}} className="button button-primary">Take Section H</button>}
          {sectionH.length > 0 && <h3 className="basic-data">{sectionH[0].question.title}</h3>}
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
                sectionH.map(ans => (
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

                {/* <div className="section-a section">
                 {sectionI.length === 0 &&   <button onClick={() => handleStartSurvey("I")} style={{marginBottom: "10px"}} className="button button-primary">Take Section I</button>}
          {sectionI.length > 0 && <h3 className="basic-data">{sectionI[0].question.title}</h3>}
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
                sectionI.map(ans => (
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
                </div> */}
        </div></>
    );
}

export default SchoolSurveyPage;