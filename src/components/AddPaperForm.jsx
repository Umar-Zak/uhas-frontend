import React from 'react';
import {Formik} from "formik"
import * as Yup from "yup"
import {MdCancel} from "react-icons/md"
import Loader from './Loader';
import {uploadPaper} from "../utils/firebase"

const validatePaper = Yup.object().shape({
    heading:Yup.string().required("Paper heading is required").label("Heading"),
    file:Yup.string().required("Paper file is required").label("Paper file"),
    type:Yup.string().required("Paper type is required").label("Paper type"),
    author:Yup.string().required("Author of the paper is required").label("Author")
})

function AddPaperForm({setShowPaperForm, isLoading, setIsLoading}) {
    return (
       <div className="modal">
          <div className="login-container register-container">
                 <div className="cancel-container">
                    <MdCancel onClick={()=>setShowPaperForm(false)} style={{cursor:"pointer"}} size={25} color='black'/>
                 </div>
                     <Formik 
                     initialValues={{heading:"",file:"",type:"", author:"" }} 
                     validationSchema={validatePaper}
                     onSubmit={(values)=>uploadPaper(values,setIsLoading)}
                     >
                         {({handleChange,handleSubmit,errors,touched,setFieldValue})=>(
                            <>
                              <input onChange={handleChange} name="heading" type="text" placeholder="Heading of paper work" className="login-field" />
                              {errors.heading && touched.heading && <p className="error">{errors.heading}</p>}
                              <input accept='.pdf' onChange={({target})=>setFieldValue("file",target.files[0])}  name="file" type="file" placeholder=" " className="login-field" />
                              {errors.file && touched.file && <p className="error">{errors.file}</p>}
                              <select className="login-field" onChange={handleChange} name="type" id="">
                                  <option value="">Choose paper type</option>
                                  <option value="student">Student</option>
                                  <option value="faculty">Faculty</option>
                              </select>
                              {errors.type && touched.type && <p className="error">{errors.type}</p>}
                              <input onChange={handleChange} name="author" type="text" placeholder="Author of Paper" className="login-field" />
                              {errors.author && touched.author && <p className="error">{errors.author}</p>}
                          { !isLoading &&  <button onClick={handleSubmit} className="button button__primary button__full">Post</button>}
                          { isLoading &&  <Loader/>}
                            </>
                            
                         )}
                     </Formik>
                </div>
       </div>
    );
}

export default AddPaperForm;