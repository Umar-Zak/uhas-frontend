import React, { useEffect, useState } from 'react';
import {AiFillPlusCircle,AiFillFileZip} from "react-icons/ai"
import {FaChevronCircleLeft} from "react-icons/fa"
import {GrOverview} from "react-icons/gr"
import {AiFillProject} from "react-icons/ai"
import {FaNewspaper} from "react-icons/fa"
import { useNavigate } from 'react-router-dom';
import "@ant-design/flowchart/dist/index.css";
import Footer from '../components/Footer';
import {getCurrentUser} from "../utils/auth"
import { getQuestionnaire,getSecondQuestionnaire, transformQuestionnaire ,uploadFile,getRequests,postDataSet,postProject, getDataSets, deleteDataSet, getPapers, deletePaper, getProject, deleteProject, getZips, togglePaperStatus, deleteQuestionnaire, toggleDataStatus, addStudent, getAllStudents, getSurveyQuestions, postSurvey} from '../utils/questionaire';
import OverView from '../components/OverView';
import Datasets from '../components/Datasets';
import Projects from '../components/Projects';
import Zips from '../components/Zips';
import Questionnaire2 from '../components/Questionnaire2';
import Analytics from '../components/Analytics';
import Students from '../components/Students';
import Export from '../components/Export';
import AddUserForm from '../components/AddUserForm';
import AddZipForm from '../components/AddZipForm';
import AddDataSetForm from '../components/AddDataSetForm';
import AddProjectForm from '../components/AddProjectForm';
import AddPaperForm from '../components/AddPaperForm';
import AddStudentForm from '../components/AddStudentForm';
import StudentQuestionnaireModal from '../components/StudentQuestionnaireModal';
import AddSchool from '../components/AddSchool';

