import React from 'react';
import {Formik} from "formik"
import * as Yup from "yup"
import {MdCancel} from "react-icons/md"
import { register } from '../utils/auth';
import Loader from './Loader';

const validationSchema = Yup.object().shape({
    email:Yup.string().email("Must be a valid email").required("Email address is reqquired"),
    username:Yup.string().required("Username is required"),
    password:Yup.string().required("Password is required")
})

function AddUserForm({setShowForm, isLoading, setIsLoading}) {
    return (
       <div className="modal">
         <div className="login-container register-container">
        <div className="cancel-container">
           <MdCancel onClick={()=>setShowForm(false)} style={{cursor:"pointer"}} size={25} color='black'/>
        </div>
            <Formik 
            initialValues={{email:"",password:"",username:""}} 
            validationSchema={validationSchema}
            onSubmit={(values,form)=>register(values,form,setIsLoading)}
            >
                {({handleChange,handleSubmit,errors,touched})=>(
                   <>
                     <input onChange={handleChange} name="email" type="email" placeholder="example@gmail.com" className="login-field" />
                     {errors.email && touched.email && <p className="error">{errors.email}</p>}
                     <input onChange={handleChange} name="username" type="text" placeholder="User12" className="login-field" />
                     {errors.username && touched.username && <p className="error">{errors.username}</p>}
                     <input onChange={handleChange}  type="password" name="password" placeholder="************" className="login-field" />
                     {errors.password && touched.password && <p className="error">{errors.password}</p>}
                 { !isLoading &&  <button onClick={handleSubmit} className="button button__primary button__full">Register</button>}
                 { isLoading &&  <Loader/>}
                   </>
                   
                )}
            </Formik>


       </div>
       </div>
    );
}

export default AddUserForm;