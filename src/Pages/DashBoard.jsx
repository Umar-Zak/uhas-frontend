import React, { useEffect, useState } from 'react';
import * as Yup from "yup"
import {Formik} from "formik"
import {MdCancel} from "react-icons/md"
import {AiFillPlusCircle} from "react-icons/ai"
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import {getAllUsers, register} from "../utils/auth"
import { getQuestionnaire } from '../utils/questionaire';
import { useNavigate } from 'react-router-dom';
const validationSchema = Yup.object().shape({
    email:Yup.string().email("Must be a valid email").required("Email address is reqquired"),
    username:Yup.string().required("Username is required"),
    password:Yup.string().required("Password is required")
})

const Dashboard = () => {
   
    const [isLoading,setIsLoading] = useState(false)
    const [showForm,setShowForm] = useState(false)
    const [questionnaire,setQuestionaire] = useState([])
    const [users,setUsers] = useState([])
    const [active,setActive] = useState("data")

    const navigate = useNavigate()

    const goOverView = id =>{
        navigate(`/overview/${id}`)
    }


    useEffect(()=>{
        getQuestionnaire(setQuestionaire)
        getAllUsers(setUsers)
    },[])
   
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
            <AiFillPlusCircle onClick={()=>navigate("/questionaire")} style={{marginRight:"15px",cursor:"pointer"}} size={40} />
            <div onClick={()=>setShowForm(!showForm)} className="button button__primary">Add user</div>
             
        </div>
        <div className="counter-grid">
        <div onClick={()=>setActive("data")} className={`${active === "data"? "counter counter--orange active-counter":"counter counter--orange"}`}>
                <h3 className="counter__title">Overall Data</h3>
                <p className="counter__text">{questionnaire.length}</p>
            </div>
            <div onClick={()=>setActive("users")} className={`${active === "users"? "counter  active-counter":"counter"}`}>
                <h3 className="counter__title">Total Users</h3>
                <p className="counter__text">{users.length}</p>
            </div>
           
            <div className={`${active === "overall"? "counter counter--blue active-counter":"counter counter--blue"}`}>
                <h3 className="counter__title">Monthly Updates</h3>
                <p className="counter__text">540</p>
            </div>
        </div>
     {
         active === "data" &&
         <div className="data">
         <div className="data-search">
              <h2 className="data-overview">Data Overview</h2>
              <input placeholder="Search data" type="text" className="search-input" />
          </div>
          <table className="table table-responsive table-hover">
              <thead>
                  <tr className='t__head'>
                      <th scope="col">Woman ID</th>
                      <th scope="col">Date</th>
                      <th scope="col">Officer</th>
                  </tr>
              </thead>
              <tbody>
                 {questionnaire.map(({womanId,officer,collected_on,_id})=>(
                      <tr onClick={()=>goOverView(_id)} className='t__row' style={{cursor:"pointer"}} key={collected_on}>
                      <td>{womanId}</td>
                      <td>{collected_on.toString().substr(0,10)}</td>
                      <td>{officer.name}</td>
                  </tr>
                 ))}
              </tbody>
          </table>
         </div>
     }

{
         active === "users" &&
         <div className="data">
         <div className="data-search">
              <h2 className="data-overview">Active Users</h2>
              <input placeholder="Search data" type="text" className="search-input" />
          </div>
          <table className="table table-hover">
              <thead>
                  <tr className='t__head'>
                      <th  scope="col">Username</th>
                      <th scope="col">Email</th>
                      <th scope="col">Joined On</th>
                  </tr>
              </thead>
              <tbody>
                 {users.map(({username,email,created_at})=>(
                      <tr className='t__row' key={created_at}>
                      <td>{username}</td>
                      <td>{email}</td>
                      <td>{created_at.toString().substr(0,15)}</td>
                  </tr>
                 ))}
              </tbody>
          </table>
         </div>
     }
    </div> 
    <Footer/>
    </>);
}
 
export default Dashboard;