const Dashboard = () => {
    const _export = React.useRef(null);


    const excelExport = () => {
     if (_export.current !== null) {
       _export.current.save();
     }
   };
  
    const [isLoading,setIsLoading] = useState(false)
    const [showForm,setShowForm] = useState(false)
    const [showFileForm,setShowFileForm] = useState(false)
    const [showProjectForm,setShowProjectForm] = useState(false)
    const [showPaperForm,setShowPaperForm] = useState(false)
    const [showZipForm,setShowZipForm] = useState(false)
    const [showStudentForm, setShowStudentForm] = useState(false)
    let [questionnaire,setQuestionaire] = useState([])
    const [file,setFile] = useState("")
    const [activeLink,setActiveLink] = useState("overview")
    const [showQuesForm, setShowQuesForm] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState("")
    const [survey, setSurvey] = useState([])
    const [index, setIndex] = useState(0)
    const [selectedOption, setSelectecOption] = useState("")
    const [answers, setAnswers] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState({})
    const [active,setActive] = useState("data")
    

    const navigate = useNavigate()

    
   
    
    

    
 

    

    

    const handleNext = () => {
      if(index > survey.length - 1 || !selectedOption) return
      const answer = {answer: selectedOption, question: currentQuestion._id}
      setAnswers([...answers, answer])
      setIndex(index + 1)
      setCurrentQuestion(survey[index + 1])
    }

    const handleFinish = async () => {
      const body = {
        answers: 
        [...answers, 
          {question: currentQuestion._id, answer: selectedOption}],
          student: selectedStudent
        }
        await postSurvey(body, setIsLoading)
    }

   
         
    useEffect(()=>{
        getQuestionnaire(setQuestionaire)
        getSurveyQuestions("A", setSurvey)
    },[])
   


   let transformedData = [];
    if (questionnaire.length > 0)  transformedData = transformQuestionnaire(questionnaire)
    

   return ( <>
   <div className="dashboard--header">
   <div style={{overflowX:"scroll"}} className="add-user-button">
   <FaChevronCircleLeft onClick={()=>navigate("/")} style={{marginInline:"15px",cursor:"pointer"}} size={40} />
        { getCurrentUser().isAdmin && <button
        onClick={()=>setShowFileForm(true)}
        style={{marginRight:"15px"}}
            className="button button__light"
          >
        Import
        </button>}
        {getCurrentUser().isAdmin &&  <button
            title="Export Excel"
            className="button button__light"
            onClick={excelExport}
            style={{marginInline:"15px",cursor:"pointer"}}
          >
            Export
          </button>}
   
          {getCurrentUser().isAdmin &&   <button onClick={()=>setShowForm(!showForm)} className="button button__primary">Add user</button>}
          {getCurrentUser().isAdmin && <AiFillPlusCircle onClick={()=>navigate("/questionaire")} style={{marginInline:"15px",cursor:"pointer"}} size={40} />}
       <button
            title="Export Excel"
            className="button button__primary"
            style={{marginRight:"15px"}}
            onClick={()=>setShowZipForm(true)}
          >
           Upload datasets
          </button>
        {getCurrentUser().isAdmin && <button
            title="Export Excel"
            className="button button__light"
            style={{marginRight:"15px"}}
            onClick={()=>setShowProjectForm(true)}
          >
            Add project
          </button>}
        {/* { getCurrentUser().isAdmin && <button
            title="Export Excel"
            className="button button__light"
            style={{marginRight:"15px"}}
            onClick={()=>setShowDatasetForm(true)}
          >
            Add dataset
          </button>} */}
            <button onClick={()=>setShowPaperForm(true)} className="button button__light">Publication</button>
             
        </div>
   </div>

<div className="dashboard--grid">
    {getCurrentUser().isAdmin &&  <div className="sidebar">
        <div onClick={()=>setActiveLink("overview")} className="link--item">
        <GrOverview size={30} color="green" />
        <a href="#" className={`${activeLink === "overview" ? "link active--link": "link"}`}>OverView</a>
        </div>
        <div onClick={()=>setActiveLink("papers")} className="link--item">
        <FaNewspaper size={30}  />
        <a href="#" className={`${activeLink === "papers" ? "link active--link": "link"}`}>Publications</a>
        </div>
        <div onClick={()=>setActiveLink("projects")} className="link--item">
        <AiFillProject size={30}  />
        <a href="#" className={`${activeLink === "projects" ? "link active--link": "link"}`}>Ongoing Projects</a>
        </div>
        <div onClick={()=>setActiveLink("zip")} className="link--item">
        <AiFillFileZip size={30}  />
        <a href="#" className={`${activeLink === "zip" ? "link active--link": "link"}`}>Data Sets</a>
        </div>
        <div onClick={()=>navigate("/second-questionaire")} className="link--item">
        <AiFillFileZip size={30}  />
        <a href="#" className={`${activeLink === "zip" ? "link active--link": "link"}`}>Take Questionnaire 2</a>
        </div>
        <div onClick={()=>setActiveLink("q2")} className="link--item">
        <AiFillFileZip size={30}  />
        <a href="#" className={`${activeLink === "q2" ? "link active--link": "link"}`}>Questionnaire 2</a>
        </div>
        <div onClick={()=>setActiveLink("analytics")} className="link--item">
        <AiFillFileZip size={30}  />
        <a href="#" className={`${activeLink === "analytics" ? "link active--link": "link"}`}>Analytics</a>
        </div>
        <div onClick={()=>setShowStudentForm(true)} className="link--item">
        <AiFillFileZip size={30}  />
        <a href="#" className={`${activeLink === "student" ? "link active--link": "link"}`}>Add student</a>
        </div>
        <div onClick={()=>setActiveLink("student")} className="link--item">
        <AiFillFileZip size={30}  />
        <a href="#" className={`${activeLink === "student" ? "link active--link": "link"}`}>Student profiles</a>
        </div>
        <div onClick={()=>setActiveLink("schools")} className="link--item">
        <AiFillFileZip size={30}  />
        <a href="#" className={`${activeLink === "schools" ? "link active--link": "link"}`}>Schools</a>
        </div>
    </div>
}
   {getCurrentUser().isAdmin && activeLink === "overview" && 
    <OverView active={active} setActive={setActive} />
    }

    {activeLink === "papers" && 
    <Datasets/>
    }


   { activeLink === "projects" &&
   <Projects/>
    }

    {
      activeLink === "zip" &&
     <Zips/>
    }
    {
      activeLink === "q2" &&
      <Questionnaire2/>
    }
    {
      activeLink === "analytics" &&
      <Analytics/>
    }

{
      activeLink === "student" &&
     <Students 
     setCurrentQuestion={setCurrentQuestion} 
     setSelectedStudent={ setSelectedStudent} 
     setShowQuesForm={setShowQuesForm}
     index={index}
     survey={survey}
     />
    }
    {
      activeLink === "schools" &&
     <AddSchool/>
    }

</div>

 <Export exportRef={_export} transformedData={transformedData} />

             { showForm && 
             <AddUserForm 
             isLoading={isLoading} 
             setIsLoading={setIsLoading} 
             setShowForm={setShowForm}
              />

                }
                { showProjectForm && 
                 <AddProjectForm
                 setShowProjectForm={setShowProjectForm}
                 isLoading={isLoading}
                 setIsLoading={setIsLoading}
                 />
                }
                { showPaperForm && 
               <AddPaperForm
               isLoading={isLoading}
               setIsLoading={setIsLoading}
               setShowPaperForm={setShowPaperForm}
               />
                }
                { showZipForm &&  
               <AddDataSetForm
               isLoading={isLoading}
               setIsLoading={setIsLoading}
               setShowZipForm={setShowZipForm}
               />
                }
                {showFileForm &&  
                <AddZipForm 
                isLoading={isLoading}
                file={file}
                setFile={setFile}
                setIsLoading={setIsLoading}
                setShowFileForm={setShowFileForm}

                />
                }
                { showStudentForm && 
               <AddStudentForm
               isLoading={isLoading}
               setIsLoading={setIsLoading}
               setShowStudentForm={setShowStudentForm}
               />
                } 

                { showQuesForm &&  
                <StudentQuestionnaireModal
                currentQuestion={currentQuestion}
                handleFinish={handleFinish}
                handleNext={handleNext}
                isLoading={isLoading}
                selectedOption={selectedOption}
                setSelectecOption={setSelectecOption}
                setShowQuesForm={setShowQuesForm}
                index={index}
                survey={survey}
                 
                />
                }
     
    <Footer/>
    </>);
}
 
export default Dashboard;