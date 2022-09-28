import React, {useEffect, useState, useRef} from 'react';
import {useParams, useNavigate} from "react-router-dom"
import { Formik } from 'formik';
import {MdCancel} from "react-icons/md"
import { editSchoolSurvey, editSurvey, getAllQuestions, getAllSections, getAllStudentAnswers, getSchoolAnswered, getSurveys, postProjectSurvey, postSchoolSurvey, uploadExcelData } from '../utils/questionaire';
import Loader from '../components/Loader';
import ExportStudentData from "../components/ExportStudentData"

function ProjectStudentOverviewPage(props) {
    const _export = useRef(null);
    const {id, student} = useParams()
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
    const [sections, setSections] = useState([])
    const [allQuestions, setAllQuestions] = useState([])
    const [allAnswers, setAllAnswers] = useState([])
    const [selectedSection, setSelectedSection]  = useState("")
    const loadAnswers = async() => {
        const data = await getSchoolAnswered(id)
        setAnswers(data)
    }


    const excelExport = () => {
        if (_export.current !== null) {
          _export.current.save();
        }
      }

    const transformedAnswers = allAnswers.map(ans => 
        ({answer: ans.answer, posted_on: ans.posted_on.toString().substr(0, 10), question: ans.question.question}))


    const loadSections = async () => {
        const data = await getAllSections()
        setSections(data.filter(d => d.project === id))
    }

    const loadAllQuestions = async () => {
        const data = await getAllQuestions()
        setAllQuestions(data)
    }

    const loadAllStudentAnswers = async() => {
        const data = await getAllStudentAnswers(student)
        setAllAnswers(data)
    }

   

    useEffect(() => {
        loadAnswers()
        loadSections()
        loadAllQuestions()
        loadAllStudentAnswers()
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
        setIsLoading(true)
        const body = {
          answers: 
          [...answered, 
            {question: currentQuestion._id, answer: selectedOption}],
            student
          }
          await postProjectSurvey(body)
        window.location =`/projects/${id}/${student}`
      }
  
     const handleStartSurvey = async(section) => {
        const data = allQuestions.filter(question => question.section?._id === section)
       if(data.length === 0) return alert("You need to first add questions under this section")
        setSurvey(data)
        setCurrentQuestion({...data[index]})
        setShowQuesForm(true)
        
      }

      const handleEdit = id => {
        const answer = allAnswers.find(ans => ans._id === id)
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
    
      const handleUpload = async(file) => {
        const body = {file: file, project_id: id, section: selectedSection}
        await uploadExcelData(body)
      }

      console.log("All", allAnswers);
    // const sectionF = answers.filter(ans => ans.question.section.toLowerCase() === section.f.toLowerCase())
    // const sectionG = answers.filter(ans => ans.question.section.toLowerCase() === section.g.toLowerCase())
    // const sectionH = answers.filter(ans => ans.question.section.toLowerCase() === section.h.toLowerCase())
    // const sectionI = answers.filter(ans => ans.question.section.toLowerCase() === section.i.toLowerCase())
    return (
        <>
        <ExportStudentData exportRef={_export} transformedData={transformedAnswers} />
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
       <h3 className="question__category">Section { currentQuestion?.section?.title + " " + currentQuestion?.section?.tag}</h3>
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
  </div>

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
            <div onClick={excelExport} style={{marginBlock: "15px"}} className="button button__primary">Export Data</div>
            {
                sections.map(section => (
                    <div className="section-a section">
               <button onClick={() => handleStartSurvey(section._id)} style={{marginBottom: "10px"}} className="button button-primary">Take Section {section.title?.toUpperCase()}</button>
              <div  className="button button-primary">
                <label onClick={() => setSelectedSection(section.title)} htmlFor="test">Import</label>
                <input onChange={event => handleUpload(event.target.files[0])} accept="*.xlsx"  id="test"  style={{opacity: 0}} type="file" />
                </div>
             <h3 className="basic-data">SECTION {section.title?.toUpperCase()} {section.tag?.toUpperCase()}</h3>
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
                        allAnswers.filter(ans => ans.question?.section?.title?.toLowerCase() === section.title?.toLowerCase())
                        .map(ans => (
                            <tr>
                           <td>{ans.posted_on?.toString().substr(0, 10)}</td>
                           <td>{ans.question?.question}</td>
                           <td>{ans.answer}</td>
                           <button onClick={() => handleEdit(ans._id)} style={{padding: "10px", marginBlock:"10px", width: "100px", borderRadius:"5px", outline:"none", marginInline:"10px", fontSize:"13px"}} >Edit</button>
                       </tr>
                        ))
                       }
                  
                 </tbody>
                 </table>
                   </div>
                ))
            }

                {/* <div className="section-a section">
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
                </div> */}

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

export default ProjectStudentOverviewPage;