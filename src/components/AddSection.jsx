import React, {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useNavigate} from "react-router-dom"
import {Formik} from "formik"
import * as Yup from "yup"
import {MdCancel} from "react-icons/md"
import Loader from './Loader';
import { addSectionAndQuestionnaire, deleteSurvey, getAllSurveys } from '../utils/questionaire';
const validateQuestionnaire = Yup.object().shape({
    question: Yup.string().required("Query is required").label("Question"),
    feebackType: Yup.string().required("Feedback type is required").label("Feedback type"),
    label: Yup.string().required("Feedback label is required").label("Feedback label"),
    section_title: Yup.string().required("Section title is required").label("Section Title"),
    section_tag: Yup.string().required("Section tag is required ").label("Section Tag")
})

function AddSection({setShowQuestionModal}) {
    const [isLoading, setIsLoading] = useState(false)
    const [option, setOption] = useState("")
    const [options, setOptions] = useState([])
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        loadQuestions()
    }, [])

    const loadQuestions = async () => {
        const data = await getAllSurveys()
        setQuestions(data)
    }

    const handleDeleteSurvey = async (id) => {
        await deleteSurvey(id)
        await loadQuestions()
    }

    const handleAddSection = async (body) => {
        if(body.feebackType === "radio" && options.length === 0) return alert("Your feedback must contain at least 1 option")
        
        setIsLoading(true)

        const opt = body.feebackType === "radio" ? options : [{
            type: body.feebackType,
            value: body.label
        }]

        const payload = {
            question: body.question,
            section: body.section_title,
            title: body.section_tag,
            options:opt
        }
        await addSectionAndQuestionnaire(payload)

        window.location = "/dashboard"
    }
    const addOption = () => {
        if(!option) return alert("Input a valid option")
  
        const opt = {type: "radio", value: option}
        setOptions([...options, opt])
        setOption("")
      }

    return (
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
               <h3 className="form--header">Add Section & Questionnaire</h3>
           <Formik 
                        initialValues={{
                            section_title: "",
                            section_tag: "",
                           question: "" ,
                           feebackType:"",
                           label:""
                       }} 
                        validationSchema={validateQuestionnaire}
                        onSubmit={(values) => handleAddSection(values)}
                        >
                            {({handleChange,handleSubmit,errors,touched, values})=>(
                               <>
                               <input type="text" onChange={handleChange} className="login-field" placeholder="Section Title eg(A, B, C etc)"  name="section_title"/>
                                 {errors.section_title && touched.section_title && <p className="error">{errors.section_title}</p>}
                                 <input type="text" onChange={handleChange} className="login-field" placeholder="Section tag"  name="section_tag"/>
                                 {errors.section_tag && touched.section_tag && <p className="error">{errors.section_tag}</p>}
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

                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow   >
            <TableCell style={{fontSize:"12px"}}>Section</TableCell>
            <TableCell  style={{fontSize:"12px"}} align="left">Title</TableCell>
            <TableCell  style={{fontSize:"12px"}} align="left">Question</TableCell>
            <TableCell  style={{fontSize:"12px"}} align="left">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {
                questions.map(ques => (
            <TableRow   >
            <TableCell style={{fontSize:"12px"}}>{ques.section}</TableCell>
            <TableCell  style={{fontSize:"12px"}} align="left">{ques.title}</TableCell>
            <TableCell  style={{fontSize:"12px"}} align="left">{ques.question}</TableCell>
            <button onClick={() => handleDeleteSurvey(ques._id)} style={{background:"red",width:"140px",color:"white",padding:"4px",marginBlock:"10px", marginInline:"15px",fontSize:"15px"}} className="button">Delete</button>
          </TableRow>
                ))
            }
        </TableBody>
      </Table>
    </div>
    </div>
    );
}

export default AddSection;