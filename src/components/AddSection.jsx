import React, {useState} from 'react';
import {Formik} from "formik"
import * as Yup from "yup"
import {MdCancel} from "react-icons/md"
import Loader from './Loader';
import { addSectionAndQuestionnaire } from '../utils/questionaire';
const validateQuestionnaire = Yup.object().shape({
    question: Yup.string().required("Query is required").label("Question"),
    feebackType: Yup.string().required("Feedback type is required").label("Feedback type"),
    label: Yup.string().required("Feedback label is required").label("Feedback label"),
    section_title: Yup.string().required("Section title is required").label("Section Title"),
    section_tag: Yup.string().required("Section tag is required ").label("Section Tag")
})

function AddSection({setShowQuestionModal}) {
    const [isLoading, setIsLoading] = useState(false)

    const handleAddSection = async (body) => {
        setIsLoading(true)
        const payload = {
            question: body.question,
            section: body.section_title,
            title: body.section_tag,
            options:[
                {
                    type: body.feebackType,
                    value: body.label
                }
            ]
        }
        await addSectionAndQuestionnaire(payload)

        window.location = "/dashboard"
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
                            {({handleChange,handleSubmit,errors,touched})=>(
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
                                 <input type="text" onChange={handleChange} className="login-field" placeholder="Answer label"  name="label"/>
                                 {errors.label && touched.label && <p className="error">{errors.label}</p>}
                             { !isLoading &&  <button onClick={handleSubmit} className="button button__primary button__full">Submit</button>}
                             { isLoading &&  <Loader/>}
                               </>
                            )}
                        </Formik>
                            </div>
                            </div>
                        </div>
    );
}

export default AddSection;