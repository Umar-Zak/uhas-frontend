import React from 'react';
import {Formik} from "formik"
import * as Yup from "yup"
import {MdCancel} from "react-icons/md"
import Loader from './Loader';
import {addStudent} from "../utils/questionaire"

const validateStudent = Yup.object().shape({
    name:Yup.string().required("Name of student is required").label("Student")
  })
  

function AddStudentForm({setShowStudentForm, isLoading, setIsLoading}) {
    return (
      <div className="modal">
          <div className="login-container register-container">
                 <div className="cancel-container">
                    <MdCancel onClick={()=>setShowStudentForm(false)} style={{cursor:"pointer"}} size={25} color='black'/>
                 </div>
                     <Formik 
                     initialValues={{name: "" }} 
                     validationSchema={validateStudent}
                     onSubmit={(values)=>addStudent(setIsLoading, values)}
                     >
                         {({handleChange,handleSubmit,errors,touched})=>(
                            <>
                              <input onChange={handleChange} name="name" type="text" placeholder="Name of student" className="login-field" />
                              {errors.name && touched.name && <p className="error">{errors.name}</p>}
                          { !isLoading &&  <button onClick={handleSubmit} className="button button__primary button__full">Post</button>}
                          { isLoading &&  <Loader/>}
                            </>
                            
                         )}
                     </Formik>
                </div>
      </div>
    );
}

export default AddStudentForm;