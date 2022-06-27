import React from 'react';
import {Formik} from "formik"
import * as Yup from "yup"
import {MdCancel} from "react-icons/md"
import Loader from './Loader';
import {uploadZip} from "../utils/firebase"

const validateZip = Yup.object().shape({
    file:Yup.string().required("Zip file is required").label("Zip file"),
    name:Yup.string().required("Name of zip file is required").label("Name"),
    description:Yup.string().required("Description of zip file is required")
})


function AddDataSetForm({setIsLoading, isLoading, setShowZipForm}) {
    return (
     <div className="modal">
         <div className="login-container register-container">
                 <div className="cancel-container">
                    <MdCancel onClick={()=>setShowZipForm(false)} style={{cursor:"pointer"}} size={25} color='black'/>
                 </div>
                     <Formik 
                     initialValues={{file:"", name:"", description:"" }} 
                     validationSchema={validateZip}
                     onSubmit={(values)=>uploadZip(values,setIsLoading)}
                     >
                         {({handleSubmit,errors,touched,setFieldValue, handleChange})=>(
                            <>
                             <input onChange={handleChange} name="name" type="text" placeholder="Name of dataset" className="login-field" />
                              {errors.name && touched.name && <p className="error">{errors.name}</p>}
                              <textarea onChange={handleChange} name="description"   placeholder="Description of dataset" className="login-field"></textarea>
                              {errors.description && touched.description && <p className="error">{errors.description}</p>}
                              <input accept='.zip' onChange={({target})=>setFieldValue("file",target.files[0])}  name="file" type="file" placeholder=" " className="login-field" />
                              {errors.file && touched.file && <p className="error">{errors.file}</p>}
                          { !isLoading &&  <button onClick={handleSubmit} className="button button__primary button__full">Upload</button>}
                          { isLoading &&  <Loader/>}
                            </>
                            
                         )}
                     </Formik>
                </div>
     </div>
    );
}

export default AddDataSetForm;