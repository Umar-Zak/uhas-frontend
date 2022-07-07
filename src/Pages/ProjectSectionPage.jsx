import React, {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useParams} from "react-router-dom"
import {MdCancel} from "react-icons/md"
import {Formik} from "formik"
import * as Yup from "yup"
import Loader from '../components/Loader';
import { getAllSections, addSection, deleteSection, addQuestion, getSectionQuestions, deleteQuestion } from '../utils/questionaire';

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


function ProjectSectionPage(props) {
    const [showForm, setShowForm] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [sections, setSections] = useState([])
    const [showQuestionModal, setShowQuestionModal] = useState(false)
    const [selectedSection, setSelectedSection] = useState({})
    const [questions, setQuestions] = useState([])

    const {id} = useParams()
    const loadSections = async () => {
        const data = await getAllSections()
        setSections(data)
    }

    useEffect(() => {
        loadSections()
    }, [])


    const handleAddSection = async (body) => {
        setIsLoading(true)
        await addSection(body)
        setShowForm(false)
        loadSections()
    }

    const handleDeleteSection = async id => {
        await deleteSection(id)
        loadSections()
    }


    const loadQuestions = async (id) => {
        const data = await getSectionQuestions(id)
        console.log("DATA", data)
        setQuestions(data)
    }

    const viewSection = async id => {
        setSelectedSection(sections.find(sec => sec._id === id))
        await loadQuestions(id)
        setShowQuestionModal(true)
    }

    const handleAddQuestionnaire = async (body, form) => {
        setIsLoading(true)
        const payload = {
            section: selectedSection._id,
            question: body.question,
            options:[
                {
                    type: body.feebackType,
                    value: body.label
                }
            ]
        }
        await addQuestion(payload)
        window.location = `/projects/${id}`
    }

    const handleDeleteQuestion = async id => {
        await deleteQuestion(id)
        await loadQuestions(selectedSection._id)
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
                                 {({handleChange,handleSubmit,errors,touched})=>(
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
                <TableCell align="left">{ques?.question} </TableCell>
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
            {
                showForm &&
                <div className="modal">
                <div className="login-container register-container">
                         <div className="cancel-container">
                            <MdCancel onClick={()=>setShowForm(false)} style={{cursor:"pointer"}} size={25} color='black'/>
                         </div>
                             <Formik 
                             initialValues={{
                                tag: "" ,
                                title:"",
                                project:id
                            }} 
                             validationSchema={validateSchema}
                             onSubmit={(values)=>handleAddSection(values)}
                             >
                                 {({handleChange,handleSubmit,errors,touched})=>(
                                    <>
                                     <input type="text" onChange={handleChange} className="login-field" placeholder="Section tag"  name="tag"/>
                                      {errors.tag && touched.tag && <p className="error">{errors.tag}</p>}
                                      <input type="text" onChange={handleChange} className="login-field" placeholder="Section title"  name="title"/>
                                      {errors.title && touched.title && <p className="error">{errors.title}</p>}
                                  { !isLoading &&  <button onClick={handleSubmit} className="button button__primary button__full">Submit</button>}
                                  { isLoading &&  <Loader/>}
                                    </>
                                    
                                 )}
                             </Formik>
                        </div>
                </div>
            }
            <div onClick={() => setShowForm(true)} className="button button__primary">Add Section</div>
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