import React, {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useParams, useNavigate} from "react-router-dom"
import {MdCancel} from "react-icons/md"
import {Formik} from "formik"
import * as Yup from "yup"
import Loader from '../components/Loader';
import { getAllSections, addSection, deleteSection, addQuestion, getSectionQuestions, deleteQuestion, addProjectStudent, getProjectStudents } from '../utils/questionaire';

const validateSchema = Yup.object().shape({
    tag: Yup.string().required("Section tag is required").label("Section tag"),
    title: Yup.string().required("Section title is required").label("Section title"),
    project: Yup.string().required()
})

const validateQuestionnaire = Yup.object().shape({
    question: Yup.string().required("Query is required").label("Question"),
    feebackType: Yup.string().required("Feedback type is required").label("Feedback type"),
    label: Yup.string().required("Feedback label is required").label("Feedback label")
})

const validateStudent = Yup.object().shape({
  name: Yup.string().required("Student name is required").label("Name"),

})

function ProjectSectionPage(props) {
    const [showForm, setShowForm] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [sections, setSections] = useState([])
    const [showQuestionModal, setShowQuestionModal] = useState(false)
    const [selectedSection, setSelectedSection] = useState({})
    const [questions, setQuestions] = useState([])
    const [showStudentForm, setShowStudentForm] = useState(false)
    const [showStudentTable ,setShowStudentTable] = useState(false)
    const [students, setStudents] = useState([])
    const [option, setOption] = useState("")
    const [options, setOptions] = useState([])

    const {id} = useParams()
    const navigate = useNavigate()
   
   
    const loadSections = async () => {
        const data = await getAllSections()
        setSections(data.filter(sec => sec.project === id))
    }


    useEffect(() => {
        loadSections()
        loadStudents()
    }, [])


    const handleAddSection = async (body) => {
        setIsLoading(true)
        await addSection(body)
        setShowForm(false)
        setIsLoading(false)
        loadSections()
    }

    const handleDeleteSection = async id => {
        await deleteSection(id)
        loadSections()
    }


    const loadQuestions = async (id) => {
        const data = await getSectionQuestions(id)
        setQuestions(data)
    }

    const viewSection = async id => {
        setSelectedSection(sections.find(sec => sec._id === id))
        await loadQuestions(id)
        setShowQuestionModal(true)
    }

    const addOption = () => {
      if(!option) return alert("Input a valid option")

      const opt = {type: "radio", value: option}
      setOptions([...options, opt])
      setOption("")
    }

    const handleAddQuestionnaire = async (body, form) => {
      if(body.feebackType === "radio" && options.length === 0) return alert("Your feedback must contain at least 1 option")

        setIsLoading(true)

        const opt = body.feebackType === "radio" ? options : [{
          type: body.feebackType,
          value: body.label
      }]

        const payload = {
            section: selectedSection._id,
            question: body.question,
            options:opt
        }
        await addQuestion(payload)
        window.location = `/projects/${id}`
    }

    const handleDeleteQuestion = async id => {
        await deleteQuestion(id)
        await loadQuestions(selectedSection._id)
    }


    const handleAddProjectStudent = async name => {
      setIsLoading(true)
      await addProjectStudent({project_id: id, name})
      await loadStudents()
      window.location = `/projects/${id}`
    }

    const loadStudents = async () => {
      let data = await getProjectStudents(id)
      data = data.filter(stu => stu.project_id.toString() === id.toString())
      setStudents(data)
    }


    const handleViewStudent = student => {
      navigate(`/projects/${id}/${student}`)
    }

    return (
        <div className="dashboard dashboard--large">
          { showQuestionModal && 
          <div className="modal modal--black">
             <div style={{
                position: "absolute",
                top: "20px",
                right: "20px"
             }} className="cancel-container">
                <MdCancel onClick={()=>setShowQuestionModal(false)} style={{cursor:"pointer"}} size={35} color='white'/>
                </div>
            <div className="dashboard dashboard--large">
                <div className="question-form-container">
                    <h3 className="form--header">Add Questionnaire</h3>
                <Formik 
                             initialValues={{
                                question: "" ,
                                feebackType:"",
                                label:""
                            }} 
                             validationSchema={validateQuestionnaire}
                             onSubmit={(values, form) => handleAddQuestionnaire(values, form)}
                             >
                                 {({handleChange,handleSubmit,errors,touched, values})=>(
                                    <>
                                     <input type="text" onChange={handleChange} className="login-field" placeholder="Query"  name="question"/>
                                      {errors.question && touched.question && <p className="error">{errors.question}</p>}
                                      <select onChange={handleChange} name="feebackType"  className="login-field">
                                        <option value="">Choose Feedback type</option>
                                        <option value="radio">Radio Button</option>
                                        <option value="text">Text Field</option>
                                        <option value="number">Number Input</option>
                                      </select>
                                      {errors.feebackType && touched.feebackType && <p className="error">{errors.feebackType}</p>}
                                    { values.feebackType === "radio" &&
                                       <div style={{display: "flex", marginBlock:"20px", alignItems: "center"}}>
                                        <div style={{width: "60%"}}>
                                        <input type="text" value={option} onChange={(event) => setOption(event.target.value)} className="login-field" placeholder="Type option value here"/>
                                        </div>
                                          <button className="button" style={{marginLeft: "15px"}} onClick={addOption}>Add Option</button>
                                       </div>
                                    }
                                      <input type="text" onChange={handleChange} className="login-field" placeholder="Answer label"  name="label"/>
                                      {errors.label && touched.label && <p className="error">{errors.label}</p>}
                                  { !isLoading &&  <button onClick={handleSubmit} className="button button__primary button__full">Submit</button>}
                                  { isLoading &&  <Loader/>}
                                    </>
                                    
                                 )}
            </Formik>
                </div>
            <h3 className="basic-data">Section: {`${selectedSection.title.toUpperCase()} ${selectedSection.tag.toUpperCase()}`}</h3>
            <Table sx={{ minWidth: 650, marginTop: "30px" }} aria-label="simple table">
        <TableHead>
          <TableRow   >
            <TableCell style={{fontSize:"12px"}}>Section Title</TableCell>
            <TableCell  style={{fontSize:"12px"}} align="left">Section Tag</TableCell>
            <TableCell  style={{fontSize:"12px"}} align="left">Question</TableCell>
            <TableCell  style={{fontSize:"12px"}} align="left">Feedback Options/Label</TableCell>
            <TableCell  style={{fontSize:"12px"}} align="left">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
          questions.map(ques => (
            <TableRow
              key={ques._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell align="left">{ ques?.section?.title}</TableCell>
                <TableCell align="left">{ques?.section?.tag}</TableCell>
                <TableCell align="left">{ques?.question}</TableCell>

                <TableCell align="left">{ques?.options.map(op => op.value).join(", ")} </TableCell>
                <TableCell align="left">
                 <button onClick={() => handleDeleteQuestion(ques._id)}  style={{background:"red",width:"140px",color:"white",padding:"4px",marginBlock:"10px", marginInline:"15px",fontSize:"15px"}} className="button">Delete</button>
                </TableCell>
            </TableRow>
          ))
        }
        </TableBody>
      </Table>
                </div>
            </div>
            }
            { showForm && 
          <div className="modal">
            <div className="login-container register-container">
          <div className="cancel-container">
            <MdCancel onClick={()=>setShowForm(false)} style={{cursor:"pointer"}} size={25} color='black'/>
          </div>
        <Formik
          initialValues={{
            title: "",
            tag:"",
            project: id
          }}
          validationSchema={validateSchema}
          onSubmit={values => handleAddSection(values)}
          >
              {({handleChange,handleSubmit,errors,touched})=>(
                        <>
                          <input type="text" onChange={handleChange} className="login-field" placeholder="Title(eg. A)"  name="title"/>
                          {errors.title && touched.title && <p className="error">{errors.title}</p>}
                          <input type="text" onChange={handleChange} className="login-field" placeholder="Section Tagline"  name="tag"/>
                          {errors.tag && touched.tag && <p className="error">{errors.tag}</p>}
                      { !isLoading &&  <button onClick={handleSubmit} className="button button__primary button__full">Submit</button>}
                      { isLoading &&  <Loader/>}
                        </>
                        
                )}

                </Formik>
                        </div>
                
            </div>
            }
           { showStudentTable && 
          <div className="modal modal--black">
            <div style={{
                position: "absolute",
                top: "20px",
                right: "20px"
             }} className="cancel-container">
                <MdCancel onClick={()=>setShowStudentTable(false)} style={{cursor:"pointer"}} size={35} color='white'/>
                </div>
            <div className="dashboard dashboard--large">
            <Table sx={{ minWidth: 650, marginTop: "30px" }} aria-label="simple table">
        <TableHead>
          <TableRow   >
            <TableCell style={{fontSize:"18px"}}>Name of Student</TableCell>
            <TableCell style={{fontSize:"18px"}}>Project ID</TableCell>
            <TableCell style={{fontSize:"18px"}}>Manage</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
          students.map(stu => (
            <TableRow
            style={{ fontSize: "16px" }}
              key={stu._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0} }}
            >
                <TableCell align="left">{ stu?.name}</TableCell>
                <TableCell align="left">{ stu?._id?.toString().substr(0, 10)}</TableCell>
                <TableCell align="left">
                <button onClick={() => handleViewStudent(stu._id)} style={{background:"grey",width:"140px",color:"white",padding:"4px",marginBlock:"10px", marginInline:"15px",fontSize:"15px"}} className="button">View</button>
                </TableCell>
               
            </TableRow>
          ))
        }
        </TableBody>
      </Table>
                </div>
            </div>
            }
             {
                showStudentForm &&
                <div className="modal">
                <div className="login-container register-container">
                         <div className="cancel-container">
                            <MdCancel onClick={()=>setShowStudentForm(false)} style={{cursor:"pointer"}} size={25} color='black'/>
                         </div>
                             <Formik 
                             initialValues={{
                                name: "" ,
                            }} 
                             validationSchema={validateStudent}
                             onSubmit={(values)=> handleAddProjectStudent(values.name)}
                             >
                                 {({handleChange,handleSubmit,errors,touched})=>(
                                    <>
                                     <input type="text" onChange={handleChange} className="login-field" placeholder="Student's name"  name="name"/>
                                      {errors.name && touched.name && <p className="error">{errors.name}</p>}
                                  { !isLoading &&  <button onClick={handleSubmit} className="button button__primary button__full">Submit</button>}
                                  { isLoading &&  <Loader/>}
                                    </>
                                    
                                 )}
                             </Formik>
                        </div>
                </div>
            }
            <button onClick={() => setShowForm(true)} className="button button__primary">Add Section</button>
            <button style={{marginInline: "15px"}} onClick={() => setShowStudentTable(true)} className="button button__light">View Students</button>
            <button onClick={() => setShowStudentForm(true)} className="button button__primary">Add Student</button>
        <Table sx={{ minWidth: 650, marginTop: "30px" }} aria-label="simple table">
        <TableHead>
          <TableRow   >
            <TableCell style={{fontSize:"12px"}}>Section Title</TableCell>
            <TableCell  style={{fontSize:"12px"}} align="left">Section Tag</TableCell>
            <TableCell  style={{fontSize:"12px"}} align="left">Manage</TableCell>
            <TableCell  style={{fontSize:"12px"}} align="left">Delete</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
        {
          sections.map(sec => (
            <TableRow
              key={sec._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell align="left">{ sec.title}</TableCell>
                <TableCell align="left">{sec.tag}</TableCell>
                <TableCell align="left">
                 <button onClick={() => viewSection(sec._id)}  style={{background:"grey",width:"140px",color:"white",padding:"4px",marginBlock:"10px", marginInline:"15px",fontSize:"15px"}} className="button">Manage</button>
                </TableCell>
                <TableCell align="left">
                 <button onClick={() => handleDeleteSection(sec._id)} style={{background:"red",width:"140px",color:"white",padding:"4px",marginBlock:"10px", marginInline:"15px",fontSize:"15px"}} className="button">Delete</button>
                </TableCell>
            </TableRow>
          ))
        }
        </TableBody>
      </Table>
        </div>
    );
}

export default ProjectSectionPage;