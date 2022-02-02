import React, { useState } from 'react';
import * as Yup from "yup"
import {Formik} from "formik"
import {MdCancel} from "react-icons/md"
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import {register} from "../utils/auth"
const validationSchema = Yup.object().shape({
    email:Yup.string().email("Must be a valid email").required("Email address is reqquired"),
    username:Yup.string().required("Username is required"),
    password:Yup.string().required("Password is required")
})

const Dashboard = () => {
    const [isLoading,setIsLoading] = useState(false)
    const [showForm,setShowForm] = useState(false)
    return ( <>
             { showForm &&  <div className="login-container register-container">
                 <div className="cancel-container">
                    <MdCancel onClick={()=>setShowForm(false)} style={{cursor:"pointer"}} size={25} color='white'/>
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
                </div>}
    <div className="dashboard">
        <div className="add-user-button">
            <div onClick={()=>setShowForm(!showForm)} className="button button__primary">Add user</div>
        </div>
        <div className="counter-grid">
            <div className="counter">
                <h3 className="counter__title">Total Users</h3>
                <p className="counter__text">128</p>
            </div>
            <div className="counter counter--orange">
                <h3 className="counter__title">Overall Data</h3>
                <p className="counter__text">1048</p>
            </div>
            <div className="counter counter--blue">
                <h3 className="counter__title">Monthly Updates</h3>
                <p className="counter__text">540</p>
            </div>
        </div>
        <div className="data-search">
            <h2 className="data-overview">Data Overview</h2>
            <input placeholder="Search data" type="text" className="search-input" />
        </div>
    </div> 
    <Footer/>
    </>);
}
 
export default Dashboard;