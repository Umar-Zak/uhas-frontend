import React from 'react';
import {Formik} from "formik"
import * as Yup from "yup"
import {MdCancel} from "react-icons/md"
import Loader from './Loader';
import {postProject} from "../utils/questionaire"

const validateDataset = Yup.object().shape({
    title:Yup.string().required("Title is required").label("Title"),
    description:Yup.string().required("Description is required").label("Description")
})

function AddProjectForm({setShowProjectForm, isLoading, setIsLoading}) {
    return (
      <div className="modal">
        <div className="login-container register-container">
                 <div className="cancel-container">
                    <MdCancel onClick={()=>setShowProjectForm(false)} style={{cursor:"pointer"}} size={25} color='black'/>
                 </div>
                     <Formik 
                     initialValues={{title:"",description:"" }} 
                     validationSchema={validateDataset}
                     onSubmit={(values)=>postProject(values,setIsLoading)}
                     >
                         {({handleChange,handleSubmit,errors,touched})=>(
                            <>
                              <input onChange={handleChange} name="title" type="text" placeholder="Title of project" className="login-field" />
                              {errors.title && touched.title && <p className="error">{errors.title}</p>}
                              <textarea onChange={handleChange} name="description" t  placeholder="Description of project" className="login-field"></textarea>
                              {errors.description && touched.description && <p className="error">{errors.description}</p>}
                              
                          { !isLoading &&  <button onClick={handleSubmit} className="button button__primary button__full">Add</button>}
                          { isLoading &&  <Loader/>}
                            </>
                            
                         )}
                     </Formik>
                </div>
      </div>
    );
}

export default AddProjectForm;